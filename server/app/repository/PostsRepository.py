from overrides import override
from app.model.Posts import Posts
from app.shared.baseRepository import BaseRepository
from app.shared.dataBase import db
from app.model.User import User
class PostsRepository(BaseRepository):
    

    def __init__(self):
        super().__init__(model=Posts)

    @override
    def get_by_id(self,id):
        stmt = db.select(Posts.id,Posts.title,Posts.publication,User.username,Posts.time_created,Posts.time_updated).join(User.posts).filter_by(id=id)
        post = db.session.execute(stmt).fetchone()
        return post

    def get_by_id_scarlar(self,id):
        post = super().get_by_id(id=id)
        return post
        
    def get_all_by_user_id(self,userId):
        stmt = db.select(Posts.id,Posts.title,Posts.publication,User.username,Posts.time_created,Posts.time_updated).join(User.posts).filter_by(user_id=userId).order_by(Posts.time_created.desc())
        posts = db.session.execute(stmt).fetchmany()
        return posts
    
    def get_all_by_username(self,username):
        stmt = db.select(Posts.id,Posts.title,Posts.publication,User.username,Posts.time_created,Posts.time_updated).join(User.posts).where(User.username==username).order_by(Posts.time_created.desc())
        posts = db.session.execute(stmt).fetchmany()
        return posts
    
    def get_all_ordered_by_time_created(self):
        stmt = db.select(Posts.id,Posts.title,Posts.publication,User.username,Posts.time_created,Posts.time_updated).join(User.posts).order_by(Posts.time_created.desc())
        posts = db.session.execute(stmt).fetchmany()
        return posts
        

