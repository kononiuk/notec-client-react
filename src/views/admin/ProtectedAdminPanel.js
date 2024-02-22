import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminPanel from './AdminPanel';

// This is a mock function, replace it with your actual authentication check
const isAuthenticated = () => {
  // Check if the user is authenticated
  // Return true if authenticated, false otherwise
  return true; // This is a placeholder
};

const ProtectedAdminPanel = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/admin/login');
    }
  }, [navigate]);

  return isAuthenticated() ? <AdminPanel /> : null;
};

export default ProtectedAdminPanel;