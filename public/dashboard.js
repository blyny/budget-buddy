import { auth, db } from "./firebase-init.js";
import { signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";
import { doc, setDoc, getDoc, addDoc, onSnapshot, collection, query, orderBy, limit } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";

const username = localStorage.getItem("username");
const welcomeMessage = document.getElementById("welcomeMessage");

// Work while the user is logged in
onAuthStateChanged(auth, async (user) => {
    if (user) {
        // User is signed in
        const uid = user.uid; // This is the current user's UID
        console.log("User is logged in" + uid);

        if (username) {
            welcomeMessage.textContent = `Welcome to Budget Buddy, ${username}!`;
        } else {
            welcomeMessage.textContent = "Welcome to Budget Buddy!";
        }

        getTransactionHistory(uid, 10);
        async function addTransaction(userId, amount, category, description, type, previousAmount = 0) {
            try {
                const difference = parseFloat(amount) - parseFloat(previousAmount);
                await addDoc(collection(db, "users", userId, "transactions"), {
                    amount: parseFloat(amount),
                    previousAmount: parseFloat(previousAmount),
                    difference: difference,
                    category: category,
                    description: description,
                    date: new Date(),
                    type: type
                });
                console.log("Transaction added successfully");
            } catch (error) {
                console.error("Error adding transaction: ", error);
            }
        }
        // Get transaction history
        function getTransactionHistory(userId, limitCount = 10) {
            const q = query(
                collection(db, "users", userId, "transactions"),
                orderBy("date", "desc"),
                limit(limitCount)
            );
            
            return onSnapshot(q, (querySnapshot) => {
                const transactions = [];
                querySnapshot.forEach((doc) => {
                    transactions.push({ id: doc.id, ...doc.data() });
                });
                displayTransactions(transactions);
            });
        }

        function displayTransactions(transactions) {
        const historyTable = document.getElementById('transactionHistory');
        if (!historyTable) return;
        
        historyTable.innerHTML = `
            <tr>
                <th>Date</th>
                <th>Description</th>
                <th>Category</th>
                <th>Change</th>
                <th>New Total</th>
            </tr>
        `;
        
        transactions.forEach(transaction => {
            const row = document.createElement('tr');
            const date = new Date(transaction.date.seconds * 1000).toLocaleDateString();
            const amountClass = transaction.difference >= 0 ? 
                            (transaction.type === 'Income' ? 'Income' : 'expense') : 
                            (transaction.type === 'Income' ? 'negative-income' : 'negative-expense');
            
            const changeSymbol = transaction.difference >= 0 ? '+' : '';
            const changeText = transaction.difference !== 0 ? 
                            `${changeSymbol}${transaction.difference.toFixed(2)}` : 
                            'No Change';
            
            row.innerHTML = `
                <td>${date}</td>
                <td>${transaction.description}</td>
                <td>${transaction.category}</td>
                <td class="${amountClass}">${changeText}</td>
                <td>$${transaction.amount.toFixed(2)}</td>
            `;
            historyTable.appendChild(row);
        });
    }

        // GET DATA FROM OVERVIEW ----------------------------------------------------------------------------
        const unsubcurrentAssets = onSnapshot(doc(db, "users", uid, "Overview", "currentAssets"), (doc) => {
            console.log("Current data: ", doc.data());
            const assets = parseFloat(doc.data().Amount);
            currentCurrentAssets.textContent = assets.toFixed(2);
            updateSpendingPower();
        });
        const unsubExpenses = onSnapshot(doc(db, "users", uid, "Overview", "Expenses"), (doc) => {
            console.log("Current data: ", doc.data());
            const expenses = parseFloat(doc.data().Amount);
            currentExpenses.textContent = expenses.toFixed(2);
            updateSpendingPower();
        });
        const unsubIncome = onSnapshot(doc(db, "users", uid, "Overview", "Income"), (doc) => {
            console.log("Current data: ", doc.data());
            const income = parseFloat(doc.data().Amount);
            currentIncome.textContent = income.toFixed(2);
        });

        const spendingPowerRef = doc(db, "users", uid, "Overview", "spendingPower");
        async function updateSpendingPower() {
            // Only proceed if we have both values
            if (currentCurrentAssets.textContent && currentExpenses.textContent) {
                const assets = parseFloat(currentCurrentAssets.textContent);
                const expenses = parseFloat(currentExpenses.textContent);
                const spendingPower = assets - expenses;
                
                // Update UI
                currentSpendingPower.textContent = spendingPower.toFixed(2);
                
                // Update Firestore
                try {
                    await setDoc(spendingPowerRef, {
                        Amount: spendingPower,                        
                    });
                    console.log("Spending power updated in Firestore");
                } catch (error) {
                    console.error("Error updating spending power:", error);
                }
            }
        }

        // -----------------------------------------------------------------------------------------------------
        // GET DATA FROM CATEGORIES ----------------------------------------------------------------------------
        const unsubgeneralPurchases = onSnapshot(doc(db, "users", uid, "Categories", "generalPurchases"), (doc) => {
            console.log("Current data: ", doc.data());
            const generalPurchases = parseFloat(doc.data().Amount);
            currentGeneralPurchases.textContent = generalPurchases.toFixed(2);
            updateExpenses()
        });
        const unsubTransportation = onSnapshot(doc(db, "users", uid, "Categories", "Transportation"), (doc) => {
            console.log("Current data: ", doc.data());
            const Transportation = parseFloat(doc.data().Amount);
            currentTransportation.textContent = Transportation.toFixed(2);
            updateExpenses()
        });
        const unsubfoodAndDrinks = onSnapshot(doc(db, "users", uid, "Categories", "foodAndDrinks"), (doc) => {
            console.log("Current data: ", doc.data());
            const foodAndDrinks = parseFloat(doc.data().Amount);
            currentFoodAndDrinks.textContent = foodAndDrinks.toFixed(2);
            updateExpenses()
        });
        const unsubEntertainment = onSnapshot(doc(db, "users", uid, "Categories", "Entertainment"), (doc) => {
            console.log("Current data: ", doc.data());
            const Entertainment = parseFloat(doc.data().Amount);
            currentEntertainment.textContent = Entertainment.toFixed(2);
            updateExpenses()
        });

        const ExpensesRef = doc(db, "users", uid, "Overview", "Expenses");
        async function updateExpenses() {
            // Only proceed if we have both values
            if (currentGeneralPurchases.textContent && currentTransportation.textContent && currentFoodAndDrinks.textContent && currentEntertainment.textContent) {
                const generalPurchases = parseFloat(currentGeneralPurchases.textContent);
                const Transportation = parseFloat(currentTransportation.textContent);
                const foodAndDrinks = parseFloat(currentFoodAndDrinks.textContent);
                const Entertainment = parseFloat(currentEntertainment.textContent);
                const Expenses = generalPurchases + Transportation + foodAndDrinks + Entertainment;
                
                // Update UI
                currentExpenses.textContent = Expenses.toFixed(2);
                
                // Update Firestore
                try {
                    await setDoc(ExpensesRef, {
                        Amount: Expenses,                        
                    });
                    console.log("Spending power updated in Firestore");
                } catch (error) {
                    console.error("Error updating spending power:", error);
                }
            }
        }

        // -----------------------------------------------------------------------------------------------------
        // GET DATA FROM ACCOUNTS ------------------------------------------------------------------------------
        const unsubCredit = onSnapshot(doc(db, "users", uid, "Accounts", "Credit"), (doc) => {
            console.log("Current data: ", doc.data());
            currentCredit.textContent = doc.data().Amount;
            const Credit = parseFloat(doc.data().Amount);
            currentCredit.textContent = Credit.toFixed(2);
        });
        const unsubSavings = onSnapshot(doc(db, "users", uid, "Accounts", "Savings"), (doc) => {
            console.log("Current data: ", doc.data());
            currentSavings.textContent = doc.data().Amount;
            const Savings = parseFloat(doc.data().Amount);
            currentSavings.textContent = Savings.toFixed(2);
        });

        // -----------------------------------------------------------------------------------------------------
        // ADD DATA TO OVERVIEW --------------------------------------------------------------------------------
        const addDatacurrentAssets = document.getElementById("currentAssets");
        if (addDatacurrentAssets) {
            currentAssets.addEventListener("keydown", async (event) => {
                if (event.key === "Enter") {
                    const valueData = currentAssets.value;
                    await setDoc(doc(db, "users", uid, "Overview", "currentAssets"), {
                        Amount: valueData,
                    });
                    alert("Data Successfully In!");
                    document.getElementById("currentAssets").value = "";
                }
            });
        }
        
        const addDataExpenses = document.getElementById("Expenses");
        if (addDataExpenses) {
            Expenses.addEventListener("keydown", async (event) => {
                if (event.key === "Enter") {
                    const valueData = Expenses.value;
                    await setDoc(doc(db, "users", uid, "Overview", "Expenses"), {
                        Amount: valueData,
                    });
                    alert("Data Successfully In!");
                    document.getElementById("Expenses").value = "";
                }
            });
        }

        const addDataIncome = document.getElementById("Income");
        if (addDataIncome) {
            Income.addEventListener("keydown", async (event) => {
                if (event.key === "Enter") {
                    const valueData = Income.value;
                    const previousAmount = parseFloat(currentIncome.textContent || 0);

                    await setDoc(doc(db, "users", uid, "Overview", "Income"), {
                        Amount: valueData,
                    });

                    await addTransaction(
                        uid, 
                        valueData, 
                        "Income", 
                        "Income Transaction", 
                        "Income",
                        previousAmount
                    );
                    alert("Data Successfully In!");
                    document.getElementById("Income").value = "";
                }
            });
        }
        // ---------------------------------------------------------------------------------------------------
        // ADD DATA TO CATEGORIES ----------------------------------------------------------------------------
        const addDatageneralPurchases = document.getElementById("generalPurchases");
        if (addDatageneralPurchases) {
            generalPurchases.addEventListener("keydown", async (event) => {
                if (event.key === "Enter") {
                    const valueData = generalPurchases.value;
                    const previousAmount = parseFloat(currentGeneralPurchases.textContent || 0);

                    await setDoc(doc(db, "users", uid, "Categories", "generalPurchases"), {
                        Amount: valueData,
                    });
                    
                    // Add transaction record
                    await addTransaction(
                        uid, 
                        valueData, 
                        "General Purchases", 
                        "General purchase transaction", 
                        "Expense",
                        previousAmount
                    );
                    
                    alert("Data Successfully In!");
                    document.getElementById("generalPurchases").value = "";
                }
            });
        }

        const addDataTransportation = document.getElementById("Transportation");
        if (addDataTransportation) {
            Transportation.addEventListener("keydown", async (event) => {
                if (event.key === "Enter") {
                    const valueData = Transportation.value;
                    const previousAmount = parseFloat(currentTransportation.textContent || 0);

                    await setDoc(doc(db, "users", uid, "Categories", "Transportation"), {
                        Amount: valueData,
                    });

                    // Add transaction record
                    await addTransaction(
                        uid, 
                        valueData, 
                        "Transportation", 
                        "Transportation Transaction", 
                        "Expense",
                        previousAmount
                    );
                    
                    alert("Data Successfully In!");
                    document.getElementById("Transportation").value = "";
                }
            });
        }

        const addDataFoodAndDrinks = document.getElementById("foodAndDrinks");
        if (addDataFoodAndDrinks) {
            foodAndDrinks.addEventListener("keydown", async (event) => {
                if (event.key === "Enter") {
                    const valueData = foodAndDrinks.value;
                    const previousAmount = parseFloat(currentFoodAndDrinks.textContent || 0);

                    await setDoc(doc(db, "users", uid, "Categories", "foodAndDrinks"), {
                        Amount: valueData,
                    });
                    // Add transaction record
                    await addTransaction(
                        uid, 
                        valueData, 
                        "Food and Drinks",
                        "Food and Drinks Transaction", 
                        "Expense",
                        previousAmount
                    );
                    alert("Data Successfully In!");
                    document.getElementById("foodAndDrinks").value = "";
                }
            });
        }

        const addDataEntertainment = document.getElementById("Entertainment");
        if (addDataEntertainment) {
            Entertainment.addEventListener("keydown", async (event) => {
                if (event.key === "Enter") {
                    const valueData = Entertainment.value;
                    const previousAmount = parseFloat(currentEntertainment.textContent || 0);
                    await setDoc(doc(db, "users", uid, "Categories", "Entertainment"), {
                        Amount: valueData,
                    });
                    // Add transaction record
                    await addTransaction(
                        uid, 
                        valueData, 
                        "Entertainment",
                        "Entertainment Transaction", 
                        "Expense",
                        previousAmount
                    );
                    alert("Data Successfully In!");
                    document.getElementById("Entertainment").value = "";
                }
            });
        }
        // ---------------------------------------------------------------------------------------------------
        // ADD DATA TO ACCOUNTS ------------------------------------------------------------------------------
        const addDataChase = document.getElementById("Chase");
        if (addDataChase) {
            Chase.addEventListener("keydown", async (event) => {
                if (event.key === "Enter") {
                    const valueData = Chase.value;
                    await setDoc(doc(db, "users", uid, "Accounts", "Credit"), {
                        Amount: valueData,
                    });
                    alert("Data Successfully In!");
                    document.getElementById("Chase").value = "";
                }
            });
        }

        const addDataSavings = document.getElementById("Savings");
        if (addDataSavings) {
            Savings.addEventListener("keydown", async (event) => {
                if (event.key === "Enter") {
                    const valueData = Savings.value;
                    await setDoc(doc(db, "users", uid, "Accounts", "Savings"), {
                        Amount: valueData,
                    });
                    alert("Data Successfully In!");
                    document.getElementById("Savings").value = "";
                }
            });
        }
        // ---------------------------------------------------------------------------------------------------
        // Redirect to other pages ---------------------------------------------------------------------------
        const btnAnalysis = document.getElementById("btnAnalysis");
        if (btnAnalysis) {
            btnAnalysis.addEventListener("click", () => {
                window.location.href = "dashboard3.html";
            });
        }
        const btnBudgetPlan = document.getElementById("btnBudgetPlan");
        if (btnBudgetPlan) {
            btnBudgetPlan.addEventListener("click", () => {
                window.location.href = "dashboard2.html";
            });
        }
        
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