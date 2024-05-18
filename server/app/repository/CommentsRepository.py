from app.model.Comments import Comments
from app.model.User import User
from app.shared.baseRepository import BaseRepository
from app.shared.dataBase import db
from overrides import override
class CommentsRepository(BaseRepository):
    

    def __init__(self):
        super().__init__(model=Comments)

    @override
    def get_by_id(self, id):
        stmt = db.select(Comments.id,Comments.commentary,Comments.post_id,User.username,Comments.time_created,Comments.time_updated).join(User.comments).filter_by(id=id)
        comment = db.session.execute(stmt).fetchone()
        return comment
    
    def get_by_id_scalar(self,id):
        comment = super().get_by_id(id=id)
        return comment
    
    def get_all_by_post_id(self,post_id):
        stmt = db.select(Comments.id,Comments.commentary,Comments.post_id,User.username,Comments.time_created,Comments.time_updated).join(User.comments).filter_by(post_id=post_id).order_by(Comments.time_created.desc())
        comments = db.session.execute(stmt).fetchmany()
        return comments