import React, { useState } from 'react';
import './styles.css/forgot.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setError('Veuillez entrer votre adresse e-mail.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const { message } = await response.json();
        setError(message || 'Une erreur s\'est produite lors de la réinitialisation du mot de passe.');
        return;
      }

      const { message } = await response.json();
      setSuccess(message);
      setEmail(''); // Clear the email field after successful submission
    } catch (error) {
      console.error(error);
      setError('Une erreur s\'est produite. Veuillez réessayer plus tard.');
    }
  };

  return (
    <form onSubmit={handleFormSubmit} >
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
      <label htmlFor="email">Adresse e-mail:</label>
      <input
        type="email"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <button type="submit">Envoyer</button>
    </form>
  );
};

export default ForgotPassword;
