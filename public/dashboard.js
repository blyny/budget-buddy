import { auth } from "./firebase-init.js";
import { signOut } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";

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

// Rest of your dashboard.js code...