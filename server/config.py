from flask import Flask
from flask_bcrypt import Bcrypt
from flask_restful import Api
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from flask_wtf.csrf import CSRFProtect

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://whiplade:EQO9vizVeJPWblgTzx3UcdLKRKDqkQ5j@dpg-cktmdvunfb1c73f5kk60-a.singapore-postgres.render.com/sendit_fvf8'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = 'your_secret_key_here'
app.json.compact = False
app.secret_key = '#^yiu{/}]`poier343ufe`'


db = SQLAlchemy()
migrate = Migrate(app, db)
db.init_app(app)

bcrypt = Bcrypt(app)

password = "user_password"
hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')


password = "user_password"  
hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')

password_entered_by_user = "user_password"  
if bcrypt.check_password_hash(hashed_password, password_entered_by_user):
    print("Login successful")
else:
    print("Invalid password")

api = Api(app)
csrf = CSRFProtect(app)


