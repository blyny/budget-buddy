// Import necessary modules from the Firebase SDK for JavaScript
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";
// ... other imports as needed

// Your Firebase configuration (from the console)
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
const auth = getAuth(app);
const db = getFirestore(app);

const signupForm = document.getElementById("signup-form");
const messageDiv = document.getElementById("message");

signupForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    // Send data to the Firebase Cloud Function
    const response = await fetch("https://us-central1-budget-buddy-b4db6.cloudfunctions.net/runPythonScript", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
      }),
    });

    const result = await response.json();

    if (response.ok) {
      // Display success message
      messageDiv.textContent = result.message;
      messageDiv.classList.remove("error");
      messageDiv.classList.add("message");

      // Clear the form
      signupForm.reset();
    } else {
      // Display error message
      messageDiv.textContent = result.error;
      messageDiv.classList.remove("message");
      messageDiv.classList.add("error");
    }
  } catch (error) {
    console.error("Error:", error);
    messageDiv.textContent = "An error occurred. Please try again.";
    messageDiv.classList.remove("message");
    messageDiv.classList.add("error");
  }
});

