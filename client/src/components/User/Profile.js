import React from 'react';
import NavUser from './NavUser';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const navigate = useNavigate(); 

  const useHome = () => {
    navigate('/user/home');
  };
  const useSend = () => {
    navigate('/user/delivery');
  };
  const useCart = () => {
    navigate('/user/cart');
  };
  return (
    <div>
      <NavUser />
      <div className="carduser">
        <header className="card-header">
          <p>SendIt</p>
          <span className="titleuser">Profile</span>
        </header>
        <div className="card-author">
          <div className="author-avatar">
            <span></span>
          </div>
          <svg className="half-circle" viewBox="0 0 106 57">
            <path d="M102 4c0 27.1-21.9 49-49 49S4 31.1 4 4"></path>
          </svg>
          <div className="author-name-prefix">
            <div className="author-name">UserName</div> Folarin Lawal
          </div>
        </div>
        <div className="tags">
          <button  className='profilebtn' onClick={useHome}>Packages</button>
          <button  className='profilebtn' onClick={useSend}>Send</button>
          <button  className='profilebtn' onClick={useCart}>Cart</button>
        </div>
      </div>
    </div>
  );
}
