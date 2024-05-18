from app.service.UserService import UserService

userService = UserService()
#TODO:refatorar essa função
def convert_posts_userid_to_username(json_page):
    for post in json_page:
        id = post.get("user_id")
        post.pop("user_id")
        user = userService.findUserById(id=id)
        post["username"] = user.username
    return json_page

def convert_post_userid_to_username(post):
    id = post.get("user_id")
    user = userService.findUserById(id=id)
    post.pop("user_id")
    post["username"] = user.username
    return post

def paginate(result):
    ...