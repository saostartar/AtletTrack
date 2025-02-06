// src/contexts/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    token: localStorage.getItem('token') || null,
    role: localStorage.getItem('role') || null,
    user: JSON.parse(localStorage.getItem('user')) || null,
  });

  useEffect(() => {
    // Optionally, validate token with backend on mount
  }, []);

  const login = (data) => {
    localStorage.setItem('token', data.token);
    localStorage.setItem('role', data.role);
    localStorage.setItem('user', JSON.stringify(data.user));
    setAuth({
      token: data.token,
      role: data.role,
      user: data.user,
    });
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('user');
    setAuth({
      token: null,
      role: null,
      user: null,
    });
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
