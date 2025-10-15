import React from 'react';
import './Testimonials.css';

const Testimonials = () => {
  const testimonials = [
    {
      name: 'Ava Johnson',
      role: 'Head Bartender',
      practice: 'Crowbar Bryggeri',
      content:
        'Hospitality Hub completely transformed my career! I went from struggling to find consistent work to being booked solid with premium venues. The profile builder helped me showcase my cocktail skills perfectly.',
      rating: 5,
    },
    {
      name: 'Liam Carter',
      role: 'Barista & Coffee Expert',
      practice: 'Nordic Beans',
      content:
        'The verified reviews feature is a game-changer. Guests can see my expertise and ratings, which has increased my bookings by 300%. The platform really helps professionals stand out.',
      rating: 5,
    },
    {
      name: 'Sofia Nguyen',
      role: 'Server & Sommelier',
      practice: 'Harbor House',
      content:
        "I love how easy it is to connect with venues that match my skills and values. The job matching algorithm is spot-on, and I've found amazing opportunities I never would have discovered otherwise.",
      rating: 5,
    },
  ];

  return (
    <section className="testimonials section" id="testimonials">
      <div className="container">
        <h2 className="section-title">What Our Professionals Say</h2>
        <p className="section-subtitle">
          Hear from service industry professionals who have transformed their
          careers with Hospitality Hub. Their success stories inspire us every
          day!
        </p>

        <div className="testimonials-grid">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial-card">
              <div className="testimonial-rating">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="star">
                    ★
                  </span>
                ))}
              </div>
              <p className="testimonial-content">"{testimonial.content}"</p>
              <div className="testimonial-author">
                <div className="author-info">
                  <h4 className="author-name">{testimonial.name}</h4>
                  <p className="author-role">{testimonial.role}</p>
                  <p className="author-practice">{testimonial.practice}</p>
                </div>
                <div className="author-avatar">
                  <div className="avatar-placeholder">
                    {testimonial.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
