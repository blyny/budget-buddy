import { auth, db } from "./firebase-init.js";
import { signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
import { doc, setDoc, getDoc, Timestamp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";

const username = localStorage.getItem("username");
const welcomeMessage = document.getElementById("welcomeMessage");

// Work while the user is logged in
onAuthStateChanged(auth, async (user) => {
    if (user) {
        // User is signed in
        const uid = user.uid; // This is the current user's UID
        console.log("User is logged in");

        if (username) {
            welcomeMessage.textContent = `Welcome to Budget Buddy, ${username}!`;
        } else {
            welcomeMessage.textContent = "Welcome to Budget Buddy!";
        }

        // GET DATA FROM OVERVIEW ----------------------------------------------------------------------------
        const spendingPowerRef = doc(db, "users", uid, "Overview", "spendingPower");
        const spendingPowerSnap = await getDoc(spendingPowerRef);
        if (spendingPowerSnap.exists()) {
            console.log("Document data:", spendingPowerSnap.data());
            currentSpendingPower.textContent = spendingPowerSnap.data().Amount;
        } else {
            console.log("No such document!");
        }

        const currentAssetsRef = doc(db, "users", uid, "Overview", "currentAssets");
        const currentAssetsSnap = await getDoc(currentAssetsRef);
        if (currentAssetsSnap.exists()) {
            console.log("Document data:", currentAssetsSnap.data());
            currentCurrentAssets.textContent = currentAssetsSnap.data().Amount;
        } else {
            console.log("No such document!");
        }

        const ExpensesRef = doc(db, "users", uid, "Overview", "Expenses");
        const ExpensesSnap = await getDoc(ExpensesRef);
        if (ExpensesSnap.exists()) {
            console.log("Document data:", ExpensesSnap.data());
            currentExpenses.textContent = ExpensesSnap.data().Amount;
        } else {
            console.log("No such document!");
        }

        const IncomeRef = doc(db, "users", uid, "Overview", "Income");
        const IncomeSnap = await getDoc(IncomeRef);
        if (IncomeSnap.exists()) {
            console.log("Document data:", IncomeSnap.data());
            currentIncome.textContent = IncomeSnap.data().Amount;
        } else {
            console.log("No such document!");
        }

        // -----------------------------------------------------------------------------------------------------
        // GET DATA FROM CATEGORIES ----------------------------------------------------------------------------
        const GeneralPurchasesRef = doc(db, "users", uid, "Categories", "generalPurchases");
        const GeneralPurchasesSnap = await getDoc(GeneralPurchasesRef);
        if (GeneralPurchasesSnap.exists()) {
            console.log("Document data:", GeneralPurchasesSnap.data());
            currentGeneralPurchases.textContent = GeneralPurchasesSnap.data().Amount;
        } else {
            console.log("No such document!");
        }

        const TransportationRef = doc(db, "users", uid, "Categories", "Transportation");
        const TransportationSnap = await getDoc(TransportationRef);
        if (TransportationSnap.exists()) {
            console.log("Document data:", TransportationSnap.data());
            currentTransportation.textContent = TransportationSnap.data().Amount;
        } else {
            console.log("No such document!");
        }

        const FoodAndDrinksRef = doc(db, "users", uid, "Categories", "foodAndDrinks");
        const FoodAndDrinksSnap = await getDoc(FoodAndDrinksRef);
        if (FoodAndDrinksSnap.exists()) {
            console.log("Document data:", FoodAndDrinksSnap.data());
            currentFoodAndDrinks.textContent = FoodAndDrinksSnap.data().Amount;
        } else {
            console.log("No such document!");
        }

        const EntertainmentRef = doc(db, "users", uid, "Categories", "Entertainment");
        const EntertainmentSnap = await getDoc(EntertainmentRef);
        if (EntertainmentSnap.exists()) {
            console.log("Document data:", EntertainmentSnap.data());
            currentEntertainment.textContent = EntertainmentSnap.data().Amount;
        } else {
            console.log("No such document!");
        }

        // -----------------------------------------------------------------------------------------------------
        // GET DATA FROM ACCOUNTS ------------------------------------------------------------------------------
        const currentCreditRef = doc(db, "users", uid, "Accounts", "Chase");
        const currentCreditSnap = await getDoc(currentCreditRef);
        if (currentCreditSnap.exists()) {
            console.log("Document data:", currentCreditSnap.data());
            currentCredit.textContent = currentCreditSnap.data().Amount;
        } else {
            console.log("No such document!");
        }

        const currentSavingsRef = doc(db, "users", uid, "Accounts", "Savings");
        const currentSavingsSnap = await getDoc(currentSavingsRef);
        if (currentSavingsSnap.exists()) {
            console.log("Document data:", currentSavingsSnap.data());
            currentSavings.textContent = currentSavingsSnap.data().Amount;
        } else {
            console.log("No such document!");
        }

        // -----------------------------------------------------------------------------------------------------
        // ADD DATA TO OVERVIEW --------------------------------------------------------------------------------
        const addDataspendingPower = document.getElementById("spendingPower");
        if (addDataspendingPower) {
            spendingPower.addEventListener("keydown", async (event) => {
                if (event.key === "Enter") {
                    alert("Data Going Through!");
                    const valueData = spendingPower.value;
                    await setDoc(doc(db, "users", uid, "Overview", "spendingPower"), {
                        Amount: valueData,
                    });
                    alert("Data Successfully In!");
                    document.getElementById("spendingPower").value = "";
                }
            });
        }

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
                    await setDoc(doc(db, "users", uid, "Accounts", "Chase"), {
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