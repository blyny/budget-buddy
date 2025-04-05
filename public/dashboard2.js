import { auth, db } from "./firebase-init.js";
import { signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";
import { doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";

const username = localStorage.getItem("username");

// Work while the user is logged in
onAuthStateChanged(auth, async (user) => {
    if (user) {
        // User is signed in
        const uid = user.uid; // This is the current user's UID
        console.log("User is logged in" + uid);

    const IncomeRef = doc(db, "users", uid, "Overview", "Income");
    const IncomeSnap = await getDoc(IncomeRef);
    if (IncomeSnap.exists()) {
        console.log("Document data:", IncomeSnap.data());
        currentIncome.textContent = IncomeSnap.data().Amount;
    } else {
        console.log("No such document!");
    }
    
    const spendingPowerRef = doc(db, "users", uid, "Overview", "spendingPower");
    const spendingPowerSnap = await getDoc(spendingPowerRef);
    if (spendingPowerSnap.exists()) {
        console.log("Document data:", spendingPowerSnap.data());
        currentSpendingPower.textContent = spendingPowerSnap.data().Amount;
    } else {
        console.log("No such document!");
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