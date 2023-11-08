import React from 'react';
import NavUser from './NavUser';
import { useNavigate } from 'react-router-dom';

// This is just a placeholder. In a real app, cartItems would come from your app's state.
const cartData = [
  {
    recipient: 'John Doe',
    to: 'Nairobi, Kenya',
    weight: '3Kg',
    date: 'April 15, 2022'
  },
  {
    recipient: 'John Doe',
    to: 'Nairobi, Kenya',
    weight: '3Kg',
    date: 'April 15, 2022'
  },
];


export default function Cart() {
  const navigate = useNavigate(); 

  const useOrder = () => {
    navigate('/user/order');
  };

  const handleDelete = async (itemId) => {
    alert('ItemDeleted')
  };
  
  const handleEdit = (itemId) => {
    alert('ItemEditted')
  };
  
  return (
    <div>
      <NavUser />
      <h1 className='cartheading'>Cart</h1>
      <button className='checkoutbtn' onClick={useOrder}>Checkout Here</button>
      <div className='cardcartbox'>
    
      {cartData.map((item, index) => {
        // Calculate the price 
        const weightInKg = parseFloat(item.weight);
        const price = weightInKg * 3;

        return (
          <div key={index} className="cardcart">
            <h3 className="card__title">Package</h3>
            <p className="card__content">Recipient: {item.recipient}</p>
            <p className="card__content">To: {item.to}</p>
            <p className="card__content">Weight: {item.weight}</p>
            <p className="card__content">Price: ${price}</p>
            <div className="card__date">{item.date}</div>
            <button className='cartbutton' onClick={() => handleDelete(item.id)}>Delete</button>
            <button className='cartbutton' onClick={() => handleEdit(item.id)}>Edit</button>
          </div>
        );
      })}
      </div>
    </div>
  );
}
