import React from 'react';
import './Services.css';

const Services = () => {
  const services = [
    {
      title: 'Electronic Health Records',
      description: 'Comprehensive EHR system with customizable templates and automated workflows.',
      price: 'Starting at $99/month',
      features: ['Patient Records', 'Prescription Management', 'Lab Results', 'Billing Integration']
    },
    {
      title: 'Practice Management',
      description: 'Complete practice management solution with scheduling, billing, and reporting.',
      price: 'Starting at $149/month',
      features: ['Appointment Scheduling', 'Insurance Verification', 'Claims Processing', 'Financial Reporting']
    },
    {
      title: 'Telehealth Platform',
      description: 'Secure video consultations and remote patient monitoring capabilities.',
      price: 'Starting at $79/month',
      features: ['Video Consultations', 'Remote Monitoring', 'Patient Portal', 'Mobile Access']
    }
  ];

  return (
    <section className="services section" id="services">
      <div className="container">
        <h2 className="section-title">Our Services</h2>
        <p className="section-subtitle">
          Choose the perfect plan for your practice. All plans include 24/7 support and regular updates.
        </p>
        
        <div className="services-grid">
          {services.map((service, index) => (
            <div key={index} className="service-card">
              <div className="service-header">
                <h3 className="service-title">{service.title}</h3>
                <p className="service-description">{service.description}</p>
                <div className="service-price">{service.price}</div>
              </div>
              <div className="service-features">
                <ul>
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex}>
                      <span className="feature-check">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <button className="btn btn-primary service-btn">Get Started</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
