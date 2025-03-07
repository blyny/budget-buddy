import { auth, db } from "./firebase-init.js";
import { signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
import { doc, setDoc, getDoc, Timestamp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";

const username = localStorage.getItem("username");
const welcomeMessage = document.getElementById("welcomeMessage");

// Work while the user is logged in
onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in
        const uid = user.uid; // This is the current user's UID
        console.log("User is logged in");

        if (username) {
            welcomeMessage.textContent = `Welcome to Budget Buddy, ${username}!`;
        } else {
            welcomeMessage.textContent = "Welcome to Budget Buddy!";
        }

        // ADD DATA TO OVERVIEW ------------------------------------------------------------------------------
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
                }
            });
        }
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
                }
            });
        }
        // ---------------------------------------------------------------------------------------------------

        // --------------------------------------------------------------------------------------------------
        // Logout -------------------------------------------------------------------------------------------
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
        //--------------------------------------------------------------------------------------------------
  } else {
    // No user is signed in
    console.log("No user is logged in.");
    welcomeMessage.textContent = "Welcome to Budget Buddy! There is no user logged in."; ;
  }
});