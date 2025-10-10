import React from 'react';
import './About.css';

const About = () => {
  return (
    <section className="about section" id="about">
      <div className="container">
        <div className="about-content">
          <div className="about-text">
            <h2 className="section-title">Transforming Healthcare Through Technology</h2>
            <p className="about-description">
              At Genovas, we believe that technology should enhance, not complicate, healthcare delivery. 
              Our platform is built by healthcare professionals for healthcare professionals, ensuring 
              that every feature serves a real purpose in improving patient outcomes and practice efficiency.
            </p>
            <div className="about-features">
              <div className="about-feature">
                <div className="feature-check">✓</div>
                <span>Built by healthcare professionals</span>
              </div>
              <div className="about-feature">
                <div className="feature-check">✓</div>
                <span>HIPAA compliant and secure</span>
              </div>
              <div className="about-feature">
                <div className="feature-check">✓</div>
                <span>24/7 customer support</span>
              </div>
              <div className="about-feature">
                <div className="feature-check">✓</div>
                <span>Regular updates and improvements</span>
              </div>
            </div>
            <button className="btn btn-primary">Learn More About Us</button>
          </div>
          <div className="about-image">
            <div className="image-placeholder">
              <div className="placeholder-content">
                <div className="placeholder-icon">🏥</div>
                <h4>Modern Healthcare</h4>
                <p>Empowering medical professionals with cutting-edge technology</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
