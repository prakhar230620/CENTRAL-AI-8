import uuid

class AIManager:
    def __init__(self, db):
        self.db = db

    def add_ai(self, ai_data):
        ai_id = str(uuid.uuid4())
        ai_data['id'] = ai_id
        self.db.add_service(ai_data)
        return {"id": ai_id}

    def update_ai(self, ai_id, ai_data):
        self.db.update_service(ai_id, ai_data)
        return {"id": ai_id}

    def delete_ai(self, ai_id):
        self.db.delete_service(ai_id)
        return {"id": ai_id}

    def get_all_ai(self):
        return self.db.get_all_services()