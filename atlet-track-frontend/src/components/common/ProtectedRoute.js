// src/components/common/ProtectedRoute.js
import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';

const ProtectedRoute = ({ roles }) => {
  const { auth } = useContext(AuthContext);

  if (!auth.token) {
    return <Navigate to="/login" replace />;
  }

  if (roles && !roles.includes(auth.role)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
