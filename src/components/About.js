import React from 'react';
import './About.css';

const About = () => {
  return (
    <section className="about section" id="about">
      <div className="container">
        <div className="about-content">
          <div className="about-text">
            <h2 className="section-title">
              Empowering Service Industry Professionals
            </h2>
            <p className="about-description">
              At Hospitality Hub, we believe that every service industry
              professional deserves a platform to showcase their talent and
              build their career. Our platform is built by hospitality
              professionals for hospitality professionals, ensuring that every
              feature helps you stand out, get discovered, and advance in your
              career.
            </p>
            <div className="about-features">
              <div className="about-feature">
                <div className="feature-check">✓</div>
                <span>Built by hospitality professionals</span>
              </div>
              <div className="about-feature">
                <div className="feature-check">✓</div>
                <span>Verified reviews and ratings</span>
              </div>
              <div className="about-feature">
                <div className="feature-check">✓</div>
                <span>24/7 community support</span>
              </div>
              <div className="about-feature">
                <div className="feature-check">✓</div>
                <span>Regular platform updates</span>
              </div>
            </div>
            <button className="btn btn-primary">Learn More About Us</button>
          </div>
          <div className="about-image">
            <div className="image-placeholder">
              <div className="placeholder-content">
                <div className="placeholder-icon">🍸</div>
                <h4>Service Excellence</h4>
                <p>
                  Empowering hospitality professionals with modern career tools
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
