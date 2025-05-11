import { auth, db } from "./firebase-init.js";
import { signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";
import { collection, query, where, getDocs, orderBy, doc, getDoc } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";

// Main function to run when the page loads
onAuthStateChanged(auth, async (user) => {
    if (user) {
        const uid = user.uid;
        console.log("User is logged in: " + uid);
        
        // Load and display transaction analysis
        await loadTransactionAnalysis(uid);
        
        // Set up logout functionality
        setupLogout();
    } else {
        console.log("No user is logged in.");
        window.location.href = "index.html";
    }
});

async function loadTransactionAnalysis(uid) {
    try {
        // Get transactions from the last 7 days
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
        
        const transactionsRef = collection(db, "users", uid, "transactions");
        const q = query(
            transactionsRef, 
            where("date", ">=", oneWeekAgo),
            orderBy("date", "desc")
        );
        
        const querySnapshot = await getDocs(q);
        
        if (querySnapshot.empty) {
            document.querySelector('.main--content').innerHTML += `
                <div class="no-transactions">
                    <h3>No transactions found in the last 7 days</h3>
                    <p>Start adding transactions to see your budget analysis.</p>
                </div>
            `;
            return;
        }
        
        // Process transactions data
        const transactions = [];
        let totalIncome = 0;
        let totalExpenses = 0;
        const categoryTotals = {};
        
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            transactions.push(data);
            
            if (data.type === 'income') {
                totalIncome += parseFloat(data.amount);
            } else {
                totalExpenses += parseFloat(data.amount);
                
                // Track spending by category
                if (!categoryTotals[data.category]) {
                    categoryTotals[data.category] = 0;
                }
                categoryTotals[data.category] += parseFloat(data.amount);
            }
        });
        
        // Calculate net change
        const netChange = totalIncome - totalExpenses;
        
        // Get current spending power from Overview
        const spendingPowerDoc = await getDoc(doc(db, "users", uid, "Overview", "spendingPower"));
        const currentSpendingPower = spendingPowerDoc.exists() ? parseFloat(spendingPowerDoc.data().Amount) : 0;
        
        // Display the analysis
        displayAnalysisResults({
            totalIncome,
            totalExpenses,
            netChange,
            categoryTotals,
            currentSpendingPower,
            transactions
        });
        
    } catch (error) {
        console.error("Error loading transaction analysis:", error);
        document.querySelector('.main--content').innerHTML += `
            <div class="error-message">
                <h3>Error loading transactions</h3>
                <p>${error.message}</p>
            </div>
        `;
    }
}

function displayAnalysisResults(data) {
    const mainContent = document.querySelector('.main--content');
    
    // Create summary cards
    const summaryHTML = `
        <div class="financial-summary">
            <div class="summary-card income">
                <h3>Total Income</h3>
                <div class="amount">$${data.totalIncome.toFixed(2)}</div>
                <div class="period">Last 7 Days</div>
            </div>
            
            <div class="summary-card expenses">
                <h3>Total Expenses</h3>
                <div class="amount">$${data.totalExpenses.toFixed(2)}</div>
                <div class="period">Last 7 Days</div>
            </div>
            
            <div class="summary-card net">
                <h3>Net Change</h3>
                <div class="amount ${data.netChange >= 0 ? 'positive' : 'negative'}">
                    ${data.netChange >= 0 ? '+' : '-'} $${Math.abs(data.netChange).toFixed(2)} 
                </div>
                <div class="period">Last 7 Days</div>
            </div>
            
            <div class="summary-card spending-power">
                <h3>Current Spending Power</h3>
                <div class="amount">$${data.currentSpendingPower.toFixed(2)}</div>
                <div class="period">Current Balance</div>
            </div>
        </div>
    `;
    
    // Create category breakdown
    let categoryHTML = '<div class="category-breakdown"><h3>Expense Categories</h3><ul>';
    
    // Sort categories by amount (descending)
    const sortedCategories = Object.entries(data.categoryTotals)
        .sort((a, b) => b[1] - a[1]);
    
    sortedCategories.forEach(([category, amount]) => {
        const percentage = (amount / data.totalExpenses * 100).toFixed(1);
        categoryHTML += `
            <li>
                <div class="category-name">${category}</div>
                <div class="category-bar">
                    <div class="bar-fill" style="width: ${percentage}%"></div>
                </div>
                <div class="category-amount">$${amount.toFixed(2)} (${percentage}%)</div>
            </li>
        `;
    });
    
    categoryHTML += '</ul></div>';
    
    // Create recent transactions list
    let transactionsHTML = '<div class="recent-transactions"><h3>Recent Transactions</h3><table><thead><tr><th>Date</th><th>Description</th><th>Category</th><th>Amount</th></tr></thead><tbody>';
    
    data.transactions.forEach(transaction => {
        transactionsHTML += `
            <tr class="${transaction.type}">
                <td>${transaction.date.toDate().toLocaleDateString()}</td>
                <td>${transaction.description}</td>
                <td>${transaction.category || 'N/A'}</td>
                <td class="amount ${transaction.type}">
                    ${transaction.type === 'income' ? '+' : '-'}$${parseFloat(transaction.amount).toFixed(2)}
                </td>
            </tr>
        `;
    });
    
    transactionsHTML += '</tbody></table></div>';
    
    // Add all sections to the page
    mainContent.innerHTML += summaryHTML + categoryHTML + transactionsHTML;
}

function setupLogout() {
    const btnLogout = document.querySelector(".logout");
    if (btnLogout) {
        btnLogout.addEventListener("click", async () => {
            try {
                await signOut(auth);
                localStorage.removeItem("username");
                window.location.href = "index.html";
            } catch (error) {
                console.error("Error logging out:", error);
                alert("Error logging out. Please try again.");
            }
        });
    }
}