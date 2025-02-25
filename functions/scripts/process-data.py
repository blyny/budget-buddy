import sys
import firebase_admin
from firebase_admin import credentials, firestore, auth
from flask import Flask, request, jsonify

# Initialize Firebase Admin SDK
cred = credentials.Certificate("../key.json")
firebase_admin.initialize_app(cred)
db = firestore.client()
app = Flask(__name__)


def process_user_data(first_name, last_name, email, password):
    try:
        # Create user in Firebase Authentication
        user = auth.create_user(
            email=email,
            password=password
        )

        # Store user data in Firestore
        user_ref = db.collection("users").document(user.uid)
        user_ref.set({
            "firstName": first_name,
            "lastName": last_name,
            "email": email,
            "createdAt": firestore.SERVER_TIMESTAMP
        })

        print(f"User created and data stored in Firestore: {user.uid}")
    except Exception as e:
        print(f"Error creating user: {e}")
    return f"Processed: {first_name} {last_name}, {email}"


if __name__ == "__main__":
    # Get arguments from the command line
    first_name = sys.argv[1]
    last_name = sys.argv[2]
    email = sys.argv[3]
    password = sys.argv[4]

    # Process the data
    result = process_user_data(first_name, last_name, email, password)

    # Print the result (this will be sent back to the Cloud Function)
    print(result)
