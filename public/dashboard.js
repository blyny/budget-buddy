import { auth, db } from "./firebase-init.js";
import { signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";
import { doc, setDoc, getDoc, onSnapshot } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";

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
        const unsubChase = onSnapshot(doc(db, "users", uid, "Accounts", "Credit"), (doc) => {
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
                    alert("Data Going Through!");
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
                    alert("Data Going Through!");
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
                    alert("Data Going Through!");
                    const valueData = Income.value;
                    await setDoc(doc(db, "users", uid, "Overview", "Income"), {
                        Amount: valueData,
                    });
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
                    alert("Data Going Through!");
                    const valueData = generalPurchases.value;
                    await setDoc(doc(db, "users", uid, "Categories", "generalPurchases"), {
                        Amount: valueData,
                    });
                    alert("Data Successfully In!");
                    document.getElementById("generalPurchases").value = "";
                }
            });
        }

        const addDataTransportation = document.getElementById("Transportation");
        if (addDataTransportation) {
            Transportation.addEventListener("keydown", async (event) => {
                if (event.key === "Enter") {
                    alert("Data Going Through!");
                    const valueData = Transportation.value;
                    await setDoc(doc(db, "users", uid, "Categories", "Transportation"), {
                        Amount: valueData,
                    });
                    alert("Data Successfully In!");
                    document.getElementById("Transportation").value = "";
                }
            });
        }

        const addDataFoodAndDrinks = document.getElementById("foodAndDrinks");
        if (addDataFoodAndDrinks) {
            foodAndDrinks.addEventListener("keydown", async (event) => {
                if (event.key === "Enter") {
                    alert("Data Going Through!");
                    const valueData = foodAndDrinks.value;
                    await setDoc(doc(db, "users", uid, "Categories", "foodAndDrinks"), {
                        Amount: valueData,
                    });
                    alert("Data Successfully In!");
                    document.getElementById("foodAndDrinks").value = "";
                }
            });
        }

        const addDataEntertainment = document.getElementById("Entertainment");
        if (addDataEntertainment) {
            Entertainment.addEventListener("keydown", async (event) => {
                if (event.key === "Enter") {
                    alert("Data Going Through!");
                    const valueData = Entertainment.value;
                    await setDoc(doc(db, "users", uid, "Categories", "Entertainment"), {
                        Amount: valueData,
                    });
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
                    alert("Data Going Through!");
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
                    alert("Data Going Through!");
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
                window.location.href = "dashboard2.html";
            });
        }
        const btnBudgetPlan = document.getElementById("btnBudgetPlan");
        if (btnBudgetPlan) {
            btnBudgetPlan.addEventListener("click", () => {
                window.location.href = "dashboard3.html";
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