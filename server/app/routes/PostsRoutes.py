from flask import Blueprint,request,make_response
from app.shared.responses import error_response,success_response
from app.service.PostsService import PostsService
from auth_middleware import token_required

posts_bp = Blueprint('posts_api',__name__,url_prefix='/posts')
postsService = PostsService()


#TODO: criar um funcao para substituir as validacoes iniciais de todas que sao iguais
@posts_bp.route("",methods=["GET", "POST"])
@token_required
def create_publication(current_user):
    if request.method == "POST":
        if request.is_json:
            data = request.get_json()
            if len(data) < 2:
                return make_response(error_response(action="Create Post",error_code=400,error_message="missing one or more parameters"))
            elif "title" not in data or "publication" not in data:
                return make_response(error_response(action="Create Post",error_code=400,error_message="request body must contains 'title' and 'publication'"))
            else:
                try:
                    title = data.get("title")
                    publication = data.get("publication")
                    postsService.add_new_publication(title=title,publication=publication,user_id=current_user.id)
                    return make_response(success_response(action="Create Post"))
                except Exception as err:
                    if len(err.args) == 2:
                        return make_response(error_response(action="Create Post",error_message=err.args[0],error_code=err.args[1]))
                    else:
                        return make_response(error_response(action="Create Post",error_message=str(err),error_code=500))
        else:                                                                               
            return make_response(error_response(action="Create Post",error_message="missing json request body",error_code=400))
        
    elif request.method == "GET":
        user_id = current_user.id
        if "limit" in request.args and not request.args.get('limit').isnumeric():
            return make_response(error_response(action="Get User Posts Page",error_message="limit must be a Integer number",error_code=400))
        limit = request.args.get('limit', type=int, default=10) 
        if "offset" in request.args and not request.args.get('offset').isnumeric():
            return make_response(error_response(action="Get User Posts Page",error_message="offset must be a Integer number",error_code=400))
        offset = request.args.get('offset', type=int, default=1)     
        if limit < 1:
            return make_response(error_response(action="Get User Posts Page",error_message="limit cannot be less than one",error_code=400))
        if offset < 1:
            return make_response(error_response(action="Get User Posts Page",error_message="offset cannot be less than one",error_code=400))
        try:
            request_data = postsService.find_user_Publications_page(user_id=user_id,offset=offset,limit=limit)
            return make_response(success_response(action="Get User Posts Page",parameter=request_data))
        except Exception as err:
            if len(err.args) == 2:
                return make_response(error_response(action="Get User Posts Page",error_message=err.args[0],error_code=err.args[1]))
            else:
                return make_response(error_response(action="Get User Posts Page",error_message=str(err),error_code=500))     
            
    else:                                                                          
        return make_response(error_response(action="/posts",error_message="Bad Request",error_code=400))
    

@posts_bp.route("/page",methods=["GET"])
def find_and_page_publications():
    if request.method == "GET":
        if "limit" in request.args and not request.args.get('limit').isnumeric():
            return make_response(error_response(action="Get All Users Posts Page",error_message="limit must be a number",error_code=400))
        limit = request.args.get('limit', type=int, default=10) 
        if "offset" in request.args and not request.args.get('offset').isnumeric():
            return make_response(error_response(action="Get All Users Posts Page",error_message="offset must be a number",error_code=400))
        offset = request.args.get('offset', type=int, default=1)     
        if limit < 1:
            return make_response(error_response(action="Get All Users Posts Page",error_message="limit cannot be less than one",error_code=400))
        if offset < 1:
            return make_response(error_response(action="Get All Users Posts Page",error_message="offset cannot be less than one",error_code=400))
        try:
            request_data = postsService.find_publications_page(limit=limit,offset=offset)
            return make_response(success_response(action="Get All Users Posts Page",parameter=request_data))
        except Exception as err:
            if len(err.args) == 2:
                return make_response(error_response(action="Get All Users Posts Page",error_message=err.args[0],error_code=err.args[1]))
            else:
                return make_response(error_response(action="Get All Users Posts Page",error_message=str(err),error_code=500))
    else:                                                                          
        return make_response(error_response(action="/posts/page",error_message="Bad Request",error_code=400))



@posts_bp.route("/<post_id>",methods=["PUT","DELETE","GET"])
@token_required
def publication_methods(current_user,post_id):
    if not post_id.isnumeric():
        return make_response(error_response(action="/Post/ID",error_message="Parameter ID must be a number",error_code=400))
    post_id = int(post_id)

    if request.method == "GET":
        try:
            publication = postsService.find_publication_by_id(post_id)
            return make_response(success_response(action="Get Post",parameter=publication))
        except Exception as err:
            if len(err.args) == 2:
                return make_response(error_response(action="Get Post",error_message=err.args[0],error_code=err.args[1]))
            else:
                return make_response(error_response(action="Get Post",error_message=str(err),error_code=500))
            
    elif request.method == "PUT":
        if request.is_json:
            data = request.get_json()
            if len(data) < 2:
                return make_response(error_response(action="Edit Post",error_code=400,error_message="missing one or more parameters"))
            elif "title" not in data or "publication" not in data:
                return make_response(error_response(action="Edit Post",error_code=400,error_message="request body must contains 'title' and 'publication'"))
            else:
                try:
                    title = data.get("title")
                    publication = data.get("publication")
                    postsService.update_publication(user_id=current_user.id,post_id=post_id,title=title,publication=publication)
                    return make_response(success_response(action="Edit Post"))
                except Exception as err:
                    if len(err.args) == 2:
                        return make_response(error_response(action="Edit Post",error_message=err.args[0],error_code=err.args[1]))
                    else:
                        return make_response(error_response(action="Edit Post",error_message=str(err),error_code=500))
        else:                                                                           
            return make_response(error_response(action="Edit Post",error_message="missing json request body",error_code=400))
        
    elif request.method == "DELETE":
        try:
            postsService.delete_publication(user_id=current_user.id,post_id=post_id)
            return make_response(success_response(action="Delete Post"))
        except Exception as err:
                    if len(err.args) == 2:
                        return make_response(error_response(action="Delete Post",error_message=err.args[0],error_code=err.args[1]))
                    else:
                        return make_response(error_response(action="Delete Post",error_message=str(err),error_code=500))
                    
    

