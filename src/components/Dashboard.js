import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../contexts/AuthContext';
import apiService from '../services/api';
import ServiceForm from './ServiceForm';
import Footer from './Footer';
import './Dashboard.css';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [, setUserStats] = useState(null);
  const [userServices, setUserServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showServiceForm, setShowServiceForm] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [profileImage, setProfileImage] = useState(user?.profileImage || null);
  const [uploadingImage, setUploadingImage] = useState(false);

  const fetchDashboardData = useCallback(async () => {
    try {
      setLoading(true);

      // Fetch user services if they're a service provider
      if (user.role === 'service_provider' || user.role === 'venue_owner') {
        const servicesResponse = await apiService.getServicesByProvider(
          user.id
        );
        if (servicesResponse.success) {
          setUserServices(servicesResponse.data.services);
        }
      }

      // Fetch user statistics
      const statsResponse = await apiService.getUserStats(user.id);
      if (statsResponse.success) {
        setUserStats(statsResponse.data);
      }
    } catch (error) {
      setError('Failed to load dashboard data');
      console.error('Dashboard error:', error);
    } finally {
      setLoading(false);
    }
  }, [user.id, user.role]);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  const handleLogout = async () => {
    await logout();
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file');
      return;
    }

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      setError('Image size must be less than 5MB');
      return;
    }

    setUploadingImage(true);
    setError(null);

    try {
      const response = await apiService.uploadProfilePicture(user.id, file);
      if (response.success) {
        setProfileImage(response.data.profileImage);
        // Update user in context
        // const updatedUser = {
        //   ...user,
        //   profileImage: response.data.profileImage,
        // };
        // You might want to update the AuthContext here
      } else {
        setError(response.message || 'Failed to upload image');
      }
    } catch (error) {
      setError('Failed to upload image');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleDeleteImage = async () => {
    if (!profileImage) return;

    try {
      const response = await apiService.deleteProfilePicture(user.id);
      if (response.success) {
        setProfileImage(null);
        // Update user in context
        // const updatedUser = { ...user, profileImage: null };
        // You might want to update the AuthContext here
      } else {
        setError(response.message || 'Failed to delete image');
      }
    } catch (error) {
      setError('Failed to delete image');
    }
  };

  const handleServiceSuccess = (service) => {
    if (editingService) {
      setUserServices((prev) =>
        prev.map((s) => (s._id === service._id ? service : s))
      );
    } else {
      setUserServices((prev) => [...prev, service]);
    }
    setShowServiceForm(false);
    setEditingService(null);
  };

  const handleEditService = (service) => {
    setEditingService(service);
    setShowServiceForm(true);
  };

  const handleDeleteService = async (serviceId) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      try {
        const response = await apiService.deleteService(serviceId);
        if (response.success) {
          setUserServices((prev) => prev.filter((s) => s._id !== serviceId));
        }
      } catch (error) {
        console.error('Delete service error:', error);
      }
    }
  };

  const renderOverview = () => (
    <div className="overview-section">
      <div className="welcome-card">
        <h2>Welcome back, {user.firstName}!</h2>
        <p>Here's what's happening with your account.</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">👤</div>
          <div className="stat-content">
            <h3>Profile</h3>
            <p>Complete your profile to get more visibility</p>
            <div className="completion-bar">
              <div className="completion-fill" style={{ width: '75%' }}></div>
            </div>
            <span className="completion-text">75% Complete</span>
          </div>
        </div>

        {user.role === 'service_provider' || user.role === 'venue_owner' ? (
          <>
            <div className="stat-card">
              <div className="stat-icon">🔧</div>
              <div className="stat-content">
                <h3>Services</h3>
                <p className="stat-number">{userServices.length}</p>
                <p>Active services</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">⭐</div>
              <div className="stat-content">
                <h3>Rating</h3>
                <p className="stat-number">4.8</p>
                <p>Average rating</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">📅</div>
              <div className="stat-content">
                <h3>Bookings</h3>
                <p className="stat-number">12</p>
                <p>This month</p>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="stat-card">
              <div className="stat-icon">🔍</div>
              <div className="stat-content">
                <h3>Search</h3>
                <p>Find services you need</p>
                <button className="primary-btn">Browse Services</button>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">❤️</div>
              <div className="stat-content">
                <h3>Favorites</h3>
                <p className="stat-number">5</p>
                <p>Saved services</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">📝</div>
              <div className="stat-content">
                <h3>Reviews</h3>
                <p className="stat-number">3</p>
                <p>Reviews written</p>
              </div>
            </div>
          </>
        )}
      </div>

      <div className="recent-activity">
        <h3>Recent Activity</h3>
        <div className="activity-list">
          <div className="activity-item">
            <div className="activity-icon">✅</div>
            <div className="activity-content">
              <p>Account created successfully</p>
              <span className="activity-time">2 days ago</span>
            </div>
          </div>
          <div className="activity-item">
            <div className="activity-icon">📧</div>
            <div className="activity-content">
              <p>Email verification sent</p>
              <span className="activity-time">2 days ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderServices = () => (
    <div className="services-section">
      <div className="section-header">
        <h2>My Services</h2>
        <button
          className="primary-btn"
          onClick={() => setShowServiceForm(true)}>
          Add New Service
        </button>
      </div>

      {userServices.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">🔧</div>
          <h3>No services yet</h3>
          <p>
            Start by adding your first service to get discovered by customers.
          </p>
          <button
            className="primary-btn"
            onClick={() => setShowServiceForm(true)}>
            Create Service
          </button>
        </div>
      ) : (
        <div className="services-grid">
          {userServices.map((service) => (
            <div key={service._id} className="service-card">
              <div className="service-image">
                <img
                  src={service.images?.[0] || '/api/placeholder/300/200'}
                  alt={service.title}
                />
              </div>
              <div className="service-content">
                <h3>{service.title}</h3>
                <p className="service-description">{service.description}</p>
                <div className="service-meta">
                  <span className="service-category">{service.category}</span>
                  <span className="service-price">
                    ${service.pricing?.hourly || 'Contact'}/hr
                  </span>
                </div>
                <div className="service-actions">
                  <button
                    className="secondary-btn"
                    onClick={() => handleEditService(service)}>
                    Edit
                  </button>
                  <button
                    className="danger-btn"
                    onClick={() => handleDeleteService(service._id)}>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderProfile = () => (
    <div className="profile-section">
      <div className="section-header">
        <h2>Profile Settings</h2>
      </div>

      <div className="profile-form">
        {/* Profile Picture Section */}
        <div className="profile-picture-section">
          <div className="profile-picture-container">
            {profileImage ? (
              <img
                src={`http://localhost:5001${profileImage}`}
                alt="Profile"
                className="profile-picture"
              />
            ) : (
              <div className="profile-picture-placeholder">
                <span>
                  {user?.firstName?.charAt(0)}
                  {user?.lastName?.charAt(0)}
                </span>
              </div>
            )}
          </div>

          <div className="profile-picture-actions">
            <label htmlFor="profile-image-upload" className="btn-upload">
              {uploadingImage ? 'Uploading...' : 'Upload Photo'}
            </label>
            <input
              id="profile-image-upload"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              style={{ display: 'none' }}
              disabled={uploadingImage}
            />
            {profileImage && (
              <button
                onClick={handleDeleteImage}
                className="btn-delete-image"
                disabled={uploadingImage}>
                Remove
              </button>
            )}
          </div>
        </div>

        <div className="form-group">
          <label>First Name</label>
          <input type="text" defaultValue={user.firstName} />
        </div>
        <div className="form-group">
          <label>Last Name</label>
          <input type="text" defaultValue={user.lastName} />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input type="email" defaultValue={user.email} />
        </div>
        <div className="form-group">
          <label>Phone</label>
          <input type="tel" defaultValue={user.phone || ''} />
        </div>
        <div className="form-group">
          <label>Bio</label>
          <textarea defaultValue={user.bio || ''} rows="4"></textarea>
        </div>
        <div className="form-group">
          <label>Location</label>
          <input type="text" defaultValue={user.location || ''} />
        </div>
        <button className="primary-btn">Save Changes</button>
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="settings-section">
      <div className="section-header">
        <h2>Account Settings</h2>
        <p>Manage your account preferences and security settings.</p>
      </div>

      <div className="settings-grid">
        {/* Profile Settings */}
        <div className="settings-card">
          <div className="settings-card-header">
            <h3>👤 Profile Information</h3>
            <p>Update your personal details and contact information</p>
          </div>
          <div className="settings-form">
            <div className="form-row">
              <div className="form-group">
                <label>First Name</label>
                <input type="text" defaultValue={user.firstName} />
              </div>
              <div className="form-group">
                <label>Last Name</label>
                <input type="text" defaultValue={user.lastName} />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Email Address</label>
                <input type="email" defaultValue={user.email} />
              </div>
              <div className="form-group">
                <label>Phone Number</label>
                <input type="tel" defaultValue={user.phone || ''} />
              </div>
            </div>
            <div className="form-group">
              <label>Business Name</label>
              <input type="text" defaultValue={user.businessName || ''} />
            </div>
            <button className="primary-btn">Save Changes</button>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="settings-card">
          <div className="settings-card-header">
            <h3>🔔 Notifications</h3>
            <p>Choose how you want to be notified about updates</p>
          </div>
          <div className="settings-form">
            <div className="setting-item">
              <div className="setting-info">
                <h4>Email Notifications</h4>
                <p>Receive updates via email</p>
              </div>
              <label className="toggle-switch">
                <input type="checkbox" defaultChecked />
                <span className="toggle-slider"></span>
              </label>
            </div>
            <div className="setting-item">
              <div className="setting-info">
                <h4>SMS Notifications</h4>
                <p>Receive text message updates</p>
              </div>
              <label className="toggle-switch">
                <input type="checkbox" />
                <span className="toggle-slider"></span>
              </label>
            </div>
            <div className="setting-item">
              <div className="setting-info">
                <h4>Push Notifications</h4>
                <p>Receive browser push notifications</p>
              </div>
              <label className="toggle-switch">
                <input type="checkbox" defaultChecked />
                <span className="toggle-slider"></span>
              </label>
            </div>
            <div className="setting-item">
              <div className="setting-info">
                <h4>Marketing Emails</h4>
                <p>Receive promotional content and updates</p>
              </div>
              <label className="toggle-switch">
                <input type="checkbox" />
                <span className="toggle-slider"></span>
              </label>
            </div>
          </div>
        </div>

        {/* Privacy Settings */}
        <div className="settings-card">
          <div className="settings-card-header">
            <h3>🔒 Privacy & Security</h3>
            <p>Control your privacy and security preferences</p>
          </div>
          <div className="settings-form">
            <div className="setting-item">
              <div className="setting-info">
                <h4>Profile Visibility</h4>
                <p>Make your profile visible to other users</p>
              </div>
              <select className="setting-select" defaultValue="public">
                <option value="public">Public</option>
                <option value="private">Private</option>
              </select>
            </div>
            <div className="setting-item">
              <div className="setting-info">
                <h4>Show Contact Information</h4>
                <p>Display your contact details on your profile</p>
              </div>
              <label className="toggle-switch">
                <input type="checkbox" defaultChecked />
                <span className="toggle-slider"></span>
              </label>
            </div>
            <div className="setting-item">
              <div className="setting-info">
                <h4>Two-Factor Authentication</h4>
                <p>Add an extra layer of security to your account</p>
              </div>
              <button className="secondary-btn">Enable 2FA</button>
            </div>
            <div className="setting-item">
              <div className="setting-info">
                <h4>Change Password</h4>
                <p>Update your account password</p>
              </div>
              <button className="secondary-btn">Change Password</button>
            </div>
          </div>
        </div>

        {/* Preferences */}
        <div className="settings-card">
          <div className="settings-card-header">
            <h3>⚙️ Preferences</h3>
            <p>Customize your experience</p>
          </div>
          <div className="settings-form">
            <div className="setting-item">
              <div className="setting-info">
                <h4>Language</h4>
                <p>Choose your preferred language</p>
              </div>
              <select className="setting-select" defaultValue="en">
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
                <option value="de">German</option>
              </select>
            </div>
            <div className="setting-item">
              <div className="setting-info">
                <h4>Time Zone</h4>
                <p>Set your local time zone</p>
              </div>
              <select className="setting-select" defaultValue="UTC-5">
                <option value="UTC-8">Pacific Time (UTC-8)</option>
                <option value="UTC-7">Mountain Time (UTC-7)</option>
                <option value="UTC-6">Central Time (UTC-6)</option>
                <option value="UTC-5">Eastern Time (UTC-5)</option>
                <option value="UTC+0">UTC</option>
                <option value="UTC+1">Central European Time</option>
              </select>
            </div>
            <div className="setting-item">
              <div className="setting-info">
                <h4>Theme</h4>
                <p>Choose your preferred theme</p>
              </div>
              <select className="setting-select" defaultValue="light">
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="auto">Auto</option>
              </select>
            </div>
            <div className="setting-item">
              <div className="setting-info">
                <h4>Email Frequency</h4>
                <p>How often you want to receive emails</p>
              </div>
              <select className="setting-select" defaultValue="daily">
                <option value="immediate">Immediate</option>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>
          </div>
        </div>

        {/* Account Actions */}
        <div className="settings-card">
          <div className="settings-card-header">
            <h3>⚠️ Account Actions</h3>
            <p>Manage your account status and data</p>
          </div>
          <div className="settings-form">
            <div className="setting-item">
              <div className="setting-info">
                <h4>Download Data</h4>
                <p>Download a copy of your account data</p>
              </div>
              <button className="secondary-btn">Download</button>
            </div>
            <div className="setting-item">
              <div className="setting-info">
                <h4>Deactivate Account</h4>
                <p>Temporarily disable your account</p>
              </div>
              <button className="danger-btn">Deactivate</button>
            </div>
            <div className="setting-item">
              <div className="setting-info">
                <h4>Delete Account</h4>
                <p>Permanently delete your account and all data</p>
              </div>
              <button className="danger-btn">Delete Account</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="loading-spinner"></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="dashboard">
      {/* Professional Header */}
      <header className="dashboard-header">
        <div className="header-content">
          <div className="logo-section">
            <div className="logo">
              <span className="logo-text">Hospitality Hub</span>
            </div>
          </div>

          <div className="user-section">
            <div className="user-info">
              <div className="user-avatar">
                {profileImage ? (
                  <img
                    src={`http://localhost:5001${profileImage}`}
                    alt="Profile"
                    className="user-avatar-img"
                  />
                ) : (
                  <span>
                    {user.firstName?.charAt(0)}
                    {user.lastName?.charAt(0)}
                  </span>
                )}
              </div>
              <div className="user-details">
                <h3 className="user-name">
                  {user.firstName} {user.lastName}
                </h3>
                <p className="user-role">
                  {user.role.replace('_', ' ').toUpperCase()}
                </p>
              </div>
            </div>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="dashboard-nav">
        <div className="nav-container">
          <button
            className={`nav-tab ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}>
            <span className="nav-icon">📊</span>
            <span className="nav-text">Overview</span>
          </button>
          {user.role === 'service_provider' || user.role === 'venue_owner' ? (
            <button
              className={`nav-tab ${activeTab === 'services' ? 'active' : ''}`}
              onClick={() => setActiveTab('services')}>
              <span className="nav-icon">🔧</span>
              <span className="nav-text">My Services</span>
            </button>
          ) : (
            <button
              className={`nav-tab ${activeTab === 'bookings' ? 'active' : ''}`}
              onClick={() => setActiveTab('bookings')}>
              <span className="nav-icon">📅</span>
              <span className="nav-text">Bookings</span>
            </button>
          )}
          <button
            className={`nav-tab ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}>
            <span className="nav-icon">👤</span>
            <span className="nav-text">Profile</span>
          </button>
          <button
            className={`nav-tab ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => setActiveTab('settings')}>
            <span className="nav-icon">⚙️</span>
            <span className="nav-text">Settings</span>
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="dashboard-main">
        <div className="content-container">
          {error && <div className="error-message">{error}</div>}

          {activeTab === 'overview' && renderOverview()}
          {activeTab === 'services' && renderServices()}
          {activeTab === 'profile' && renderProfile()}
          {activeTab === 'bookings' && (
            <div className="bookings-section">
              <h2>My Bookings</h2>
              <p>Your booking history will appear here.</p>
            </div>
          )}
          {activeTab === 'settings' && renderSettings()}
        </div>
      </main>

      <Footer />

      <ServiceForm
        isOpen={showServiceForm}
        onClose={() => {
          setShowServiceForm(false);
          setEditingService(null);
        }}
        service={editingService}
        onSuccess={handleServiceSuccess}
      />
    </div>
  );
};

export default Dashboard;
