import firebase_admin
from firebase_admin import credentials, firestore
from flask import Flask, request, jsonify

# Initialize Firebase Admin SDK
cred = credentials.Certificate("functions/key.json")
firebase_admin.initialize_app(cred)
db = firestore.client()
app = Flask(__name__)


@app.route('/addBudget', methods=['POST'])
def add_budget():
    try:
        data = request.get_json()
        budgetName = data['budgetName']
        budgetLimit = float(data['budgetLimit'])
        userId = data['userId']  # You'll need authentication to get userId

        db.collection('budgets').add({
            'userId': userId,
            'budgetName': budgetName,
            'budgetLimit': budgetLimit
        })
        return jsonify({'message': 'Budget added!'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


def addBudget(request):
    if request.method == 'POST':
        return add_budget()
