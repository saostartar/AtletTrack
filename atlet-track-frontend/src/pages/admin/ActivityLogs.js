// src/pages/admin/ActivityLogs.js
import React, { useState, useEffect } from 'react';
import { Container, Table, Alert, Form, Row, Col } from 'react-bootstrap';
import api from '../../services/api';
import './ActivityLogs.css'; // New CSS file for styling

const ActivityLogs = () => {
  const [logs, setLogs] = useState([]);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchActivityLogs();
  }, []);

  const fetchActivityLogs = async () => {
    try {
      const response = await api.get('/admin/activity-logs');
      setLogs(response.data);
    } catch (error) {
      setError('Gagal mengambil data aktivitas');
    }
  };

  const filteredLogs = () => {
    switch (filter) {
      case 'admin':
        return logs.filter(log => log.adminId);
      case 'koordinator':
        return logs.filter(log => log.koordinatorId);
      default:
        return logs;
    }
  };

  return (
    <div className="activity-logs-page">
      <Container>
        <div className="page-title">
          <h2>Riwayat Aktivitas</h2>
        </div>
        {error && <Alert variant="danger">{error}</Alert>}

        <Row className="mb-4">
          <Col md={4}>
            <Form.Group>
              <Form.Label>Filter berdasarkan Tipe Pengguna</Form.Label>
              <Form.Select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="all">Semua Aktivitas</option>
                <option value="admin">Aktivitas Admin</option>
                <option value="koordinator">Aktivitas Koordinator</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        <div className="table-responsive">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Waktu</th>
                <th>Aktivitas</th>
                <th>Dilakukan Oleh</th>
                <th>Tipe Pengguna</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs().map((log) => (
                <tr key={log.id}>
                  <td>{new Date(log.timestamp).toLocaleString('id-ID')}</td>
                  <td>{log.action}</td>
                  <td>
                    {log.Admin ? log.Admin.username : log.Koordinator ? log.Koordinator.nama : 'Sistem'}
                  </td>
                  <td>
                    {log.Admin ? 'Admin' : log.Koordinator ? 'Koordinator' : 'Sistem'}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Container>
    </div>
  );
};

export default ActivityLogs;