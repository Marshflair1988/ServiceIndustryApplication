import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Header.css';

const Header = ({ onSignInClick, onRegisterClick }) => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHeaderHidden, setIsHeaderHidden] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleDashboardClick = () => {
    navigate('/dashboard');
    closeMenu();
  };

  const handleLogout = async () => {
    await logout();
    closeMenu();
  };

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const updateScrollDirection = () => {
      const scrollY = window.scrollY;

      if (Math.abs(scrollY - lastScrollY) < 5) {
        ticking = false;
        return;
      }

      if (scrollY > lastScrollY && scrollY > 100) {
        // Scrolling down
        setIsHeaderHidden(true);
      } else {
        // Scrolling up
        setIsHeaderHidden(false);
      }

      lastScrollY = scrollY > 0 ? scrollY : 0;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateScrollDirection);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`header ${isHeaderHidden ? 'hidden' : ''}`}>
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
            {isAuthenticated ? (
              <>
                <div className="user-info">
                  <span className="user-name">Hi, {user?.firstName}</span>
                  <div className="user-menu">
                    <button
                      className="btn btn-secondary"
                      onClick={handleDashboardClick}>
                      Dashboard
                    </button>
                    <button className="btn btn-outline" onClick={handleLogout}>
                      Logout
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <button className="btn btn-secondary" onClick={onSignInClick}>
                  Sign In
                </button>
                <button className="btn btn-primary" onClick={onRegisterClick}>
                  Get Started
                </button>
              </>
            )}
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
