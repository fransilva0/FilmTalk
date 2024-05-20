from flask import Blueprint,request,make_response
from app.shared.responses import error_response,success_response
from app.service.CommentsService import CommentsService
from auth_middleware import token_required

comments_bp = Blueprint('comments_api',__name__,url_prefix='/comments')
commentsService = CommentsService()



@comments_bp.route("",methods=["POST","GET"])
@token_required
def comments_methods(current_user):
    if request.method == "POST":
        if request.is_json:
            data = request.get_json()
            if "comment" not in data or "post_id" not in data:
                return make_response(error_response(action="Create Post Comment",error_code=400,error_message="request body must contains 'comment' and 'post_id'"))
            elif len(data) < 2:
                return make_response(error_response(action="Create Post Comment",error_code=400,error_message="missing one or more parameters"))
            else:
                try:
                    commentary = data.get("comment")
                    post_id = data.get("post_id")
                    commentsService.add_new_comment(commentary=commentary,user_id=current_user.id,post_id=post_id)
                    return make_response(success_response(action="Create Post"))
                except Exception as err:
                    if len(err.args) == 2:
                        return make_response(error_response(action="Create Post Comment",error_message=err.args[0],error_code=err.args[1]))
                    else:
                        return make_response(error_response(action="Create Post Comment",error_message=str(err),error_code=500))
        else:                                                                              
            return make_response(error_response(action="Create Post Comment",error_message="missing request body",error_code=400))
    elif request.method == "GET":
        if not "post_id" in request.args:
            return make_response(error_response(action="Get Post Comments Page",error_message="post_id Paramater is missing",error_code=400))
        post_id = request.args.get("post_id")
        if post_id.isnumeric():
            try:
                post_id = int(post_id)
            except:
                return make_response(error_response(action="Get Post Comments Page",error_message="invalid number type",error_code=400))
        else:
            return make_response(error_response(action="Get Post Comments Page",error_message="post_id Paramater must be Integer Number",error_code=400))      
        if "limit" in request.args and not request.args.get('limit').isnumeric():
            return make_response(error_response(action="Get User Posts Page",error_message="limit must be a number",error_code=400))
        limit = request.args.get('limit', type=int, default=10) 
        if "offset" in request.args and not request.args.get('offset').isnumeric():
            return make_response(error_response(action="Get User Posts Page",error_message="offset must be a number",error_code=400))
        offset = request.args.get('offset', type=int, default=1)     
        if limit < 1:
            return make_response(error_response(action="Get User Posts Page",error_message="limit cannot be less than one",error_code=400))
        if offset < 1:
            return make_response(error_response(action="Get User Posts Page",error_message="offset cannot be less than one",error_code=400))
        try:
            comments_page = commentsService.find_post_comments_page(post_id=post_id,offset=offset,limit=limit)
            return make_response(success_response(action="Create Post",parameter=comments_page))
        except Exception as err:
            if len(err.args) == 2:
                return make_response(error_response(action="Create Post",error_message=err.args[0],error_code=err.args[1]))
            else:
                return make_response(error_response(action="Create Post",error_message=str(err),error_code=500))
    else:
        return make_response(error_response(action="/comments",error_message="Bad Request",error_code=400))
    
@comments_bp.route("/<comment_id>",methods=["PUT", "DELETE","GET"])
@token_required
def publication_methods(current_user,comment_id):
    if not comment_id.isnumeric():
        return make_response(error_response(action="/comment/id",error_message="Parameter ID must be a number",error_code=400))
    comment_id = int(comment_id)
    if request.method == "GET":
        try:
            commentary = commentsService.find_commentary_by_id(id=comment_id)
            return make_response(success_response(action="Get Comment",parameter=commentary))
        except Exception as err:
            if len(err.args) == 2:
                return make_response(error_response(action="Get Comment",error_message=err.args[0],error_code=err.args[1]))
            else:
                return make_response(error_response(action="Get Comment",error_message=str(err),error_code=500))
            
    elif request.method == "PUT":
        if request.is_json:
            data = request.get_json()
            if len(data) < 1:
                return make_response(error_response(action="Edit Comment",error_code=400,error_message="missing one or more parameters"))
            elif  "comment" not in data:
                return make_response(error_response(action="Edit Comment",error_code=400,error_message="request body must contains 'comment'"))
            else:
                try:
                    commentary = data.get("comment")
                    commentsService.update_commentary(comment_id=comment_id,user_id=current_user.id,comment=commentary)
                    return make_response(success_response(action="Edit Comment"))
                except Exception as err:
                    if len(err.args) == 2:
                        return make_response(error_response(action="Edit Comment",error_message=err.args[0],error_code=err.args[1]))
                    else:
                        return make_response(error_response(action="Edit Comment",error_message=str(err),error_code=500))
        else:                                                                           
            return make_response(error_response(action="Edit Comment",error_message="missing json request body",error_code=400))
        
    elif request.method == "DELETE":
        try:
            commentsService.delete_commentary(user_id=current_user.id,comment_id=comment_id)
            return make_response(success_response(action="Delete Comment"))
        except Exception as err:
            if len(err.args) == 2:
                return make_response(error_response(action="Delete Comment",error_message=err.args[0],error_code=err.args[1]))
            else:
                return make_response(error_response(action="Delete Comment",error_message=str(err),error_code=500))