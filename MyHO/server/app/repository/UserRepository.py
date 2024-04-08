from app.model.User import User
from app.shared.baseRepository import BaseRepository
from app.schemas.UserSchema import UserSchema

userSchema = UserSchema()
class UserRepository(BaseRepository):
    

    def __init__(self):
        super().__init__(User)

    
    def add_new_user(self,username,email,password):        
        user = User(
            username = username,
            email = email,
            password = password
        )
        self.save(user)
        
        return userSchema.dump(user)
