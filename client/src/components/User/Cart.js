import React from 'react';
import NavUser from './NavUser';

export default function Cart() {
  return (
    <div>
      <NavUser />
      <h1 className='cartheading'>Cart</h1>
      <div className="cardcart">
        <h3 className="card__title">Package</h3>
        <p className="card__content">Recipint: Jonh Doe</p>
        <p className="card__content">To: Nairobi,Kenya</p>
        <p className="card__content">Weight: 3Kg</p>
        <div className="card__date">April 15, 2022</div>
        <button className='btncart'>Delete</button>
        <button className='btncart'>Edit</button>
      </div>
     <div className="custom-card">
        <button type="button" className="custom-dismiss">×</button>
        <div className="custom-header">
          <div className="custom-image">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="custom-image-svg"
            >
              <path
                stroke-linejoin="round"
                stroke-linecap="round"
                stroke-width="1.5"
                stroke="#000000"
                d="M20 7L9.00004 18L3.99994 13"
              ></path>
            </svg>
          </div>
          <div className="custom-content">
            <span className="custom-title">Order validated</span>
            <p className="custom-message">
              Thank you for your purchase. Your package will be delivered within
              2 days of your purchase
            </p>
          </div>
        </div>
        <div className="custom-actions">
          <button type="button" className="custom-history">
            History
          </button>
          <button type="button" className="custom-track">
            Track my package
          </button>
        </div>
      </div> 
    </div>
  );
}
