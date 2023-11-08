import React from 'react';
import NavUser from './NavUser';
import { useNavigate } from 'react-router-dom';


function Delivery() {
  const navigate = useNavigate(); 

  const useCheckout = () => {
    navigate('/user/cart');
  };
  return (
    <div>
    <h1 className='cartheading'>Delivery</h1>
    <div className="deliverycomp">
      <NavUser />
      <div className="subscribe">
        <p>SENDPACKAGE</p>
        <input
          placeholder="Recipient's Name"
          className="subscribe-input"
          name="name"
          type="text"
        />
        <input
          placeholder="Recipient e-mail"
          className="subscribe-input"
          name="email"
          type="email"
        />
        <input
          placeholder="Destination From"
          className="subscribe-input"
          name="destination"
          type="text"
        />
        <input
          placeholder="Destination To"
          className="subscribe-input"
          name="destination"
          type="text"
        />
        <input
          placeholder="Weight"
          className="subscribe-input"
          name="weight"
          type="number"
        />

        <div className="submit-btn" onClick={()=>{
          alert('Item Added To Cart')
        }}>Add To Cart</div>
      </div>
      <div className="card-container">
        <div className="card-content">
          <div className="card-title">Price <span>Range</span></div>
          <div className="values">
            <div>$<span id="first">35</span></div> 
            <div>$<span id="second">165</span></div>
          </div>
          <small className="current-range">
            Current Range:
            <div>$<span id="third">340</span></div>
          </small>
          <div data-range="#third" data-value-1="#second" data-value-0="#first" className="slider">
            <label className="label-min-value">1</label>
            <label className="label-max-value">10 000</label>
          </div>
          <div>
            <button className="cartbutton" onClick={useCheckout}>CHECKOUT</button>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default Delivery;
