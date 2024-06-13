from app.shared.dataBase import db
from app.model.Posts import Posts
from app.model.Comments import Comments
class User(db.Model):

    __tablename__ = "users"
 
    username = db.Column(db.String(30), unique=True , nullable=False)
    email = db.Column(db.String(30), unique=True , nullable=False)
    password = db.Column(db.String , nullable=False)
    link = db.Column(db.String)
    bio = db.Column(db.String)

    posts = db.relationship('Posts', back_populates='user')
    comments = db.relationship('Comments', back_populates='user')
    #connections = db.relationship('Connections', back_populates='user')

    def __init__(self,username,email,password):
        self.username = username
        self.email = email
        self.password = password
        self.bio = None
        self.link = None