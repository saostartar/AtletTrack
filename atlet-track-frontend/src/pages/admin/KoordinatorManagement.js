// src/pages/admin/KoordinatorManagement.js
import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Modal, Form, Alert } from 'react-bootstrap';
import api from '../../services/api';
import './KoordinatorManagement.css'; // Add new CSS file

const KoordinatorManagement = () => {
  const [koordinators, setKoordinators] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedKoordinator, setSelectedKoordinator] = useState(null);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    nama: '',
    email: '',
    password: ''
  });

  useEffect(() => {
    fetchKoordinators();
  }, []);

  const fetchKoordinators = async () => {
    try {
      const response = await api.get('/admin/koordinator');
      setKoordinators(response.data);
    } catch (error) {
      setError('Gagal mengambil data koordinator');
    }
  };

  const handleAddKoordinator = async (e) => {
    e.preventDefault();
    try {
      await api.post('/admin/koordinator', formData);
      setShowAddModal(false);
      setFormData({ nama: '', email: '', password: '' });
      fetchKoordinators();
    } catch (error) {
      setError(error.response?.data?.message || 'Gagal menambahkan koordinator');
    }
  };

  const handleEditKoordinator = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/admin/koordinator/${selectedKoordinator.id}`, formData);
      setShowEditModal(false);
      setSelectedKoordinator(null);
      setFormData({ nama: '', email: '', password: '' });
      fetchKoordinators();
    } catch (error) {
      setError(error.response?.data?.message || 'Gagal memperbarui koordinator');
    }
  };

  const handleDeleteKoordinator = async (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus koordinator ini?')) {
      try {
        await api.delete(`/admin/koordinator/${id}`);
        fetchKoordinators();
      } catch (error) {
        setError('Gagal menghapus koordinator');
      }
    }
  };

  const handleResetPassword = async (id) => {
    const newPassword = prompt('Masukkan kata sandi baru:');
    if (newPassword) {
      try {
        await api.post(`/admin/koordinator/${id}/reset-password`, { newPassword });
        alert('Kata sandi berhasil direset');
      } catch (error) {
        setError('Gagal mereset kata sandi');
      }
    }
  };

  return (
    <div className="koordinator-management">
      <Container>
        <div className="page-title">
          <h2>Manajemen Koordinator</h2>
        </div>
        {error && <Alert variant="danger">{error}</Alert>}
        
        <Button variant="primary" className="mb-3" onClick={() => setShowAddModal(true)}>
          Tambah Koordinator Baru
        </Button>

        <div className="table-responsive">
          <Table striped bordered hover>
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
                      onClick={() => {
                        setSelectedKoordinator(koordinator);
                        setFormData({
                          nama: koordinator.nama,
                          email: koordinator.email,
                          password: ''
                        });
                        setShowEditModal(true);
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      className="me-2"
                      onClick={() => handleDeleteKoordinator(koordinator.id)}
                    >
                      Hapus
                    </Button>
                    <Button
                      variant="info"
                      size="sm"
                      onClick={() => handleResetPassword(koordinator.id)}
                    >
                      Reset Kata Sandi
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>

        {/* Modal Tambah */}
        <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Tambah Koordinator Baru</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleAddKoordinator}>
              <Form.Group className="mb-3">
                <Form.Label>Nama</Form.Label>
                <Form.Control
                  type="text"
                  value={formData.nama}
                  onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Kata Sandi</Form.Label>
                <Form.Control
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                />
              </Form.Group>
              <Button type="submit">Tambah Koordinator</Button>
            </Form>
          </Modal.Body>
        </Modal>

        {/* Modal Ubah */}
        <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Ubah Koordinator</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleEditKoordinator}>
              <Form.Group className="mb-3">
                <Form.Label>Nama</Form.Label>
                <Form.Control
                  type="text"
                  value={formData.nama}
                  onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Kata Sandi Baru (opsional)</Form.Label>
                <Form.Control
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
              </Form.Group>
              <Button type="submit">Perbarui Koordinator</Button>
            </Form>
          </Modal.Body>
        </Modal>
      </Container>
    </div>
  );
};

export default KoordinatorManagement;