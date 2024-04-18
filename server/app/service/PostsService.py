from app.model.Posts import Posts
from app.schemas.PostsSchema import PostsSchema
from app.repository.PostsRepository import PostsRepository

post = Posts(title=None,text_value=None,user_id=None)
postsSchema = PostsSchema()
postsRepository = PostsRepository()

class PostsService:
    
    def __init__(self) -> None:
        pass

    def add_new_user_post(self,title,publication,user_id):
        
        post.title = title
        post.publication = publication
        post.user_id = user_id
        postsRepository.save(post)
        return 