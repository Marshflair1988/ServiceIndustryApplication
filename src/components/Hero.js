import React, { useEffect, useMemo, useState } from 'react';
import './Hero.css';

// Simple inline SVG star icons to avoid external dependencies
const StarIcon = ({ size = 14, color = '#FFC107' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={color}
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    style={{ display: 'inline-block', verticalAlign: 'text-bottom' }}>
    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27z" />
  </svg>
);

const HalfStarIcon = ({
  size = 14,
  color = '#FFC107',
  emptyColor = '#E0E0E0',
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    style={{ display: 'inline-block', verticalAlign: 'text-bottom' }}>
    {/* Outline star in emptyColor */}
    <path
      d="M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.64-7.03L22 9.24z"
      fill={emptyColor}
    />
    {/* Left half filled in color by clipping */}
    <defs>
      <clipPath id="halfClip">
        <rect x="0" y="0" width="12" height="24" />
      </clipPath>
    </defs>
    <path
      d="M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.64-7.03L22 9.24z"
      fill={color}
      clipPath="url(#halfClip)"
    />
  </svg>
);

const RatingStars = ({ value }) => {
  const fullStars = Math.floor(value);
  const hasHalf = value - fullStars >= 0.5;
  const totalIcons = hasHalf ? fullStars + 1 : fullStars;
  const icons = [];
  for (let i = 0; i < fullStars; i++) {
    icons.push(<StarIcon key={`full-${i}`} />);
  }
  if (hasHalf) {
    icons.push(<HalfStarIcon key="half" />);
  }
  // pad to 5 with light gray empty stars for visual consistency
  for (let i = totalIcons; i < 5; i++) {
    icons.push(<StarIcon key={`empty-${i}`} color="#E0E0E0" />);
  }
  return (
    <span
      aria-label={`${value} out of 5 stars`}
      title={`${value} out of 5`}
      style={{ marginLeft: 6, display: 'inline-flex', gap: 2 }}>
      {icons}
    </span>
  );
};

const Hero = ({ onSignInClick, onRegisterClick }) => {
  // Example profiles for the hero carousel
  const profiles = useMemo(
    () => [
      {
        id: 1,
        name: 'Ava Johnson',
        profession: 'Bartender',
        workplace: 'Crowbar Bryggeri',
        rating: 4.8,
        avatarUrl: 'https://i.pravatar.cc/120?img=1',
      },
      {
        id: 2,
        name: 'Liam Carter',
        profession: 'Barista',
        workplace: 'Nordic Beans',
        rating: 4.6,
        avatarUrl: 'https://i.pravatar.cc/120?img=2',
      },
      {
        id: 3,
        name: 'Sofia Nguyen',
        profession: 'Server',
        workplace: 'Harbor House',
        rating: 4.7,
        avatarUrl: 'https://i.pravatar.cc/120?img=3',
      },
      {
        id: 4,
        name: 'Noah Patel',
        profession: 'Sommelier',
        workplace: 'Vin & Vibe',
        rating: 4.9,
        avatarUrl: 'https://i.pravatar.cc/120?img=4',
      },
      {
        id: 5,
        name: 'Maya Rossi',
        profession: 'Host',
        workplace: 'Studio Bistro',
        rating: 4.5,
        avatarUrl: 'https://i.pravatar.cc/120?img=5',
      },
    ],
    []
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const current = profiles[currentIndex];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % profiles.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [profiles.length]);

  return (
    <section className="hero" id="home">
      <div className="hero-background">
        <div className="hero-overlay"></div>
      </div>
      <div className="container">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              Your work. <br /> Your reputation. <br /> Your success.
            </h1>
            <p className="hero-subtitle">
              Hospitality Hub is the place where service industry professionals
              shine. Build your profile, collect verified guest reviews, and
              showcase your expertise. <br /> All in one place.
            </p>
            <div className="hero-actions">
              <button className="btn btn-primary" onClick={onRegisterClick}>
                Sign up now
              </button>
              <button className="btn btn-secondary" onClick={onSignInClick}>
                Log in
              </button>
            </div>
            <div className="hero-stats">
              <div className="stat">
                <h3>10,000+</h3>
                <p>Professionals</p>
              </div>
              <div className="stat">
                <h3>50M+</h3>
                <p>Reviews</p>
              </div>
              <div className="stat">
                <h3>1000+</h3>
                <p>Jobs Secured</p>
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
                <div
                  key={current.id}
                  className="dashboard-preview carousel-slide">
                  <div className="profile-row">
                    <img
                      className="profile-avatar"
                      src={current.avatarUrl}
                      alt={`${current.name} avatar`}
                    />
                    <div className="profile-meta">
                      <div className="profile-name-row">
                        <h4 className="profile-name">{current.name}</h4>
                        <div className="profile-rating">
                          <span className="sr-only">Rating</span>
                          <span className="profile-rating-number">
                            {current.rating.toFixed(1)}
                          </span>
                          <RatingStars value={current.rating} />
                        </div>
                      </div>
                      <div className="profile-sub">
                        <span className="profile-profession">
                          {current.profession}
                        </span>
                        <span className="profile-dot">•</span>
                        <span className="profile-workplace">
                          {current.workplace}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="dashboard-stats">
                    <div className="stat-card">
                      <div className="stat-icon">👥</div>
                      <div className="stat-info">
                        <span className="stat-number">
                          {current.profession}
                        </span>
                        <span className="stat-label">{current.workplace}</span>
                      </div>
                    </div>
                    <div className="stat-card">
                      <div className="stat-icon">⭐</div>
                      <div className="stat-info">
                        <span className="stat-number">Rating</span>
                        <span className="stat-label">
                          {current.rating.toFixed(1)}
                          <RatingStars value={current.rating} />
                        </span>
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
