// src/pages/Login/AdminLogin.js
import React, { useState, useContext } from 'react';
import { Form, Button, Container, Alert, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import api from '../../services/api';
import { AuthContext } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import Logo from '../../assets/logo_dispora_new-removebg-preview.png';
import './Login.css'; // You'll need to create this CSS file

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/admin/login', { username, password });
      const { token } = response.data;
      const payload = JSON.parse(atob(token.split('.')[1]));
      login({ token, role: payload.role, user: { id: payload.id, username: payload.username } });
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="login-page">
      <Container className="d-flex align-items-center justify-content-center min-vh-100">
        <Card className="login-card shadow-lg border-0">
          <Card.Body className="p-5">
            <div className="text-center mb-4">
              <div className="brand-logo-container mb-4">
                <img 
                  src={Logo} 
                  alt="Logo" 
                  className="brand-logo"
                  style={{ width: '80px', height: 'auto' }}
                />
              </div>
              <h2 className="fw-bold text-primary mb-2">Selamat Datang Kembali!</h2>
              <p className="text-muted">Silakan masuk ke panel admin</p>
            </div>

            {error && (
              <Alert variant="danger" className="mb-4 text-center">
                {error}
              </Alert>
            )}

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-4 input-group">
                <span className="input-group-text bg-light border-end-0">
                  <FontAwesomeIcon icon={faUser} className="text-primary" />
                </span>
                <Form.Control
                  type="text"
                  placeholder="Nama Pengguna"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="border-start-0 ps-0"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-4 input-group">
                <span className="input-group-text bg-light border-end-0">
                  <FontAwesomeIcon icon={faLock} className="text-primary" />
                </span>
                <Form.Control
                  type="password"
                  placeholder="Kata Sandi"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border-start-0 ps-0"
                  required
                />
              </Form.Group>

              <Button 
                variant="primary" 
                type="submit" 
                className="w-100 py-2 mb-3 rounded-pill fw-bold"
              >
                Masuk
              </Button>
            
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default AdminLogin;