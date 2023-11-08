import React from 'react';
import NavUser from './NavUser';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';


function Delivery() {
  const navigate = useNavigate(); 
  const [weight, setWeight] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const handleWeightChange = (event) => {
    const newWeight = parseFloat(event.target.value);

    setWeight(newWeight);

    if (isNaN(newWeight)) {
      setTotalPrice(0); 
    } else {
      setTotalPrice(newWeight * 3);  
    }
  };
  

  const useCheckout = () => {
    navigate('/user/track');
  };

  return (
    <div>
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
        value={weight}
        onChange={handleWeightChange} 
      />
        <div className="submit-btn" onClick={()=>{
          alert('Item Added To Cart')
        }}>Add To Cart</div>
      </div>
      <div className="card-container">
        <div className="card-content">
          <div className="card-title">Price <span>Range</span></div>
          <div className="values">
            <div>$<span id="first">{totalPrice} Dollars</span></div> 
          </div>
          <small className="current-range">
            Current Range:
            <div>$<span id="third">3$ per Kg</span></div>
          </small>
          <div data-range="#third" data-value-1="#second" data-value-0="#first" className="slider">
            <label className="label-min-value">1</label>
          </div>
          <div>
            <button className="cartbutton" onClick={useCheckout}>CHECKOUT</button>
            <button className="cartbutton" onClick={useCheckout}>TRACK PKG</button>
          </div>
        </div>
        
      </div>
    </div>
    </div>
  );
}

export default Delivery;
