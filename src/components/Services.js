import React from 'react';
import './Services.css';

const Services = () => {
  const services = [
    {
      title: 'Professional Profile',
      description:
        'Create a stunning profile showcasing your skills, experience, and portfolio to attract opportunities.',
      price: 'Free',
      features: [
        'Custom Profile Builder',
        'Portfolio Showcase',
        'Skills Highlighting',
        'Social Media Integration',
      ],
    },
    {
      title: 'Premium Discovery',
      description:
        'Get priority visibility and advanced matching to connect with the best venues and employers.',
      price: '180Kr/month',
      features: [
        'Priority Job Matching',
        'Advanced Analytics',
        'Direct Messaging',
        'Featured Listings',
      ],
    },
    {
      title: 'Career Pro',
      description:
        'Complete career management suite with coaching, networking, and growth tools.',
      price: '250Kr/month',
      features: [
        'Career Coaching',
        'Networking Events',
        'Skill Assessments',
        'Earnings Tracking',
      ],
    },
  ];

  return (
    <section className="services section" id="services">
      <div className="container">
        <h2 className="section-title">Our Services</h2>
        <p className="section-subtitle">
          Choose the perfect plan for your career. All plans include community
          support and regular platform updates.
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
              <button className="btn btn-primary service-btn">
                Get Started
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
