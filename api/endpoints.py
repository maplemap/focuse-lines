from app import app
from db import connect_db
from flask import jsonify, request
import json
from werkzeug.security import check_password_hash, generate_password_hash
from datetime import datetime, timedelta, timezone
from flask_jwt_extended import create_access_token,get_jwt, get_jwt_identity, unset_jwt_cookies, jwt_required, JWTManager, get_jwt

app.config["JWT_SECRET_KEY"] = "please-remember-to-change-me"
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)
jwt = JWTManager(app)
jwt_blocklist = list()

@app.after_request
def refresh_expiring_jwts(resp):
    try:
        exp_timestamp = get_jwt()["exp"]
        now = datetime.now(timezone.utc)
        target_timestamp = datetime.timestamp(now + timedelta(minutes=30))
        if target_timestamp > exp_timestamp:
            access_token = create_access_token(identity=get_jwt_identity())
            data = resp.get_json()
            if type(data) is dict:
                data["access_token"] = access_token
                resp.data = json.dumps(data)
        return resp
    except (RuntimeError, KeyError):
        # Case where there is not a valid JWT. Just return the original response
        return resp

@jwt.token_in_blocklist_loader
def check_if_token_revoked(jwt_header, jwt_payload: dict) -> bool:
    return jwt_payload["jti"] in jwt_blocklist

@app.route('/token', methods=["POST"])
def create_token():
    request_body = request.get_json()
    email = request_body.get("email")
    password = request_body.get("password")

    db = connect_db()
    db.execute("SELECT * FROM users WHERE email = %s", (email))
    user = db.fetchone()

    if not user:
        resp = jsonify({"error": "User not found"})
        resp.status_code = 401
        return resp

    if email != user.get("email") or not check_password_hash(user.get("hash"), password):
        resp = jsonify({"error": "Wrong email or password"})
        resp.status_code = 401
        return resp

    access_token = create_access_token(identity=email)
    app.session["user_id"] = user.get("id")
    app.session["user_name"] = user.get("name")
    app.session["user_email"] = user.get("email")


    resp = jsonify({"access_token": access_token})
    resp.status_code = 200

    return resp

@app.route("/get-user")
def get_user():
    resp = jsonify({
        "id": app.session.get("user_id"),
        "name": app.session.get("user_name"),
        "email": app.session.get("user_email")
    })
    resp.status_code = 200

    return resp

@app.route("/registration", methods=["POST"])
def registration():
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
    db.execute("SELECT * FROM users WHERE email = %s", (email))

    if db.fetchone():
        resp = jsonify({"error": "User already exists"})
        resp.status_code = 400
        return resp

    db.execute(
        "INSERT  INTO users (name, email, hash) VALUES (%s, %s, %s)",
        (name, email, generate_password_hash(password))
    )
    db.commit()
    db.execute("SELECT LAST_INSERT_ID() as id;")
    db.execute("SELECT id, name, email FROM users WHERE id = %s", (db.fetchone()["id"]))
    db.close()

    user = db.fetchone()

    access_token = create_access_token(identity=email)
    app.session["user_id"] = user.get("id")
    app.session["user_name"] = user.get("name")
    app.session["user_email"] = user.get("email")

    resp = jsonify({"access_token": access_token})
    resp.status_code = 200

    return resp

@app.route("/logout")
@jwt_required()
def logout():
    jti = get_jwt()["jti"]
    jwt_blocklist.append(jti)
    app.session.clear()

    resp = jsonify({"status": "success"})
    resp.status_code = 200

    return resp

@app.route('/user', methods=["PUT", "DELETE"])
@jwt_required()
def user():
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

@app.route('/lines')
@jwt_required()
def links():
    db = connect_db()
    db.execute("SELECT id, name, date_of_start, date_of_end  FROM `lines` WHERE user_id = %s", (app.session.get("user_id")))

    resp = jsonify(db.fetchall())
    resp.status_code = 200
    db.close()

    return resp

@app.route('/line', methods=["GET", "POST", "PUT", "DELETE"])
@jwt_required()
def line():
    if request.method == "GET":
        db = connect_db()
        db.execute("SELECT * FROM `lines` WHERE user_id = %s AND id = %s", (app.session.get("user_id"), request.args.get("id")))
        db.close()

        resp = jsonify(db.fetchone())
        resp.status_code = 200

        return resp

    elif request.method == "POST":
        request_body = request.get_json()
        name = request_body.get("name")
        date_of_start = request_body.get("date_of_start")
        date_of_end = request_body.get("date_of_end")
        user_id = app.session.get("user_id")

        db = connect_db()
        db.execute(
            "INSERT  INTO `lines` (name, date_of_start, date_of_end, user_id) VALUES (%s, %s, %s, %s)",
            (name, date_of_start, date_of_end, user_id)
        )
        db.commit()
        db.execute("SELECT LAST_INSERT_ID() as id;")
        db.close()

        resp = jsonify({"id": db.fetchone()["id"]})
        resp.status_code = 200

        return resp

    if request.method == "PUT":
        request_body = request.get_json()
        id = request_body.get("id")
        name = request_body.get("name")
        date_of_start = request_body.get("date_of_start")
        date_of_end = request_body.get("date_of_end")

        db = connect_db()
        db.execute(
            "UPDATE `lines` SET name = COALESCE(%s, name), date_of_start = COALESCE(%s, date_of_start), date_of_end = COALESCE(%s, date_of_end)  WHERE user_id = %s AND id = %s",
            (name, date_of_start, date_of_end, app.session.get("user_id"), id)
        )
        db.execute("SELECT id, name, email FROM users WHERE id = %s", id)
        db.commit()
        db.close()

        resp = jsonify(db.fetchone())
        resp.status_code = 200

        return resp

    elif request.method == "DELETE":
        db = connect_db()
        db.execute("DELETE FROM `lines` WHERE id = %s", (request.args.get("id")))
        db.commit()
        db.close()

        resp = jsonify({"status": "success"})
        resp.status_code = 200

        return resp



if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0')
