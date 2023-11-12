from config import app, db
from models import User, Parcel
from flask import  request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from functools import wraps
import jwt
from datetime import datetime, timedelta
from flask_jwt_extended import jwt_required, create_access_token, get_jwt_identity, unset_jwt_cookies
from flask_cors import cross_origin


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
@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()

    # Ensure that the required fields are present in the request
    required_fields = ['username', 'email', 'password', 'role']
    if not all(field in data for field in required_fields):
        response = jsonify({'errors': {'message': 'Missing required fields'}})
        response.status_code = 400  # Bad Request
        return response

    # Extract data from the request
    username = data['username']
    email = data['email']
    password = data['password']
    role = data['role']

    # Check if 'password' is not None before hashing it
    if password is not None:
        hashed_password = generate_password_hash(password)
    else:
        response = jsonify({'errors': {'password': ['Password is missing or invalid.']}})
        response.status_code = 400  # Bad Request
        return response

    # Check if the user with the provided email already exists
    existing_user = User.query.filter_by(email=email).first()
    if existing_user:
        response = jsonify({'errors': {'message': 'User already exists. Please Log in.'}})
        response.status_code = 409  # Conflict
        return response

    # Create a new user and save it to the database
    new_user = User(
        username=username,
        email=email,
        password=hashed_password,
        role=role
    )

     # Check if the user being created is the super admin
    if username.lower() == 'nathan' and email.lower() == 'nathan@admin.com' and role.lower() == 'admin':
        new_user.is_super_admin = True

    db.session.add(new_user)
    db.session.commit()

    response = jsonify({'message': 'Successfully registered.'})
    response.status_code = 201  # Created
    return response

@app.route('/login', methods=['POST'])
@cross_origin()
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({'message': 'Missing email or password'}), 400

    user = User.query.filter_by(email=email).first()

    if not user or not check_password_hash(user.password, password):
        return jsonify({'message': 'Invalid credentials'}), 401

    access_token = create_access_token(identity=user.user_id, additional_claims={'role': user.role})

    response_data = {
        'message': 'Login successful',
        'access_token': access_token,
        'is_admin': (user.role == 'admin'),
    }

    return jsonify(response_data), 200

@app.route("/logout", methods=["POST"])
def logout():
    response = jsonify({'message': 'Logged out successfully'})
    unset_jwt_cookies(response)
    return response


@app.route('/create_order', methods=['POST'])
@jwt_required()  # Add JWT authentication if needed
def create_order():
    user_id = get_jwt_identity()

    if user_id:
        data = request.get_json()

        # Check for and extract fields from the JSON data
        weight = data.get('weight')
        description = data.get('description')
        recipient_name = data.get('recipient_name')
        recipient_phone_number = data.get('recipient_phone_number')
        pickup_location = data.get('pickup_location')
        destination = data.get('destination')
        status = data.get('status')
        present_location = data.get('present_location')

        # You may add more fields here if needed

        # Create a new Parcel object and save it to the database
        new_parcel = Parcel(
            weight=weight,
            description=description,  
            recipient_name=recipient_name,
            recipient_phone_number=recipient_phone_number,
            pickup_location=pickup_location,
            destination=destination,
            status=status,
            user_id=user_id,
            present_location=present_location
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
    response = jsonify(parcels_list)
    return response

# @app.route('/user_parcels', methods=['GET'])
# @jwt_required()
# def get_parcel_details(parcel_id):
#     user_id = get_jwt_identity()
    
#     # Check if the parcel belongs to the authenticated user
#     parcel = Parcel.query.filter_by(parcel_id=parcel_id, user_id=user_id).first()

#     if parcel:
#         parcel_details = parcel.serialize()
#         return jsonify(parcel_details)
#     else:
#         return jsonify({'error': 'Parcel not found or does not belong to the user'}), 404
    

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
@cross_origin()
@jwt_required()
def cancel_order(parcel_id):
    parcel_order = Parcel.query.get(parcel_id)
    if parcel_order:
        db.session.delete(parcel_order)
        db.session.commit()
        return jsonify({"message":"Parcel Order deleted successfully!"}), 200

#ADMIN ROUTES


@app.route('/change_status/<int:parcel_id>', methods=['PATCH'])
# @jwt_required()
def change_status(parcel_id):
    current_user = get_jwt_identity()

    # Check if the current user has the necessary permissions
    # (You may need to modify this based on your authentication and authorization logic)
    if current_user['role'] == 'admin':
        # Perform the status update logic here
        return jsonify({"message": "Status updated successfully"}), 200
    else:
        return jsonify({"message": "Unauthorized"}), 401

@app.route('/change_location/<int:parcel_id>', methods=['GET', 'PATCH'])
# @jwt_required()
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
       
@app.route('/admin/all_parcels',methods=['GET'])
@cross_origin()
@jwt_required()
def get_all_parcels():
    user = User.query.get(get_jwt_identity())

    if user.role == 'admin':
        all_parcels = Parcel.query.all()
        parcels_list = [parcel.serialize() for parcel in all_parcels]
        print(parcels_list)
        return jsonify(parcels_list)
    return jsonify({'message': 'Unauthorized'}), 401






if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5555)
