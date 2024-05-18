from app.model.Comments import Comments
from app.shared.dataBase import marshmallow as ma

class CommentsSchema(ma.SQLAlchemyAutoSchema):

    class Meta:
        model = Comments
        include_fk = True