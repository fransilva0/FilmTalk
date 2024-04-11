from app.shared.dataBase import db

class User(db.Model):

    __tablename__ = "users"
 
<<<<<<< HEAD
    id = mapped_column(Integer ,primary_key=True,autoincrement=True)
    username = mapped_column(String, unique=True , nullable=False)
    email = mapped_column(String(30), unique=True , nullable=False)
    password = mapped_column(String(25) , nullable=False)
=======
    id = db.Column(db.Integer ,primary_key=True,autoincrement=True)
    username = db.Column(db.String(30), unique=True , nullable=False)
    email = db.Column(db.String(30), unique=True , nullable=False)
    password = db.Column(db.String(25) , nullable=False)
>>>>>>> 574da4e4bd4b7930fac1cc0667918fd3b6605892

    def __init__(self,username,email,password):
        self.username = username
        self.email = email
        self.password = password
        