from config import app, db, login_manager
from models import User, Parcel
from flask import render_template, session, redirect, url_for, flash, request, jsonify, make_response
from flask_login import LoginManager, login_user, login_required, logout_user, current_user
from werkzeug.security import generate_password_hash, check_password_hash
from functools import wraps
import jwt
from datetime import datetime, timedelta
from flask_jwt_extended import jwt_required, create_access_token, get_jwt_identity, unset_jwt_cookies

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id)) 


@app.route('/')
def home():
    return jsonify(message = "Welcome to SendIt!"), 200

# decorator for verifying the JWT
def token_required(f):
	@wraps(f)
	def decorated(*args, **kwargs):
		token = None
		# jwt is passed in the request header
		if 'x-access-token' in request.headers:
			token = request.headers['x-access-token']
		# return 401 if token is not passed
		if not token:
			return jsonify({'message' : 'Token is missing !!'}), 401

		try:
			# decoding the payload to fetch the stored details
			data = jwt.decode(token, app.config['SECRET_KEY'])
			current_user = User.query\
				.filter_by(public_id = data['public_id'])\
				.first()
		except:
			return jsonify({
				'message' : 'Token is invalid !!'
			}), 401
		# returns the current logged in users context to the routes
		return f(current_user, *args, **kwargs)

	return decorated

# updated signup route
@app.route('/signup', methods =['POST'])
def signup():
	# creates a dictionary of the form data
	data = request.form

	# gets username, email and password
	username, email = data.get('username'), data.get('email')
	password, role = data.get('password'), data.get('role')

	# checking for existing user
	user = User.query\
		.filter_by(email = email)\
		.first()
	if not user:
		# database ORM object
		user = User(
			username = username,
			email = email,
			password = generate_password_hash(password),
            role = role
		)
		# insert user
		db.session.add(user)
		db.session.commit()

		return make_response('Successfully registered.', 201)
	else:
		# returns 202 if user already exists
		return make_response('User already exists. Please Log in.', 202)
    

# updated route for logging user in
# @app.route('/login', methods =['POST'])
# def login():
# 	# creates dictionary of form data
# 	auth = request.form

# 	if not auth or not auth.get('email') or not auth.get('password'):
# 		# returns 401 if any email or / and password is missing
# 		return make_response(
# 			'Could not verify!',
# 			401,
# 			{'WWW-Authenticate' : 'Basic realm ="Login required !!"'}
# 		)

# 	user = User.query\
# 		.filter_by(email = auth.get('email'))\
# 		.first()

# 	if not user:
# 		# returns 401 if user does not exist
# 		return make_response(
# 			'Could not verify!',
# 			402,
# 			{'WWW-Authenticate' : 'Basic realm ="User does not exist !!"'}
# 		)

# 	if check_password_hash(user.password, auth.get('password')):
# 		# generates the JWT Token
# 		token = jwt.encode({
# 			'user_id': user.user_id
# 		}, app.config['SECRET_KEY'])

# 		return make_response(jsonify({'token' : token}), 201)
# 	# returns 403 if password is wrong
# 	return make_response(
# 		'Invalid credentials!',
# 		403,
# 		{'WWW-Authenticate' : 'Basic realm ="Wrong Password !!"'}
# 	)

	# if user.password == password:  # Replace with actual password validation logic
    #     access_token = create_access_token(identity=user.id)
    #     return jsonify({'access_token': access_token}), 201
    # else:
    #     return make_response(jsonify({'message': 'Wrong password.'}), 403)

	# Login route
# @app.route('/login', methods=['POST'])
# def login():
#     data = request.get_json()
#     username = data.get('username')
#     password = data.get('password')

#     # Check if the provided username and password are valid
#     if username in users and users[username]['password'] == password:
#         # Create an access token for the user
#         access_token = create_access_token(identity=username)
#         return jsonify(access_token=access_token), 200
#     else:
#         return jsonify(message='Invalid username or password'), 401

@app.route('/login', methods=['POST'])
def login():
    if not request.is_json:
        return jsonify({'message': 'Missing JSON in request'}), 400

    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({'message': 'Missing email or password'}), 400

    user = User.query.filter_by(email=email).first()

    if not user or not check_password_hash(user.password, password):
        return jsonify({'message': 'Invalid credentials'}), 401

    access_token = create_access_token(identity=user.user_id)
    return jsonify({'message': 'Login successful', 'access_token': access_token}), 200
	


