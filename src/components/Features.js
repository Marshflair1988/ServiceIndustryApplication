import React from 'react';
import './Features.css';

const Features = () => {
  const features = [
    {
      icon: '👤',
      title: 'Professional Profiles',
      description:
        'Create stunning profiles showcasing your skills, experience, and portfolio to attract the right opportunities.',
    },
    {
      icon: '⭐',
      title: 'Verified Reviews',
      description:
        'Collect authentic guest reviews and ratings that build trust and credibility in the industry.',
    },
    {
      icon: '🔍',
      title: 'Smart Discovery',
      description:
        'Get discovered by venues and employers who are actively looking for professionals like you.',
    },
    {
      icon: '📱',
      title: 'Mobile-First Design',
      description:
        'Access your profile, apply to jobs, and manage bookings anywhere with our mobile-optimized platform.',
    },
    {
      icon: '💼',
      title: 'Job Matching',
      description:
        'Receive personalized job recommendations based on your skills, location, and preferences.',
    },
    {
      icon: '📈',
      title: 'Career Analytics',
      description:
        'Track your performance, earnings, and career growth with detailed insights and statistics.',
    },
  ];

  return (
    <section className="features section" id="features">
      <div className="container">
        <h2 className="section-title">Why Choose Hospitality Hub?</h2>
        <p className="section-subtitle">
          Powerful features designed specifically for service industry
          professionals to showcase their skills, build their reputation, and
          advance their careers.
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
