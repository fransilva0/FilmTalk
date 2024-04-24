from app.model.Posts import Posts
from app.schemas.PostsSchema import PostsSchema
from app.repository.PostsRepository import PostsRepository


postsSchema = PostsSchema()
postsRepository = PostsRepository()

class PostsService:
    
    def __init__(self) -> None:
        pass

    def add_new_publication(self,title,publication,user_id):
        post = Posts(title=None,publication=None,user_id=None)
        post.title = title
        post.publication = publication
        post.user_id = user_id
        postsRepository.save(post)
        print(post)
        return
    
    def update_publication(self,user_id,post_id,title,publication):
        post = postsRepository.getById(post_id)
        if post.user_id != user_id:
            raise Exception("Você não tem permissão para editar esse post!", 403)
        post.title = title
        post.publication = publication
        postsRepository.update(post)
        return
    
    def delete_publication(self,user_id,post_id):
        post = postsRepository.getById(post_id)
        if post.user_id != user_id:
            raise Exception("Você não tem permissão para deletar esse post!", 403)
        postsRepository.delete(post)
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
    