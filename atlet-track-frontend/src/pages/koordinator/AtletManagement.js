// src/pages/koordinator/AtletManagement.js
import React, { useState, useEffect } from "react";
import { Container, Table, Button, Modal, Form, Alert } from "react-bootstrap";
import api from "../../services/api";

const AtletManagement = () => {
  const [atlets, setAtlets] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedAtlet, setSelectedAtlet] = useState(null);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    password: "",
    cabangOlahraga: "",
  });

  useEffect(() => {
    fetchAtlets();
  }, []);

  const fetchAtlets = async () => {
    try {
      const response = await api.get("/koordinator/atlet");
      setAtlets(response.data);
    } catch (error) {
      setError("Gagal mengambil data atlet");
    }
  };

  const handleAddAtlet = async (e) => {
    e.preventDefault();
    try {
      await api.post("/koordinator/atlet", formData);
      setShowAddModal(false);
      setFormData({
        nama: "",
        email: "",
        password: "",
        cabangOlahraga: "",
      });
      fetchAtlets();
    } catch (error) {
      setError(error.response?.data?.message || "Gagal menambahkan atlet");
    }
  };

  const handleEditAtlet = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/koordinator/atlet/${selectedAtlet.id}`, formData);
      setShowEditModal(false);
      setSelectedAtlet(null);
      setFormData({
        nama: "",
        email: "",
        password: "",
        cabangOlahraga: "",
      });
      fetchAtlets();
    } catch (error) {
      setError(error.response?.data?.message || "Gagal mengupdate atlet");
    }
  };

  const handleDeleteAtlet = async (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus atlet ini?")) {
      try {
        await api.delete(`/koordinator/atlet/${id}`);
        fetchAtlets();
      } catch (error) {
        setError("Gagal menghapus atlet");
      }
    }
  };

  return (
    <Container className="mt-4">
      <h2>Manajemen Atlet</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Button
        variant="primary"
        className="mb-3"
        onClick={() => setShowAddModal(true)}>
        Tambah Atlet
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>No</th>
            <th>Nama</th>
            <th>Email</th>
            <th>Cabang Olahraga</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {atlets.map((atlet, index) => (
            <tr key={atlet.id}>
              <td>{index + 1}</td>
              <td>{atlet.nama}</td>
              <td>{atlet.email}</td>
              <td>{atlet.cabangOlahraga}</td>
              <td>
                <Button
                  variant="warning"
                  size="sm"
                  className="me-2"
                  onClick={() => {
                    setSelectedAtlet(atlet);
                    setFormData({
                      nama: atlet.nama,
                      email: atlet.email,
                      password: "",
                      cabangOlahraga: atlet.cabangOlahraga,
                    });
                    setShowEditModal(true);
                  }}>
                  Edit
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDeleteAtlet(atlet.id)}>
                  Hapus
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Add Atlet Modal */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Tambah Atlet</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleAddAtlet}>
            <Form.Group className="mb-3">
              <Form.Label>Nama</Form.Label>
              <Form.Control
                type="text"
                value={formData.nama}
                onChange={(e) =>
                  setFormData({ ...formData, nama: e.target.value })
                }
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Kata Sandi</Form.Label>
              <Form.Control
                type="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                required
              />
              <Form.Text className="text-muted">
                Kata sandi harus memiliki minimal 6 karakter, kombinasi huruf
                dan angka
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Cabang Olahraga</Form.Label>
              <Form.Control
                type="text"
                value={formData.cabangOlahraga}
                onChange={(e) =>
                  setFormData({ ...formData, cabangOlahraga: e.target.value })
                }
                required
              />
            </Form.Group>
            <Button type="submit">Tambah Atlet</Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Edit Atlet Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Atlet</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleEditAtlet}>
            <Form.Group className="mb-3">
              <Form.Label>Nama</Form.Label>
              <Form.Control
                type="text"
                value={formData.nama}
                onChange={(e) =>
                  setFormData({ ...formData, nama: e.target.value })
                }
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Kata Sandi (opsional)</Form.Label>
              <Form.Control
                type="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Cabang Olahraga</Form.Label>
              <Form.Control
                type="text"
                value={formData.cabangOlahraga}
                onChange={(e) =>
                  setFormData({ ...formData, cabangOlahraga: e.target.value })
                }
                required
              />
            </Form.Group>
            <Button type="submit">Perbarui Atlet</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default AtletManagement;