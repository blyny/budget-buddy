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

// FINANCIAL OVERVIEW CARDS
const paymentCards = document.querySelectorAll(".payment--card");

paymentCards.forEach((card) => {
    const amountValue = card.querySelector(".amount--value");
    const amountInput = card.querySelector(".amount--input");

    // Show the input field when the card is clicked
    card.addEventListener("click", () => {
        // Hide the value and show the input field
        amountValue.style.display = "none";
        amountInput.classList.add("visible");

        // Populate the input field with the current amount
        const currentAmount = amountValue.textContent.replace("$", "");
        amountInput.value = currentAmount;

        // Focus on the input field
        amountInput.focus();
    });

    // Update the value when the user finishes editing
    amountInput.addEventListener("blur", () => {
        const newAmount = parseFloat(amountInput.value);

        if (!isNaN(newAmount)) {
            // Update the card's value
            amountValue.textContent = `$${newAmount.toFixed(2)}`;
        } else {
            alert("Please enter a valid number.");
        }

        // Hide the input field and show the value
        amountInput.classList.remove("visible");
        amountValue.style.display = "inline";
    });

    // Update the value when the user presses "Enter"
    amountInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            const newAmount = parseFloat(amountInput.value);

            if (!isNaN(newAmount)) {
                // Update the card's value
                amountValue.textContent = `$${newAmount.toFixed(2)}`;
            } else {
                alert("Please enter a valid number.");
            }

            // Hide the input field and show the value
            amountInput.classList.remove("visible");
            amountValue.style.display = "inline";
        }
    });
});

// CATEGORY CARDS
const categoryCards = document.querySelectorAll(".category--card");

categoryCards.forEach((card) => {
    const amountValue = card.querySelector(".amount--value");
    const amountInput = card.querySelector(".amount--input");

    // Show the input field when the card is clicked
    card.addEventListener("click", () => {
        // Hide the value and show the input field
        amountValue.style.display = "none";
        amountInput.classList.add("visible");

        // Populate the input field with the current amount
        const currentAmount = amountValue.textContent.replace("$", "");
        amountInput.value = currentAmount;

        // Focus on the input field
        amountInput.focus();
    });

    // Update the value when the user finishes editing
    amountInput.addEventListener("blur", () => {
        const newAmount = parseFloat(amountInput.value);

        if (!isNaN(newAmount)) {
            // Update the card's value
            amountValue.textContent = `$${newAmount.toFixed(2)}`;
        } else {
            alert("Please enter a valid number.");
        }

        // Hide the input field and show the value
        amountInput.classList.remove("visible");
        amountValue.style.display = "inline";
    });

    // Update the value when the user presses "Enter"
    amountInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            const newAmount = parseFloat(amountInput.value);

            if (!isNaN(newAmount)) {
                // Update the card's value
                amountValue.textContent = `$${newAmount.toFixed(2)}`;
            } else {
                alert("Please enter a valid number.");
            }

            // Hide the input field and show the value
            amountInput.classList.remove("visible");
            amountValue.style.display = "inline";
        }
    });
});


// ACCOUNT CARDS
const accountsCards = document.querySelectorAll(".accounts--card");

accountsCards.forEach((card) => {
    const amountValue = card.querySelector(".amount--value");
    const amountInput = card.querySelector(".amount--input");

    // Show the input field when the card is clicked
    card.addEventListener("click", () => {
        // Hide the value and show the input field
        amountValue.style.display = "none";
        amountInput.classList.add("visible");

        // Populate the input field with the current amount
        const currentAmount = amountValue.textContent.replace("$", "");
        amountInput.value = currentAmount;

        // Focus on the input field
        amountInput.focus();
    });

    // Update the value when the user finishes editing
    amountInput.addEventListener("blur", () => {
        const newAmount = parseFloat(amountInput.value);

        if (!isNaN(newAmount)) {
            // Update the card's value
            amountValue.textContent = `$${newAmount.toFixed(2)}`;
        } else {
            alert("Please enter a valid number.");
        }

        // Hide the input field and show the value
        amountInput.classList.remove("visible");
        amountValue.style.display = "inline";
    });

    // Update the value when the user presses "Enter"
    amountInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            const newAmount = parseFloat(amountInput.value);

            if (!isNaN(newAmount)) {
                // Update the card's value
                amountValue.textContent = `$${newAmount.toFixed(2)}`;
            } else {
                alert("Please enter a valid number.");
            }

            // Hide the input field and show the value
            amountInput.classList.remove("visible");
            amountValue.style.display = "inline";
        }
    });
});