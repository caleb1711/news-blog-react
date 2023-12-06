import React, { useState } from 'react';
import client from '../../api/client';
import Header from '../header';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [messages, setMessages] = useState([]);
  const [errors, setErrors] = useState([]);

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    try {
      const response = await client.post('/accounts/user/forget_password/', {
        email,
      });
      setMessages([response.data.message]);
    } catch (error) {
      setErrors(Object.values(error.response.data));
    }
  };

  return (
    <div className="container-fluid p-0">
      <Header />
      {/* Forgot Password Form */}
      <div style={{ padding: '0 1rem' }}>
        <div className="accounts_section">
          <h6>Forgot Password?</h6>

          {messages.length > 0 && (
            <div className="alert alert-success">
              <ul>
                {messages.map((message, index) => (
                  <li key={index}>{message}</li>
                ))}
              </ul>
            </div>
          )}

          {errors.length > 0 && (
            <div className="alert alert-danger">
              <ul>
                {errors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </div>
          )}

          <form onSubmit={handleForgotPassword} className="mt-5">
            {/* Email Input */}
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="account_input"
              placeholder="Enter Email"
              required
            />

            {/* Forgot Password Button */}
            <div className="d-flex justify-content-center mt-3">
              <button type="submit" className="sign_in_button">
                Forgot Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
