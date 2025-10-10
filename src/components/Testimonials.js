import React from 'react';
import './Testimonials.css';

const Testimonials = () => {
  const testimonials = [
    {
      name: 'Dr. Sarah Johnson',
      role: 'Family Physician',
      practice: 'Johnson Medical Group',
      content: 'Genovas has transformed our practice. The patient management system is intuitive and the analytics help us make better decisions. Our efficiency has improved by 40%.',
      rating: 5
    },
    {
      name: 'Dr. Michael Chen',
      role: 'Cardiologist',
      practice: 'Heart Care Associates',
      content: 'The telehealth features are outstanding. We can now provide care to patients who can\'t visit our office, and the integration with our existing systems was seamless.',
      rating: 5
    },
    {
      name: 'Dr. Emily Rodriguez',
      role: 'Pediatrician',
      practice: 'Children\'s Health Center',
      content: 'The HIPAA compliance and security features give us peace of mind. The platform is reliable and our patients love the patient portal functionality.',
      rating: 5
    }
  ];

  return (
    <section className="testimonials section" id="testimonials">
      <div className="container">
        <h2 className="section-title">What Our Customers Say</h2>
        <p className="section-subtitle">
          Join thousands of healthcare providers who trust Genovas to manage their practice.
        </p>
        
        <div className="testimonials-grid">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial-card">
              <div className="testimonial-rating">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="star">★</span>
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
                    {testimonial.name.split(' ').map(n => n[0]).join('')}
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
