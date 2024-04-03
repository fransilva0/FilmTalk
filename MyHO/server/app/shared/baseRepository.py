from app.shared.dataBase import db

class BaseRepository:
    
    def __init__(self,model):
        self.model = model 
        
    @staticmethod
    def save(object):
        db.session.add(object)
        db.session.commit()