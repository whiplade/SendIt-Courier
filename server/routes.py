from config import app,db
from models import User,Parcel
from forms import SignUpForm,LoginForm
from flask import render_template,redirect,url_for,flash

@app.route('/')
def home():
    return"<h1>Hello there</h1>"

@app.route('/signup', methods=['GET','POST'])
def signup():
    form = SignUpForm()
    if form.validate_on_submit():
        print(f"Form Data: {form.data}") 
        existing_user = User.query.filter_by(username=form.username.data).first()
        if existing_user:
            flash('Username already exists. Please choose a different one.', 'danger')
        else:
            user = User(username=form.username.data, password=form.password.data,email = form.email.data,role=form.role.data)
            # user.set_password(form.password.data)
            db.session.add(user)
            db.session.commit()
            flash('Your account has been created! You can now log in.', 'success')
            return redirect(url_for('login'))
    return render_template('signup.html', title='Sign Up', form=form)

@app.route('/login')
def login():
    form = LoginForm
    if form.validate_on_submit():
        pass
    return render_template('login.html', title='Login', form=form)

