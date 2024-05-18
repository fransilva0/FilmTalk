from app.shared.dataBase import db

class Comments(db.Model):

    __tablename__ = "comments"

    commentary = db.Column(db.String,nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey("posts.id"), nullable=False)

    user = db.relationship("User", back_populates='comments')
    post = db.relationship("Posts", back_populates='comments')

    def __init__(self,commentary,user_id,post_id):
        self.commentary = commentary
        self.user_id = user_id
        self.post_id = post_id