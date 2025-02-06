// src/pages/NotFound.js
import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Container className="text-center mt-5">
      <h1>404 - Page Not Found</h1>
      <p>Halaman tidak ada</p>
      <Button variant="primary" onClick={() => navigate('/')}>
        Kembali ke beranda
      </Button>
    </Container>
  );
};

export default NotFound;
