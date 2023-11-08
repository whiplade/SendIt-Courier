import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Define a constant for the profile image URL
const profileImageURL = 'https://cdn-icons-png.flaticon.com/512/9385/9385289.png';
const userData = [
  {
    id: 1,
    name: 'John Doe',
    type: 'User',
    pendingPackages: 3,
    deliveredPackages: 5,
  },
  {
    id: 2,
    name: 'Jane Smith',
    type: 'User',
    pendingPackages: 2,
    deliveredPackages: 8,
  },
];

const Dashboard = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const formatAMPM = (date) => {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours %= 12;
    hours = hours || 12; 
    minutes = minutes < 10 ? '0' + minutes : minutes;
    return hours + ':' + minutes + ' ' + ampm;
  };

  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August',
    'September', 'October', 'November', 'December'
  ];


//   const sampleUser = userData[0];


//   const onSave = (newUserData) => {
//     console.log('Saving user data:', newUserData);
//   };

  return (
    <div>
      <div className="card">
        <p className="time-text">{formatAMPM(time)}</p>
        <p className="day-text">{days[time.getDay()]}, {months[time.getMonth()]} {time.getDate()}, {time.getFullYear()}</p>
      </div>
      <div className='admin-title'>Registered Users</div>
      <div className='cardbox'>
        {userData.map((user) => (
          <div className="cardadmin" key={user.id}>
            <Link to="/admin/edit" style={{ textDecoration: 'none' }}>
              <div className="img">
                <img src={profileImageURL} alt='User Profile' />
              </div>
              <div className="text">
                <p className="h3">Type: {user.type}</p>
                <p className="detailsp">User: {user.name}</p>
                <p className="detailsp">Packages pending: {user.pendingPackages} pkgs</p>
                <p className="detailsp">Delivered: {user.deliveredPackages} pkgs</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
