from app.model.User import User
from app.shared.baseRepository import BaseRepository
<<<<<<< HEAD


=======
from app.shared.dataBase import db

>>>>>>> 574da4e4bd4b7930fac1cc0667918fd3b6605892
class UserRepository(BaseRepository):

    def __init__(self):
        super().__init__(User)
<<<<<<< HEAD
    
    def add_user(self,username,email,password):

        user = User(
            username = username,
            email = email,
            password = password
        )
        self.save(user)
        return user,200
=======
    
    def getByUsername(self,username):
        print("to aqui")
        try:
            user = db.session.execute(db.select(User).filter_by(username=username)).scalar_one()
        except:
            #TODO: traceback runtime error
            print("ocorreu uma exceçao")
            return None
        else:    
            return user
    def getByEmail(self,email):
        try:
            user = db.session.execute(db.select(User).filter_by(email=email)).scalar_one()
        except:
            #TODO: traceback runtime error
            print("ocorreu uma exceçao")
            return None
        else:
            return user

    

>>>>>>> 574da4e4bd4b7930fac1cc0667918fd3b6605892
