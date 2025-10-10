import React from 'react';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero" id="home">
      <div className="hero-background">
        <div className="hero-overlay"></div>
      </div>
      <div className="container">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              Advanced Healthcare Solutions for Modern Medical Practices
            </h1>
            <p className="hero-subtitle">
              Streamline your medical practice with our comprehensive healthcare management platform. 
              Improve patient care, enhance efficiency, and grow your practice with cutting-edge technology.
            </p>
            <div className="hero-actions">
              <button className="btn btn-primary">Start Free Trial</button>
              <button className="btn btn-secondary">Watch Demo</button>
            </div>
            <div className="hero-stats">
              <div className="stat">
                <h3>10,000+</h3>
                <p>Healthcare Providers</p>
              </div>
              <div className="stat">
                <h3>50M+</h3>
                <p>Patients Served</p>
              </div>
              <div className="stat">
                <h3>99.9%</h3>
                <p>Uptime Guarantee</p>
              </div>
            </div>
          </div>
          <div className="hero-image">
            <div className="hero-card">
              <div className="card-header">
                <div className="card-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
              <div className="card-content">
                <div className="dashboard-preview">
                  <div className="dashboard-header">
                    <h4>Patient Dashboard</h4>
                    <div className="status-indicator active"></div>
                  </div>
                  <div className="dashboard-stats">
                    <div className="stat-card">
                      <div className="stat-icon">👥</div>
                      <div className="stat-info">
                        <span className="stat-number">1,247</span>
                        <span className="stat-label">Active Patients</span>
                      </div>
                    </div>
                    <div className="stat-card">
                      <div className="stat-icon">📅</div>
                      <div className="stat-info">
                        <span className="stat-number">89</span>
                        <span className="stat-label">Appointments Today</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
