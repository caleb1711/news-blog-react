import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../style/accounts.css';
import client from '../../api/client';

const SignUp = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    password2: '',
  });

  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignUp = () => {
    client.post('/accounts/user/', formData)
      .then(response => {
        console.log(response.data);
        navigate('/login');
      })
      .catch(error => {
        console.error('Error during signup:', error);
        if (error.response && error.response.data) {
          setErrors(Object.values(error.response.data));
        } else {
          setErrors(['Failed to sign up. Please try again.']);
        }
      });
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
          <h6>Sign Up</h6>

          {errors.length > 0 && (
            <div className="alert alert-danger">
              <ul>
                {errors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </div>
          )}

          <form className="mt-5">
            <input
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              className="account_input"
              placeholder="First Name"
              required
            />
            <input
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              className="account_input mt-3"
              placeholder="Last Name"
              required
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="account_input mt-3"
              placeholder="Email"
              required
            />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="account_input mt-3"
              placeholder="Password"
              required
            />
            <input
              type="password"
              name="password2"
              value={formData.password2}
              onChange={handleChange}
              className="account_input mt-3"
              placeholder="Confirm Password"
              required
            />
            <div className="d-flex justify-content-center mt-5">
              <button type="button" className="sign_in_button" onClick={handleSignUp}>
                SIGN UP
              </button>
            </div>

            <p className="mt-5 text-center forgot_a">
              Already have an account?{' '}
              <Link to="/login" className="forgot_a forgot01" style={{ fontWeight: 'bold' }}>
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
