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
        {/* Existing sidebar items */}
        <li className="nav-item">
          <NavLink to="/dashboardadmin" activeClassName="active" onClick={() => onSelectModule('Dashboard')} className="nav-link">
            <i className="bi bi-speedometer2"></i>
            <span>Dashboard</span>
          </NavLink>
        </li>
        {/* Add the new sidebar item for Suivi des paiement en retard des clients */}
        <li className="nav-item">
          <NavLink to="/late-payments" activeClassName="active" onClick={() => onSelectModule('Suivi des paiements en retard des clients')} className="nav-link">
            <i className="bi bi-clock-history"></i>
            <span>Suivi des paiements en retard des clients</span>
          </NavLink>
        </li>
        {/* Remaining sidebar items */}
        <li className="nav-item">
          <NavLink to="/gestion-opportunites" activeClassName="active" onClick={() => onSelectModule('Gestion des opportunités de financement')} className="nav-link">
            <i className="bi bi-card-checklist"></i>
            <span>Gestion des opportunités de financement</span>
          </NavLink>
        </li>
        {/* Add other sidebar items as needed */}
      </ul>
    </div>
  );
};

export default Sidebar;
