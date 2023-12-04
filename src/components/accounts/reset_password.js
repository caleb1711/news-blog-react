import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import client from '../../api/client';
import Header from '../header';

const ResetPassword = () => {
  const { uid, token } = useParams();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [messages, setMessages] = useState([]);
  const [errors, setErrors] = useState([]);

  const handleResetPassword = async (e) => {
    e.preventDefault();

    try {
      const response = await client.post(`/accounts/reset/${uid}/${token}/`, {
        password:password,
        password1: confirmPassword,
      });

      setMessages([response.data.detail]);
    } catch (error) {
      setErrors(Object.values(error.response.data));
    }
  };

  return (
    <div className="container-fluid p-0">
      <Header />
      {/* Reset Password Form */}
      <div style={{ padding: '0 1rem' }}>
        <div className="accounts_section">
          <h6>Reset Password</h6>

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

          <form onSubmit={handleResetPassword} className="mt-5">
            {/* Password Input */}
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="account_input mt-3"
              placeholder="Password"
            />

            {/* Confirm Password Input */}
            <input
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="account_input mt-3"
              placeholder="Confirm Password"
              required
            />

            {/* Token Input */}
            <input
              type="hidden"
              name="token"
              value={token}
              className="account_input mt-3"
              placeholder="Confirm Password"
              required
            />

            {/* Reset Password Button */}
            <div className="d-flex justify-content-center mt-3">
              <button type="submit" className="sign_in_button">
                Reset Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
