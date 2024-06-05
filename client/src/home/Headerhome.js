import React from 'react';
import { NavLink } from 'react-router-dom';
import './Home';
import './headerhome.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import smart from './images/smart.jpeg';
import 'tailwindcss/tailwind.css' // Make sure to import Tailwind CSS

const Headerhome = () => {
  return (
    <div className="header flex flex-row justify-between items-center p-1"> {/* Applied Tailwind CSS classes */}
      <div className="logo-container flex flex-row items-center"> {/* Applied Tailwind CSS classes */}
        <NavLink to="/home" className="logo-link">
          <img src={smart} alt="Smart logo" className="header-logo w-16 h-16" /> {/* Applied Tailwind CSS classes */}
        </NavLink>
        <p className="text-2xl font-bold">SmartSystem</p> {/* Applied Tailwind CSS classes */}
      </div>

      <div className="nav-links flex flex-row"> {/* Applied Tailwind CSS classes */}
        <NavLink to="/home" activeClassName="active" className="flex flex-row items-center p-2"> {/* Applied Tailwind CSS classes */}
          Accueil
        </NavLink>
        <div className="about-us flex flex-row items-center p-2"> {/* Applied Tailwind CSS classes */}
        <a href="#about-us">
          About us
          </a>
      </div>
      <div className="contact-us flex flex-row items-center p-2"> {/* Applied Tailwind CSS classes */}
        <a href="#contact-us">
          Contact us
          </a>
      </div>
        <NavLink to="/login" className="flex flex-row items-center p-2"> {/* Applied Tailwind CSS classes */}
          <i className="bi bi-person-circle header-icon"></i>
          Connexion
        </NavLink>
        <NavLink to="/register" className="flex flex-row items-center p-2"> {/* Applied Tailwind CSS classes */}
          <i className="bi bi-gear-fill header-icon"></i>
          Inscription
        </NavLink>
      </div>
    </div>
  );
};

export default Headerhome;
