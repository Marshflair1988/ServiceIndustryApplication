import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import apiService from '../services/api';
import './ServiceForm.css';

const ServiceForm = ({ isOpen, onClose, service = null, onSuccess }) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    title: service?.title || '',
    description: service?.description || '',
    category: service?.category || '',
    pricing: {
      hourly: service?.pricing?.hourly || '',
      daily: service?.pricing?.daily || '',
      fixed: service?.pricing?.fixed || '',
    },
    location: service?.location || '',
    availability: {
      monday: service?.availability?.monday || true,
      tuesday: service?.availability?.tuesday || true,
      wednesday: service?.availability?.wednesday || true,
      thursday: service?.availability?.thursday || true,
      friday: service?.availability?.friday || true,
      saturday: service?.availability?.saturday || true,
      sunday: service?.availability?.sunday || true,
    },
    tags: service?.tags?.join(', ') || '',
    requirements: service?.requirements || '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const categories = [
    'Catering',
    'Photography',
    'Music & Entertainment',
    'Event Planning',
    'Venue Rental',
    'Decoration',
    'Transportation',
    'Security',
    'Cleaning Services',
    'Technical Support',
    'Other',
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: type === 'checkbox' ? checked : value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const serviceData = {
        ...formData,
        provider: user.id,
        tags: formData.tags
          .split(',')
          .map((tag) => tag.trim())
          .filter((tag) => tag),
        isActive: true,
      };

      let response;
      if (service) {
        response = await apiService.updateService(service._id, serviceData);
      } else {
        response = await apiService.createService(serviceData);
      }

      if (response.success) {
        onSuccess?.(response.data.service);
        onClose();
      } else {
        setError(response.message);
      }
    } catch (error) {
      setError('Failed to save service. Please try again.');
      console.error('Service form error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="service-form-overlay">
      <div className="service-form-modal">
        <div className="service-form-header">
          <h2>{service ? 'Edit Service' : 'Create New Service'}</h2>
          <button className="close-btn" onClick={onClose}>
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="service-form">
          {error && <div className="error-message">{error}</div>}

          <div className="form-section">
            <h3>Basic Information</h3>

            <div className="form-group">
              <label htmlFor="title">Service Title *</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                placeholder="e.g., Professional Wedding Photography"
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description *</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows="4"
                placeholder="Describe your service in detail..."
              />
            </div>

            <div className="form-group">
              <label htmlFor="category">Category *</label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required>
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="location">Location</label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g., New York, NY or Service Area"
              />
            </div>
          </div>

          <div className="form-section">
            <h3>Pricing</h3>

            <div className="pricing-grid">
              <div className="form-group">
                <label htmlFor="pricing.hourly">Hourly Rate ($)</label>
                <input
                  type="number"
                  id="pricing.hourly"
                  name="pricing.hourly"
                  value={formData.pricing.hourly}
                  onChange={handleChange}
                  min="0"
                  step="0.01"
                  placeholder="50.00"
                />
              </div>

              <div className="form-group">
                <label htmlFor="pricing.daily">Daily Rate ($)</label>
                <input
                  type="number"
                  id="pricing.daily"
                  name="pricing.daily"
                  value={formData.pricing.daily}
                  onChange={handleChange}
                  min="0"
                  step="0.01"
                  placeholder="400.00"
                />
              </div>

              <div className="form-group">
                <label htmlFor="pricing.fixed">Fixed Price ($)</label>
                <input
                  type="number"
                  id="pricing.fixed"
                  name="pricing.fixed"
                  value={formData.pricing.fixed}
                  onChange={handleChange}
                  min="0"
                  step="0.01"
                  placeholder="1000.00"
                />
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3>Availability</h3>

            <div className="availability-grid">
              {Object.entries(formData.availability).map(([day, available]) => (
                <div key={day} className="availability-item">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name={`availability.${day}`}
                      checked={available}
                      onChange={handleChange}
                    />
                    <span className="checkmark"></span>
                    {day.charAt(0).toUpperCase() + day.slice(1)}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="form-section">
            <h3>Additional Information</h3>

            <div className="form-group">
              <label htmlFor="tags">Tags (comma-separated)</label>
              <input
                type="text"
                id="tags"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                placeholder="e.g., wedding, outdoor, professional, affordable"
              />
            </div>

            <div className="form-group">
              <label htmlFor="requirements">Requirements</label>
              <textarea
                id="requirements"
                name="requirements"
                value={formData.requirements}
                onChange={handleChange}
                rows="3"
                placeholder="Any specific requirements or notes for customers..."
              />
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="secondary-btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="primary-btn" disabled={loading}>
              {loading
                ? 'Saving...'
                : service
                ? 'Update Service'
                : 'Create Service'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ServiceForm;
