import React, { useState } from 'react';
import NavBar from '../../NavBar';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState('admin'); 
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();


    const userRoles = {
      'admin@example.com': 'admin',
      'user@example.com': 'user',
    };


    const userRole = userRoles[username] || selectedRole; 

    console.log(`Username: ${username}, Password: ${password}, Remember me: ${rememberMe}, Role: ${userRole}`);


    if (userRole === 'admin') {
      navigate('/admin');
    } else {
      navigate('/user/home');
    }
  };

  return (
    <div>
      <NavBar />
      <div className='compheading'>Login</div>
      <form className="form" onSubmit={handleSubmit}>
        <div className="flex-column">
          <label>Email</label>
        </div>
        <div className="inputForm">
          <input type='text' className="input" placeholder="Enter your Email" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>

        <div className="flex-column">
          <label>Password</label>
        </div>
        <div className="inputForm">
          <input type='password' className="input" placeholder="Enter your Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>

        <div className="flex-row">
          <div>
            <label>User Role:</label>
            <select value={selectedRole} onChange={(e) => setSelectedRole(e.target.value)}>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div>
            <input type='checkbox' checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />
            <label>Remember me</label>
          </div>
        </div>

        <button className="button-submit">Log In</button>

        <p className="p">Don't have an account? <span className="span">Sign In</span></p>
        <p className="p line">Or With</p>

        <div className="flex-row">
          <button className="btn google">
            Google
          </button>
          <button className="btn apple">
            SendIt
          </button>
        </div>
      </form>
    </div>
  );
}
