import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './sidebaradmin.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const Sidebar = () => {
  const [navCollapse, setNavCollapse] = useState(false);

  const onSelectModule = (module) => {
    // handle module selection
  };

  const toggleSidebar = () => {
    setNavCollapse(!navCollapse);
  };

  return (
    <div className={`sidebar${navCollapse ? ' collapsed' : ''}`}>
      <div className="logo-container">
        <button className="collapse-btn" onClick={toggleSidebar}>
          <i className="bi bi-justify"></i>
        </button>
      </div>
      <ul>
        <li className="nav-item">
          <NavLink to="/dashboardadmin" activeClassName="active" onClick={() => onSelectModule('Dashboard')} className="nav-link">
            <i className="bi bi-speedometer2"></i>
            <span>Dashboard</span>
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/gestion-opportunites" activeClassName="active" onClick={() => onSelectModule('Gestion des opportunités de financement')} className="nav-link">
            <i className="bi bi-card-checklist"></i>
            <span>Gestion des opportunités de financement</span>
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/gestion-mecanisme" activeClassName="active" onClick={() => onSelectModule('Gestion de mécanisme de finanacement')} className="nav-link">
            <i className="bi bi-gear-wide-connected"></i>
            <span>Gestion de mécanisme de finanacement</span>
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/gestion-risques" activeClassName="active" onClick={() => onSelectModule('Gestion des risques')} className="nav-link">
            <i className="bi bi-exclamation-octagon"></i>
            <span>Gestion des risques</span>
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/recouvrement" activeClassName="active" onClick={() => onSelectModule('Recouvrement')} className="nav-link">
            <i className="bi bi-cash-coin"></i>
            <span>Recouvrement</span>
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/statistiques" activeClassName="active" onClick={() => onSelectModule('Statistiques')} className="nav-link">
            <i className="bi bi-bar-chart-fill"></i>
            <span>Statistiques</span>
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/logout" activeClassName="active" onClick={() => onSelectModule('Déconnexion')} className="nav-link">
            <i className="bi bi-box-arrow-right"></i>
            <span>Déconnexion</span>
          </NavLink>
        </li>
        </ul>
    </div>
  );
};

export default Sidebar;
