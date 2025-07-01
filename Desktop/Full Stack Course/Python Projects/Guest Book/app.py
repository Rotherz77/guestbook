from flask import Flask, request, jsonify, render_template
import json
import os

app = Flask(__name__)


@app.route('/')
def index():
    return render_template('index.html')


DATA_FILE = "messages.json"

def load_messages():
    if os.path.exists(DATA_FILE):
        with open(DATA_FILE, "r") as f:
            return json.load(f)
    else:
        return []

@app.route('/messages', methods=["GET"])
def get_messages():
    messages = load_messages()
    return jsonify(messages)

@app.route('/messages', methods=["POST"])
def add_messages():
    data = request.get_json()
    messages = load_messages()
    messages.append(data)
    
    with open(DATA_FILE, "w") as f:
        json.dump(messages, f, indent=2)
    
    return jsonify({"success": True})

if __name__ == '__main__':
    app.run(debug=True)
