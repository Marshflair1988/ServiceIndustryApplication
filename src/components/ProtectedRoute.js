import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import './ProtectedRoute.css';

const ProtectedRoute = ({ children, requiredRole = null }) => {
  const { isAuthenticated, user, loading } = useAuth();

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="auth-required">
        <div className="auth-required-content">
          <h2>Authentication Required</h2>
          <p>Please log in to access this page.</p>
          <button
            className="primary-btn"
            onClick={() => (window.location.href = '/login')}>
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  if (requiredRole && user.role !== requiredRole) {
    return (
      <div className="access-denied">
        <div className="access-denied-content">
          <h2>Access Denied</h2>
          <p>You don't have permission to access this page.</p>
          <p>Required role: {requiredRole.replace('_', ' ').toUpperCase()}</p>
          <p>Your role: {user.role.replace('_', ' ').toUpperCase()}</p>
        </div>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;
