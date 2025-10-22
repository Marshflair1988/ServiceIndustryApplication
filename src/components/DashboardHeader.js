import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import './DashboardHeader.css';

const DashboardHeader = () => {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <header className="dashboard-header">
      <div className="dashboard-header-container">
        <div className="dashboard-logo">
          <h1>Hospitality Hub</h1>
        </div>

        <div className="dashboard-user-actions">
          <button onClick={handleLogout} className="btn-logout">
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
