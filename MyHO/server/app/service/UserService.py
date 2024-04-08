from app.shared.validation_methods import validate_username,validate_email,validate_password

class UserService:
    
    def __init__(self) -> None:
        pass

    def validate_new_user(self,username,email,password):
        response = None
        try:
            validate_username(username)
            validate_email(email)
            validate_password(password)
        except:
            return response
        return response

