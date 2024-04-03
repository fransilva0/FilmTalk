from sqlalchemy import Integer, String
from sqlalchemy.orm import Mapped, mapped_column
from app.shared.dataBase import db

class User(db.Model):

    __tablename__ = "users"
 
    id = mapped_column(Integer ,primary_key=True,autoincrement=True)
    username = mapped_column(String, unique=True , nullable=False)
    email = mapped_column(String(30), unique=True , nullable=False)
    password = mapped_column(String(25) , nullable=False)

    def __init__(self,username,email,password) -> None:
        self.username = username
        self.email = email
        self.password = password
        