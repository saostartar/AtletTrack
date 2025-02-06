// atlet-track-frontend/src/pages/atlet/LatihanHistory.js
import React, { useState, useEffect } from 'react';
import { Container, Table, Badge, Alert, Spinner } from 'react-bootstrap';
import api from '../../services/api';

const LatihanHistory = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const response = await api.get('/atlet/latihan/history');
      // Filter only completed trainings
      const completedTrainings = response.data.filter(
        (latihan) => latihan.status === 'COMPLETED'
      );
      setHistory(completedTrainings);
      setLoading(false);
    } catch (error) {
      setError('Gagal memuat riwayat latihan');
      setLoading(false);
    }
  };

  // Calculate total duration from progressLatihan
  const calculateTotalDuration = (progressLatihan) => {
    if (!Array.isArray(progressLatihan)) return 0;
    return progressLatihan.reduce((total, progress) => {
      return total + (progress.durasi || 0);
    }, 0);
  };

  if (loading) {
    return (
      <Container className="py-4 text-center">
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-4">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <h2 className="mb-4">Riwayat Latihan</h2>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Tanggal</th>
            <th>Katalog</th>
            <th>Durasi Total</th>
            <th>Status</th>
            <th>Catatan</th>
          </tr>
        </thead>
        <tbody>
          {history.length > 0 ? (
            history.map((latihan) => (
              <tr key={latihan.id}>
                <td>
                  {new Date(latihan.tanggalMulai).toLocaleDateString('id-ID')}
                </td>
                <td>{latihan.katalogLatihan.nama}</td>
                <td>{`${calculateTotalDuration(latihan.progressLatihan)} menit`}</td>
                <td>
                  <Badge bg="success">Selesai</Badge>
                </td>
                <td>{latihan.catatan || '-'}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">
                Belum ada riwayat latihan yang selesai
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
};

export default LatihanHistory;