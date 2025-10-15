import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer" id="contact">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <div className="footer-logo">
              <h3>Hospitality Hub</h3>
              <p>Highlighting the best in the hospitality industry.</p>
            </div>
          </div>

          <div className="footer-section">
            <h4>Product</h4>
            <ul className="footer-links">
              <li>
                <a
                  href="https://linkedin.com"
                  className="social-link"
                  target="_blank"
                  rel="noopener noreferrer">
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="https://twitter.com"
                  className="social-link"
                  target="_blank"
                  rel="noopener noreferrer">
                  Twitter
                </a>
              </li>
              <li>
                <a
                  href="https://facebook.com"
                  className="social-link"
                  target="_blank"
                  rel="noopener noreferrer">
                  Facebook
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com"
                  className="social-link"
                  target="_blank"
                  rel="noopener noreferrer">
                  Instagram
                </a>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Company</h4>
            <ul className="footer-links">
              <li>
                <a href="#about">About</a>
              </li>
              <li>
                <a href="#careers">Careers</a>
              </li>
              <li>
                <a href="#blog">Blog</a>
              </li>
              <li>
                <a href="#press">Press</a>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Support</h4>
            <ul className="footer-links">
              <li>
                <a href="#help">Help Center</a>
              </li>
              <li>
                <a href="#contact">Contact Us</a>
              </li>
              <li>
                <a href="#privacy">Privacy Policy</a>
              </li>
              <li>
                <a href="#terms">Terms of Service</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2025 Hospitality Hub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
