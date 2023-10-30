# app.py
from config import app, db, api
from models import User, Parcel
from routes import *


if __name__ == '__main__':
    app.run(debug=True, port=5555)