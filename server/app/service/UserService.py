from app.shared.validation_methods import validate_username,validate_email,validate_password
from app.model.User import User
from app.schemas.UserSchema import UserSchema
from app.repository.UserRepository import UserRepository
from app import bcrypt


userSchema = UserSchema()
userRepository = UserRepository()
class UserService:
    
    def __init__(self) -> None:
        pass
    
    
    def add_new_user(self,username,email,password):
        user = User(username=None,email=None,password=None)
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
        if user == None:
            raise Exception("Usuário não encontrado ou não existe!",404)
        return user
    
    def findUserByEmail(self,email):
        user = userRepository.getByEmail(email=email)
        if user == None:
            raise Exception("Usuário não encontrado ou não existe!",404)
        return user
    

    def validate_new_username(self,username):
        validate_username(username)
        user = userRepository.getByUsername(username=username)
        if user != None:
            raise Exception("Esse Username já foi cadastrado!",409)
        pass
        

    def validate_new_email(self,email):
        validate_email(email)
        user = userRepository.getByEmail(email=email)
        if user != None:
            raise Exception("Esse e-mail já foi cadastrado",409)
        pass


    def update_username(self,user_id,username):
        user = userRepository.getById(user_id)
        user.username = username
        userRepository.update(user)
        return 
    
    def update_email(self,user_id,email):
        user = userRepository.getById(user_id)
        user.email = email
        userRepository.update(user)
        return 
    
    def update_password(self,user_id,password):
        user = userRepository.getById(user_id)
        user.password =  bcrypt.generate_password_hash(password).decode("utf-8")
        userRepository.update(user)
        return 
    

    def authenticate_user(self,username,password):
        user = userRepository.getByUsername(username=username)
        if user == None:
            raise Exception("Usuário e/ou senha inválidos",401)
        if not bcrypt.check_password_hash(user.password, password):
            raise Exception("Usuário e/ou senha inválidos",401)
        user = userSchema.dump(user)
        user.pop("password")
        user.pop("posts")
        return user

