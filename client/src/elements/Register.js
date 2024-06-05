import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import smart from './images/smart.jpeg';
import './styles.css/register.css';

const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [activite, setActivite] = useState('');
  const [secteur, setSecteur] = useState('');
  const [error, setError] = useState('');
  const [inputsValid, setInputsValid] = useState(false);

  const validateInputs = () => {
    setInputsValid(username && email && password && activite && secteur);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3001/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password, activite, secteur }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const data = await response.json();
      if (data.success) {
        navigate('/login', { replace: true });
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.error(error);
      setError('Une erreur s\'est produite lors de l\'inscription.');
    }
  };

  return (
    <div className='auth'>
      <img src={smart} alt="Smart logo" />
      <h1>Inscription</h1>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Nom de la société:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
            validateInputs();
          }} required
        />
        <br />
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            validateInputs();
          }} required
        />
        <br />
        <label htmlFor="password">Mot de passe:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            validateInputs();
          }} required
        />
        <br />
        <label htmlFor="activite">Activité:</label>
        <input
          type="text"
          id="activite"
          value={activite}
          onChange={(e) => {
            setActivite(e.target.value);
            validateInputs();
          }} required
        />
        <br />
        <label htmlFor="secteur">Secteur d'Activité:</label>
        <input
          type="text"
          id="secteur"
          value={secteur}
          onChange={(e) => {
            setSecteur(e.target.value);
            validateInputs();
          }} required
        />
        <br />
        <div>
          <button type="submit" disabled={!inputsValid}>S'inscrire</button>
        </div>
        <span>
          Vous avez déjà un compte? <Link to="/login">Connexion</Link>
        </span>
      </form>
    </div>
  );
};

export default Register;
