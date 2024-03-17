from time import sleep
from flask import Flask, request
import json

app = Flask(__name__)
@app.route('/')
def index():
    return 'Web App with Python Flask!'

@app.route('/', methods=['GET', 'POST'])
def parse_request():
    if request.method == 'POST':
        data = request.get_json()
        if data["job"] == "signup":
            email = data['email']
            password = data["password"]
            username = data["username"]
            phonenumber = data["phonenumber"]
            Government = data["Government"]
            Academy = data["Academy"]
            Age = data["Age"]
            with open('main.json','r+') as file:
                file_data = json.load(file)
                if any(x["email"] == data["email"] for x in file_data['accounts']):
                    return "email is exist"
                
                file_data["accounts"].append({"email": email, "password": password, "username": username, "phonenumber": phonenumber, "Government": Government, "Academy": Academy, "Age": Age})
                with open('main.json', 'w', encoding='utf-8') as json_file:
                    json.dump(file_data, json_file, indent = 4)
                    return "Done"
                
        if data["job"] == "login":
            email = data['email']
            password = data["password"]
            with open('main.json','r+') as file:
                file_data = json.load(file)
                if any(x["email"] == data["email"] for x in file_data['accounts']) == False:
                    return "wrong"
                elif any(x["email"] == data["email"] for x in file_data['accounts']) == True:
                    if any(x["password"] == data["password"] for x in file_data['accounts']) == True:
                        return "right"
                    else:
                        return "wrong"
    else :
        return "bye"
app.run(host='0.0.0.0', port=81)

   