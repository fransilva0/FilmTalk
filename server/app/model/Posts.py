from app.shared.dataBase import db


class Posts(db.Model):
    
    __tablename__ = "posts"

    title = db.Column(db.String(255),nullable=False)
    publication = db.Column(db.String,nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    user = db.relationship("User", back_populates='posts')


    def __init__(self,title,publication,user_id):
        self.title = title
        self.publication = publication
        self.user_id = user_id