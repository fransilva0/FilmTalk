from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import DeclarativeBase
from flask_migrate import Migrate
from flask_marshmallow import Marshmallow
from sqlalchemy import DateTime, Column, Integer
from sqlalchemy.sql import func

class BaseModel(DeclarativeBase):
    id = Column(Integer, primary_key=True,autoincrement=True)
    time_created = Column(DateTime(timezone=True), server_default=func.now())
    time_updated = Column(DateTime(timezone=True), onupdate=func.now())

db = SQLAlchemy(model_class=BaseModel)
marshmallow = Marshmallow()
migrate = Migrate()
