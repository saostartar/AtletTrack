// src/pages/Login/AtletLogin.js
import React, { useState, useContext } from 'react';
import { Form, Button, Container, Alert, Card, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faRunning } from '@fortawesome/free-solid-svg-icons';
import api from '../../services/api';
import { AuthContext } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const AtletLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/atlet/login', { email, password });
      const { token } = response.data;
      const payload = JSON.parse(atob(token.split('.')[1]));
      login({ token, role: payload.role, user: { id: payload.id, email: payload.email } });
      navigate('/atlet/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Gagal masuk');
    }
  };

  return (
    <div className="login-page">
      <Container>
        <Row className="vh-100 d-flex justify-content-center align-items-center">
          <Col md={8} lg={6} xl={5}>
            <Card className="login-card shadow-lg border-0">
              <Card.Body className="p-5">
                {/* Logo/Ikon */}
                <div className="text-center mb-4">
                  <div className="brand-logo-container mb-4">
                    <FontAwesomeIcon icon={faRunning} size="3x" className="text-primary" />
                  </div>
                  <h2 className="fw-bold text-primary mb-2">Selamat Datang Atlet!</h2>
                  <p className="text-muted">Silakan masuk untuk melanjutkan ke dasbor Anda</p>
                </div>

                {error && (
                  <Alert variant="danger" className="text-center mb-4">
                    {error}
                  </Alert>
                )}

                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-4 input-group">
                    <span className="input-group-text bg-light border-end-0">
                      <FontAwesomeIcon icon={faUser} className="text-primary" />
                    </span>
                    <Form.Control
                      type="email"
                      placeholder="Masukkan email Anda"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
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
                      placeholder="Masukkan kata sandi Anda"
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
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AtletLogin;