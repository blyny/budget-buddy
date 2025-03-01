import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";

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

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


const username = localStorage.getItem("username");

const welcomeMessage = document.getElementById("welcomeMessage");


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
      localStorage.removeItem("username"); // Clear the stored username
      window.location.href = "index.html"; // Redirect to the login page
    } catch (error) {
      console.error("Error logging out:", error.message);
      alert("Error logging out. Please try again.");
    }
  });
}