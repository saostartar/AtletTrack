// atlet-track-frontend/src/pages/koordinator/KatalogLatihan.js
import React, { useState, useEffect } from "react";
import {
  Container,
  Table,
  Button,
  Modal,
  Form,
  Alert,
  Badge,
  Card,
} from "react-bootstrap";
import api from "../../services/api";

const JENIS_LATIHAN = {
  KETAHANAN: {
    targetMinimal: 70,
    deskripsiTarget:
      "Target untuk latihan ketahanan adalah konsistensi dalam durasi dan intensitas",
  },
  KEKUATAN: {
    targetMinimal: 65,
    deskripsiTarget:
      "Target untuk latihan kekuatan adalah pencapaian beban dan repetisi yang ditentukan",
  },
  KECEPATAN: {
    targetMinimal: 75,
    deskripsiTarget:
      "Target untuk latihan kecepatan adalah waktu eksekusi dan konsistensi gerakan",
  },
  KELINCAHAN: {
    targetMinimal: 70,
    deskripsiTarget:
      "Target untuk latihan kelincahan adalah kemampuan mengubah arah dengan cepat dan tepat",
  },
  KOORDINASI: {
    targetMinimal: 75,
    deskripsiTarget:
      "Target untuk latihan koordinasi adalah ketepatan dan keselarasan gerakan",
  },
};

const KatalogLatihan = () => {
  const [katalog, setKatalog] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedKatalog, setSelectedKatalog] = useState(null);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    nama: "",
    deskripsi: "",
    jenisLatihan: "",
    tingkatKesulitan: "",
    durasi: "",
    peralatan: "",
    manfaat: "",
    cabangOlahraga: "",
    targetSkor: "",
    deskripsiTarget: "",
  });

  useEffect(() => {
    fetchKatalog();
  }, []);

  const fetchKatalog = async () => {
    try {
      const response = await api.get("/koordinator/katalog-latihan");
      setKatalog(response.data);
    } catch (error) {
      setError("Gagal mengambil data katalog latihan");
    }
  };

  const handleAddKatalog = async (e) => {
    e.preventDefault();
    try {
      await api.post("/koordinator/katalog-latihan", formData);
      setShowAddModal(false);
      resetForm();
      fetchKatalog();
    } catch (error) {
      setError(
        error.response?.data?.message || "Gagal menambahkan katalog latihan"
      );
    }
  };

  const handleEditKatalog = async (e) => {
    e.preventDefault();
    try {
      await api.put(
        `/koordinator/katalog-latihan/${selectedKatalog.id}`,
        formData
      );
      setShowEditModal(false);
      setSelectedKatalog(null);
      resetForm();
      fetchKatalog();
    } catch (error) {
      setError(
        error.response?.data?.message || "Gagal mengupdate katalog latihan"
      );
    }
  };

  const handleDeleteKatalog = async (id) => {
    if (window.confirm("Anda yakin ingin menghapus katalog latihan ini?")) {
      try {
        await api.delete(`/koordinator/katalog-latihan/${id}`);
        fetchKatalog();
      } catch (error) {
        setError("Gagal menghapus katalog latihan");
      }
    }
  };

  const resetForm = () => {
    setFormData({
      nama: "",
      deskripsi: "",
      jenisLatihan: "",
      tingkatKesulitan: "",
      durasi: "",
      peralatan: "",
      manfaat: "",
      cabangOlahraga: "",
      targetSkor: "",
      deskripsiTarget: "",
    });
  };

  const handleJenisLatihanChange = (value) => {
    const jenisLatihan = JENIS_LATIHAN[value];
    setFormData({
      ...formData,
      jenisLatihan: value,
      targetSkor: jenisLatihan?.targetMinimal || "",
      deskripsiTarget: jenisLatihan?.deskripsiTarget || "",
    });
  };

  return (
    <Container className="mt-4">
      <h2>Katalog Latihan</h2>
      {error && <Alert variant="danger">{error}</Alert>}

      <Button
        variant="primary"
        className="mb-3"
        onClick={() => setShowAddModal(true)}>
        Tambah Katalog Latihan
      </Button>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nama</th>
            <th>Jenis Latihan</th>
            <th>Tingkat Kesulitan</th>
            <th>Target Skor</th>
            <th>Durasi (menit)</th>
            <th>Cabang Olahraga</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {katalog.map((item) => (
            <tr key={item.id}>
              <td>{item.nama}</td>
              <td>
                <Badge bg="info">{item.jenisLatihan}</Badge>
              </td>
              <td>
                <Badge
                  bg={
                    item.tingkatKesulitan === "PEMULA"
                      ? "success"
                      : item.tingkatKesulitan === "MENENGAH"
                      ? "warning"
                      : "danger"
                  }>
                  {item.tingkatKesulitan}
                </Badge>
              </td>
              <td>{item.targetSkor}</td>
              <td>{item.durasi}</td>
              <td>{item.cabangOlahraga}</td>
              <td>
                <Button
                  variant="warning"
                  size="sm"
                  className="me-2"
                  onClick={() => {
                    setSelectedKatalog(item);
                    setFormData(item);
                    setShowEditModal(true);
                  }}>
                  Edit
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDeleteKatalog(item.id)}>
                  Hapus
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal Form Component */}
      <KatalogForm
        show={showAddModal || showEditModal}
        handleClose={() => {
          setShowAddModal(false);
          setShowEditModal(false);
          setSelectedKatalog(null);
          resetForm();
        }}
        handleSubmit={showAddModal ? handleAddKatalog : handleEditKatalog}
        formData={formData}
        setFormData={setFormData}
        handleJenisLatihanChange={handleJenisLatihanChange}
        isEdit={showEditModal}
      />
    </Container>
  );
};

