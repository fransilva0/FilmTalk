from app.model.User import User
from app.shared.baseRepository import BaseRepository
from app.shared.dataBase import db

class UserRepository(BaseRepository):
    

    def __init__(self):
        super().__init__(model=User)
    
    def get_by_username(self,username):
        user = db.session.execute(db.select(User).filter_by(username=username)).scalar_one_or_none()
        return user
        
    def get_by_email(self,email):
        user = db.session.execute(db.select(User).filter_by(email=email)).scalar_one_or_none()
        return user


    

