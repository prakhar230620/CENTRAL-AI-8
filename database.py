import sqlite3
import json

class Database:
    def __init__(self):
        self.conn = sqlite3.connect('ai_services.db', check_same_thread=False)
        self.create_tables()

    def create_tables(self):
        cursor = self.conn.cursor()
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS services (
                id TEXT PRIMARY KEY,
                name TEXT,
                type TEXT,
                description TEXT,
                config TEXT
            )
        ''')
        self.conn.commit()

    def add_service(self, service_data):
        cursor = self.conn.cursor()
        cursor.execute('''
            INSERT INTO services (id, name, type, description, config)
            VALUES (?, ?, ?, ?, ?)
        ''', (service_data['id'], service_data['name'], service_data['type'],
              service_data['description'], json.dumps(service_data['config'])))
        self.conn.commit()

    def get_service(self, service_id):
        cursor = self.conn.cursor()
        cursor.execute('SELECT * FROM services WHERE id = ?', (service_id,))
        row = cursor.fetchone()
        if row:
            return {
                'id': row[0],
                'name': row[1],
                'type': row[2],
                'description': row[3],
                'config': json.loads(row[4])
            }
        return None

    def update_service(self, service_id, service_data):
        cursor = self.conn.cursor()
        cursor.execute('''
            UPDATE services
            SET name = ?, type = ?, description = ?, config = ?
            WHERE id = ?
        ''', (service_data['name'], service_data['type'], service_data['description'],
              json.dumps(service_data['config']), service_id))
        self.conn.commit()

    def delete_service(self, service_id):
        cursor = self.conn.cursor()
        cursor.execute('DELETE FROM services WHERE id = ?', (service_id,))
        self.conn.commit()

    def get_all_services(self):
        cursor = self.conn.cursor()
        cursor.execute('SELECT * FROM services')
        rows = cursor.fetchall()
        return [{
            'id': row[0],
            'name': row[1],
            'type': row[2],
            'description': row[3],
            'config': json.loads(row[4])
        } for row in rows]