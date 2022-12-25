from flask import Flask, request, jsonify, send_file, render_template
import os
try:
    from dotenv import load_dotenv
    load_dotenv()
except ImportError: ...
import sqlite3
from utlits import utlit
from datetime import datetime
import hashlib
from pathlib import Path
from werkzeug.utils import secure_filename
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

app.config['UPLOAD_FOLDER'] = "./uploads/"
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024
app.config['DOMAIN'] = "http://127.0.0.1:5500"
# database
con = sqlite3.connect("database.sqlite", check_same_thread=False)
cursor = con.cursor()
cursor.execute("CREATE TABLE IF NOT EXISTS users (id integer PRIMARY KEY, username text, create_at text, password text, token text, email text, role text default NULL)")
cursor.execute("CREATE TABLE IF NOT EXISTS uploads (id integer PRIMARY KEY, filename text, owner intger)")

ALLOWED_EXTENSIONS = set(['txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif', "mp4", "m4p", "m4v"])
VIDEO_EXTENSIONS = set(["mp4", "m4p", "m4v"])

# Pages
@app.route("/")
def index():
    return render_template("index.html")

@app.route("/login")
def login_page():
    return render_template("login.html")

@app.route("/show")
def show_page():
    return render_template("show.html")

@app.route("/uploads/<user_id>/<filename>")
def uploads(user_id, filename):
    path = app.config['UPLOAD_FOLDER'] + str(user_id) + "/" + filename
    print(path)
    if not os.path.exists(path):
        return "This file doesn't exists"
    return send_file(path)

# API
# Allowed file types are txt, pdf, png, jpg, jpeg, gif
@app.route("/api/upload", methods=["POST"])
def upload_image():
    authorization = request.headers.get("Authorization")
    if not authorization:
        return jsonify({"error": f"Not authorization"}), 404
    type, token = authorization.split(" ")[0], authorization.split(" ")[1]
    if type != "Bearer":
        return jsonify({"error": "The only 'Bearer' type to authorization"}), 404
    user = cursor.execute("SELECT id FROM users WHERE token=?", (token,)).fetchone()
    if not user:
        return jsonify({"error": "Invalid token"}), 404   
    if not request.files:
        return jsonify({"error": "No file part in the request"}), 400
    files = request.files.to_dict()
    failure = []
    success = []
    for filename, file in list(files.items()):
        if file and file.filename.split(".")[-1] in ALLOWED_EXTENSIONS:
            file_id = utlit.gen_id(14)
            # <file_id>.<txt|pdf|png|jpg|jpeg|gif>
            filename = str(file_id) + "." + secure_filename(file.filename)
            cursor.execute("INSERT INTO uploads (id, filename, owner) VALUES (?,?,?)", (file_id, filename, user[0]))
            con.commit()
            # Make folder with user id if not exists
            # <uploads>/<user_id>/<file_id>.<txt|pdf|png|jpg|jpeg|gif>
            new_path = Path(app.config['UPLOAD_FOLDER']+"/" + str(user[0]))
            new_path.mkdir(parents=True, exist_ok=True)
            file.save(os.path.join(app.config['UPLOAD_FOLDER'] + str(user[0]) + "/", filename))
            success.append(filename)
        else:                
            failure.append(filename)
        return jsonify({
            'message': f'{len(success)} File successfully uploaded',
            'uploads': [{
                "id": file_id,
                "filename": i,
                "uri": f"{app.config['DOMAIN']}/uploads/{user[0]}/{i[1]}"
            } for i in success]
        })

@app.route("/api/delete", methods=["DELETE"])
def delete_image():
    ...

@app.route("/api/user", methods=["GET"])
def get_user():
    data = request.args
    missing = utlit.required_fields(data, **{"id": str})
    if missing:
        return jsonify({"error": f"The '{missing[0]}' field is required"}), 404
    if not data["id"].isdigit():
        return jsonify({"error": "The 'id' field must intger"})
    user = cursor.execute("SELECT id, username, create_at, role FROM users WHERE id=?", (int(data["id"]),)).fetchone()
    if not user:
        return jsonify({"error": "The user doesn't exists"})
    return jsonify({
        "id": user[0],
        "username": user[1],
        "create_at": user[2],
        "role": user[3]
    })

@app.route("/api/user/uploads", methods=["GET"])
def get_user_uploads():
    authorization = request.headers.get("Authorization")
    if not authorization:
        return jsonify({"error": f"Not authorization"}), 404
    type, token = authorization.split(" ")[0], authorization.split(" ")[1]
    if type != "Bearer":
        return jsonify({"error": "The only 'Bearer' type to authorization"}), 404
    user = cursor.execute("SELECT id FROM users WHERE token=?", (token,)).fetchone()
    if not user:
        return jsonify({"error": "Invalid token"}), 404 
    uploads = cursor.execute("SELECT * FROM uploads WHERE owner=?", (user[0],)).fetchall()
    return jsonify({
        "legthe": len(uploads),
        "uploads": [{
                        "id": i[0],
                        "filename": i[1],
                        "uri": f"{app.config['DOMAIN']}/uploads/{user[0]}/{i[1]}"
                    } for i in uploads]
    })

@app.route("/api/auth/register", methods=["POST"])
def auth_register():
    data = request.json
    missing = utlit.required_fields(data, **{"username": str, "password": str, "email": str})
    if missing:
        return jsonify({"error": f"The '{missing[0]}' field is required"}), 404
    if not utlit.check_email(data["email"]):
        return jsonify({"error": "Invalid email"}), 404
    is_user_exists = cursor.execute("SELECT username FROM users WHERE username=?", (data["username"],)).fetchone()
    if is_user_exists:
        return jsonify({"error": "This username is already exists"}), 404
    token = utlit.gen_token()
    u_id = utlit.gen_id()
    d = (u_id, data["username"], datetime.now(), hashlib.md5(data["password"].encode()).hexdigest(),
        token, data["email"]
    )
    cursor.execute("INSERT INTO users(id, username, create_at, password, token, email) VALUES(?,?,?,?,?,?)", d)
    con.commit()
    return jsonify({"id": u_id, "username": data["username"], "token": token,"email": data["email"]})

@app.route("/api/auth/login", methods=["POST"])
def auth_login():
    data = request.json
    print(data)
    missing = utlit.required_fields(data, **{"username": str, "password": str})
    if missing:
        return jsonify({"error": f"The '{missing[0]}' field is required"}), 404
    password = hashlib.md5(data["password"].encode()).hexdigest()
    token = cursor.execute("SELECT token FROM users WHERE username=? AND password=?", (data["username"], password)).fetchone()
    if not token:
        return jsonify({"error": "username or password is worng"}), 404
    return jsonify({"token": token[0]})

if __name__ == "__main__":
    app.run(port=int(os.environ.get("PORT", "5500")), debug=os.environ.get("DEBUG", True))
