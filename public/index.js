import { auth, db } from "./firebase-init.js";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";
import { doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";

// LOG IN
const loginEmailPassword = async () => {
  const loginEmail = document.getElementById("email").value;
  const loginPassword = document.getElementById("password").value;

  try {
    const userCredential = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
    const user = userCredential.user;

    // Update user data in Firestore
    await setDoc(doc(db, "users", user.uid), {
      lastLogin: new Date(),
    }, { merge: true });

    // Fetch user data
    const userDoc = await getDoc(doc(db, "users", user.uid));
    if (userDoc.exists()) {
      const userData = userDoc.data();
      const username = userData.username;
      localStorage.setItem("username", username);
      window.location.href = "dashboard.html";
    } else {
      console.error("User data not found in Firestore");
      document.getElementById("message").textContent = "User data not found. Please contact support.";
    }
  } catch (error) {
    console.error("Error logging in:", error.message);
    document.getElementById("message").textContent = error.message;
  }
};

// CREATE ACCOUNT
const createEmailPassword = async () => {
  const loginEmail = document.getElementById("email").value;
  const username = document.getElementById("username").value;
  const loginPassword = document.getElementById("password").value;

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, loginEmail, loginPassword);
    const user = userCredential.user;

    // Add user data to Firestore
    await setDoc(doc(db, "users", user.uid), {
      username: username,
      email: loginEmail,
      createdAt: new Date(),
    });

    console.log("User logged in:", user);
    document.getElementById("message").textContent = "Signed Up successfully!";


  } catch (error) {
    console.error("Error Signing Up:", error.message);
    document.getElementById("message").textContent = error.message;
  }
};

// EVENT LISTENERS
if (document.getElementById("btnLogin")) {
  document.getElementById("btnLogin").addEventListener("click", loginEmailPassword);
}

if (document.getElementById("btnSignUp")) {
  document.getElementById("btnSignUp").addEventListener("click", createEmailPassword);
}