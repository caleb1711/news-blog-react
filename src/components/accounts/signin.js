import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../style/accounts.css';
import client from '../../api/client';
import { setToken } from '../../util/jwt';

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleSignIn = async () => {
    try {
      const response = await client.post('/accounts/login/', { email, password });
      const token = response.data.token;
      setToken(token)
      console.log('Token from localStorage:', token);
        
      navigate('/');
    } catch (error) {
      console.error('Error during login:', error);
      setError('Failed to log in. Please check your credentials.');
    }
  };

  return (
    <div className="container-fluid p-0">
      <div className="main_header">
        <div className="container main_header_container">
          <div className="main_header_text">
            <Link to="/" style={{ textDecoration: 'none' }}>
              <h4>
                Ne<span style={{ color: '#ea2d00' }}>w</span>s
              </h4>
              <p>Blog</p>
            </Link>
          </div>
        </div>
      </div>
      <div style={{ padding: '0 1rem' }}>
        <div className="accounts_section">
          <h6>Sign In</h6>
          {error && <div className="alert alert-danger">{error}</div>}
          <form className="mt-5">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="account_input"
              placeholder="UserEmail"
              required
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="account_input mt-3"
              placeholder="Password"
              required
            />
{/* Forgot Password Link */}
            <p className="mt-2">
              <Link to="/forgot_password/" className="forgot_a forgot01">
                Forgot my password
              </Link>
            </p>
            {/* Sign In Button */}
            <div className="d-flex justify-content-center mt-5">
              <button type="button" className="sign_in_button" onClick={handleSignIn}>
                SIGN IN
              </button>
            </div>
            <p className="mt-5 text-center forgot_a">
              Don’t have an account?{' '}
              <Link to="/signup" className="forgot_a forgot01" style={{ fontWeight: 'bold' }}>
                Sign Up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
