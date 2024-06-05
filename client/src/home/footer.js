import React from 'react';
import { FaPhone, FaEnvelope } from 'react-icons/fa';
import './footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__content">
        <p className="footer__contact">Contact Us!</p>
        <p className="footer__copyright">© 2024 SMART SYSTEM</p>
        <div className="footer__icons">
          <FaPhone className="footer__icon" />
          <FaEnvelope className="footer__icon" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
