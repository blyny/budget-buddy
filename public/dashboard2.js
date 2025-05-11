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

            //------------------------------------------------------------------------------------------------------------------------------------------------------------
            if (selectedCity === "New York City") {
                const budgetPlanDiv = document.getElementById("budgetPlan");
                switch(selectedPercentage) {
                    case "30":
                        budgetPlanDiv.innerHTML = `
                            <p><strong>Income Frequency:</strong> ${periodSelect}</p>
                            <p><strong>Savings Percentage:</strong> ${selectedPercentage}%</p>
                            <p><strong>City:</strong> ${selectedCity}</p>

                            <h2>Your Plan:</h2>
                            <p>30% is a good starting point for a basic budget. We will use the 50/20/30 method! <br>
                            30% savings, 50% for needs, 20% for wants. 
                            Anything less than 30% would result in minimal savings</p>
                            <ul>
                                <h3>Savings:</h3>
                                Set aside 30% of your income:
                                ${periodSelect === 'Weekly' ? `
                                    <li>Weekly Savings: $${((currentIncome.textContent) * (selectedPercentage / 100)).toFixed(2)}</li>
                                    <li>Monthly Savings: $${((currentIncome.textContent * 4) * (selectedPercentage / 100)).toFixed(2)} (estimated)</li>
                                ` : ''}
                                
                                ${periodSelect === 'Biweekly' ? `
                                    <li>Weekly Savings: $${((currentIncome.textContent) * (selectedPercentage / 100)).toFixed(2)}</li>
                                    <li>Monthly Savings: $${((currentIncome.textContent * 2) * (selectedPercentage / 100)).toFixed(2)}</li>
                                ` : ''}

                                <p><em>Tip:</em> Consider a high-yield savings account (like Marcus or Ally) to combat inflation, and to make interest</p>
                                <br>

                                <h3>Expenses:</h3>
                                Allocate 50% of your income for needs:
                                ${periodSelect === 'Weekly' ? `
                                    <li>Weekly Expenses: $${((currentIncome.textContent) * (50 / 100)).toFixed(2)}</li>
                                    <li>Monthly Expenses: $${((currentIncome.textContent * 4) * (50 / 100)).toFixed(2)} (estimated)</li>
                                ` : ''}
                                
                                ${periodSelect === 'Biweekly' ? `
                                    <li>Weekly Expenses: $${((currentIncome.textContent) * (50 / 100)).toFixed(2)}</li>
                                    <li>Monthly Expenses: $${((currentIncome.textContent * 2) * (50 / 100)).toFixed(2)}</li>
                                ` : ''}
                                <br>
                                <h4>Example Needs Breakdown:</h4>
                                <ul>
                                    <li><strong>Housing (30% max):</strong> $${((currentIncome.textContent) * (30 / 100)).toFixed(2)}
                                    <li><strong>Utilities/Internet (5%):</strong> $${((currentIncome.textContent) * (5 / 100)).toFixed(2)} (Super high-speed internet is not needed)</li>
                                    <li><strong>Groceries (7%):</strong> $${((currentIncome.textContent) * (7 / 100)).toFixed(2)} (Shop at Trader Joe's or Costco in bulk)</li>
                                    <li><strong>Transportation (5%):</strong> $${((currentIncome.textContent) * (5 / 100)).toFixed(2)} (Assuming MTA and you spend $35/week)</li>
                                </ul>
                                <br>

                                <h3>Spending Power:</h3>
                                Give yourself 20% of your income for fun stuff:
                                ${periodSelect === 'Weekly' ? `
                                    <li>Weekly Expenses: $${((currentIncome.textContent) * (20 / 100)).toFixed(2)}</li>
                                    <li>Monthly Expenses: $${((currentIncome.textContent * 4) * (20 / 100)).toFixed(2)} (estimated)</li>
                                ` : ''}
                                
                                ${periodSelect === 'Biweekly' ? `
                                    <li>Weekly Expenses: $${((currentIncome.textContent) * (20 / 100)).toFixed(2)}</li>
                                    <li>Monthly Expenses: $${((currentIncome.textContent * 2) * (20 / 100)).toFixed(2)}</li>
                                ` : ''}
                        `;
                        break;
                    case "40":
                        budgetPlanDiv.innerHTML = `
                            <p><strong>Income Frequency:</strong> ${periodSelect}</p>
                            <p><strong>Savings Percentage:</strong> ${selectedPercentage}%</p>
                            <p><strong>City:</strong> ${selectedCity}</p>

                            <h2>Your Plan:</h2>
                            <p>40% is a valid starting point for a basic budget. We modify the 50/20/30 method! <br>
                            40% savings, 50% for needs, 10% for wants. </p>
                            <ul>
                                <h3>Savings:</h3>
                                Set aside 40% of your income:
                                ${periodSelect === 'Weekly' ? `
                                    <li>Weekly Savings: $${((currentIncome.textContent) * (selectedPercentage / 100)).toFixed(2)}</li>
                                    <li>Monthly Savings: $${((currentIncome.textContent * 4) * (selectedPercentage / 100)).toFixed(2)} (estimated)</li>
                                ` : ''}
                                
                                ${periodSelect === 'Biweekly' ? `
                                    <li>Weekly Savings: $${((currentIncome.textContent) * (selectedPercentage / 100)).toFixed(2)}</li>
                                    <li>Monthly Savings: $${((currentIncome.textContent * 2) * (selectedPercentage / 100)).toFixed(2)}</li>
                                ` : ''}
                                <br>

                                <h3>Expenses:</h3>
                                Allocate 50% of your income for needs:
                                ${periodSelect === 'Weekly' ? `
                                    <li>Weekly Expenses: $${((currentIncome.textContent) * (50 / 100)).toFixed(2)}</li>
                                    <li>Monthly Expenses: $${((currentIncome.textContent * 4) * (50 / 100)).toFixed(2)} (estimated)</li>
                                ` : ''}
                                
                                ${periodSelect === 'Biweekly' ? `
                                    <li>Weekly Expenses: $${((currentIncome.textContent) * (50 / 100)).toFixed(2)}</li>
                                    <li>Monthly Expenses: $${((currentIncome.textContent * 2) * (50 / 100)).toFixed(2)}</li>
                                ` : ''}
                                <br>
                                <h4>Example Needs Breakdown:</h4> 
                                <ul>
                                    <li><strong>Housing (30% max):</strong> $${((currentIncome.textContent) * (30 / 100)).toFixed(2)}
                                    <li><strong>Utilities/Internet (5%):</strong> $${((currentIncome.textContent) * (5 / 100)).toFixed(2)} (Super high-speed internet is not needed)</li>
                                    <li><strong>Groceries (7%):</strong> $${((currentIncome.textContent) * (7 / 100)).toFixed(2)} (Shop at Trader Joe's or Costco in bulk)</li>
                                    <li><strong>Transportation (5%):</strong> $${((currentIncome.textContent) * (5 / 100)).toFixed(2)} (Assuming MTA and you spend $35/week)</li>
                                </ul>
                                <br>

                                <h3>Spending Power:</h3>
                                Give yourself 10% of your income for fun stuff:
                                ${periodSelect === 'Weekly' ? `
                                    <li>Weekly Expenses: $${((currentIncome.textContent) * (10 / 100)).toFixed(2)}</li>
                                    <li>Monthly Expenses: $${((currentIncome.textContent * 4) * (10 / 100)).toFixed(2)} (estimated)</li>
                                ` : ''}
                                
                                ${periodSelect === 'Biweekly' ? `
                                    <li>Weekly Expenses: $${((currentIncome.textContent) * (10 / 100)).toFixed(2)}</li>
                                    <li>Monthly Expenses: $${((currentIncome.textContent * 2) * (10 / 100)).toFixed(2)}</li>
                                ` : ''}
                        `;
                        break;
                    case "50":
                        budgetPlanDiv.innerHTML = `
                            <p><strong>Income Frequency:</strong> ${periodSelect}</p>
                            <p><strong>Savings Percentage:</strong> ${selectedPercentage}%</p>
                            <p><strong>City:</strong> ${selectedCity}</p>

                            <h2>Your Plan:</h2>
                            <p>50% is very aggressive but possible if you have a high income and willing to be frugal. <br>
                            Our breakdown would be: 50% savings, 45% needs, 5% wants. </p>
                            <ul>
                                <h3>Savings:</h3>
                                Set aside 50% of your income:
                                ${periodSelect === 'Weekly' ? `
                                    <li>Weekly Savings: $${((currentIncome.textContent) * (selectedPercentage / 100)).toFixed(2)}</li>
                                    <li>Monthly Savings: $${((currentIncome.textContent * 4) * (selectedPercentage / 100)).toFixed(2)} (estimated)</li>
                                ` : ''}
                                
                                ${periodSelect === 'Biweekly' ? `
                                    <li>Weekly Savings: $${((currentIncome.textContent) * (selectedPercentage / 100)).toFixed(2)}</li>
                                    <li>Monthly Savings: $${((currentIncome.textContent * 2) * (selectedPercentage / 100)).toFixed(2)}</li>
                                ` : ''}
                                <br>

                                <h3>Expenses:</h3>
                                Allocate 45% of your income for needs:
                                ${periodSelect === 'Weekly' ? `
                                    <li>Weekly Expenses: $${((currentIncome.textContent) * (45 / 100)).toFixed(2)}</li>
                                    <li>Monthly Expenses: $${((currentIncome.textContent * 4) * (45 / 100)).toFixed(2)} (estimated)</li>
                                ` : ''}
                                
                                ${periodSelect === 'Biweekly' ? `
                                    <li>Weekly Expenses: $${((currentIncome.textContent) * (45 / 100)).toFixed(2)}</li>
                                    <li>Monthly Expenses: $${((currentIncome.textContent * 2) * (45 / 100)).toFixed(2)}</li>
                                ` : ''}
                                <br>
                                <h4>Example Needs Breakdown:</h4> 
                                <ul>
                                    <li><strong>Housing (25%):</strong>  $${((currentIncome.textContent) * 0.25).toFixed(2)}</li>
                                    <li><strong>Utilities/Internet (5%):</strong>  $${((currentIncome.textContent) * 0.05).toFixed(2)}</li>
                                    <li><strong>Groceries (6%):</strong>  $${((currentIncome.textContent) * 0.06).toFixed(2)}</li>
                                    <li><strong>Transportation (4%):</strong>  $${((currentIncome.textContent) * 0.04).toFixed(2)}</li>
                                </ul>
                                <br>

                                <h3>Spending Power:</h3>
                                Give yourself 5% of your income for fun stuff:
                                ${periodSelect === 'Weekly' ? `
                                    <li>Weekly Expenses: $${((currentIncome.textContent) * (5 / 100)).toFixed(2)}</li>
                                    <li>Monthly Expenses: $${((currentIncome.textContent * 4) * (5 / 100)).toFixed(2)} (estimated)</li>
                                ` : ''}
                                
                                ${periodSelect === 'Biweekly' ? `
                                    <li>Weekly Expenses: $${((currentIncome.textContent) * (5 / 100)).toFixed(2)}</li>
                                    <li>Monthly Expenses: $${((currentIncome.textContent * 2) * (5 / 100)).toFixed(2)}</li>
                                ` : ''}
                        `;
                        break;
                    case "60":
                        budgetPlanDiv.innerHTML = `
                            <p><strong>Income Frequency:</strong> ${periodSelect}</p>
                            <p><strong>Savings Percentage:</strong> ${selectedPercentage}%</p>
                            <p><strong>City:</strong> ${selectedCity}</p>

                            <h2>Your Plan:</h2>
                            <p>60% is very risky and very aggressive, requiring serious spending awareness and patience. <br>
                            We do not recommend unless you are wealth-building and can live with the minimal necessities</p>
                            <ul>
                                <h3>Savings:</h3>
                                Set aside 60% of your income:
                                ${periodSelect === 'Weekly' ? `
                                    <li>Weekly Savings: $${((currentIncome.textContent) * (selectedPercentage / 100)).toFixed(2)}</li>
                                    <li>Monthly Savings: $${((currentIncome.textContent * 4) * (selectedPercentage / 100)).toFixed(2)} (estimated)</li>
                                ` : ''}
                                
                                ${periodSelect === 'Biweekly' ? `
                                    <li>Weekly Savings: $${((currentIncome.textContent) * (selectedPercentage / 100)).toFixed(2)}</li>
                                    <li>Monthly Savings: $${((currentIncome.textContent * 2) * (selectedPercentage / 100)).toFixed(2)}</li>
                                ` : ''}
                                <br>

                                <h3>Expenses:</h3>
                                Allocate 35% of your income for needs:
                                ${periodSelect === 'Weekly' ? `
                                    <li>Weekly Expenses: $${((currentIncome.textContent) * (50 / 100)).toFixed(2)}</li>
                                    <li>Monthly Expenses: $${((currentIncome.textContent * 4) * (50 / 100)).toFixed(2)} (estimated)</li>
                                ` : ''}
                                
                                ${periodSelect === 'Biweekly' ? `
                                    <li>Weekly Expenses: $${((currentIncome.textContent) * (50 / 100)).toFixed(2)}</li>
                                    <li>Monthly Expenses: $${((currentIncome.textContent * 2) * (50 / 100)).toFixed(2)}</li>
                                ` : ''}
                                <br>
                                <h4>Example Needs Breakdown:</h4> 
                                <ul>
                                    <li><strong>Housing (23% max):</strong> $${((currentIncome.textContent) * (23/ 100)).toFixed(2)}
                                    <li><strong>Utilities/Internet (5%):</strong> $${((currentIncome.textContent) * (5 / 100)).toFixed(2)} (Focus on utilities and Very Cheap Internet)</li>
                                    <li><strong>Groceries (5%):</strong> $${((currentIncome.textContent) * (5 / 100)).toFixed(2)} (Shop Very Frugally)</li>
                                    <li><strong>Transportation (2%):</strong> $${((currentIncome.textContent) * (2 / 100)).toFixed(2)} (Prioritize Walking)</li>
                                </ul>
                                <br>

                                <h3>Spending Power:</h3>
                                Give yourself 5% of your income for fun stuff:
                                ${periodSelect === 'Weekly' ? `
                                    <li>Weekly Expenses: $${((currentIncome.textContent) * (10 / 100)).toFixed(2)}</li>
                                    <li>Monthly Expenses: $${((currentIncome.textContent * 4) * (10 / 100)).toFixed(2)} (estimated)</li>
                                ` : ''}
                                
                                ${periodSelect === 'Biweekly' ? `
                                    <li>Weekly Expenses: $${((currentIncome.textContent) * (10 / 100)).toFixed(2)}</li>
                                    <li>Monthly Expenses: $${((currentIncome.textContent * 2) * (10 / 100)).toFixed(2)}</li>
                                ` : ''}
                        `;
                        break;
                }
            } else if (selectedCity === "Los Angeles") {
                const budgetPlanDiv = document.getElementById("budgetPlan");
                switch (selectedPercentage) {
                    case "30":
                        budgetPlanDiv.innerHTML = `
                            <p><strong>Income Frequency:</strong> ${periodSelect}</p>
                            <p><strong>Savings Percentage:</strong> ${selectedPercentage}%</p>
                            <p><strong>City:</strong> ${selectedCity}</p>

                            <h2>Your Plan:</h2>
                            <p>30% is a good starting point for a basic budget. We will use the 50/20/30 method! <br>
                            30% savings, 50% for needs, 20% for wants. 
                            Anything less than 30% would result in minimal savings</p>
                            <ul>
                                <h3>Savings:</h3>
                                Set aside 30% of your income:
                                ${periodSelect === 'Weekly' ? `
                                    <li>Weekly Savings: $${((currentIncome.textContent) * (selectedPercentage / 100)).toFixed(2)}</li>
                                    <li>Monthly Savings: $${((currentIncome.textContent * 4) * (selectedPercentage / 100)).toFixed(2)} (estimated)</li>
                                ` : ''}
                                
                                ${periodSelect === 'Biweekly' ? `
                                    <li>Weekly Savings: $${((currentIncome.textContent) * (selectedPercentage / 100)).toFixed(2)}</li>
                                    <li>Monthly Savings: $${((currentIncome.textContent * 2) * (selectedPercentage / 100)).toFixed(2)}</li>
                                ` : ''}

                                <h3>Expenses:</h3>
                                Allocate 50% of your income for needs:
                                ${periodSelect === 'Weekly' ? `
                                    <li>Weekly Expenses: $${((currentIncome.textContent) * (50 / 100)).toFixed(2)}</li>
                                    <li>Monthly Expenses: $${((currentIncome.textContent * 4) * (50 / 100)).toFixed(2)} (estimated)</li>
                                ` : ''}
                                
                                ${periodSelect === 'Biweekly' ? `
                                    <li>Weekly Expenses: $${((currentIncome.textContent) * (50 / 100)).toFixed(2)}</li>
                                    <li>Monthly Expenses: $${((currentIncome.textContent * 2) * (50 / 100)).toFixed(2)}</li>
                                ` : ''}
                                <br>
                                <h4>Example Needs Breakdown:</h4>
                                <ul>
                                    <li><strong>Housing (30% max):</strong> $${((currentIncome.textContent) * (30 / 100)).toFixed(2)} (Rent is high in LA, consider renting with others)</li>
                                    <li><strong>Utilities/Internet (5%):</strong> $${((currentIncome.textContent) * (5 / 100)).toFixed(2)} </li>
                                    <li><strong>Groceries (8%):</strong> $${((currentIncome.textContent) * (8 / 100)).toFixed(2)} (Shop at Vallarta or Costco in bulk)</li>
                                    <li><strong>Transportation (7%):</strong> $${((currentIncome.textContent) * (7 / 100)).toFixed(2)} (Use Metro if nearby)</li>
                                </ul>
                                <br>

                                <h3>Spending Power:</h3>
                                Give yourself 20% of your income for fun stuff:
                                ${periodSelect === 'Weekly' ? `
                                    <li>Weekly Expenses: $${((currentIncome.textContent) * (20 / 100)).toFixed(2)}</li>
                                    <li>Monthly Expenses: $${((currentIncome.textContent * 4) * (20 / 100)).toFixed(2)} (estimated)</li>
                                ` : ''}
                                
                                ${periodSelect === 'Biweekly' ? `
                                    <li>Weekly Expenses: $${((currentIncome.textContent) * (20 / 100)).toFixed(2)}</li>
                                    <li>Monthly Expenses: $${((currentIncome.textContent * 2) * (20 / 100)).toFixed(2)}</li>
                                ` : ''}
                        `;
                        break;
                    case "40":
                        budgetPlanDiv.innerHTML = `
                            <p><strong>Income Frequency:</strong> ${periodSelect}</p>
                            <p><strong>Savings Percentage:</strong> ${selectedPercentage}%</p>
                            <p><strong>City:</strong> ${selectedCity}</p>

                            <h2>Your Plan:</h2>
                            <p>40% is a valid starting point for a basic budget. We modify the 50/20/30 method! <br>
                            40% savings, 50% for needs, 10% for wants. </p>
                            <ul>
                                <h3>Savings:</h3>
                                Set aside 40% of your income:
                                ${periodSelect === 'Weekly' ? `
                                    <li>Weekly Savings: $${((currentIncome.textContent) * (selectedPercentage / 100)).toFixed(2)}</li>
                                    <li>Monthly Savings: $${((currentIncome.textContent * 4) * (selectedPercentage / 100)).toFixed(2)} (estimated)</li>
                                ` : ''}
                                
                                ${periodSelect === 'Biweekly' ? `
                                    <li>Weekly Savings: $${((currentIncome.textContent) * (selectedPercentage / 100)).toFixed(2)}</li>
                                    <li>Monthly Savings: $${((currentIncome.textContent * 2) * (selectedPercentage / 100)).toFixed(2)}</li>
                                ` : ''}
                                <br>

                                <h3>Expenses:</h3>
                                Allocate 50% of your income for needs:
                                ${periodSelect === 'Weekly' ? `
                                    <li>Weekly Expenses: $${((currentIncome.textContent) * (50 / 100)).toFixed(2)}</li>
                                    <li>Monthly Expenses: $${((currentIncome.textContent * 4) * (50 / 100)).toFixed(2)} (estimated)</li>
                                ` : ''}
                                
                                ${periodSelect === 'Biweekly' ? `
                                    <li>Weekly Expenses: $${((currentIncome.textContent) * (50 / 100)).toFixed(2)}</li>
                                    <li>Monthly Expenses: $${((currentIncome.textContent * 2) * (50 / 100)).toFixed(2)}</li>
                                ` : ''}
                                <br>
                                <h4>Example Needs Breakdown:</h4> 
                                <ul>
                                    <li><strong>Housing (28% max):</strong> $${((currentIncome.textContent) * (28 / 100)).toFixed(2)}
                                    <li><strong>Utilities/Internet (5%):</strong> $${((currentIncome.textContent) * (5 / 100)).toFixed(2)} </li>
                                    <li><strong>Groceries (7%):</strong> $${((currentIncome.textContent) * (7 / 100)).toFixed(2)} </li>
                                    <li><strong>Transportation (7%):</strong> $${((currentIncome.textContent) * (7 / 100)).toFixed(2)} </li>
                                </ul>
                                <br>

                                <h3>Spending Power:</h3>
                                Give yourself 10% of your income for fun stuff:
                                ${periodSelect === 'Weekly' ? `
                                    <li>Weekly Expenses: $${((currentIncome.textContent) * (10 / 100)).toFixed(2)}</li>
                                    <li>Monthly Expenses: $${((currentIncome.textContent * 4) * (10 / 100)).toFixed(2)} (estimated)</li>
                                ` : ''}
                                
                                ${periodSelect === 'Biweekly' ? `
                                    <li>Weekly Expenses: $${((currentIncome.textContent) * (10 / 100)).toFixed(2)}</li>
                                    <li>Monthly Expenses: $${((currentIncome.textContent * 2) * (10 / 100)).toFixed(2)}</li>
                                ` : ''}
                        `;
                        break;
                    case "50":
                        budgetPlanDiv.innerHTML = `
                            <p><strong>Income Frequency:</strong> ${periodSelect}</p>
                            <p><strong>Savings Percentage:</strong> ${selectedPercentage}%</p>
                            <p><strong>City:</strong> ${selectedCity}</p>

                            <h2>Your Plan:</h2>
                            <p>50% is very aggressive but possible if you have a high income and willing to be frugal. <br>
                            Our breakdown would be: 50% savings, 45% needs, 5% wants. </p>
                            <ul>
                                <h3>Savings:</h3>
                                Set aside 50% of your income:
                                ${periodSelect === 'Weekly' ? `
                                    <li>Weekly Savings: $${((currentIncome.textContent) * (selectedPercentage / 100)).toFixed(2)}</li>
                                    <li>Monthly Savings: $${((currentIncome.textContent * 4) * (selectedPercentage / 100)).toFixed(2)} (estimated)</li>
                                ` : ''}
                                
                                ${periodSelect === 'Biweekly' ? `
                                    <li>Weekly Savings: $${((currentIncome.textContent) * (selectedPercentage / 100)).toFixed(2)}</li>
                                    <li>Monthly Savings: $${((currentIncome.textContent * 2) * (selectedPercentage / 100)).toFixed(2)}</li>
                                ` : ''}
                                <br>

                                <h3>Expenses:</h3>
                                Allocate 45% of your income for needs:
                                ${periodSelect === 'Weekly' ? `
                                    <li>Weekly Expenses: $${((currentIncome.textContent) * (45 / 100)).toFixed(2)}</li>
                                    <li>Monthly Expenses: $${((currentIncome.textContent * 4) * (45 / 100)).toFixed(2)} (estimated)</li>
                                ` : ''}
                                
                                ${periodSelect === 'Biweekly' ? `
                                    <li>Weekly Expenses: $${((currentIncome.textContent) * (45 / 100)).toFixed(2)}</li>
                                    <li>Monthly Expenses: $${((currentIncome.textContent * 2) * (45 / 100)).toFixed(2)}</li>
                                ` : ''}
                                <br>
                                <h4>Example Needs Breakdown:</h4> 
                                <ul>
                                    <li><strong>Housing (25%):</strong>  $${((currentIncome.textContent) * 0.25).toFixed(2)}</li>
                                    <li><strong>Utilities/Internet (4%):</strong>  $${((currentIncome.textContent) * 0.04).toFixed(2)}</li>
                                    <li><strong>Groceries (6%):</strong>  $${((currentIncome.textContent) * 0.06).toFixed(2)}</li>
                                    <li><strong>Transportation (3%):</strong>  $${((currentIncome.textContent) * 0.03).toFixed(2)}</li>
                                </ul>
                                <br>

                                <h3>Spending Power:</h3>
                                Give yourself 5% of your income for fun stuff:
                                ${periodSelect === 'Weekly' ? `
                                    <li>Weekly Expenses: $${((currentIncome.textContent) * (5 / 100)).toFixed(2)}</li>
                                    <li>Monthly Expenses: $${((currentIncome.textContent * 4) * (5 / 100)).toFixed(2)} (estimated)</li>
                                ` : ''}
                                
                                ${periodSelect === 'Biweekly' ? `
                                    <li>Weekly Expenses: $${((currentIncome.textContent) * (5 / 100)).toFixed(2)}</li>
                                    <li>Monthly Expenses: $${((currentIncome.textContent * 2) * (5 / 100)).toFixed(2)}</li>
                                ` : ''}
                        `;
                        break;
                    case "60":
                        budgetPlanDiv.innerHTML = `
                            <p><strong>Income Frequency:</strong> ${periodSelect}</p>
                            <p><strong>Savings Percentage:</strong> ${selectedPercentage}%</p>
                            <p><strong>City:</strong> ${selectedCity}</p>

                            <h2>Your Plan:</h2>
                            <p>60% is very risky and very aggressive, requiring serious spending awareness and patience. <br>
                            We do not recommend unless you are wealth-building and can live with the minimal necessities</p>
                            <ul>
                                <h3>Savings:</h3>
                                Set aside 60% of your income:
                                ${periodSelect === 'Weekly' ? `
                                    <li>Weekly Savings: $${((currentIncome.textContent) * (selectedPercentage / 100)).toFixed(2)}</li>
                                    <li>Monthly Savings: $${((currentIncome.textContent * 4) * (selectedPercentage / 100)).toFixed(2)} (estimated)</li>
                                ` : ''}
                                
                                ${periodSelect === 'Biweekly' ? `
                                    <li>Weekly Savings: $${((currentIncome.textContent) * (selectedPercentage / 100)).toFixed(2)}</li>
                                    <li>Monthly Savings: $${((currentIncome.textContent * 2) * (selectedPercentage / 100)).toFixed(2)}</li>
                                ` : ''}
                                <br>

                                <h3>Expenses:</h3>
                                Allocate 35% of your income for needs:
                                ${periodSelect === 'Weekly' ? `
                                    <li>Weekly Expenses: $${((currentIncome.textContent) * (50 / 100)).toFixed(2)}</li>
                                    <li>Monthly Expenses: $${((currentIncome.textContent * 4) * (50 / 100)).toFixed(2)} (estimated)</li>
                                ` : ''}
                                
                                ${periodSelect === 'Biweekly' ? `
                                    <li>Weekly Expenses: $${((currentIncome.textContent) * (50 / 100)).toFixed(2)}</li>
                                    <li>Monthly Expenses: $${((currentIncome.textContent * 2) * (50 / 100)).toFixed(2)}</li>
                                ` : ''}
                                <br>
                                <h4>Example Needs Breakdown:</h4> 
                                <ul>
                                    <li><strong>Housing (20% max):</strong> $${((currentIncome.textContent) * (23 / 100)).toFixed(2)}
                                    <li><strong>Utilities/Internet (3%):</strong> $${((currentIncome.textContent) * (3 / 100)).toFixed(2)} (Focus on utilities and Very Cheap Internet)</li>
                                    <li><strong>Groceries (4%):</strong> $${((currentIncome.textContent) * (4 / 100)).toFixed(2)} (Shop Very Frugally)</li>
                                    <li><strong>Transportation (2%):</strong> $${((currentIncome.textContent) * (2 / 100)).toFixed(2)} (Prioritize Walking)</li>
                                </ul>
                                <br>

                                <h3>Spending Power:</h3>
                                Give yourself 5% of your income for fun stuff:
                                ${periodSelect === 'Weekly' ? `
                                    <li>Weekly Expenses: $${((currentIncome.textContent) * (10 / 100)).toFixed(2)}</li>
                                    <li>Monthly Expenses: $${((currentIncome.textContent * 4) * (10 / 100)).toFixed(2)} (estimated)</li>
                                ` : ''}
                                
                                ${periodSelect === 'Biweekly' ? `
                                    <li>Weekly Expenses: $${((currentIncome.textContent) * (10 / 100)).toFixed(2)}</li>
                                    <li>Monthly Expenses: $${((currentIncome.textContent * 2) * (10 / 100)).toFixed(2)}</li>
                                ` : ''}
                        `;
                        break;
                }
            } else if (selectedCity === "Chicago") {
                const budgetPlanDiv = document.getElementById("budgetPlan");
                switch (selectedPercentage) {
                    case "30":
                        budgetPlanDiv.innerHTML = `
                            <p><strong>Income Frequency:</strong> ${periodSelect}</p>
                            <p><strong>Savings Percentage:</strong> ${selectedPercentage}%</p>
                            <p><strong>City:</strong> ${selectedCity}</p>

                            <h2>Your Plan:</h2>
                            <p>30% is a good starting point for a basic budget. We will use the 50/20/30 method! <br>
                            30% savings, 50% for needs, 20% for wants. 
                            Anything less than 30% would result in minimal savings</p>
                            <ul>
                                <h3>Savings:</h3>
                                Set aside 30% of your income:
                                ${periodSelect === 'Weekly' ? `
                                    <li>Weekly Savings: $${((currentIncome.textContent) * (selectedPercentage / 100)).toFixed(2)}</li>
                                    <li>Monthly Savings: $${((currentIncome.textContent * 4) * (selectedPercentage / 100)).toFixed(2)} (estimated)</li>
                                ` : ''}
                                
                                ${periodSelect === 'Biweekly' ? `
                                    <li>Weekly Savings: $${((currentIncome.textContent) * (selectedPercentage / 100)).toFixed(2)}</li>
                                    <li>Monthly Savings: $${((currentIncome.textContent * 2) * (selectedPercentage / 100)).toFixed(2)}</li>
                                ` : ''}

                                <p><em>Tip:</em> Consider a high-yield savings account (like Marcus or Ally) to combat inflation, and to make interest</p>
                                <br>

                                <h3>Expenses:</h3>
                                Allocate 50% of your income for needs:
                                ${periodSelect === 'Weekly' ? `
                                    <li>Weekly Expenses: $${((currentIncome.textContent) * (50 / 100)).toFixed(2)}</li>
                                    <li>Monthly Expenses: $${((currentIncome.textContent * 4) * (50 / 100)).toFixed(2)} (estimated)</li>
                                ` : ''}
                                
                                ${periodSelect === 'Biweekly' ? `
                                    <li>Weekly Expenses: $${((currentIncome.textContent) * (50 / 100)).toFixed(2)}</li>
                                    <li>Monthly Expenses: $${((currentIncome.textContent * 2) * (50 / 100)).toFixed(2)}</li>
                                ` : ''}
                                <br>
                                <h4>Example Needs Breakdown:</h4>
                                <ul>
                                    <li><strong>Housing (30% max):</strong> $${((currentIncome.textContent) * (30 / 100)).toFixed(2)}
                                    <li><strong>Utilities/Internet (5%):</strong> $${((currentIncome.textContent) * (5 / 100)).toFixed(2)} (Super high-speed internet is not needed)</li>
                                    <li><strong>Groceries (7%):</strong> $${((currentIncome.textContent) * (7 / 100)).toFixed(2)} (Shop at Shop at Aldi/Jewel-Osco)</li>
                                    <li><strong>Transportation (5%):</strong> $${((currentIncome.textContent) * (5 / 100)).toFixed(2)} (CTA Pass)</li>
                                </ul>
                                <br>

                                <h3>Spending Power:</h3>
                                Give yourself 20% of your income for fun stuff:
                                ${periodSelect === 'Weekly' ? `
                                    <li>Weekly Expenses: $${((currentIncome.textContent) * (20 / 100)).toFixed(2)}</li>
                                    <li>Monthly Expenses: $${((currentIncome.textContent * 4) * (20 / 100)).toFixed(2)} (estimated)</li>
                                ` : ''}
                                
                                ${periodSelect === 'Biweekly' ? `
                                    <li>Weekly Expenses: $${((currentIncome.textContent) * (20 / 100)).toFixed(2)}</li>
                                    <li>Monthly Expenses: $${((currentIncome.textContent * 2) * (20 / 100)).toFixed(2)}</li>
                                ` : ''}
                        `;
                        break;
                    case "40":
                        budgetPlanDiv.innerHTML = `
                            <p><strong>Income Frequency:</strong> ${periodSelect}</p>
                            <p><strong>Savings Percentage:</strong> ${selectedPercentage}%</p>
                            <p><strong>City:</strong> ${selectedCity}</p>

                            <h2>Your Plan:</h2>
                            <p>40% is a valid starting point for a basic budget. We modify the 50/20/30 method! <br>
                            40% savings, 50% for needs, 10% for wants. </p>
                            <ul>
                                <h3>Savings:</h3>
                                Set aside 40% of your income:
                                ${periodSelect === 'Weekly' ? `
                                    <li>Weekly Savings: $${((currentIncome.textContent) * (selectedPercentage / 100)).toFixed(2)}</li>
                                    <li>Monthly Savings: $${((currentIncome.textContent * 4) * (selectedPercentage / 100)).toFixed(2)} (estimated)</li>
                                ` : ''}
                                
                                ${periodSelect === 'Biweekly' ? `
                                    <li>Weekly Savings: $${((currentIncome.textContent) * (selectedPercentage / 100)).toFixed(2)}</li>
                                    <li>Monthly Savings: $${((currentIncome.textContent * 2) * (selectedPercentage / 100)).toFixed(2)}</li>
                                ` : ''}
                                <br>

                                <h3>Expenses:</h3>
                                Allocate 50% of your income for needs:
                                ${periodSelect === 'Weekly' ? `
                                    <li>Weekly Expenses: $${((currentIncome.textContent) * (50 / 100)).toFixed(2)}</li>
                                    <li>Monthly Expenses: $${((currentIncome.textContent * 4) * (50 / 100)).toFixed(2)} (estimated)</li>
                                ` : ''}
                                
                                ${periodSelect === 'Biweekly' ? `
                                    <li>Weekly Expenses: $${((currentIncome.textContent) * (50 / 100)).toFixed(2)}</li>
                                    <li>Monthly Expenses: $${((currentIncome.textContent * 2) * (50 / 100)).toFixed(2)}</li>
                                ` : ''}
                                <br>
                                <h4>Example Needs Breakdown:</h4> 
                                <ul>
                                    <li><strong>Housing (30% max):</strong> $${((currentIncome.textContent) * (30 / 100)).toFixed(2)}
                                    <li><strong>Utilities/Internet (5%):</strong> $${((currentIncome.textContent) * (5 / 100)).toFixed(2)} 
                                    <li><strong>Groceries (7%):</strong> $${((currentIncome.textContent) * (7 / 100)).toFixed(2)} 
                                    <li><strong>Transportation (5%):</strong> $${((currentIncome.textContent) * (5 / 100)).toFixed(2)} 
                                </ul>
                                <br>

                                <h3>Spending Power:</h3>
                                Give yourself 10% of your income for fun stuff:
                                ${periodSelect === 'Weekly' ? `
                                    <li>Weekly Expenses: $${((currentIncome.textContent) * (10 / 100)).toFixed(2)}</li>
                                    <li>Monthly Expenses: $${((currentIncome.textContent * 4) * (10 / 100)).toFixed(2)} (estimated)</li>
                                ` : ''}
                                
                                ${periodSelect === 'Biweekly' ? `
                                    <li>Weekly Expenses: $${((currentIncome.textContent) * (10 / 100)).toFixed(2)}</li>
                                    <li>Monthly Expenses: $${((currentIncome.textContent * 2) * (10 / 100)).toFixed(2)}</li>
                                ` : ''}
                        `;
                        break;
                    case "50":
                        budgetPlanDiv.innerHTML = `
                            <p><strong>Income Frequency:</strong> ${periodSelect}</p>
                            <p><strong>Savings Percentage:</strong> ${selectedPercentage}%</p>
                            <p><strong>City:</strong> ${selectedCity}</p>

                            <h2>Your Plan:</h2>
                            <p>50% is very aggressive but possible if you have a high income and willing to be frugal. <br>
                            Our breakdown would be: 50% savings, 45% needs, 5% wants. </p>
                            <ul>
                                <h3>Savings:</h3>
                                Set aside 50% of your income:
                                ${periodSelect === 'Weekly' ? `
                                    <li>Weekly Savings: $${((currentIncome.textContent) * (selectedPercentage / 100)).toFixed(2)}</li>
                                    <li>Monthly Savings: $${((currentIncome.textContent * 4) * (selectedPercentage / 100)).toFixed(2)} (estimated)</li>
                                ` : ''}
                                
                                ${periodSelect === 'Biweekly' ? `
                                    <li>Weekly Savings: $${((currentIncome.textContent) * (selectedPercentage / 100)).toFixed(2)}</li>
                                    <li>Monthly Savings: $${((currentIncome.textContent * 2) * (selectedPercentage / 100)).toFixed(2)}</li>
                                ` : ''}
                                <br>

                                <h3>Expenses:</h3>
                                Allocate 45% of your income for needs:
                                ${periodSelect === 'Weekly' ? `
                                    <li>Weekly Expenses: $${((currentIncome.textContent) * (45 / 100)).toFixed(2)}</li>
                                    <li>Monthly Expenses: $${((currentIncome.textContent * 4) * (45 / 100)).toFixed(2)} (estimated)</li>
                                ` : ''}
                                
                                ${periodSelect === 'Biweekly' ? `
                                    <li>Weekly Expenses: $${((currentIncome.textContent) * (45 / 100)).toFixed(2)}</li>
                                    <li>Monthly Expenses: $${((currentIncome.textContent * 2) * (45 / 100)).toFixed(2)}</li>
                                ` : ''}
                                <br>
                                <h4>Example Needs Breakdown:</h4> 
                                <ul>
                                    <li><strong>Housing (25%):</strong>  $${((currentIncome.textContent) * 0.25).toFixed(2)}</li>
                                    <li><strong>Utilities/Internet (5%):</strong>  $${((currentIncome.textContent) * 0.05).toFixed(2)}</li>
                                    <li><strong>Groceries (6%):</strong>  $${((currentIncome.textContent) * 0.06).toFixed(2)}</li>
                                    <li><strong>Transportation (4%):</strong>  $${((currentIncome.textContent) * 0.04).toFixed(2)}</li>
                                </ul>
                                <br>

                                <h3>Spending Power:</h3>
                                Give yourself 5% of your income for fun stuff:
                                ${periodSelect === 'Weekly' ? `
                                    <li>Weekly Expenses: $${((currentIncome.textContent) * (5 / 100)).toFixed(2)}</li>
                                    <li>Monthly Expenses: $${((currentIncome.textContent * 4) * (5 / 100)).toFixed(2)} (estimated)</li>
                                ` : ''}
                                
                                ${periodSelect === 'Biweekly' ? `
                                    <li>Weekly Expenses: $${((currentIncome.textContent) * (5 / 100)).toFixed(2)}</li>
                                    <li>Monthly Expenses: $${((currentIncome.textContent * 2) * (5 / 100)).toFixed(2)}</li>
                                ` : ''}
                        `;
                        break;
                    case "60":
                        budgetPlanDiv.innerHTML = `
                            <p><strong>Income Frequency:</strong> ${periodSelect}</p>
                            <p><strong>Savings Percentage:</strong> ${selectedPercentage}%</p>
                            <p><strong>City:</strong> ${selectedCity}</p>

                            <h2>Your Plan:</h2>
                            <p>60% is very risky and very aggressive, requiring serious spending awareness and patience. <br>
                            We do not recommend unless you are wealth-building and can live with the minimal necessities</p>
                            <ul>
                                <h3>Savings:</h3>
                                Set aside 60% of your income:
                                ${periodSelect === 'Weekly' ? `
                                    <li>Weekly Savings: $${((currentIncome.textContent) * (selectedPercentage / 100)).toFixed(2)}</li>
                                    <li>Monthly Savings: $${((currentIncome.textContent * 4) * (selectedPercentage / 100)).toFixed(2)} (estimated)</li>
                                ` : ''}
                                
                                ${periodSelect === 'Biweekly' ? `
                                    <li>Weekly Savings: $${((currentIncome.textContent) * (selectedPercentage / 100)).toFixed(2)}</li>
                                    <li>Monthly Savings: $${((currentIncome.textContent * 2) * (selectedPercentage / 100)).toFixed(2)}</li>
                                ` : ''}
                                <br>

                                <h3>Expenses:</h3>
                                Allocate 35% of your income for needs:
                                ${periodSelect === 'Weekly' ? `
                                    <li>Weekly Expenses: $${((currentIncome.textContent) * (50 / 100)).toFixed(2)}</li>
                                    <li>Monthly Expenses: $${((currentIncome.textContent * 4) * (50 / 100)).toFixed(2)} (estimated)</li>
                                ` : ''}
                                
                                ${periodSelect === 'Biweekly' ? `
                                    <li>Weekly Expenses: $${((currentIncome.textContent) * (50 / 100)).toFixed(2)}</li>
                                    <li>Monthly Expenses: $${((currentIncome.textContent * 2) * (50 / 100)).toFixed(2)}</li>
                                ` : ''}
                                <br>
                                <h4>Example Needs Breakdown:</h4> 
                                <ul>
                                    <li><strong>Housing (23% max):</strong> $${((currentIncome.textContent) * (23 / 100)).toFixed(2)}
                                    <li><strong>Utilities/Internet (5%):</strong> $${((currentIncome.textContent) * (5 / 100)).toFixed(2)} (Focus on utilities and Very Cheap Internet)</li>
                                    <li><strong>Groceries (5%):</strong> $${((currentIncome.textContent) * (5 / 100)).toFixed(2)} (Shop Very Frugally)</li>
                                    <li><strong>Transportation (2%):</strong> $${((currentIncome.textContent) * (2 / 100)).toFixed(2)} (Prioritize Walking)</li>
                                </ul>
                                <br>

                                <h3>Spending Power:</h3>
                                Give yourself 5% of your income for fun stuff:
                                ${periodSelect === 'Weekly' ? `
                                    <li>Weekly Expenses: $${((currentIncome.textContent) * (10 / 100)).toFixed(2)}</li>
                                    <li>Monthly Expenses: $${((currentIncome.textContent * 4) * (10 / 100)).toFixed(2)} (estimated)</li>
                                ` : ''}
                                
                                ${periodSelect === 'Biweekly' ? `
                                    <li>Weekly Expenses: $${((currentIncome.textContent) * (10 / 100)).toFixed(2)}</li>
                                    <li>Monthly Expenses: $${((currentIncome.textContent * 2) * (10 / 100)).toFixed(2)}</li>
                                ` : ''}
                        `;
                        break;
                }
            } else if (selectedCity === "Houston") {
                const budgetPlanDiv = document.getElementById("budgetPlan");
                switch (selectedPercentage) {
                    case "30":
                        budgetPlanDiv.innerHTML = `
                            <p><strong>Income Frequency:</strong> ${periodSelect}</p>
                            <p><strong>Savings Percentage:</strong> ${selectedPercentage}%</p>
                            <p><strong>City:</strong> ${selectedCity}</p>

                            <h2>Your Plan:</h2>
                            <p>30% is a good starting point for a basic budget. We will use the 50/20/30 method! <br>
                            30% savings, 50% for needs, 20% for wants. 
                            Anything less than 30% would result in minimal savings</p>
                            <ul>
                                <h3>Savings:</h3>
                                Set aside 30% of your income:
                                ${periodSelect === 'Weekly' ? `
                                    <li>Weekly Savings: $${((currentIncome.textContent) * (selectedPercentage / 100)).toFixed(2)}</li>
                                    <li>Monthly Savings: $${((currentIncome.textContent * 4) * (selectedPercentage / 100)).toFixed(2)} (estimated)</li>
                                ` : ''}
                                
                                ${periodSelect === 'Biweekly' ? `
                                    <li>Weekly Savings: $${((currentIncome.textContent) * (selectedPercentage / 100)).toFixed(2)}</li>
                                    <li>Monthly Savings: $${((currentIncome.textContent * 2) * (selectedPercentage / 100)).toFixed(2)}</li>
                                ` : ''}

                                <p><em>Tip:</em> Consider a high-yield savings account (like Marcus or Ally) to combat inflation, and to make interest</p>
                                <br>

                                <h3>Expenses:</h3>
                                Allocate 50% of your income for needs:
                                ${periodSelect === 'Weekly' ? `
                                    <li>Weekly Expenses: $${((currentIncome.textContent) * (50 / 100)).toFixed(2)}</li>
                                    <li>Monthly Expenses: $${((currentIncome.textContent * 4) * (50 / 100)).toFixed(2)} (estimated)</li>
                                ` : ''}
                                
                                ${periodSelect === 'Biweekly' ? `
                                    <li>Weekly Expenses: $${((currentIncome.textContent) * (50 / 100)).toFixed(2)}</li>
                                    <li>Monthly Expenses: $${((currentIncome.textContent * 2) * (50 / 100)).toFixed(2)}</li>
                                ` : ''}
                                <br>
                                <h4>Example Needs Breakdown:</h4>
                                <ul>
                                    <li><strong>Housing (25% max):</strong> $${((currentIncome.textContent) * (25 / 100)).toFixed(2)} (We can spend less due to no state income tax)
                                    <li><strong>Utilities/Internet (5%):</strong> $${((currentIncome.textContent) * (5 / 100)).toFixed(2)}  </li>
                                    <li><strong>Groceries (8%):</strong> $${((currentIncome.textContent) * (8 / 100)).toFixed(2)} (H-E-B/Costco runs)</li>
                                    <li><strong>Transportation (12%):</strong> $${((currentIncome.textContent) * (12 / 100)).toFixed(2)} (Gas Money)</li>
                                </ul>
                                <br>

                                <h3>Spending Power:</h3>
                                Give yourself 20% of your income for fun stuff:
                                ${periodSelect === 'Weekly' ? `
                                    <li>Weekly Expenses: $${((currentIncome.textContent) * (20 / 100)).toFixed(2)}</li>
                                    <li>Monthly Expenses: $${((currentIncome.textContent * 4) * (20 / 100)).toFixed(2)} (estimated)</li>
                                ` : ''}
                                
                                ${periodSelect === 'Biweekly' ? `
                                    <li>Weekly Expenses: $${((currentIncome.textContent) * (20 / 100)).toFixed(2)}</li>
                                    <li>Monthly Expenses: $${((currentIncome.textContent * 2) * (20 / 100)).toFixed(2)}</li>
                                ` : ''}
                        `;
                        break;
                    case "40":
                        budgetPlanDiv.innerHTML = `
                            <p><strong>Income Frequency:</strong> ${periodSelect}</p>
                            <p><strong>Savings Percentage:</strong> ${selectedPercentage}%</p>
                            <p><strong>City:</strong> ${selectedCity}</p>

                            <h2>Your Plan:</h2>
                            <p>40% is a valid starting point for a basic budget. We modify the 50/20/30 method! <br>
                            40% savings, 50% for needs, 10% for wants. </p>
                            <ul>
                                <h3>Savings:</h3>
                                Set aside 40% of your income:
                                ${periodSelect === 'Weekly' ? `
                                    <li>Weekly Savings: $${((currentIncome.textContent) * (selectedPercentage / 100)).toFixed(2)}</li>
                                    <li>Monthly Savings: $${((currentIncome.textContent * 4) * (selectedPercentage / 100)).toFixed(2)} (estimated)</li>
                                ` : ''}
                                
                                ${periodSelect === 'Biweekly' ? `
                                    <li>Weekly Savings: $${((currentIncome.textContent) * (selectedPercentage / 100)).toFixed(2)}</li>
                                    <li>Monthly Savings: $${((currentIncome.textContent * 2) * (selectedPercentage / 100)).toFixed(2)}</li>
                                ` : ''}
                                <br>

                                <h3>Expenses:</h3>
                                Allocate 50% of your income for needs:
                                ${periodSelect === 'Weekly' ? `
                                    <li>Weekly Expenses: $${((currentIncome.textContent) * (50 / 100)).toFixed(2)}</li>
                                    <li>Monthly Expenses: $${((currentIncome.textContent * 4) * (50 / 100)).toFixed(2)} (estimated)</li>
                                ` : ''}
                                
                                ${periodSelect === 'Biweekly' ? `
                                    <li>Weekly Expenses: $${((currentIncome.textContent) * (50 / 100)).toFixed(2)}</li>
                                    <li>Monthly Expenses: $${((currentIncome.textContent * 2) * (50 / 100)).toFixed(2)}</li>
                                ` : ''}
                                <br>
                                <h4>Example Needs Breakdown:</h4> 
                                <ul>
                                    <li><strong>Housing (20% max):</strong> $${((currentIncome.textContent) * (20 / 100)).toFixed(2)}
                                    <li><strong>Utilities/Internet (4%):</strong> $${((currentIncome.textContent) * (4 / 100)).toFixed(2)} </li>
                                    <li><strong>Groceries (7%):</strong> $${((currentIncome.textContent) * (7 / 100)).toFixed(2)} </li>
                                    <li><strong>Transportation (10%):</strong> $${((currentIncome.textContent) * (10 / 100)).toFixed(2)} </li>
                                </ul>
                                <br>

                                <h3>Spending Power:</h3>
                                Give yourself 10% of your income for fun stuff:
                                ${periodSelect === 'Weekly' ? `
                                    <li>Weekly Expenses: $${((currentIncome.textContent) * (10 / 100)).toFixed(2)}</li>
                                    <li>Monthly Expenses: $${((currentIncome.textContent * 4) * (10 / 100)).toFixed(2)} (estimated)</li>
                                ` : ''}
                                
                                ${periodSelect === 'Biweekly' ? `
                                    <li>Weekly Expenses: $${((currentIncome.textContent) * (10 / 100)).toFixed(2)}</li>
                                    <li>Monthly Expenses: $${((currentIncome.textContent * 2) * (10 / 100)).toFixed(2)}</li>
                                ` : ''}
                        `;
                        break;
                    case "50":
                        budgetPlanDiv.innerHTML = `
                            <p><strong>Income Frequency:</strong> ${periodSelect}</p>
                            <p><strong>Savings Percentage:</strong> ${selectedPercentage}%</p>
                            <p><strong>City:</strong> ${selectedCity}</p>

                            <h2>Your Plan:</h2>
                            <p>50% is very aggressive but possible if you have a high income and willing to be frugal. <br>
                            Our breakdown would be: 50% savings, 45% needs, 5% wants. </p>
                            <ul>
                                <h3>Savings:</h3>
                                Set aside 50% of your income:
                                ${periodSelect === 'Weekly' ? `
                                    <li>Weekly Savings: $${((currentIncome.textContent) * (selectedPercentage / 100)).toFixed(2)}</li>
                                    <li>Monthly Savings: $${((currentIncome.textContent * 4) * (selectedPercentage / 100)).toFixed(2)} (estimated)</li>
                                ` : ''}
                                
                                ${periodSelect === 'Biweekly' ? `
                                    <li>Weekly Savings: $${((currentIncome.textContent) * (selectedPercentage / 100)).toFixed(2)}</li>
                                    <li>Monthly Savings: $${((currentIncome.textContent * 2) * (selectedPercentage / 100)).toFixed(2)}</li>
                                ` : ''}
                                <br>

                                <h3>Expenses:</h3>
                                Allocate 45% of your income for needs:
                                ${periodSelect === 'Weekly' ? `
                                    <li>Weekly Expenses: $${((currentIncome.textContent) * (45 / 100)).toFixed(2)}</li>
                                    <li>Monthly Expenses: $${((currentIncome.textContent * 4) * (45 / 100)).toFixed(2)} (estimated)</li>
                                ` : ''}
                                
                                ${periodSelect === 'Biweekly' ? `
                                    <li>Weekly Expenses: $${((currentIncome.textContent) * (45 / 100)).toFixed(2)}</li>
                                    <li>Monthly Expenses: $${((currentIncome.textContent * 2) * (45 / 100)).toFixed(2)}</li>
                                ` : ''}
                                <br>
                                <h4>Example Needs Breakdown:</h4> 
                                <ul>
                                    <li><strong>Housing (25%):</strong>  $${((currentIncome.textContent) * 0.25).toFixed(2)}</li>
                                    <li><strong>Utilities/Internet (5%):</strong>  $${((currentIncome.textContent) * 0.05).toFixed(2)}</li>
                                    <li><strong>Groceries (5%):</strong>  $${((currentIncome.textContent) * 0.05).toFixed(2)}</li>
                                    <li><strong>Transportation (8%):</strong>  $${((currentIncome.textContent) * 0.08).toFixed(2)}</li>
                                </ul>
                                <br>

                                <h3>Spending Power:</h3>
                                Give yourself 5% of your income for fun stuff:
                                ${periodSelect === 'Weekly' ? `
                                    <li>Weekly Expenses: $${((currentIncome.textContent) * (5 / 100)).toFixed(2)}</li>
                                    <li>Monthly Expenses: $${((currentIncome.textContent * 4) * (5 / 100)).toFixed(2)} (estimated)</li>
                                ` : ''}
                                
                                ${periodSelect === 'Biweekly' ? `
                                    <li>Weekly Expenses: $${((currentIncome.textContent) * (5 / 100)).toFixed(2)}</li>
                                    <li>Monthly Expenses: $${((currentIncome.textContent * 2) * (5 / 100)).toFixed(2)}</li>
                                ` : ''}
                        `;
                        break;
                    case "60":
                        budgetPlanDiv.innerHTML = `
                            <p><strong>Income Frequency:</strong> ${periodSelect}</p>
                            <p><strong>Savings Percentage:</strong> ${selectedPercentage}%</p>
                            <p><strong>City:</strong> ${selectedCity}</p>

                            <h2>Your Plan:</h2>
                            <p>60% is very risky and very aggressive, requiring serious spending awareness and patience. <br>
                            We do not recommend unless you are wealth-building and can live with the minimal necessities</p>
                            <ul>
                                <h3>Savings:</h3>
                                Set aside 60% of your income:
                                ${periodSelect === 'Weekly' ? `
                                    <li>Weekly Savings: $${((currentIncome.textContent) * (selectedPercentage / 100)).toFixed(2)}</li>
                                    <li>Monthly Savings: $${((currentIncome.textContent * 4) * (selectedPercentage / 100)).toFixed(2)} (estimated)</li>
                                ` : ''}
                                
                                ${periodSelect === 'Biweekly' ? `
                                    <li>Weekly Savings: $${((currentIncome.textContent) * (selectedPercentage / 100)).toFixed(2)}</li>
                                    <li>Monthly Savings: $${((currentIncome.textContent * 2) * (selectedPercentage / 100)).toFixed(2)}</li>
                                ` : ''}
                                <br>

                                <h3>Expenses:</h3>
                                Allocate 35% of your income for needs:
                                ${periodSelect === 'Weekly' ? `
                                    <li>Weekly Expenses: $${((currentIncome.textContent) * (50 / 100)).toFixed(2)}</li>
                                    <li>Monthly Expenses: $${((currentIncome.textContent * 4) * (50 / 100)).toFixed(2)} (estimated)</li>
                                ` : ''}
                                
                                ${periodSelect === 'Biweekly' ? `
                                    <li>Weekly Expenses: $${((currentIncome.textContent) * (50 / 100)).toFixed(2)}</li>
                                    <li>Monthly Expenses: $${((currentIncome.textContent * 2) * (50 / 100)).toFixed(2)}</li>
                                ` : ''}
                                <br>
                                <h4>Example Needs Breakdown:</h4> 
                                <ul>
                                    <li><strong>Housing (23% max):</strong> $${((currentIncome.textContent) * (23 / 100)).toFixed(2)}
                                    <li><strong>Utilities/Internet (5%):</strong> $${((currentIncome.textContent) * (5 / 100)).toFixed(2)} (Focus on utilities and Very Cheap Internet)</li>
                                    <li><strong>Groceries (5%):</strong> $${((currentIncome.textContent) * (5 / 100)).toFixed(2)} (Shop Very Frugally)</li>
                                    <li><strong>Transportation (2%):</strong> $${((currentIncome.textContent) * (2 / 100)).toFixed(2)} (Prioritize Walking)</li>
                                </ul>
                                <br>

                                <h3>Spending Power:</h3>
                                Give yourself 5% of your income for fun stuff:
                                ${periodSelect === 'Weekly' ? `
                                    <li>Weekly Expenses: $${((currentIncome.textContent) * (10 / 100)).toFixed(2)}</li>
                                    <li>Monthly Expenses: $${((currentIncome.textContent * 4) * (10 / 100)).toFixed(2)} (estimated)</li>
                                ` : ''}
                                
                                ${periodSelect === 'Biweekly' ? `
                                    <li>Weekly Expenses: $${((currentIncome.textContent) * (10 / 100)).toFixed(2)}</li>
                                    <li>Monthly Expenses: $${((currentIncome.textContent * 2) * (10 / 100)).toFixed(2)}</li>
                                ` : ''}
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