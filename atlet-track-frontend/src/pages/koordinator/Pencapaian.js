// src/pages/koordinator/Pencapaian.js
import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Modal, Form, Alert } from 'react-bootstrap';
import api from '../../services/api';

const Pencapaian = () => {
  const [pencapaians, setPencapaians] = useState([]);
  const [atlets, setAtlets] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedPencapaian, setSelectedPencapaian] = useState(null);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    nama: '',
    deskripsi: '',
    atletId: ''
  });

  useEffect(() => {
    fetchPencapaians();
    fetchAtlets();
  }, []);

  const fetchPencapaians = async () => {
    try {
      const response = await api.get('/koordinator/pencapaian');
      setPencapaians(response.data);
    } catch (error) {
      setError('Failed to fetch pencapaian');
    }
  };

  const fetchAtlets = async () => {
    try {
      const response = await api.get('/koordinator/atlet');
      setAtlets(response.data);
    } catch (error) {
      console.error('Failed to fetch atlets');
    }
  };

  const handleAddPencapaian = async (e) => {
    e.preventDefault();
    try {
      await api.post('/koordinator/pencapaian', formData);
      setShowAddModal(false);
      setFormData({ nama: '', deskripsi: '', atletId: '' });
      fetchPencapaians();
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to add pencapaian');
    }
  };

  const handleDeletePencapaian = async (id) => {
    if (window.confirm('Are you sure you want to delete this pencapaian?')) {
      try {
        await api.delete(`/koordinator/pencapaian/${id}`);
        fetchPencapaians();
      } catch (error) {
        setError('Failed to delete pencapaian');
      }
    }
  };

  return (
    <Container className="mt-4">
      <h2>Pencapaian Atlet</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Button variant="primary" className="mb-3" onClick={() => setShowAddModal(true)}>
        Add New Pencapaian
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>No</th>
            <th>Atlet</th>
            <th>Nama Pencapaian</th>
            <th>Deskripsi</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {pencapaians.map((pencapaian, index) => (
            <tr key={pencapaian.id}>
              <td>{index + 1}</td>
              <td>{pencapaian.atlet.nama}</td>
              <td>{pencapaian.nama}</td>
              <td>{pencapaian.deskripsi}</td>
              <td>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDeletePencapaian(pencapaian.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Add Pencapaian Modal */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Pencapaian</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleAddPencapaian}>
            <Form.Group className="mb-3">
              <Form.Label>Atlet</Form.Label>
              <Form.Select
                value={formData.atletId}
                onChange={(e) => setFormData({ ...formData, atletId: e.target.value })}
                required
              >
                <option value="">Select Atlet</option>
                {atlets.map((atlet) => (
                  <option key={atlet.id} value={atlet.id}>
                    {atlet.nama}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Nama Pencapaian</Form.Label>
              <Form.Control
                type="text"
                value={formData.nama}
                onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Deskripsi</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={formData.deskripsi}
                onChange={(e) => setFormData({ ...formData, deskripsi: e.target.value })}
              />
            </Form.Group>
            <Button type="submit">Add Pencapaian</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default Pencapaian;