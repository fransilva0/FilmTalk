from app.shared.validation_methods import validate_username,validate_email,validate_password
from app.model.User import User
from app.schemas.UserSchema import UserSchema
from app.repository.UserRepository import UserRepository
from app.shared.exceptions_generic.ValidationError import ValidationError

user = User(username=None,email=None,password=None)
userSchema = UserSchema()
userRepository = UserRepository()
class UserService:
    
    def __init__(self) -> None:
        pass
    
    
    def add_new_user(self,username,email,password):        

        user.username = username
        user.email = email
        user.password = password

        try:
            userRepository.save(user)
        except Exception as e:
            #TODO: MELHORAR ESSA EXCECÃO
            print(e.args)
        
        return userSchema.dump(user)
    
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
        response = None
        if userRepository.getByUsername(username=username) != None:
            raise Exception("Esse Username já foi cadastrado")
        print("passa aqui?")
        if userRepository.getByEmail(email=email) != None:
            raise Exception("Esse e-mail já foi cadastrado")
        validate_username(username)
        validate_email(email)
        validate_password(password)
        return response
        


