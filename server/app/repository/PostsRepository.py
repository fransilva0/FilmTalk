from app.model.Posts import Posts
from app.shared.baseRepository import BaseRepository
from app.shared.dataBase import db

class PostsRepository(BaseRepository):
    

    def __init__(self):
        super().__init__(Posts)

    def getAllByUserId(self,userId):

        posts = db.session.scalars(db.select(Posts).filter_by(user_id=userId)).fetchmany()
        return posts

