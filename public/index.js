import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCMkl0GlNWkBJEczLe4a1_zksJKdRGWpxc",
  authDomain: "budget-buddy-b4db6.firebaseapp.com",
  databaseURL: "https://budget-buddy-b4db6-default-rtdb.firebaseio.com",
  projectId: "budget-buddy-b4db6",
  storageBucket: "budget-buddy-b4db6.firebasestorage.app",
  messagingSenderId: "297446930517",
  appId: "1:297446930517:web:7ea492bd26e95c4a15fcdc",
  measurementId: "G-181CZF51Q8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// Initialize Firestore
const db = getFirestore(app);

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
    }, { merge: true }); // Use merge to update existing data without overwriting

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




