import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './SidebarC.css';

const SidebarC = () => {
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
          <NavLink to="/dashboardclient" activeClassName="active" onClick={() => onSelectModule('Dashboard')} className="nav-link">
            <i className="bi bi-speedometer2"></i>
            <span>Dashboard</span>
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/demendesfin" activeClassName="active" onClick={() => onSelectModule('Demande de financement')} className="nav-link">
            <i className="bi bi-credit-card-2-front"></i>
            <span>Demande de financement</span>
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/update-profile" activeClassName="active" onClick={() => onSelectModule('Profile')} className="nav-link">
            <i className="bi bi-person-fill"></i>
            <span>Profile</span>
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

export default SidebarC;
