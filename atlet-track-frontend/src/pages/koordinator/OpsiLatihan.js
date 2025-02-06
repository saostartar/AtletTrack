// atlet-track-frontend/src/pages/koordinator/OpsiLatihan.js
import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Modal, Form, Alert, Row, Col } from 'react-bootstrap';
import api from '../../services/api';

const OpsiLatihan = () => {
  const [showForm, setShowForm] = useState(false);
  const [katalogLatihan, setKatalogLatihan] = useState(null);
  const [selectedKatalog, setSelectedKatalog] = useState(null);
  const [katalogList, setKatalogList] = useState([]);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    nama: '',
    durasi: '',
    repetisi: '',
    deskripsi: '',
    target: '',
    instruksi: '',
  });

  useEffect(() => {
    fetchKatalogList();
  }, []);

  const fetchKatalogList = async () => {
    try {
      const response = await api.get('/koordinator/katalog-latihan');
      setKatalogList(response.data);
    } catch (error) {
      setError('Gagal memuat daftar katalog');
    }
  };

  const fetchKatalogDetail = async (id) => {
    try {
      const response = await api.get(`/koordinator/katalog-latihan/${id}`);
      setKatalogLatihan(response.data);
      setSelectedKatalog(response.data);
    } catch (error) {
      setError('Gagal memuat detail katalog');
    }
  };

  const handleAddOpsiLatihan = async (e) => {
    e.preventDefault();
    try {
      // Use the POST endpoint for creating new exercise option
      await api.post(`/koordinator/katalog-latihan/${selectedKatalog.id}/opsi`, formData);

      setShowForm(false);
      resetForm();
      fetchKatalogDetail(selectedKatalog.id);
    } catch (error) {
      setError('Gagal menambahkan opsi latihan');
    }
  };

  const handleDeleteOpsiLatihan = async (opsiId) => {
    if (window.confirm('Anda yakin ingin menghapus opsi latihan ini?')) {
      try {
        // Use the DELETE endpoint for removing exercise option
        await api.delete(`/koordinator/opsi-latihan/${opsiId}`);
        fetchKatalogDetail(selectedKatalog.id);
      } catch (error) {
        setError('Gagal menghapus opsi latihan');
      }
    }
  };

  const resetForm = () => {
    setFormData({
      nama: '',
      durasi: '',
      repetisi: '',
      deskripsi: '',
      target: '',
      instruksi: '',
    });
  };

  return (
    <Container className="mt-4">
      <h2>Kelola Opsi Latihan</h2>
      {error && <Alert variant="danger">{error}</Alert>}

      <Row className="mb-4">
        <Col md={6}>
          <Form.Group>
            <Form.Label>Pilih Katalog Latihan</Form.Label>
            <Form.Select 
              onChange={(e) => fetchKatalogDetail(e.target.value)}
              value={selectedKatalog?.id || ''}
            >
              <option value="">Pilih Katalog...</option>
              {katalogList.map((katalog) => (
                <option key={katalog.id} value={katalog.id}>
                  {katalog.nama} - {katalog.jenisLatihan} ({katalog.tingkatKesulitan})
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>

      {selectedKatalog && (
        <>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4>Opsi Latihan untuk: {selectedKatalog.nama}</h4>
            <Button variant="primary" onClick={() => setShowForm(true)}>
              Tambah Opsi Latihan
            </Button>
          </div>

          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Nama Latihan</th>
                <th>Durasi (menit)</th>
                <th>Repetisi</th>
                <th>Target</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {katalogLatihan?.opsiLatihan?.map((opsi) => (
                <tr key={opsi.id}> {/* Changed from index to opsi.id */}
                  <td>{opsi.nama}</td>
                  <td>{opsi.durasi}</td>
                  <td>{opsi.repetisi}</td>
                  <td>{opsi.target}</td>
                  <td>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDeleteOpsiLatihan(opsi.id)} // Changed from index to opsi.id
                    >
                      Hapus
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}

      <Modal show={showForm} onHide={() => setShowForm(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Tambah Opsi Latihan</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleAddOpsiLatihan}>
            <Form.Group className="mb-3">
              <Form.Label>Nama Latihan</Form.Label>
              <Form.Control
                type="text"
                value={formData.nama}
                onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                required
              />
            </Form.Group>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Durasi (menit)</Form.Label>
                  <Form.Control
                    type="number"
                    value={formData.durasi}
                    onChange={(e) => setFormData({ ...formData, durasi: parseInt(e.target.value) })}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Repetisi</Form.Label>
                  <Form.Control
                    type="number"
                    value={formData.repetisi}
                    onChange={(e) => setFormData({ ...formData, repetisi: parseInt(e.target.value) })}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Deskripsi</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                value={formData.deskripsi}
                onChange={(e) => setFormData({ ...formData, deskripsi: e.target.value })}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Target</Form.Label>
              <Form.Control
                type="text"
                value={formData.target}
                onChange={(e) => setFormData({ ...formData, target: e.target.value })}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Instruksi</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={formData.instruksi}
                onChange={(e) => setFormData({ ...formData, instruksi: e.target.value })}
                required
              />
            </Form.Group>

            <Button type="submit">Tambah Opsi Latihan</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default OpsiLatihan;