from config import db, app
from datetime import datetime
from faker import Faker
from models import User, Parcel
import random
from werkzeug.security import generate_password_hash

fake = Faker()

descriptions = ["Fragile", "Do not shake", "This side up", "Do not stack", "Sensitive equipment", "Perishable", "Keep dry", "Keep away from heat", "Hazardous material", "Heavy", "Top load only"]
pickup_locations = ["Thika", "Nakuru", "Mombasa", "Kisumu", "Kitale", "Nairobi", "Bungoma", "Bomet", "Nanyuki", "Nyeri", "Moyale", "Marsabit", "Nanyuki", "Meru", "Embu", "Malindi", "Lamu", "Karatina"]
destinations = ["Voi", "Garissa", "Isiolo", "Wajir", "Kapenguria", "Homabay", "Kiambu", "Migori", "Siaya", "Ruiru", "Juja", "Kikuyu", "Machakos", "Nyahururu", "Webuye", "Chogoria", "Kajiado"]

def seed_database():
    with app.app_context():

        # Clear existing data
        db.drop_all()
        db.create_all()

        # Seed users ans super admin
        super_admin = User(username="nathan", email="nathan@admin.com", password=generate_password_hash("1234"), role="admin")
        db.session.add(super_admin)

        for _ in range(10):
            user = User(username=fake.user_name(), email=fake.email(), password=fake.password(), role="user")
            db.session.add(user)

        # Seed parcels
        for _ in range(18):
            description = random.choice(descriptions)
            pickup_location = random.choice(pickup_locations)
            destination = random.choice(destinations)
            
            parcel = Parcel(
                weight=fake.random_int(min=1, max=50),
                description=description,
                recipient_name=fake.name(),
                recipient_phone_number=fake.phone_number(),
                pickup_location=pickup_location,
                destination=destination,
                status="Pending",
                user_id=fake.random_int(min=1, max=10),
                present_location="Warehouse",
                created_at=datetime.utcnow(),
                updated_at=datetime.utcnow(),
            )
            db.session.add(parcel)

        # Commit the changes to the database
        db.session.commit()

if __name__ == '__main__':
    seed_database()
    print("Database seeded successfully!")