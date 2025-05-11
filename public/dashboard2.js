import { auth, db } from "./firebase-init.js";
import { signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";
import { doc, setDoc, getDoc, onSnapshot } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";

const username = localStorage.getItem("username");

// Work while the user is logged in
onAuthStateChanged(auth, async (user) => {
    if (user) {
        // User is signed in
        const uid = user.uid; // This is the current user's UID
        console.log("User is logged in" + uid);

        function getBudgetPlan() {
            const periodSelect = document.querySelector('input[name="period"]:checked').value;
            const percentageSelect = document.getElementById('percentage');
            const citySelect = document.getElementById('city');
            
            const selectedPercentage = percentageSelect.value;
            const selectedCity = citySelect.value;
            const income = parseFloat(currentIncome.textContent || 0);
            
            // Calculate weekly and monthly amounts
            const weeklyAmount = income;
            const monthlyAmount = periodSelect === 'Weekly' ? income * 4 : income * 2;
            
            // Generate the budget plan content based on city
            let budgetContent = `
                <div class="budget-header">
                    <h2>Your Personalized Budget Plan</h2>
                    <p>For ${selectedCity} - ${periodSelect} Income: $${income.toFixed(2)}</p>
                </div>
            `;

            // Add city-specific content
            switch(selectedCity) {
                case "New York City":
                    budgetContent += generateNYCPlan(selectedPercentage, weeklyAmount, monthlyAmount, periodSelect);
                    break;
                case "Los Angeles":
                    budgetContent += generateLAPlan(selectedPercentage, weeklyAmount, monthlyAmount, periodSelect);
                    break;
                case "Chicago":
                    budgetContent += generateChicagoPlan(selectedPercentage, weeklyAmount, monthlyAmount, periodSelect);
                    break;
                case "Houston":
                    budgetContent += generateHoustonPlan(selectedPercentage, weeklyAmount, monthlyAmount, periodSelect);
                    break;
                default:
                    budgetContent += generateDefaultPlan(selectedPercentage, weeklyAmount, monthlyAmount, periodSelect);
            }

            // Open modal
            const modal = document.getElementById('budgetModal');
            const modalContent = document.getElementById('budgetPlanContent');
            modalContent.innerHTML = budgetContent;
            modal.style.display = "block";

            // Close handlers
            document.querySelector('.close-modal').onclick = () => modal.style.display = "none";
            window.onclick = (event) => { if (event.target === modal) modal.style.display = "none"; };
        }

        // New York City Plan
        function generateNYCPlan(percentage, weekly, period) {
            const { needsPercent, wantsPercent } = getBudgetPercentages(percentage);
            const savings = weekly * percentage/100;
            const weeklyNeeds = weekly * needsPercent/100;
            const weeklyWants = weekly * wantsPercent/100;
            
            return `
                <div class="budget-section">
                    <h3>Savings (${percentage}%)</h3>
                    <ul class="budget-list">
                        ${period} Savings: $${savings.toFixed(2)}
                        <br>
                        Monthly Savings: $${(savings * (period === 'Weekly' ? 4 : 2)).toFixed(2)}
                    </ul>
                </div>
                
                <div class="budget-section">
                    <h3>Essential Expenses (${needsPercent}%)</h3>
                    <ul class="budget-list">
                        Housing (30%): $${(weekly * 0.30).toFixed(2)} <br>
                        Utilities/Internet (5%): $${(weekly * 0.05).toFixed(2)} <br>
                        Groceries (7%): $${(weekly * 0.07).toFixed(2)} <br>
                        Transportation (5%): $${(weekly * 0.05).toFixed(2)} <br>
                        <li class="budget-total">Total ${period} Needs: $${weeklyNeeds.toFixed(2)}
                        <li class="budget-total">Total Monthly Needs: $${(weeklyNeeds * (period === 'Weekly' ? 4 : 2)).toFixed(2)}
                    </ul>
                </div>
                
                <div class="budget-section">
                    <h3>Discretionary Spending (${wantsPercent}%)</h3>
                    <ul class="budget-list">
                        Entertainment: $${(weeklyWants * 0.5).toFixed(2)}<br>
                        Dining Out: $${(weeklyWants * 0.3).toFixed(2)}<br>
                        Other: $${(weeklyWants * 0.2).toFixed(2)}<br>
                        <li class="budget-total">Total ${period} Wants: $${weeklyWants.toFixed(2)}</li>
                        <li class="budget-total">Total Monthly Wants: $${(weeklyWants * (period === 'Weekly' ? 4 : 2)).toFixed(2)}</li>
                    </ul>
                </div>
                
                <div class="budget-tip">
                    <strong>New York City Tips:</strong> Consider an unlimited MetroCard if you commute daily. 
                    Shop at Trader Joe's or Costco for affordable groceries. Look for housing in outer boroughs 
                    for better prices.
                </div>
            `;
        }

        // Los Angeles Plan
        function generateLAPlan(percentage, weekly, period) {
            const { needsPercent, wantsPercent } = getBudgetPercentages(percentage);
            const savings = weekly * percentage/100;
            const weeklyNeeds = weekly * needsPercent/100;
            const weeklyWants = weekly * wantsPercent/100;
            
            return `
                <div class="budget-section">
                    <h3>Savings (${percentage}%)</h3>
                    <ul class="budget-list">
                        ${period} Savings: $${savings.toFixed(2)}<br>
                        Monthly Savings: $${(savings * (period === 'Weekly' ? 4 : 2)).toFixed(2)}
                    </ul>
                </div>
                
                <div class="budget-section">
                    <h3>Essential Expenses (${needsPercent}%)</h3>
                    <ul class="budget-list">
                        Housing (28%): $${(weekly * 0.28).toFixed(2)}<br>
                        Utilities/Internet (6%): $${(weekly * 0.06).toFixed(2)}<br>
                        Groceries (8%): $${(weekly * 0.08).toFixed(2)}<br>
                        Transportation (8%): $${(weekly * 0.08).toFixed(2)}<br>
                        <li class="budget-total">Total ${period} Needs: $${weeklyNeeds.toFixed(2)}</li>
                        <li class="budget-total">Total Monthly Needs: $${(weeklyNeeds * (period === 'Weekly' ? 4 : 2)).toFixed(2)}</li>
                    </ul>
                </div>
                
                <div class="budget-section">
                    <h3>Discretionary Spending (${wantsPercent}%)</h3>
                    <ul class="budget-list">
                        Entertainment: $${(weeklyWants * 0.5).toFixed(2)}<br>
                        Dining Out: $${(weeklyWants * 0.3).toFixed(2)}<br>
                        Other: $${(weeklyWants * 0.2).toFixed(2)}<br>
                        <li class="budget-total">Total ${period} Wants: $${weeklyWants.toFixed(2)}</li>
                        <li class="budget-total">Total Monthly Wants: $${(weeklyWants * (period === 'Weekly' ? 4 : 2)).toFixed(2)}</li>
                    </ul>
                </div>
                
                <div class="budget-tip">
                    <strong>Los Angeles Tips:</strong> Carpooling can significantly reduce transportation costs. 
                    Shop at Vallarta or local farmers markets for affordable groceries. Consider living near 
                    Metro lines to reduce driving.
                </div>
            `;
        }

        // Chicago Plan
        function generateChicagoPlan(percentage, weekly, period) {
            const { needsPercent, wantsPercent } = getBudgetPercentages(percentage);
            const savings = weekly * percentage/100;
            const weeklyNeeds = weekly * needsPercent/100;
            const weeklyWants = weekly * wantsPercent/100;
            
            return `
                <div class="budget-section">
                    <h3>Savings (${percentage}%)</h3>
                    <ul class="budget-list">
                        ${period} Savings: $${savings.toFixed(2)}<br>
                        Monthly Savings: $${(savings * (period === 'Weekly' ? 4 : 2)).toFixed(2)}</li>
                    </ul>
                </div>
                
                <div class="budget-section">
                    <h3>Essential Expenses (${needsPercent}%)</h3>
                    <ul class="budget-list">
                        Housing (25%): $${(weekly * 0.25).toFixed(2)}<br>
                        Utilities/Internet (6%): $${(weekly * 0.06).toFixed(2)}<br>
                        Groceries (7%): $${(weekly * 0.07).toFixed(2)}<br>
                        Transportation (7%): $${(weekly * 0.07).toFixed(2)}<br>
                        <li class="budget-total">Total ${period} Needs: $${weeklyNeeds.toFixed(2)}</li>
                        <li class="budget-total">Total Monthly Needs: $${(weeklyNeeds * (period === 'Weekly' ? 4 : 2)).toFixed(2)}</li>
                    </ul>
                </div>
                
                <div class="budget-section">
                    <h3>Discretionary Spending (${wantsPercent}%)</h3>
                    <ul class="budget-list">
                        Entertainment: $${(weeklyWants * 0.5).toFixed(2)}<br>
                        Dining Out: $${(weeklyWants * 0.3).toFixed(2)}<br>
                        Other: $${(weeklyWants * 0.2).toFixed(2)}<br>
                        <li class="budget-total">Total ${period} Wants: $${weeklyWants.toFixed(2)}</li>
                        <li class="budget-total">Total Monthly Wants: $${(weeklyWants * (period === 'Weekly' ? 4 : 2)).toFixed(2)}</li>
                    </ul>
                </div>
                
                <div class="budget-tip">
                    <strong>Chicago Tips:</strong> Take advantage of the CTA system to save on transportation. 
                    Shop at Aldi or Jewel-Osco for affordable groceries. Consider neighborhoods near L train 
                    lines for good transit access.
                </div>
            `;
        }

        // Houston Plan
        function generateHoustonPlan(percentage, weekly, period) {
            const { needsPercent, wantsPercent } = getBudgetPercentages(percentage);
            const savings = weekly * percentage/100;
            const weeklyNeeds = weekly * needsPercent/100;
            const weeklyWants = weekly * wantsPercent/100;
            
            return `
                <div class="budget-section">
                    <h3>Savings (${percentage}%)</h3>
                    <ul class="budget-list">
                        ${period} Savings: $${savings.toFixed(2)}<br>
                        Monthly Savings: $${(savings * (period === 'Weekly' ? 4 : 2)).toFixed(2)}</li>
                    </ul>
                </div>
                
                <div class="budget-section">
                    <h3>Essential Expenses (${needsPercent}%)</h3>
                    <ul class="budget-list">
                        Housing (22%): $${(weekly * 0.22).toFixed(2)}<br>
                        Utilities/Internet (7%): $${(weekly * 0.07).toFixed(2)}<br>
                        Groceries (8%): $${(weekly * 0.08).toFixed(2)}<br>
                        Transportation (13%): $${(weekly * 0.13).toFixed(2)}<br>
                        <li class="budget-total">Total ${period} Needs: $${weeklyNeeds.toFixed(2)}</li>
                        <li class="budget-total">Total Monthly Needs: $${(weeklyNeeds * (period === 'Weekly' ? 4 : 2)).toFixed(2)}</li>
                    </ul>
                </div>
                
                <div class="budget-section">
                    <h3>Discretionary Spending (${wantsPercent}%)</h3>
                    <ul class="budget-list">
                        Entertainment: $${(weeklyWants * 0.5).toFixed(2)}<br>
                        Dining Out: $${(weeklyWants * 0.3).toFixed(2)}<br>
                        Other: $${(weeklyWants * 0.2).toFixed(2)}<br>
                        <li class="budget-total">Total ${period} Wants: $${weeklyWants.toFixed(2)}</li>
                        <li class="budget-total">Total Monthly Wants: $${(weeklyWants * (period === 'Weekly' ? 4 : 2)).toFixed(2)}</li>
                    </ul>
                </div>
                
                <div class="budget-tip">
                    <strong>Houston Tips:</strong> Take advantage of no state income tax to boost savings. 
                    Shop at H-E-B or Costco for best grocery prices. Consider living outside downtown for 
                    more affordable housing options.
                </div>
            `;
        }

        // Helper function to get budget percentages
        function getBudgetPercentages(percentage) {
            switch(percentage) {
                case "30":
                    return { needsPercent: 50, wantsPercent: 20 };
                case "40":
                    return { needsPercent: 50, wantsPercent: 10 };
                case "50":
                    return { needsPercent: 45, wantsPercent: 5 };
                case "60":
                    return { needsPercent: 35, wantsPercent: 5 };
                default:
                    return { needsPercent: 50, wantsPercent: 20 };
            }
        }

        if (document.getElementById("getBudgetPlan")) {
            document.getElementById("getBudgetPlan").addEventListener("click", getBudgetPlan);
        }

        // Display Income and Spending Power ------------------------------------------------------------------
        
        const unsubIncome = onSnapshot(doc(db, "users", uid, "Overview", "Income"), (doc) => {
            console.log("Current data: ", doc.data());
            const income = parseFloat(doc.data().Amount);
            currentIncome.textContent = income.toFixed(2);
        });

        const unsubspendingPower = onSnapshot(doc(db, "users", uid, "Overview", "spendingPower"), (doc) => {
            console.log("Current data: ", doc.data());
            const spendingPower = parseFloat(doc.data().Amount);
            currentSpendingPower.textContent = spendingPower.toFixed(2);
        });

        // Logout --------------------------------------------------------------------------------------------
        const btnLogout = document.getElementById("btnLogout");
        if (btnLogout) {
            btnLogout.addEventListener("click", async () => {
                try {
                    await signOut(auth);
                    localStorage.removeItem("username"); 
                    window.location.href = "index.html"; 
                    console.log("Document written with ID: ", docRef.id);    
                } catch (error) {
                    console.error("Error logging out:", error.message);
                    alert("Error logging out. Please try again.");
                }
            });     
        }
    //----------------------------------------------------------------------------------------------------

  } else {
    // No user is signed in
    console.log("No user is logged in.");
    welcomeMessage.textContent = "Welcome to Budget Buddy! There is no user logged in."; 
  }
});