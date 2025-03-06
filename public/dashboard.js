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
    console.log("User UID:", uid);
    // Test adding data
    const addData = document.getElementById("test");
    if (addData) {
        test.addEventListener("click", async () => {
            alert("Data Going Through!");
            // users collection -> uid document
            // whatever is in "" refers to the existing collection/document in the path (if it can find it)
            const valueData = spendingPower.value;
            await setDoc(doc(db, "users", uid, "Categories", "Food"), {
                Amount: valueData,
            });
            await setDoc(doc(db, "users", uid, "Categories", "Entertainment"), {
                Amount: valueData,
            });
            await setDoc(doc(db, "users", uid, "Account", "Chase"), {
                Amount: valueData,
            });
            
            alert("Data Successfully In!");
        })
    }
    
    if (username) {
        welcomeMessage.textContent = `Welcome to Budget Buddy, ${username}!`;
    } else {
        welcomeMessage.textContent = "Welcome to Budget Buddy!";
    }

    // Logout
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
  } else {
    // No user is signed in
    console.log("No user is logged in.");
    welcomeMessage.textContent = "Welcome to Budget Buddy! There is no user logged in."; ;
  }
});