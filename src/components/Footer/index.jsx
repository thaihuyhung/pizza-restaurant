import React from 'react';
import './style';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__content">
        <div>
          <h3 className="footer-title">
            Pizza.de
          </h3>
          <ul>
            <li><a href="/">About us</a></li>
            <li><a href="/">Partners</a></li>
            <li><a href="/">Careers</a></li>
            <li><a href="/">Terms & Conditions</a></li>
            <li><a href="/">Privacy Policy</a></li>
          </ul>
        </div>
        <div>
          <h3 className="footer-title">
            Customer Care
          </h3>
          <ul>
            <li><a href="/">Help Center</a></li>
            <li><a href="/">Payment</a></li>
            <li><a href="/">How to order</a></li>
            <li><a href="/">Contact Us</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;