import React from 'react'


export default function Admin() {
  return (
    <div>
      <div className=''>Admin Dashboard</div>
      <div className="cardpackage">
        <div className="img">
        <img src='https://static.vecteezy.com/system/resources/previews/022/123/337/original/user-icon-profile-icon-account-icon-login-sign-line-vector.jpg' alt='img'/>
        </div>
        <div className="text">
          <p className="h3">Type: User</p>
          <p className="detailsp">User: Jonh Doe</p>
          <p className="detailsp">Packages pending: 3pkgs</p>
          <p className="detailsp">Delivered: 5pkgs</p>
        </div>
      </div>
    </div>
  
  )
}
