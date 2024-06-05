import React from 'react';
import { NavLink } from 'react-router-dom';
import Headerhome from './Headerhome';
import crm from './images/crm.jpg';
import 'bootstrap-icons/font/bootstrap-icons.css'; // Import Bootstrap Icons
import './home.css';

const Home = () => {
  return (
    <div className="auth-container">
      <Headerhome />
      <div className="flex-container">
        <main className="main-section">
          <section className="intro-section">
            <div className="intro-content">
              <h1 className="main-title">DF-Lease</h1>
              <p className="description">
                <ul>Découvrez comment nous pouvons vous <br></br> accompagner dans votre <br></br> transformation
                 digitale <br></br>
                 dès maintenant !</ul>
              </p>
              <div className="crm">
                <img src={crm} alt="crm logo" className="home-logo" /> 
              </div>
              <div className="buttons">
                <NavLink to="/login" className="login-button">Connexion</NavLink>
                <NavLink to="/register" className="register-button">Inscription</NavLink>
              </div>
            </div>
          </section>
          <section id="about-us" className="about-section">
            <h2 className="title">Qui sommes-nous?</h2>
            <p className="description-1">
              <ul>DF-Lease, application intégré dans notre institution financière SMART SYSTEM, est conçu pour offrir une expérience client remarquable. </ul>
              <ul>Grâce à notre plateforme, nous assurons une gestion efficace des demandes de financement, une évaluation précise des risques, un calcul détaillé des échéanciers et une surveillance rigoureuse des paiements.</ul>
            </p>
            <p>
              <a href="https://smartsystem-tn.com/" className="link">En savoir plus.</a>
            </p>
            </section>
            <div className="why-us-container">
            <section className="why-us-section">
              <h3 className="title">Pourquoi nous-choisir?</h3>
              <ul className="reasons-list"> 
  <li className="reason"> 
    <i className="bi bi-chart-line"></i> 
    Pour une gestion efficace des demandes de financement.
  </li>
  <li className="reason"> 
    <i className="bi bi-balance-scale"></i> 
    Pour une évaluation précise des risques.
  </li>
  <li className="reason"> 
    <i className="bi bi-search-dollar"></i>
    Pour une surveillance rigoureuse des paiements.
  </li>
  <li className="reason"> 
    <i className="bi bi-shield-shield-fill"></i> 
    Pour une sécurité garantie.
  </li>
</ul>
            </section>
          </div>
          
          <div className="sectors-container">
            <section className="sectors-section">
              <h4 className="title">Nos secteurs</h4>
              <ul className="sectors-list">
                <li className="sector">BANQUES</li>
                <li className="sector">ASSURANCES</li>
                <li className="sector">INSTITUTIONS DE MICRO FINANCE</li>
                <li className="sector">LEASING</li>
                <li className="sector">FACTORING</li>
                <li className="sector">OPCVM</li>
                <li className="sector">PRIVATE EQUITY</li>
              </ul>
            </section>
          </div>
          <div className="contact-container">
            <section id="contact-us" className="contact-section">
              <h5 className="title"> 📞 Contact</h5>
              <ul className="contact-list">
                <li className="contact-item">
                  <p className="contact-label">Adresse :</p>
                  <a href="https://www.google.com/maps/search/?api=1&query=36.8064,10.1817" target="_blank" rel="noopener noreferrer" className="contact-value">
                    Ennasr II - Rue Salem Ben Ammar, Tunis, Tunis
                  </a>
                </li>
                <li className="contact-item">
                  <p className="contact-label">Email :</p>
                  <a href="mailto:contact@smartsystem-tn.com" className="contact-value">
                    contact@smartsystem-tn.com
                  </a>
                </li>
                <li className="contact-item">
                  <p className="contact-label">Tél. :</p>
                  <p className="contact-value">00216 70 039 446 </p>
                  <p className="contact-label">Fax :</p>
                  <p className="contact-value">
                    00216 70 83 05 48
                  </p>
                </li>
              </ul>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;
