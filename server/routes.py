from config import app, db, bcrypt, login_manager
from models import User
from forms import SignUpForm, LoginForm, LoginForm
from flask import render_template, session, redirect, url_for, flash, request
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
            flash('Username already exists. Please choose a different one.')
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

if __name__ == '__main__':
    app.run(debug=True, port=5555)