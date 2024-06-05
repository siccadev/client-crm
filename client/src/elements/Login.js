import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import smart from './images/smart.jpeg';
import 'tailwindcss/tailwind.css'; // Import Tailwind CSS
import './styles.css/login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [rememberMe, setRememberMe] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      setError('Please enter a username and password.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error('An error occurred during login.');
      }

      const data = await response.json();
      if (data.success) {
        document.cookie = `userRole=${data.role}; HttpOnly; Secure; Path=/`;

        switch (data.role) {
          case 'admin':
            window.location.href = '/dashboardadmin';
            break;
          case 'client':
            window.location.href = '/dashboardclient';
            break;
          default:
            setError('The user role is not recognized.');
        }
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.error(error);
      setError('An error occurred during login.');
    }
  };

  return (
    <div className='auth flex items-center justify-center'>
      <img src={smart} alt="Smart logo" className='w-32 h-32 mb-4'/>
      {error && <p className='text-red-500'>{error}</p>}
      <form onSubmit={handleSubmit} className='w-full max-w-md'>
        <h1 className='text-2xl font-bold mb-4'>Connexion</h1>
        <label htmlFor="username" className='block font-medium mb-1'>Nom de la société:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className='border border-gray-400 p-2 w-full mb-4'
        />
        <label htmlFor="password" className='block font-medium mb-1'>Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className='border border-gray-400 p-2 w-full mb-4'
        />
        <div className='flex items-center mb-4'>
          <input
            type="checkbox"
            id="rememberMe"
            name="rememberMe"
            checked={rememberMe}
            onChange={() => setRememberMe(!rememberMe)}
            className='mr-2'
          />
          <label htmlFor="rememberMe">Remember me</label>
        </div>
        <button type="submit" className='bg-blue-500 text-white p-2 w-full'>Login</button>
        <Link to="/forgot-password" className='block block font-medium mb-1'>Forgot Password?</Link>
        <span>
          Don't have an account? <Link to="/register" className='font-medium'>Sign up</Link>
        </span>
      </form>
    </div>
  );
};

export default Login;