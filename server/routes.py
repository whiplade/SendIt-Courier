from config import app, db, bcrypt, login_manager
from models import User, Parcel
from forms import SignUpForm, LoginForm, LoginForm,ParcelForm,ChangeDestinationForm
from flask import render_template, session, redirect, url_for, flash, request, jsonify, make_response
from flask_login import LoginManager, login_user, login_required, logout_user, current_user
from werkzeug.security import generate_password_hash, check_password_hash
from functools import wraps
import jwt
from datetime import datetime, timedelta
from flask_jwt_extended import jwt_required, create_access_token, get_jwt_identity

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
@app.route('/login', methods =['POST'])
def login():
	# creates dictionary of form data
	auth = request.form

	if not auth or not auth.get('email') or not auth.get('password'):
		# returns 401 if any email or / and password is missing
		return make_response(
			'Could not verify',
			401,
			{'WWW-Authenticate' : 'Basic realm ="Login required !!"'}
		)

	user = User.query\
		.filter_by(email = auth.get('email'))\
		.first()

	if not user:
		# returns 401 if user does not exist
		return make_response(
			'Could not verify',
			402,
			{'WWW-Authenticate' : 'Basic realm ="User does not exist !!"'}
		)

	if check_password_hash(user.password, auth.get('password')):
		# generates the JWT Token
		token = jwt.encode({
			'user_id': user.user_id,
			'exp' : datetime.utcnow() + timedelta(minutes = 30)
		}, app.config['SECRET_KEY'])

		return make_response(jsonify({'token' : token}), 201)
	# returns 403 if password is wrong
	return make_response(
		'Could not verify',
		403,
		{'WWW-Authenticate' : 'Basic realm ="Wrong Password !!"'}
	)


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

    
@app.route('/logout')
@jwt_required()
def logout():
    logout_user()
    flash('Logged out successfully!', 'info')
    return redirect(url_for('home'))

    
@app.route('/create_order', methods=['GET','POST'])
def create_parcel_order():
    # data = request.get_json()

    # if data:
    #     parcel = Parcel(
    #         weight = data['weight'],
    #         description = data['description'],
    #         recipient_name = data['recipient_name'],
    #         recipient_phone_number = data['recipient_phone_number'],
    #         pickup_location = data['pickup_location'],
    #         destination = data['destination'],
    #         user_id = data['user_id'])

    #     db.session.add(parcel)
    #     db.session.commit()
    #     return jsonify({'message': 'Parcel Order created successfully!'})  

    form = ParcelForm()
    if request.method == 'POST':
        if form.validate_on_submit():
            parcel = Parcel(
                weight=form.weight.data,
                description=form.description.data,
                recipient_name=form.recipient_name.data,
                recipient_phone_number=form.recipient_phone_number.data,
                pickup_location=form.pickup_location.data,
                destination=form.destination.data,
                status=form.status.data,
                user_id=current_user.user_id,
                present_location='Warehouse'
            )

            db.session.add(parcel)
            db.session.commit()
            flash('Parcel order created successfully.', 'success')
            
    return render_template('create_order.html', form=form)

@app.route('/user_parcels', methods=['GET'])
def user_parcels():
    all_parcels = Parcel.query.filter_by(user_id=current_user.user_id).all()
    return render_template('user_parcels.html' , all_parcels=all_parcels)
    
@app.route('/change_destination/<int:parcel_id>', methods=['GET', 'POST'])
def change_destination(parcel_id):

    parcel= Parcel.query.get(parcel_id)

    if parcel is None or parcel.user_id != current_user.user_id:
        flash ('Parcel not found or you do not have sufficient permissions!')
        return redirect(url_for('user_parcels'))

    form = ChangeDestinationForm()

    if form.validate_on_submit():
        parcel.destination = form.destination.data
       
        db.session.commit()
        flash("Destination changed successfully!",'success')
        return redirect(url_for('user_parcels'))

    return render_template('change_destination.html', form=form, parcel=parcel)

@app.route('/cancel_order/<int:parcel_id>', methods=['GET','DELETE'])
def cancel_order(parcel_id):
    parcel_order = Parcel.query.get(parcel_id)
    if parcel_order:
        db.session.delete(parcel_order)
        db.session.commit()
        flash("Parcel Order deleted successfully!")
        return redirect(url_for('user_parcels'))


if __name__ == '__main__':
    app.run(debug=True, port=5555)