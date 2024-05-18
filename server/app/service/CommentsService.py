from app.model.Comments import Comments
from app.schemas.CommentsSchema import CommentsSchema
from app.repository.CommentsRepository import CommentsRepository
from app.shared.util.api_methods import convert_rows_object_to_dict,paginate,convert_row_to_dict
from app.service.PostsService import PostsService

commentsSchema = CommentsSchema()
commentsRepository = CommentsRepository()
postService = PostsService()

class CommentsService:
    
    def __init__(self) -> None:
        pass
    

    def add_new_comment(self,commentary,user_id,post_id):
        if postService.find_publication_by_id(id=post_id) == None:
            raise Exception("Publicação não pode ser encontrada ou não existe",404) 
        comment = Comments(commentary=None,user_id=None,post_id=None)
        comment.commentary = commentary
        comment.user_id = user_id
        comment.post_id = post_id
        commentsRepository.save(comment)
        return
    

    def find_commentary_by_id(self,id):
        comment = commentsRepository.get_by_id(id=id)
        if comment == None:
            raise Exception("Comentário não encontrado ou não existe!",404)
        comment_dict = convert_row_to_dict(comment)
        return comment_dict
    

    def update_commentary(self,comment_id,user_id,comment):
        commentary = commentsRepository.get_by_id_scalar(id=comment_id)
        if commentary == None:
            raise Exception("Comentário não encontrado ou não existe!",404)
        if commentary.user_id != user_id:
            raise Exception("Você não tem permissão para editar esse Comentário!", 403)
        commentary.commentary = comment
        commentsRepository.update(commentary)
        return


    def delete_commentary(self,comment_id,user_id):
        commentary = commentsRepository.get_by_id_scalar(id=comment_id)
        if commentary == None:
            raise Exception("Comentário não encontrado ou não existe!",404)
        if commentary.user_id != user_id:
            raise Exception("Você não tem permissão para Apagar esse Comentário!", 403)
        commentsRepository.delete(commentary)
        return
    

    def find_post_comments_page(self,post_id,offset,limit):
        if postService.find_publication_by_id(id=post_id) == None:
            raise Exception("Publicação não pode ser encontrada ou não existe",404) 
        comments = commentsRepository.get_all_by_post_id(post_id)
        comments_dict = convert_rows_object_to_dict(comments)
        page,pagination = paginate(offset=offset,limit=limit,list=comments_dict)
        response = {
            "data":page,
            "pagination":pagination
        }
        return response