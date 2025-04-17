import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const PrivateRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!currentUser) {
    return <Navigate to="/signin" />;
  }

  return children;
};

export default PrivateRoute;