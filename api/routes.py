from app import app
from db import connect_db
from flask import jsonify, request
from werkzeug.security import check_password_hash, generate_password_hash

@app.route('/users')
def index():
    db = connect_db()
    db.execute("SELECT id, name, email FROM users")
    db.close()

    resp = jsonify(db.fetchall())
    resp.status_code = 200

    return resp

@app.route('/user', methods=["GET", "POST", "PUT", "DELETE"])
def user():
    if request.method == "GET":
        db = connect_db()
        db.execute("SELECT id, name, email FROM users WHERE id = %s", (request.args.get("id")))
        db.close()

        resp = jsonify(db.fetchone())
        resp.status_code = 200

        return resp

    elif request.method == "POST":
        request_body = request.get_json()
        name = request_body.get("name")
        email = request_body.get("email")
        password = request_body.get("password")
        confirmation = request_body.get("confirmation")

        if not name or not email or not password or not confirmation:
            resp = jsonify({"error": "Please provide all required fields"})
            resp.status_code = 400
            return resp

        if password != confirmation:
            resp = jsonify({"error": "Password and confirmation do not match"})
            resp.status_code = 400
            return resp

        db = connect_db()
        db.execute(
            "INSERT  INTO users (name, email, hash) VALUES (%s, %s, %s)",
            (name, email, generate_password_hash(password))
        )
        db.commit()
        db.execute("SELECT LAST_INSERT_ID() as id;")
        db.execute("SELECT id, name, email FROM users WHERE id = %s", (db.fetchone()["id"]))
        db.close()

        resp = jsonify(db.fetchone())
        resp.status_code = 200

        return resp

    if request.method == "PUT":
        request_body = request.get_json()
        id = request_body.get("id")
        name = request_body.get("name")
        email = request_body.get("email")

        db = connect_db()
        db.execute("SELECT id FROM users WHERE id = %s", (id))
        if not db.fetchone():
            resp = jsonify({"error": "User does not exist"})
            resp.status_code = 400
            return resp

        db.execute(
            "UPDATE users SET name = COALESCE(%s, name), email = COALESCE(%s, email) WHERE id = %s",
            (name, email, id)
        )
        db.execute("SELECT id, name, email FROM users WHERE id = %s", id)
        db.commit()
        db.close()

        resp = jsonify(db.fetchone())
        resp.status_code = 200

        return resp

    elif request.method == "DELETE":
        db = connect_db()
        db.execute("DELETE FROM users WHERE id = %s", (request.args.get("id")))
        db.commit()
        db.close()

        resp = jsonify({"status": "success"})
        resp.status_code = 200

        return resp


if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0')
