import React from 'react'
import { useNavigate } from 'react-router-dom';


export default function NavUser() {
    const navigate = useNavigate();

  const navigateTo = (path) => {
    navigate(path);
  };
  return (
    <div>
    <div class="button-container">
     <button class="button" onClick={() => navigateTo('/user/home')}>
        <img src="https://www.freeiconspng.com/uploads/house-icon-png-white-32.png" alt="Icon" className="iconimg1" />
      </button>
      <button class="button" onClick={() => navigateTo('/user/delivery')}>
        <img src="https://static.thenounproject.com/png/326025-200.png" alt="Icon" className="iconimg" />
      </button>
      <button class="button" onClick={() => navigateTo('/user/profile')}>
        <img src="https://cdn-icons-png.flaticon.com/512/3106/3106773.png" alt="Icon" className="iconimg" />
      </button>
      <button class="button" onClick={() => navigateTo('/user/cart')}>
        <img src="https://static-00.iconduck.com/assets.00/shopping-cart-icon-512x462-yrde1eu0.png" alt="Icon" className="iconimg" />
      </button>
    </div>
    </div>
  )
}
