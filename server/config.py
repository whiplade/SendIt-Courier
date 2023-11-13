from flask import Flask
from flask_bcrypt import Bcrypt
from flask_restful import Api
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager
from flask_jwt_extended import JWTManager, jwt_required
from flask_cors import CORS


app = Flask(__name__)
# CORS(app)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000", "supports_credentials": True}})


app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = '#^yiu{/}]`poier343ufe`'
app.json.compact = False
app.secret_key = '#^yiu{/}]`poier343ufe`'
app.config['JWT_SECRET_KEY'] = '36ab2b28521fde2521939108834d750fdd8cc52f6aee177325cef3567705ed12'  
app.config['JWT_TOKEN_LOCATION'] = ['headers', 'cookies']
jwt = JWTManager(app)


db = SQLAlchemy()
migrate = Migrate(app, db)
db.init_app(app)

bcrypt = Bcrypt(app)

api = Api(app)


 

