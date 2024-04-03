from flask import Blueprint,jsonify,request,abort
from app.repository.UserRepository import UserRepository

user_bp = Blueprint('users_api',__name__,url_prefix='/users')

@user_bp.route("/",methods=("GET", "POST","PUT","DELETE"))
def register():
    response = "sucesso!"
    if request.method == "POST":
        if request.is_json:
            data = request.get_json()
            username = data.get("username")
            email = data.get("email")
            password = data.get("password")
            userRepository = UserRepository()
            userRepository.add_user(username=username,email=email,password=password)
            return jsonify(response),200