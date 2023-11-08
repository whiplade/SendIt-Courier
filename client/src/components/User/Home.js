import React, { useState, useEffect } from 'react';
import NavUser from './NavUser';


export default function Home() {
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
    hours = hours || 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    return hours + ':' + minutes + ' ' + ampm;
  };

  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August',
    'September', 'October', 'November', 'December'
  ];
  const cardData = [
    {
      type: 'Package',
      recipient: 'John Doe',
      from: 'Warehouse',
      to: 'Nairobi, Kenya',
    },
    {
      type: 'Package',
      recipient: 'Bakhita A',
      from: 'Brooklyn, NewYolk',
      to: 'Nairobi, Kenya',
    },
  ];

  return (
    <div>
      <NavUser />
      <div className="card">
        <p className="time-text">{formatAMPM(time)}</p>
        <p className="day-text">{days[time.getDay()]}, {months[time.getMonth()]} {time.getDate()}, {time.getFullYear()}</p>
      </div>
      <div className="cardpackagebox" >
      {cardData.map((item, index) => (
      <div className="cardpackage">
        <div className="img">
        <img src='https://static.vecteezy.com/system/resources/previews/029/785/453/original/box-package-symbol-icon-design-illustration-vector.jpg' alt='img'/>
        </div>
        <div className="text">
          <p className="h3">Type: {item.type}</p>
          <p className="detailsp">Recipient: {item.recipient}</p>
          <p className="detailsp">From: {item.from}</p>
          <p className="detailsp">To: {item.to}</p>
        </div>
      </div>
      ))}
      </div>
    </div>
  );
}
