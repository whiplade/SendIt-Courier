import React, { useState } from 'react';

export default function SignUp() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Add your Firebase authentication code here
    console.log(`Username: ${username}, Password: ${password}, Remember me: ${rememberMe}`);
  };

  return (
    <div>
      <div className='compheading'>Signup</div>
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

        <div className="flex-column">
          <label>Confirm Password</label>
        </div>
        <div className="inputForm">
          <input type='password' className="input" placeholder="Confirm your Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>

        <div className="flex-row">
          <div>
            <input type='checkbox' checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />
            <label>Remember me</label>
          </div>
          <span className="span">Forgot password?</span>
        </div>

        <button className="button-submit">Sign Up</button>

        <p className="p">Don't have an account? <span className="span">Log In</span></p>
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
