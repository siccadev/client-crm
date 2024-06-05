import React from 'react';
import { NavLink } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';

const Headeradmin = () => {
  const auth = JSON.parse(localStorage.getItem('user'));

  const handleLogout = async () => {
    try {
      await fetch('/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      localStorage.removeItem('token');
      window.location.href = '/login';
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="header">
      <div className="logo-container">
      </div>
      <div className="nav-links">
        <NavLink to="/dashboardadmin" activeClassName="active">
          <i className="bi bi-house-fill"></i> {/* House icon for Accueil */}
          Accueil
        </NavLink>
        <NavLink to="/profile" activeClassName="active">
          <i className="bi bi-person-fill"></i> {/* Person icon for Profile */}
          Profile
        </NavLink>
        {auth ? (
          <>
            <span>{auth.name}</span>
            <button onClick={handleLogout}>
              <i className="bi bi-box-arrow-right"></i> {/* Box arrow right icon for Déconnexion */}
              Déconnexion
            </button>
          </>
        ) : (
          <NavLink to="/login">Déconnexion</NavLink>
        )}
      </div>
    </div>
  );
};

export default Headeradmin;