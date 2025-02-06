// src/pages/atlet/Profile.js
import React, { useState, useEffect } from 'react';
import { Container, Card, Form, Button, Alert } from 'react-bootstrap';
import api from '../../services/api';

const Profile = () => {
  const [profile, setProfile] = useState({
    nama: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await api.get('/atlet/profile');
      setProfile({
        nama: response.data.nama,
        email: response.data.email,
        password: '',
      });
    } catch (error) {
      setError('Failed to fetch profile');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put('/atlet/profile', profile);
      setSuccess('Profile updated successfully');
      setError('');
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to update profile');
      setSuccess('');
    }
  };

  return (
    <Container className="mt-4">
      <h2>Profile</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
      <Card>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Nama</Form.Label>
              <Form.Control
                type="text"
                value={profile.nama}
                onChange={(e) => setProfile({ ...profile, nama: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>New Password (optional)</Form.Label>
              <Form.Control
                type="password"
                value={profile.password}
                onChange={(e) => setProfile({ ...profile, password: e.target.value })}
              />
            </Form.Group>
            <Button type="submit" variant="primary">
              Update Profile
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Profile;