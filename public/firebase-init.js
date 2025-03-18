import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";

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

// Initialize Firebase Authentication and Firestore
const auth = getAuth(app);
const db = getFirestore(app);

// Export the initialized Firebase services
export { app, auth, db };