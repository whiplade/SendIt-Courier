import React, { useState } from 'react';
import NavBar from '../../NavBar'
import { useNavigate } from 'react-router-dom';


export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate(); 

  const useLogin = () => {
    navigate('/user/home');
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`Username: ${username}, Password: ${password}, Remember me: ${rememberMe}`);
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
            <input type='checkbox' checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />
            <label>Remember me</label>
          </div>
          <span className="span">Forgot password?</span>
        </div>

        <button className="button-submit"  onClick={useLogin} >Log In</button>

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
