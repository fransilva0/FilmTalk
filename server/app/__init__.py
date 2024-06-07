import os
from flask import Flask
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from config import DevelopmentConfig

bcrypt = Bcrypt()

def create_app():
    
    app = Flask(__name__,root_path=os.getcwd(), static_url_path='/static')
    app.config.from_object(DevelopmentConfig)
    CORS(app)
    bcrypt.init_app(app)
    
    from app.shared.dataBase import db,migrate,marshmallow
    db.init_app(app)
    marshmallow.init_app(app)
    migrate.init_app(app, db)

    from app.routes.UserRoutes import user_bp
    app.register_blueprint(user_bp)
    from app.routes.PostsRoutes import posts_bp
    app.register_blueprint(posts_bp)
    from app.routes.CommentsRoutes import comments_bp
    app.register_blueprint(comments_bp)
    
    return app