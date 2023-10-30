from flask import render_template, session, redirect, url_for, flash
from config import app, db, bcrypt
from models import User
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, BooleanField, SubmitField
from wtforms.validators import DataRequired
from flask_login import LoginManager, login_user, login_required, logout_user, current_user
from werkzeug.security import check_password_hash

with app.app_context():
    db.create_all()

login_manager = LoginManager(app)
login_manager.login_view = 'login'

class LoginForm(FlaskForm):
    username_or_email = StringField('Username or Email', validators=[DataRequired()])
    password = PasswordField('Password', validators=[DataRequired()])
    remember = BooleanField('Remember Me')
    submit = SubmitField('Login')

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


@app.route('/login', methods=['POST'])
def login():
    form = LoginForm()
    if form.validate_on_submit():
        if current_user.is_authenticated:
            flash('User is already signed in.', 'info')
            return redirect(url_for('dashboard'))

        username_or_email = form.username_or_email.data
        password = form.password.data
        user = User.query.filter((User.email == username_or_email) | (User.username == username_or_email)).first()

        if user:
            if bcrypt.check_password_hash(user.password, password):
                login_user(user, remember=form.remember.data)
                flash('Login successful!', 'success')
                return redirect(url_for('dashboard'))
            else:
                flash('Invalid password. Please check your email or password.', 'danger')
        else:
            flash('User not found. Please check your email or username.', 'danger')

    return render_template('login.html', form=form)

@app.route('/dashboard')
@login_required
def dashboard():
    if current_user.role == 'admin':
        return 'Welcome to the admin dashboard!'
    else:
        return 'Welcome to the user dashboard!'

@app.route('/logout')
def logout():
    if current_user.is_authenticated:
        logout_user()
        flash('Logged out successfully!', 'info')
    return redirect(url_for('home'))

if __name__ == '__main__':
    app.run(debug=True, port=5555)
