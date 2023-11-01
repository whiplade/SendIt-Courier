# forms.py
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField,SelectField, BooleanField,FloatField
from wtforms.validators import DataRequired,EqualTo,Email

class SignUpForm(FlaskForm):
    username = StringField('Username', validators=[DataRequired()])
    email = StringField('Email', validators=[DataRequired(), Email()])
    password = PasswordField('Password', validators=[DataRequired()])
    confirm_password = PasswordField('Confirm Password', validators=[DataRequired(), EqualTo('password')])
    role = SelectField('Role', choices=[('user', 'User'), ('admin', 'Admin')], validators=[DataRequired()])
    submit = SubmitField('Sign Up')

class LoginForm(FlaskForm):
    username_or_email = StringField('Username or Email', validators=[DataRequired()])
    password = PasswordField('Password', validators=[DataRequired()])
    remember = BooleanField('Remember Me')
    submit = SubmitField('Login')

class ParcelForm(FlaskForm):
    weight = FloatField('Weight (kg)', validators=[DataRequired()])
    description = StringField('Description', validators=[DataRequired()])
    recipient_name = StringField('Recipient Name', validators=[DataRequired()])
    recipient_phone_number = StringField('Recipient Phone Number', validators=[DataRequired()])
    pickup_location = StringField('Pickup Location', validators=[DataRequired()])
    destination = StringField('Destination', validators=[DataRequired()])
    status = SelectField('Status', choices=[('Pending', 'Pending'), ('Shipped', 'Shipped'), ('In Transit', 'In Transit'), ('Delivered', 'Delivered')], default='Pending', validators=[DataRequired()])
    present_location = StringField('Present Location', default='Warehouse', validators=[DataRequired()])

class ChangeDestinationForm(FlaskForm):
    destination = StringField('New Destination', validators=[DataRequired()])