// Form Component
const KatalogForm = ({
  show,
  handleClose,
  handleSubmit,
  formData,
  setFormData,
  handleJenisLatihanChange,
  isEdit,
}) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          {isEdit ? "Edit Katalog Latihan" : "Tambah Katalog Latihan"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Nama Latihan</Form.Label>
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
            <Form.Label>Jenis Latihan</Form.Label>
            <Form.Select
              value={formData.jenisLatihan}
              onChange={(e) => handleJenisLatihanChange(e.target.value)}
              required>
              <option value="">Pilih Jenis Latihan</option>
              <option value="KETAHANAN">Ketahanan</option>
              <option value="KEKUATAN">Kekuatan</option>
              <option value="KECEPATAN">Kecepatan</option>
              <option value="KELINCAHAN">Kelincahan</option>
              <option value="KOORDINASI">Koordinasi</option>
            </Form.Select>
          </Form.Group>

          {formData.jenisLatihan && (
            <Card className="mb-3">
              <Card.Body>
                <Card.Title>Target Pencapaian</Card.Title>
                <Card.Text>
                  <strong>Skor Minimal:</strong> {formData.targetSkor}
                </Card.Text>
                <Card.Text>
                  <strong>Deskripsi Target:</strong> {formData.deskripsiTarget}
                </Card.Text>
              </Card.Body>
            </Card>
          )}

          <Form.Group className="mb-3">
            <Form.Label>Tingkat Kesulitan</Form.Label>
            <Form.Select
              value={formData.tingkatKesulitan}
              onChange={(e) =>
                setFormData({ ...formData, tingkatKesulitan: e.target.value })
              }
              required>
              <option value="">Pilih Tingkat Kesulitan</option>
              <option value="PEMULA">Pemula</option>
              <option value="MENENGAH">Menengah</option>
              <option value="LANJUTAN">Lanjutan</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Durasi (menit)</Form.Label>
            <Form.Control
              type="number"
              value={formData.durasi}
              onChange={(e) =>
                setFormData({ ...formData, durasi: e.target.value })
              }
              required
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

          <Form.Group className="mb-3">
            <Form.Label>Peralatan</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              value={formData.peralatan}
              onChange={(e) =>
                setFormData({ ...formData, peralatan: e.target.value })
              }
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Deskripsi</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={formData.deskripsi}
              onChange={(e) =>
                setFormData({ ...formData, deskripsi: e.target.value })
              }
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Manfaat</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              value={formData.manfaat}
              onChange={(e) =>
                setFormData({ ...formData, manfaat: e.target.value })
              }
            />
          </Form.Group>

          <Button type="submit">
            {isEdit ? "Update Katalog" : "Tambah Katalog"}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default KatalogLatihan;
