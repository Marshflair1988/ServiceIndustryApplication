import React from 'react';
import './Features.css';

const Features = () => {
  const features = [
    {
      icon: '🏥',
      title: 'Patient Management',
      description: 'Comprehensive patient records, scheduling, and communication tools all in one place.'
    },
    {
      icon: '📊',
      title: 'Analytics Dashboard',
      description: 'Real-time insights and analytics to help you make informed decisions about your practice.'
    },
    {
      icon: '🔒',
      title: 'HIPAA Compliant',
      description: 'Enterprise-grade security and compliance to protect patient data and meet regulations.'
    },
    {
      icon: '📱',
      title: 'Mobile Access',
      description: 'Access your practice management tools anywhere with our mobile-responsive platform.'
    },
    {
      icon: '💬',
      title: 'Patient Communication',
      description: 'Automated reminders, messaging, and telehealth capabilities for better patient engagement.'
    },
    {
      icon: '⚡',
      title: 'Fast Integration',
      description: 'Seamlessly integrate with existing systems and third-party applications.'
    }
  ];

  return (
    <section className="features section" id="features">
      <div className="container">
        <h2 className="section-title">Why Choose Genovas?</h2>
        <p className="section-subtitle">
          Powerful features designed specifically for healthcare providers to streamline operations and improve patient care.
        </p>
        
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon">{feature.icon}</div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
