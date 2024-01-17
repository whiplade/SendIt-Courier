# SendIT Courier Service

SendIT is a versatile courier service application that simplifies the process of delivering parcels to diverse destinations. Our platform offers transparent courier quotes based on weight categories, ensuring a user-friendly experience.

## Technologies Employed

- Full Stack Application
  - React (Frontend)
  - Python (Backend)

## MVP Features

- **User Account Management:**
  - Users can effortlessly create an account and log in.

- **Parcel Delivery:**
  - Users can initiate a parcel delivery order with ease.

- **Dynamic Order Management:**
  - Users have the flexibility to change the destination of a parcel delivery order.

- **Cancellation Option:**
  - Users can cancel a parcel delivery order if needed.

- **Order Details:**
  - Users can view comprehensive details of their delivery orders.

- **Admin Control:**
  - Admins can efficiently change the status and present location of a parcel delivery order.

- **Geospatial Visualization:**
  - The application seamlessly integrates Google Maps with markers displaying the pickup location and destination, enhancing the overall user experience.

## Getting Started

To get started with SendIT, follow these steps:

1. Clone the repository: `git clone https://github.com/whiplade/SendIt-Courier`
2. Navigate into the client folder: `cd client` and install dependencies using `npm install` (for frontend)
3. Navigate into the server folder: `cd server` and install dependencies using `pipenv install` (for backend)
4. Run `pipenv shell` to launch the project in a virtual environment
5. Configure the backend using the following commands:
   - `export FLASK_APP=routes.py`
   - `export FLASK_RUN_PORT=5555`
   - `flask run` to get the backend running
6. Run the application: `npm start` (for frontend)

## Authors
- Nathan Mawira
- Vivian Waithera
- Lawrence Ngare
- Bakhita Otieno
- Dreake Ntimama

## License
This project is licensed under the MIT License - see the LICENSE file for details

Feel free to explore the comprehensive features of SendIT and contribute to its continuous improvement. Happy delivering! 🚚✨
