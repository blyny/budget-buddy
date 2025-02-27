import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

# Use the application default credentials.
cred = credentials.Certificate("key.json")
firebase_admin.initialize_app(cred)
db = firestore.client()

doc_ref = db.collection("users").document("KeepTesting")
doc_ref.set({"first": "Hello", "last": "World Again!", "born": 2025})
print("User Succesfully Addded!")

users_ref = db.collection("users")
docs = users_ref.stream()

for doc in docs:
    print(f"{doc.id} => {doc.to_dict()}")
