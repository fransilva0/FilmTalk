from app.model.Posts import Posts
from app.model.User import User
from app.shared.baseRepository import BaseRepository
from app.shared.dataBase import db

class PostsRepository(BaseRepository):
    

    def __init__(self):
        super().__init__(Posts)

    def getAllByUserId(self,userId):
        posts = db.session.scalars(db.select(Posts).filter_by(user_id=userId)).fetchmany()
        return posts
    
    def get_page_order_by_time_created(self,offset,limit):
        query =  db.paginate(db.select(Posts).order_by(Posts.time_created.desc()),page=offset, per_page=limit, error_out=False)
        return query
        

