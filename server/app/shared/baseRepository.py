from app.shared.dataBase import db

class BaseRepository:
    
    def __init__(self,model):
        self.model = model 
        

    def save(self,object):
        db.session.add(object)
        db.session.commit()

    def update(self,object):
        object.verified = True
        db.session.commit()

    def delete(self,object):
        db.session.delete(object)
        db.session.commit()

    def get_by_id(self,id):
        object = db.session.execute(db.select(self.model).filter_by(id=id)).scalar_one_or_none()
        return object
        
    def get_all(self):
        list = db.session.scalars(db.select(self.model)).fetchmany()
        return list