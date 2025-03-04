import { auth } from "./firebase-init.js";
import { signOut } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";


const db = getFirestore();

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
      localStorage.removeItem("username"); 
      window.location.href = "index.html"; 
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

    // Show input when the card is clicked
    card.addEventListener("click", () => {

        amountValue.style.display = "none";
        amountInput.classList.add("visible");


        const currentAmount = amountValue.textContent.replace("$", "");
        amountInput.value = currentAmount;


        amountInput.focus();
    });

    amountInput.addEventListener("blur", () => {
        const newAmount = parseFloat(amountInput.value);

        if (!isNaN(newAmount)) {
            // Update the card's value
            amountValue.textContent = `$${newAmount.toFixed(2)}`;
        } else {
            alert("Please enter a valid number.");
        }


        amountInput.classList.remove("visible");
        amountValue.style.display = "inline";
    });

    // Update the value when the user presses "Enter"
    amountInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            const newAmount = parseFloat(amountInput.value);

            if (!isNaN(newAmount)) {
                amountValue.textContent = `$${newAmount.toFixed(2)}`;
            } else {
                alert("Please enter a valid number.");
            }
            amountInput.classList.remove("visible");
            amountValue.style.display = "inline";
        }
    });
});

// Function to update the amount in Firestore
async function updateCategoryAmount(userId, categoryId, newAmount) {
  try {
    const categoryRef = doc(db, "users", userId, "categories", categoryId);
    await setDoc(categoryRef, { amount: newAmount }, { merge: true });
    console.log("Category amount updated successfully!");
  } catch (error) {
    console.error("Error updating category amount:", error);
  }
}

// Function to fetch the category amount from Firestore
async function fetchCategoryAmount(userId, categoryId) {
  try {
    const categoryRef = doc(db, "users", userId, "categories", categoryId);
    const categoryDoc = await getDoc(categoryRef);

    if (categoryDoc.exists()) {
      return categoryDoc.data().amount;
    } else {
      console.log("Category document does not exist.");
      return 0;
    }
  } catch (error) {
    console.error("Error fetching category amount:", error);
    return 0;
  }
}

// Function to initialize category cards with data from Firestore
async function initializeCategoryCards(userId) {
  const categoryCards = document.querySelectorAll(".category--card");

  categoryCards.forEach(async (card) => {
    const amountValue = card.querySelector(".amount--value");
    const categoryId = card.dataset.categoryId;

    const currentAmount = await fetchCategoryAmount(userId, categoryId);
    amountValue.textContent = `$${currentAmount.toFixed(2)}`;
  });
}

// Initialize the category cards when the page loads
window.addEventListener("load", () => {
  const userId = username; 
  initializeCategoryCards(userId);
});

// CATEGORY CARDS
const categoryCards = document.querySelectorAll(".category--card");

categoryCards.forEach((card) => {
  const amountValue = card.querySelector(".amount--value");
  const amountInput = card.querySelector(".amount--input");
  const categoryId = card.dataset.categoryId;
  const userId = username;

  card.addEventListener("click", () => {
    amountValue.style.display = "none";
    amountInput.classList.add("visible");

    const currentAmount = amountValue.textContent.replace("$", "");
    amountInput.value = currentAmount;

    amountInput.focus();
  });

  amountInput.addEventListener("blur", async () => {
    const newAmount = parseFloat(amountInput.value);

    if (!isNaN(newAmount)) {
      amountValue.textContent = `$${newAmount.toFixed(2)}`;
      await updateCategoryAmount(userId, categoryId, newAmount);
    } else {
      alert("Please enter a valid number.");
    }

    amountInput.classList.remove("visible");
    amountValue.style.display = "inline";
  });

  amountInput.addEventListener("keypress", async (e) => {
    if (e.key === "Enter") {
      const newAmount = parseFloat(amountInput.value);

      if (!isNaN(newAmount)) {
        amountValue.textContent = `$${newAmount.toFixed(2)}`;
        await updateCategoryAmount(userId, categoryId, newAmount);
      } else {
        alert("Please enter a valid number.");
      }

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

    // Show input when the card is clicked
    card.addEventListener("click", () => {

        amountValue.style.display = "none";
        amountInput.classList.add("visible");


        const currentAmount = amountValue.textContent.replace("$", "");
        amountInput.value = currentAmount;


        amountInput.focus();
    });

    amountInput.addEventListener("blur", () => {
        const newAmount = parseFloat(amountInput.value);

        if (!isNaN(newAmount)) {
            // Update the card's value
            amountValue.textContent = `$${newAmount.toFixed(2)}`;
        } else {
            alert("Please enter a valid number.");
        }


        amountInput.classList.remove("visible");
        amountValue.style.display = "inline";
    });

    // Update the value when the user presses "Enter"
    amountInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            const newAmount = parseFloat(amountInput.value);

            if (!isNaN(newAmount)) {
                amountValue.textContent = `$${newAmount.toFixed(2)}`;
            } else {
                alert("Please enter a valid number.");
            }
            amountInput.classList.remove("visible");
            amountValue.style.display = "inline";
        }
    });
});