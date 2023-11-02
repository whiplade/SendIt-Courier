from config import db, bcrypt
from datetime import datetime

# Users table with its attributes
class User(db.Model):

    __tablename__ = 'users'

    user_id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(255), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)
    #admin and user roles
    role = db.Column(db.String(255), nullable=False)

    def set_password(self, password):
        self.password = bcrypt.generate_password_hash(password).decode('utf-8')

    def check_password(self, password):
        return bcrypt.check_password_hash(self.password, password)
     
    def get_id(self):
        return str(self.user_id)
    
    def is_authenticated(self):
        return True
    
    def is_active(self):
        return True
    
    def is_anonymous(self):
        return False

# Parcels table with its attributes
class Parcel(db.Model):

    __tablename__ = 'parcels'

    parcel_id = db.Column(db.Integer, primary_key=True)
    weight = db.Column(db.Float, nullable=False)
    description = db.Column(db.String(255), nullable=False)
    recipient_name = db.Column(db.String(50), nullable=False)
    recipient_phone_number = db.Column(db.String(50), nullable=False)
    pickup_location = db.Column(db.String(255), nullable=False)
    destination = db.Column(db.String(255), nullable=False)
    status = db.Column(db.String(50), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'), nullable=False)
    present_location = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False) 
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)  
   
    
    