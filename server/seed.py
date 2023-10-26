from config import db, app
from datetime import datetime
from faker import Faker
from models import User, Parcel

fake = Faker()

def create_fake_user():

    username = fake.user_name()
    email = fake.email()
    password = fake.password()
    role = fake.random_element(elements=('admin', 'user'))  
    user = User(username=username, email=email, password=password, role=role)
    return user


def create_fake_parcel(user_id):
    weight = fake.random_int(min=1, max=50)
    description = fake.sentence()
    recipient_name = fake.name()
    recipient_phone_number = fake.phone_number()
    pickup_location = fake.address()
    destination = fake.address()
    status = fake.random_element(elements=('pending', 'in transit', 'delivered'))
    present_location = fake.address()
    created_at = datetime.utcnow()
    updated_at = datetime.utcnow()
    
    parcel = Parcel(
        weight=weight,
        description=description,
        recipient_name=recipient_name,
        recipient_phone_number=recipient_phone_number,
        pickup_location=pickup_location,
        destination=destination,
        status=status,
        user_id=user_id,
        present_location=present_location,
        created_at=created_at,
        updated_at=updated_at
    )
    return parcel


app.app_context().push()

with app.app_context():

    db.drop_all()
    db.create_all()


    for _ in range(10):  
        user = create_fake_user()
        db.session.add(user)

    db.session.commit()

    users = User.query.all()
    for user in users:
        for _ in range(3):  
            parcel = create_fake_parcel(user.user_id)
            db.session.add(parcel)

    db.session.commit()
