from app.model.User import User
from app.shared.baseRepository import BaseRepository


class UserRepository(BaseRepository):

    def __init__(self):
        super().__init__(User)
    
    def add_user(self,username,email,password):

        user = User(
            username = username,
            email = email,
            password = password
        )
        self.save(user)
        return user,200
