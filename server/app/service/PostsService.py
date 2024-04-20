from app.model.Posts import Posts
from app.schemas.PostsSchema import PostsSchema
from app.repository.PostsRepository import PostsRepository

post = Posts(title=None,publication=None,user_id=None)
postsSchema = PostsSchema()
postsRepository = PostsRepository()

class PostsService:
    
    def __init__(self) -> None:
        pass

    def add_new_publication(self,title,publication,user_id):
        
        post.title = title
        post.publication = publication
        post.user_id = user_id
        postsRepository.save(post)
        return
    def findPublicationById(self,id):
        ...
    def findAllPublicationByUserId(self,user_id):
        publications = postsRepository.getAllByUserId(user_id)
        response = postsSchema.dump(publications,many=True)
        if len(response) > 0:
            for  publication in response:
                publication.pop("user_id")
        return response