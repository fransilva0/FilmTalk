from app.shared.dataBase import db
from app.model.Posts import Posts
class User(db.Model):

    __tablename__ = "users"
 
    username = db.Column(db.String(30), unique=True , nullable=False)
    email = db.Column(db.String(30), unique=True , nullable=False)
    password = db.Column(db.String , nullable=False)
    posts = db.relationship('Posts', back_populates='user')

    def __init__(self,username,email,password):
        self.username = username
        self.email = email
        self.password = password