import React, { useState } from 'react';
import './Header.css';

const Header = ({ onSignInClick, onRegisterClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <a className="logo" href="#home" aria-label="Go to home">
            <img
              src="/assets/logo.png"
              alt="Talented logo"
              className="logo-image"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </a>

          <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
            <ul className="nav-list">
              <li>
                <a href="#home" onClick={closeMenu}>
                  Home
                </a>
              </li>
              <li>
                <a href="#about" onClick={closeMenu}>
                  About
                </a>
              </li>
              <li>
                <a href="#services" onClick={closeMenu}>
                  Services
                </a>
              </li>
              <li>
                <a href="#features" onClick={closeMenu}>
                  Features
                </a>
              </li>
              <li>
                <a href="#testimonials" onClick={closeMenu}>
                  Testimonials
                </a>
              </li>
              <li>
                <a href="#contact" onClick={closeMenu}>
                  Contact
                </a>
              </li>
            </ul>
          </nav>

          <div className="header-actions">
            <button className="btn btn-secondary" onClick={onSignInClick}>
              Sign In
            </button>
            <button className="btn btn-primary" onClick={onRegisterClick}>
              Get Started
            </button>
          </div>

          <button className="menu-toggle" onClick={toggleMenu}>
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
