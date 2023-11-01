from config import app, db, bcrypt, login_manager
from models import User, Parcel
from forms import SignUpForm, LoginForm, LoginForm,ParcelForm,ChangeDestinationForm
from flask import render_template, session, redirect, url_for, flash, request, jsonify
from flask_login import LoginManager, login_user, login_required, logout_user, current_user
from werkzeug.security import check_password_hash

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id)) 

@app.route('/')
def home():
    if current_user.is_authenticated:
        return redirect(url_for('dashboard'))
    login_status = session.get('login_status', '')
    logout_status = session.get('logout_status', '')
    form = LoginForm()
    return render_template('login.html', login_status=login_status, logout_status=logout_status, form=form)

@app.route('/signup', methods=['GET', 'POST'])
def signup():
    form = SignUpForm()
    if form.validate_on_submit():
        existing_user = User.query.filter_by(username=form.username.data).first()
        if existing_user:
            flash('Username already exists. Please choose a different one.', 'danger')
        else:
            user = User(username=form.username.data, password=form.password.data, email=form.email.data, role='user')
            user.set_password(form.password.data)
            db.session.add(user)
            db.session.commit()
            flash('Your account has been created! You can now log in.', 'success')
            return redirect(url_for('login'))
    return render_template('signup.html', title='Sign Up', form=form)

@app.route('/login', methods=['GET', 'POST'])
def login():
    form = LoginForm()
    # if current_user.is_authenticated:
    #     flash('You are already signed in.', 'info')
    #     return redirect(url_for('dashboard'))
    
    if request.method == 'POST':
        username_or_email = form.username_or_email.data
        password = form.password.data
        user = User.query.filter((User.email == username_or_email) | (User.username == username_or_email)).first()

        if user and bcrypt.check_password_hash(user.password, password):
            login_user(user, remember=form.remember.data)
            flash('Login successful!', 'success')
            return redirect(url_for('dashboard'))
        else:
            flash('Invalid email/username or password. Please try again.', 'danger')

    return render_template('login.html', form=form)

@app.route('/dashboard')
@login_required
def dashboard():
    if current_user.role == 'admin':
        return 'Welcome to the admin dashboard!'
    else:
        return 'Welcome to the user dashboard!'
    
@app.route('/logout')
@login_required
def logout():
    logout_user()
    flash('Logged out successfully!', 'info')
    return redirect(url_for('home'))

# @app.route('/parcels', methods=['POST'])
# @login_required
# def create_parcel():
#     data = request.get_json()
#     name = data['name']

#     parcel = Parcel(name=name, user_id=current_user.id)
#     db.session.add(parcel)
#     db.session.commit()
#     return jsonify(message='Parcel created successfully'), 201

# you can get the user in the current session without using JWT by using Flask-Login. 
# When a user logs in and their session is established, you can access the current user 
# using the current_user object provided by Flask-Login.
    
@app.route('/create_order', methods=['GET','POST'])
@login_required
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
@login_required
def user_parcels():
    all_parcels = Parcel.query.filter_by(user_id=current_user.user_id).all()
    return render_template('user_parcels.html' , all_parcels=all_parcels)
    
@app.route('/change_destination/<int:parcel_id>', methods=['GET', 'POST'])
@login_required
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
@login_required
def cancel_order(parcel_id):
    parcel_order = Parcel.query.get(parcel_id)
    if parcel_order:
        db.session.delete(parcel_order)
        db.session.commit()
        flash("Parcel Order deleted successfully!")
        return redirect(url_for('user_parcels'))


if __name__ == '__main__':
    app.run(debug=True, port=5555)