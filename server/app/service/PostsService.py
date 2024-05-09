from app.model.Posts import Posts
from app.schemas.PostsSchema import PostsSchema
from app.repository.PostsRepository import PostsRepository
from app.shared.util.api_methods import convert_posts_userid_to_username

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
        
    def find_Publication_By_Id(self,id):
        post = postsRepository.getById(id)
        if post == None:
            raise Exception("Publicação não encontrado ou não existe!",404)
        #comments = find_all_comments_by_post_id(post.id)
        post = postsSchema.dump(post)
        #post["comments"] = comments
        response = convert_posts_userid_to_username(post)
        return response
        
    def findAllPublicationByUserId(self,user_id):
        publications = postsRepository.getAllByUserId(user_id)
        response = postsSchema.dump(publications,many=True)
        if len(response) > 0:
            for  publication in response:
                publication.pop("user_id")
        return response

    def paginate_publications(self,offset,limit):
        paginate = postsRepository.get_page_order_by_time_created(offset=offset,limit=limit)
        if paginate == None:
            raise Exception("Not Found",404)
        else:
            json_page = postsSchema.dump(paginate.items,many=True)
            pagination = {
                "total_records": paginate.total,
                "current_page": paginate.page,
                "total_pages": paginate.pages,
                "next_page": paginate.next_num,
                "prev_page": paginate.prev_num
            }
            response = {
                "data" : convert_posts_userid_to_username(json_page=json_page),
                "pagination" : pagination
            }
            return response
        