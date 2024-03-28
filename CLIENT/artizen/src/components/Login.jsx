import React, { useState } from 'react';
import '../App.css'

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = () => {

    console.log('Logging in with:', username, password);
  };

  const handleGoogleSignIn = () => {
  
    console.log('Signing in with Google');
  };

  return (
    <div className="login-page">
      <h2>Sign In</h2>
      <form>
        <div className="form-group">
          <input
            type="text"
            id="username"
            value={username}
            onChange={handleUsernameChange}
            placeholder='Username'
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder='Password'
          />
        </div>
        <button type="button" className='login-form-btn' onClick={handleLogin}>Login</button>
        <h2>OR</h2>
        <button type="button" className='login-google-btn' onClick={handleGoogleSignIn}>Sign in with Google</button>
      </form>
    </div>
  );
};

export default LoginPage;
