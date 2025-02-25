const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

const functions = require("firebase-functions");
const { exec } = require("child-process-promise");

// HTTP-triggered Cloud Function
exports.runPythonScript = functions.https.onRequest(async (req, res) => {
  try {
    // Get data from the frontend
    const { firstName, lastName, email, password } = req.body;

    // Call the Python script
    const result = await exec(`python3 ./scripts/process-data.py "${firstName}" "${lastName}" "${email}" "${password}"`);

    // Send the result back to the frontend
    res.status(200).json({ message: result.stdout });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: error.message });
  }
});
