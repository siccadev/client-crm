import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import './styles.css/reset.css';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const token = new URLSearchParams(window.location.search).get('token');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    try {
      const response = await fetch('http://localhost:3001/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, password }),
      });
      if (!response.ok) {
        throw new Error('An error occurred while resetting the password.');
      }
      setSuccess(true);
    } catch (error) {
      console.error(error);
      setError('An error occurred while resetting the password.');
    }
  };

  if (success) {
    return <Redirect to="/login" />;
  }

  return (
    <div className='auth'>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit} >
        <label htmlFor="password">New Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <label htmlFor="confirmPassword">Confirm New Password:</label>
        <input
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <br />
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
};

export default ResetPassword;