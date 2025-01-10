import { Navigate } from 'react-router-dom';
import React, { ReactNode } from 'react';

interface ProtectedRouteProps {
  children: ReactNode; // Define children type
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem('authToken'); // Check if token exists

  return isAuthenticated ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