# @app.route('/dashboard')
# @jwt_required()
# def dashboard():
#     user_id = get_jwt_identity()
#     user = User.query.get(user_id)

#     if user:
#         if user.role == 'admin':
#             return 'Welcome to the admin dashboard!'
#         else:
#             return 'Welcome to the user dashboard!'
#     else:
#         return 'User not found', 404

@app.route("/logout", methods=["POST"])
def logout():
    response = jsonify({'message': 'Logged out successfully'})
    unset_jwt_cookies(response)
    return response


@app.route('/create_order', methods=['POST'])
@jwt_required()
def create_order():
    user_id = get_jwt_identity()

    if user_id:
        data = request.get_json()
        weight = data.get('weight')
        description = data.get('description')
        recipient_name = data.get('recipient_name')
        recipient_phone_number = data.get('recipient_phone_number')
        pickup_location = data.get('pickup_location')
        destination = data.get('destination')
        

    
        new_parcel = Parcel(
            weight=weight,
            description=description,
            recipient_name=recipient_name,
            recipient_phone_number=recipient_phone_number,
            pickup_location=pickup_location,
            destination=destination,
            status='Pending',
            user_id=user_id,  
            present_location='Warehouse'
        )

        db.session.add(new_parcel)
        db.session.commit()

        return jsonify({"message": "Parcel order created successfully"}), 201
    else:
        return jsonify({"message": "User not found or unauthorized"}), 401


@app.route('/user_parcels', methods=['GET'])
@jwt_required()
def user_parcels():
		user_id = get_jwt_identity()
		all_parcels = Parcel.query.filter_by(user_id=user_id).all()
		parcels_list = [parcel.serialize() for parcel in all_parcels]
		return jsonify(parcels_list)
    

@app.route('/change_destination/<int:parcel_id>', methods=['GET', 'PATCH'])
@jwt_required()
def change_destination(parcel_id):
	user_id = get_jwt_identity()
	parcel = Parcel.query.filter_by(parcel_id=parcel_id).first()
      
	if parcel is None:
			return jsonify({'message': 'Parcel not found'}), 404

	if parcel.user_id != user_id:
			return jsonify({'message': 'You do not have sufficient permissions'}), 401

	data=request.get_json()
	new_destination= data.get('New destination')

	parcel.destination = new_destination

	db.session.commit()

	return jsonify({'message':"Destination updated successfully"}), 200



@app.route('/cancel_order/<int:parcel_id>', methods=['GET','DELETE'])
@jwt_required()
def cancel_order(parcel_id):
    parcel_order = Parcel.query.get(parcel_id)
    if parcel_order:
        db.session.delete(parcel_order)
        db.session.commit()
        return jsonify({"message":"Parcel Order deleted successfully!"}), 200

#ADMIN ROUTES

@app.route('/change_status/<int:parcel_id>', methods=['GET', 'PATCH'])
@jwt_required()
def change_status(parcel_id):

	user = User.query.get(get_jwt_identity())
	
	if user.role == 'admin':
		parcel = Parcel.query.filter_by(parcel_id=parcel_id).first()
      
		if parcel is None:
				return jsonify({'message': 'Parcel not found'}), 404

	
		data=request.get_json()
		new_status= data.get('status')

		parcel.status = new_status

		db.session.commit()

		return jsonify({'message':"Status updated!"}), 200
	
	else:
		return jsonify({"message":'Unauthorized'}), 401

@app.route('/change_location/<int:parcel_id>', methods=['GET', 'PATCH'])
@jwt_required()
def change_present_location(parcel_id):
	user = User.query.get(get_jwt_identity())
	
	if user.role == 'admin':
		parcel = Parcel.query.filter_by(parcel_id=parcel_id).first()
      
		if parcel is None:
				return jsonify({'message': 'Parcel not found'}), 404

	
		data=request.get_json()
		new_present_location= data.get('present_location')

		parcel.present_location = new_present_location

		db.session.commit()

		return jsonify({'message':"Location updated!"}), 200
	
	else:
		return jsonify({"message":'Unauthorized'}), 401



if __name__ == '__main__':
    app.run(debug=True, port=5555)