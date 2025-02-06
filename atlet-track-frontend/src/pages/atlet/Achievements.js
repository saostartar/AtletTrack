// src/pages/atlet/Achievements.js
import React, { useState, useEffect } from 'react';
import { Container, Table, Card, Alert, Spinner } from 'react-bootstrap';
import api from '../../services/api';

const Achievements = () => {
  const [pencapaian, setPencapaian] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchPencapaian();
  }, []);

  const fetchPencapaian = async () => {
    try {
      const response = await api.get('/atlet/pencapaian');
      setPencapaian(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch achievements');
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Container className="mt-4 text-center">
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <h2>Pencapaian Atlet</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Card>
        <Card.Body>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Tanggal</th>
                <th>Deskripsi</th>
                <th>Koordinator</th>
              </tr>
            </thead>
            <tbody>
              {pencapaian.length > 0 ? (
                pencapaian.map((item) => (
                  <tr key={item.id}>
                    <td>{new Date(item.tanggal).toLocaleDateString()}</td>
                    <td>{item.deskripsi}</td>
                    <td>{item.koordinator?.nama || 'N/A'}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center">
                    Tidak ada pencapaian.
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Achievements;
