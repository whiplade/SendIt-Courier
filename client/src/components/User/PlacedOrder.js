import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function PlacedOrder() {
    const navigate = useNavigate(); 
    const useHistory = () => {
        navigate('/user/home');
      };
  return (
    
    <div>
        <h1 className='orderh1'>Thank You For Using SendIt</h1>
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
          <button type="button" className="custom-history" onClick={useHistory}>
            History
          </button>
          <button type="button" className="custom-track">
            Track my package
          </button>
        </div>
      </div> 
    </div>
  )
}
