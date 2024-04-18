from app.shared.validation_methods import validate_username,validate_email,validate_password
from app.model.User import User
from app.schemas.UserSchema import UserSchema
from app.repository.UserRepository import UserRepository
from app import bcrypt


user = User(username=None,email=None,password=None)
userSchema = UserSchema()
userRepository = UserRepository()
class UserService:
    
    def __init__(self) -> None:
        pass
    
    
    def add_new_user(self,username,email,password):
        user.username = username         
        user.email = email         
        user.password =  bcrypt.generate_password_hash(password).decode("utf-8")         
        userRepository.save(user)         
        return

    
    def findUserById(self,id):
        user = userRepository.getById(id=id)
        return user
    
    def findUserByUsername(self,username):
        user = userRepository.getByUsername(username=username)
        return user
    
    def findUserByEmail(self,email):
        user = userRepository.getByEmail(email=email)
        return user

    def validate_new_user(self,username,email,password):
        validate_username(username)
        validate_email(email)
        validate_password(password)
        pass
        


    def authenticate_user(self,username,password):
        user = userRepository.getByUsername(username=username)
        if not bcrypt.check_password_hash(user.password, password):
            raise Exception("Usuário e/ou senha inválidos",401)
        user = userSchema.dump(user)
        user.pop("password")
        return user

