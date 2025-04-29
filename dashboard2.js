import { auth, db } from "./firebase-init.js";
import { signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";
import { doc, setDoc, getDoc, onSnapshot } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";

const username = localStorage.getItem("username");

// Work while the user is logged in
onAuthStateChanged(auth, async (user) => {
    if (user) {
        // User is signed in
        const uid = user.uid; // This is the current user's UID
        console.log("User is logged in" + uid);

        function getBudgetPlan() {
            const periodSelect = document.querySelector('input[name="period"]:checked').value;
            const percentageSelect = document.getElementById('percentage');
            const citySelect = document.getElementById('city');
            
            const selectedPercentage = percentageSelect.value;
            const selectedCity = citySelect.value;
                
            console.log("Selected Period:", periodSelect);
            console.log("Selected Percentage:", selectedPercentage);
            console.log("Selected City:", selectedCity);

            if (selectedCity !== "New York City") {
                alert("A budget plan is only available for New York City.");
            } else {
                const budgetPlanDiv = document.getElementById("budgetPlan");
                switch(selectedPercentage) {
                    case "20":

                        budgetPlanDiv.innerHTML = `
                            <p><strong>Income Frequency:</strong> ${periodSelect}</p>
                            <p><strong>Savings Percentage:</strong> ${selectedPercentage}%</p>
                            <p><strong>City:</strong> ${selectedCity}</p>

                            <h2>Your Plan:</h2>
                            <p>20% is a good starting point for a basic budget. We will use the 50/20/30 method!</p>
                            <ul>
                                <h3>Savings:</h3>
                                ${periodSelect === 'Weekly' ? `
                                    <li>Weekly Savings: $${((currentIncome.textContent / 7) * (selectedPercentage / 100)).toFixed(2)}</li>
                                    <li>Monthly Savings: $${((currentIncome.textContent / 7) * (selectedPercentage / 100)).toFixed(2)} (estimated)</li>
                                ` : ''}
                                
                                ${periodSelect === 'biweekly' ? `
                                    <li>Bi-Weekly Savings: $${currentIncome.textContent.toFixed(2)}</li>
                                    <li>Monthly Savings: $${(currentIncome.textContent * 2).toFixed(2)}</li>
                                ` : ''}
                                <br>
                                <h3>Expenses:</h3>
                                <li>Weekly MTA Costs: $29-35, 29 minimum (assuming twice a day, five days a week), 35 max </li>
                                <li>Weekly Gas Costs: $20-25 (assuming 5 days a week)</li>
                                <li>Weekly Food Costs: $100-150 (assuming 3 meals a day)</li>
                                <br>
                                <h3>Spending Power:</h3>
                                *After expenses*
                                <li>Weekly Spending Power: $${((currentIncome.textContent / 7) * (1 - selectedPercentage / 100)).toFixed(2)}</li>
                                <li>Monthly Spending Power: $${(currentIncome.textContent * (1 - selectedPercentage / 100)).toFixed(2)}</li>
                        `;
                        break;
                    case "30":
                        budgetPlanDiv.innerHTML = `
                            <p><strong>Income Frequency:</strong> ${periodSelect}</p>
                            <p><strong>Savings Percentage:</strong> ${selectedPercentage}%</p>
                            <p><strong>City:</strong> ${selectedCity}</p>

                            <h2>Your Plan:</h2>
                            <p>20% is a good starting point for a basic budget. We will use the 50/20/30 method!</p>
                            <ul>
                                <h3>Savings:</h3>
                                ${periodSelect === 'Weekly' ? `
                                    <li>Weekly Savings: $${((currentIncome.textContent / 7) * (selectedPercentage / 100)).toFixed(2)}</li>
                                    <li>Monthly Savings: $${((currentIncome.textContent / 7) * (selectedPercentage / 100)).toFixed(2)} (estimated)</li>
                                ` : ''}
                                
                                ${periodSelect === 'biweekly' ? `
                                    <li>Bi-Weekly Savings: $${currentIncome.textContent.toFixed(2)}</li>
                                    <li>Monthly Savings: $${(currentIncome.textContent * 2).toFixed(2)}</li>
                                ` : ''}
                                <br>
                                <h3>Expenses:</h3>
                                <li>Weekly MTA Costs: $29-35, 29 minimum (assuming twice a day, five days a week), 35 max </li>
                                <li>Weekly Gas Costs: $20-25 (assuming 5 days a week)</li>
                                <li>Weekly Food Costs: $100-150 (assuming 3 meals a day)</li>
                                <br>
                                <h3>Spending Power:</h3>
                                *After expenses*
                                <li>Weekly Spending Power: $${((currentIncome.textContent / 7) * (1 - selectedPercentage / 100)).toFixed(2)}</li>
                                <li>Monthly Spending Power: $${(currentIncome.textContent * (1 - selectedPercentage / 100)).toFixed(2)}</li>
                        `;
                        break;
                    case "40":
                        budgetPlanDiv.innerHTML = `
                            <p><strong>Income Frequency:</strong> ${periodSelect}</p>
                            <p><strong>Savings Percentage:</strong> ${selectedPercentage}%</p>
                            <p><strong>City:</strong> ${selectedCity}</p>

                            <h2>Your Plan:</h2>
                            <p>20% is a good starting point for a basic budget. We will use the 50/20/30 method!</p>
                            <ul>
                                <h3>Savings:</h3>
                                ${periodSelect === 'Weekly' ? `
                                    <li>Weekly Savings: $${((currentIncome.textContent / 7) * (selectedPercentage / 100)).toFixed(2)}</li>
                                    <li>Monthly Savings: $${((currentIncome.textContent / 7) * (selectedPercentage / 100)).toFixed(2)} (estimated)</li>
                                ` : ''}
                                
                                ${periodSelect === 'biweekly' ? `
                                    <li>Bi-Weekly Savings: $${currentIncome.textContent.toFixed(2)}</li>
                                    <li>Monthly Savings: $${(currentIncome.textContent * 2).toFixed(2)}</li>
                                ` : ''}
                                <br>
                                <h3>Expenses:</h3>
                                <li>Weekly MTA Costs: $29-35, 29 minimum (assuming twice a day, five days a week), 35 max </li>
                                <li>Weekly Gas Costs: $20-25 (assuming 5 days a week)</li>
                                <li>Weekly Food Costs: $100-150 (assuming 3 meals a day)</li>
                                <br>
                                <h3>Spending Power:</h3>
                                *After expenses*
                                <li>Weekly Spending Power: $${((currentIncome.textContent / 7) * (1 - selectedPercentage / 100)).toFixed(2)}</li>
                                <li>Monthly Spending Power: $${(currentIncome.textContent * (1 - selectedPercentage / 100)).toFixed(2)}</li>
                        `;
                        break;
                    case "50":
                        budgetPlanDiv.innerHTML = `
                            <p><strong>Income Frequency:</strong> ${periodSelect}</p>
                            <p><strong>Savings Percentage:</strong> ${selectedPercentage}%</p>
                            <p><strong>City:</strong> ${selectedCity}</p>

                            <h2>Your Plan:</h2>
                            <p>20% is a good starting point for a basic budget. We will use the 50/20/30 method!</p>
                            <ul>
                                <h3>Savings:</h3>
                                ${periodSelect === 'Weekly' ? `
                                    <li>Weekly Savings: $${((currentIncome.textContent / 7) * (selectedPercentage / 100)).toFixed(2)}</li>
                                    <li>Monthly Savings: $${((currentIncome.textContent / 7) * (selectedPercentage / 100)).toFixed(2)} (estimated)</li>
                                ` : ''}
                                
                                ${periodSelect === 'biweekly' ? `
                                    <li>Bi-Weekly Savings: $${currentIncome.textContent.toFixed(2)}</li>
                                    <li>Monthly Savings: $${(currentIncome.textContent * 2).toFixed(2)}</li>
                                ` : ''}
                                <br>
                                <h3>Expenses:</h3>
                                <li>Weekly MTA Costs: $29-35, 29 minimum (assuming twice a day, five days a week), 35 max </li>
                                <li>Weekly Gas Costs: $20-25 (assuming 5 days a week)</li>
                                <li>Weekly Food Costs: $100-150 (assuming 3 meals a day)</li>
                                <br>
                                <h3>Spending Power:</h3>
                                *After expenses*
                                <li>Weekly Spending Power: $${((currentIncome.textContent / 7) * (1 - selectedPercentage / 100)).toFixed(2)}</li>
                                <li>Monthly Spending Power: $${(currentIncome.textContent * (1 - selectedPercentage / 100)).toFixed(2)}</li>
                        `;
                        break;
                    case "60":
                        budgetPlanDiv.innerHTML = `
                            <p><strong>Income Frequency:</strong> ${periodSelect}</p>
                            <p><strong>Savings Percentage:</strong> ${selectedPercentage}%</p>
                            <p><strong>City:</strong> ${selectedCity}</p>

                            <h2>Your Plan:</h2>
                            <p>60% is very risky, requiring  serious spending awareness and patience.</p>
                            <ul>
                                <h3>Savings:</h3>
                                ${periodSelect === 'Weekly' ? `
                                    <li>Weekly Savings: $${((currentIncome.textContent / 7) * (selectedPercentage / 100)).toFixed(2)}</li>
                                    <li>Monthly Savings: $${((currentIncome.textContent / 7) * (selectedPercentage / 100)).toFixed(2)} (estimated)</li>
                                ` : ''}
                                
                                ${periodSelect === 'biweekly' ? `
                                    <li>Bi-Weekly Savings: $${currentIncome.textContent.toFixed(2)}</li>
                                    <li>Monthly Savings: $${(currentIncome.textContent * 2).toFixed(2)}</li>
                                ` : ''}
                                <br>
                                <h3>Expenses:</h3>
                                <li>Weekly MTA Costs: $29-35, 29 minimum (assuming twice a day, five days a week), 35 max </li>
                                <li>Weekly Gas Costs: $20-25 (assuming 5 days a week)</li>
                                <li>Weekly Food Costs: $100-150 (assuming 3 meals a day)</li>
                                <br>
                                <h3>Spending Power:</h3>
                                *After expenses*
                                <li>Weekly Spending Power: $${((currentIncome.textContent / 7) * (1 - selectedPercentage / 100)).toFixed(2)}</li>
                                <li>Monthly Spending Power: $${(currentIncome.textContent * (1 - selectedPercentage / 100)).toFixed(2)}</li>
                        `;
                        break;
                     
                }

                     
            }

            // Take income, take the percentage and put aside that money
            // Then calculate MTA costs and gas costs (Seperate but give both options)
            // Then do perctangess for food, groceries, and rent (most important things)
            // Take the remaining and allocate for fun stuff and spending money
            // Return something from a high level starting from the week and the month
            // Weekly you will spend 35 on the MTA or 20 on gas, 100 on foot
            // Monthly you need to pay rent which is ... etc etc

        }
            

        if (document.getElementById("getBudgetPlan")) {
            document.getElementById("getBudgetPlan").addEventListener("click", getBudgetPlan);
        }

        // Display Income and Spending Power ------------------------------------------------------------------
        
        const unsubIncome = onSnapshot(doc(db, "users", uid, "Overview", "Income"), (doc) => {
            console.log("Current data: ", doc.data());
            const income = parseFloat(doc.data().Amount);
            currentIncome.textContent = income.toFixed(2);
        });

        const unsubspendingPower = onSnapshot(doc(db, "users", uid, "Overview", "spendingPower"), (doc) => {
            console.log("Current data: ", doc.data());
            const spendingPower = parseFloat(doc.data().Amount);
            currentSpendingPower.textContent = spendingPower.toFixed(2);
        });

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