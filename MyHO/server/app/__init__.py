import os
from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from config import Config

def create_app():
    app = Flask(__name__,root_path=os.getcwd(), static_url_path='/static')
    app.config.from_object(Config)
    CORS(app)
    from app.shared.dataBase import db
    db.init_app(app)
    from app.routes.UserRoutes import user_bp
    app.register_blueprint(user_bp)

    return app