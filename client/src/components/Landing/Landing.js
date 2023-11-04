import React from 'react'
import NavBar from '../../NavBar'
export default function Landing() {

    return (
      <div>
        <NavBar />
        <div className='landing-container'>
          <div className='landing-text'><h1 className='landingheading'>Fastest Deliveries And Easy PickUp</h1></div>
          <div className='landing-image'><img src='https://media.istockphoto.com/id/1325240511/vector/young-delivery-man-with-box-courier-with-a-box-in-his-hands-vector-flat-cartoon-illustration.jpg?s=612x612&w=0&k=20&c=krUS8Yv2PZ51JQPIaEYBLKrIx90MNTrA5Pl4faxoQyM=' alt='alt' className='img1landing'/></div>
      </div>
      <div className='landing-container'>
        <div className='landing-image2' ><img src='https://media.istockphoto.com/id/1218078716/vector/online-delivery-service-concept-online-order-tracking-delivery-home-and-office-warehouse.jpg?s=612x612&w=0&k=20&c=-fKhU8IlpWg2Kw510h0t89psDhRkuODHATPQY35s2pk=' alt='img'className='img1landing'/></div>
        <div className='landingheading2'><h1>Always Ready For Delivery</h1></div>
      </div>
      <div className='landing-container'>
        <div className='landingheading2'><h1>We Offer The Best Customer Care</h1></div>
        <div className='landing-image2' ><img src='https://img.freepik.com/premium-vector/delivery-man-handling-parcel-package-box-customer-illustration_218660-535.jpg?size=626&ext=jpg&ga=GA1.1.267966678.1696515594&semt=ais' className='img1landing' alt='img'/></div>
      </div>
      </div>
    )
  }
  
  