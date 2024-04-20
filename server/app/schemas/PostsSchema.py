from app.model.Posts import Posts
from app.shared.dataBase import marshmallow as ma

class PostsSchema(ma.SQLAlchemyAutoSchema):

    class Meta:
        model = Posts
        include_fk = True