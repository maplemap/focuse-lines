import os
import sqlite3
from flask import Flask
from flask_session import Session

app = Flask(__name__)
db_host = os.getenv("DB_HOST")

# Configure session to use filesystem (instead of signed cookies)
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)

# sqlite3.connect('sqlite:///' + db_host)

@app.route('/')
def hello_world():
    return {
        "message": "Hello World!",
    }

