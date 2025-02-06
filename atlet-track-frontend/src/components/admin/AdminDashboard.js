// src/components/admin/AdminDashboard.js
import React, { useEffect, useState, useContext } from 'react';
import { Container, Row, Col, Card, Table, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { AuthContext } from '../../contexts/AuthContext';

const AdminDashboard = () => {
  const [koordinators, setKoordinators] = useState([]);
  const [activityLogs, setActivityLogs] = useState([]);
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetchKoordinators();
    fetchActivityLogs();
  }, []);

  const fetchKoordinators = async () => {
    try {
      const response = await api.get('/admin/koordinator');
      setKoordinators(response.data);
    } catch (error) {
      console.error('Failed to fetch koordinators:', error);
    }
  };

  const fetchActivityLogs = async () => {
    try {
      const response = await api.get('/admin/activity-logs');
      setActivityLogs(response.data);
    } catch (error) {
      console.error('Failed to fetch activity logs:', error);
    }
  };

  // Handler for Edit Koordinator button
  const handleEditKoordinator = (koordinator) => {
    navigate('/admin/koordinators', { 
      state: { selectedKoordinator: koordinator, action: 'edit' } 
    });
  };

  // Handler for Delete Koordinator button
  const handleDeleteKoordinator = async (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus koordinator ini?')) {
      try {
        await api.delete(`/admin/koordinator/${id}`);
        fetchKoordinators(); // Refresh the list
      } catch (error) {
        console.error('Failed to delete koordinator:', error);
        alert('Gagal menghapus koordinator');
      }
    }
  };

  // Handler for Add New Koordinator button
  const handleAddKoordinator = () => {
    navigate('/admin/koordinators', { 
      state: { action: 'add' } 
    });
  };

  // Handler for View All Activities button
  const handleViewAllActivities = () => {
    navigate('/admin/activity-logs');
  };

  return (
    <Container className="mt-4">
      <h2>Dasbor Admin</h2>
      <Row className="mt-4">
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Koordinator</Card.Title>
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nama</th>
                    <th>Email</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {koordinators.map((koordinator) => (
                    <tr key={koordinator.id}>
                      <td>{koordinator.id}</td>
                      <td>{koordinator.nama}</td>
                      <td>{koordinator.email}</td>
                      <td>
                        <Button 
                          variant="warning" 
                          size="sm" 
                          className="me-2"
                          onClick={() => handleEditKoordinator(koordinator)}
                        >
                          Edit
                        </Button>
                        <Button 
                          variant="danger" 
                          size="sm"
                          onClick={() => handleDeleteKoordinator(koordinator.id)}
                        >
                          Hapus
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <Button 
                variant="primary"
                onClick={handleAddKoordinator}
              >
                Tambah Koordinator
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Aktivitas Terbaru</Card.Title>
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>Waktu</th>
                    <th>Aksi</th>
                    <th>Dilakukan oleh</th>
                  </tr>
                </thead>
                <tbody>
                  {activityLogs.map((log) => (
                    <tr key={log.id}>
                      <td>{new Date(log.timestamp).toLocaleString()}</td>
                      <td>{log.action}</td>
                      <td>
                        {log.Admin ? log.Admin.username : log.Koordinator ? log.Koordinator.nama : 'System'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <Button 
                variant="secondary"
                onClick={handleViewAllActivities}
              >
                Lihat Semua Aktivitas
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminDashboard;