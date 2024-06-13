from app.model.Posts import Posts
from app.schemas.PostsSchema import PostsSchema
from app.repository.PostsRepository import PostsRepository
from app.shared.util.api_methods import convert_rows_object_to_dict,paginate,convert_row_to_dict

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
        return
    
    def update_publication(self,user_id,post_id,title,publication):
        post = postsRepository.get_by_id_scarlar(post_id)
        if post == None:
            raise Exception("Publicação não encontrada ou não existe!",404)
        if post.user_id != user_id:
            raise Exception("Você não tem permissão para editar esse post!", 403)
        post.title = title
        post.publication = publication
        postsRepository.update(post)
        return
    
    def delete_publication(self,user_id,post_id):
        post = postsRepository.get_by_id_scarlar(id=post_id)
        if post == None:
            raise Exception("Publicação não encontrada ou não existe!",404)
        if post.user_id != user_id:
            raise Exception("Você não tem permissão para deletar esse post!", 403)
        postsRepository.delete(post)
        return
        
    def find_publication_by_id(self,id):
        post = postsRepository.get_by_id(id=id)
        if post == None:
            raise Exception("Publicação não encontrada ou não existe!",404)
        post_dict = convert_row_to_dict(post)
        return post_dict

    def find_user_Publications_page(self,user_id,offset,limit):
        posts = postsRepository.get_all_by_user_id(userId=user_id)
        posts_dict = convert_rows_object_to_dict(posts)
        page,pagination = paginate(offset=offset,limit=limit,list=posts_dict)
        response = {
            "data":page,
            "pagination":pagination
        }
        return response

    def find_Publications_page_by_username(self,username,offset,limit):
        posts = postsRepository.get_all_by_username(username=username)
        posts_dict = convert_rows_object_to_dict(posts)
        page,pagination = paginate(offset=offset,limit=limit,list=posts_dict)
        response = {
            "data":page,
            "pagination":pagination
        }
        return response
    
    def find_publications_page(self,offset,limit):
        posts = postsRepository.get_all_ordered_by_time_created()
        posts_dict = convert_rows_object_to_dict(posts)
        page,pagination = paginate(offset=offset,limit=limit,list=posts_dict)
        response = {
            "data":page,
            "pagination":pagination
        }
        return response
        