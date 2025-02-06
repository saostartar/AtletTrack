// src/pages/koordinator/EvaluasiAtlet.js
import React, { useState, useEffect } from "react";
import {
  Container,
  Table,
  Button,
  Modal,
  Form,
  Alert,
  Card,
  Row,
  Col,
  Badge,
  ProgressBar,
} from "react-bootstrap";
import api from "../../services/api";
import "./style/EvaluasiAtlet.css";

const ASPEK_PENILAIAN = {
  KETAHANAN: {
    kriteria: [
      "Durasi latihan tanpa istirahat",
      "Konsistensi performa",
      "Daya tahan kardiovaskular",
      "Kemampuan recovery",
    ],
    targetMinimal: 70,
  },
  KEKUATAN: {
    kriteria: [
      "Beban maksimal yang dapat diangkat",
      "Jumlah repetisi dengan beban tetap",
      "Teknik pengangkatan",
      "Stabilitas gerakan",
    ],
    targetMinimal: 65,
  },
  KECEPATAN: {
    kriteria: [
      "Waktu eksekusi gerakan",
      "Akselerasi",
      "Kecepatan maksimal",
      "Konsistensi kecepatan",
    ],
    targetMinimal: 75,
  },
  KELINCAHAN: {
    kriteria: [
      "Kemampuan mengubah arah",
      "Keseimbangan",
      "Koordinasi gerakan",
      "Waktu reaksi",
    ],
    targetMinimal: 70,
  },
  KOORDINASI: {
    kriteria: [
      "Ketepatan gerakan",
      "Timing",
      "Keselarasan gerakan",
      "Efisiensi gerakan",
    ],
    targetMinimal: 75,
  },
};

const EvaluasiAtlet = () => {
  const [evaluasis, setEvaluasis] = useState([]);
  const [completedLatihan, setCompletedLatihan] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedEvaluasi, setSelectedEvaluasi] = useState(null);
  const [error, setError] = useState("");
  const [selectedLatihan, setSelectedLatihan] = useState(null);
  const [formData, setFormData] = useState({
    atletId: "",
    latihanAtletId: "",
    skor: "",
    komentar: "",
  });

  useEffect(() => {
    fetchEvaluasis();
    fetchCompletedLatihan();
  }, []);

  const fetchEvaluasis = async () => {
    try {
      const response = await api.get("/koordinator/evaluasi");
      setEvaluasis(response.data);
    } catch (error) {
      setError("Gagal mengambil data evaluasi");
    }
  };

  const fetchCompletedLatihan = async () => {
    try {
      const response = await api.get("/koordinator/latihan/completed");
      setCompletedLatihan(response.data);
    } catch (error) {
      setError("Gagal mengambil data latihan selesai");
    }
  };

  const handleLatihanChange = (latihanId) => {
    const latihan = completedLatihan.find((l) => l.id === parseInt(latihanId));
    if (!latihan) return;

    setSelectedLatihan(latihan);

    // Safely calculate base score with null checks
    let baseScore = 0;
    if (
      latihan.totalRepetisiTercapai != null &&
      latihan.totalRepetisiTarget != null &&
      latihan.totalRepetisiTarget !== 0
    ) {
      const percentageComplete =
        (latihan.totalRepetisiTercapai / latihan.totalRepetisiTarget) * 100;
      baseScore = Math.min(Math.round(percentageComplete), 100);
    }

    setFormData({
      atletId: latihan.atletId || "",
      latihanAtletId: latihanId,
      skor: baseScore.toString(),
      komentar: "",
    });
  };

  const getUnevaluatedLatihan = () => {
    if (!completedLatihan || !evaluasis) return [];

    // Get IDs of trainings that have already been evaluated
    const evaluatedLatihanIds = evaluasis.map(
      (evaluasi) => evaluasi.latihanAtletId
    );

    // Filter out completed trainings that have already been evaluated
    return completedLatihan.filter(
      (latihan) => !evaluatedLatihanIds.includes(latihan.id)
    );
  };

  const handleAddEvaluasi = async (e) => {
    e.preventDefault();
    try {
      await api.post("/koordinator/evaluasi", formData);
      setShowAddModal(false);
      setFormData({
        atletId: "",
        latihanAtletId: "",
        skor: "",
        komentar: "",
      });
      setSelectedLatihan(null);
      fetchEvaluasis();
    } catch (error) {
      setError(error.response?.data?.message || "Gagal menambahkan evaluasi");
    }
  };

  const handleEditEvaluasi = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/koordinator/evaluasi/${selectedEvaluasi.id}`, formData);
      setSelectedEvaluasi(null);
      setFormData({
        atletId: "",
        latihanAtletId: "",
        skor: "",
        komentar: "",
      });
      fetchEvaluasis();
    } catch (error) {
      setError(error.response?.data?.message || "Gagal mengupdate evaluasi");
    }
  };

  const handleDeleteEvaluasi = async (id) => {
    if (window.confirm("Anda yakin ingin menghapus evaluasi ini?")) {
      try {
        await api.delete(`/koordinator/evaluasi/${id}`);
        fetchEvaluasis();
      } catch (error) {
        setError("Gagal menghapus evaluasi");
      }
    }
  };

  const renderKriteriaPenilaian = () => {
    if (!selectedLatihan || !selectedLatihan.katalogLatihan) return null;

    const jenisLatihan = selectedLatihan.katalogLatihan.jenisLatihan;
    const aspek = ASPEK_PENILAIAN[jenisLatihan];
    if (!aspek) return null;

    // Safely calculate percentage with null checks
    let percentageComplete = 0;
    if (
      selectedLatihan.totalRepetisiTercapai != null &&
      selectedLatihan.totalRepetisiTarget != null &&
      selectedLatihan.totalRepetisiTarget !== 0
    ) {
      percentageComplete =
        (selectedLatihan.totalRepetisiTercapai /
          selectedLatihan.totalRepetisiTarget) *
        100;
    }

    return (
      <Card className="mb-3">
        <Card.Body>
          <Card.Title>Kriteria Penilaian {jenisLatihan}</Card.Title>
          <Card.Text className="text-muted mb-3">{aspek.deskripsi}</Card.Text>

          <h6>Pencapaian Repetisi:</h6>
          <p>
            {selectedLatihan.totalRepetisiTercapai || 0} dari{" "}
            {selectedLatihan.totalRepetisiTarget || 0} repetisi (
            {percentageComplete.toFixed(1)}%)
          </p>

          <h6>Kriteria Penilaian:</h6>
          <ul>
            {aspek.kriteria.map((kriteria, idx) => (
              <li key={idx}>{kriteria}</li>
            ))}
          </ul>

          <Card.Text>
            <strong>Target Minimal:</strong> {aspek.targetMinimal}
          </Card.Text>

          <Alert variant="info">
            Skor awal dihitung berdasarkan persentase repetisi yang dicapai.
            Anda dapat menyesuaikan skor berdasarkan kriteria penilaian di atas.
          </Alert>
        </Card.Body>
      </Card>
    );
  };

  return (
    <Container className="mt-4">
      <h2>Evaluasi Atlet</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Button
        variant="primary"
        className="mb-3"
        onClick={() => setShowAddModal(true)}
        disabled={getUnevaluatedLatihan().length === 0}>
        {getUnevaluatedLatihan().length > 0
          ? "Tambah Evaluasi"
          : "Semua Latihan Sudah Dievaluasi"}
      </Button>

      <div className="table-responsive custom-table-wrapper">
        <Table hover className="align-middle custom-table">
          <thead>
            <tr>
              <th className="text-center" style={{ width: "50px" }}>
                #
              </th>
              <th>Atlet</th>
              <th>Jenis Latihan</th>
              <th className="text-center">Repetisi</th>
              <th className="text-center">Target</th>
              <th className="text-center">Progress</th>
              <th className="text-center">Skor</th>
              <th className="text-center">Status</th>
              <th>Komentar</th>
              <th className="text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {evaluasis.map((evaluasi, index) => (
              <tr key={evaluasi.id}>
                <td className="text-center">{index + 1}</td>
                <td>
                  <div className="d-flex align-items-center">
                    <div className="athlete-avatar">
                      {evaluasi.atlet?.nama?.[0] || "?"}
                    </div>
                    <div className="ms-2">
                      <div className="fw-semibold">
                        {evaluasi.atlet?.nama || "N/A"}
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  <Badge bg="soft-primary" className="exercise-type-badge">
                    {evaluasi.jenisLatihan}
                  </Badge>
                </td>
                <td className="text-center">
                  {evaluasi.totalRepetisiTercapai}
                </td>
                <td className="text-center">{evaluasi.totalRepetisiTarget}</td>
                <td className="text-center" style={{ width: "200px" }}>
                  <div className="progress-wrapper">
                    <div className="d-flex justify-content-between mb-1">
                      <small>
                        {evaluasi.persentaseKetercapaian.toFixed(1)}%
                      </small>
                    </div>
                    <ProgressBar
                      now={evaluasi.persentaseKetercapaian}
                      variant={
                        evaluasi.persentaseKetercapaian >= 100
                          ? "success"
                          : "info"
                      }
                      className="custom-progress"
                    />
                  </div>
                </td>
                <td className="text-center">
                  <div className="score-badge">{evaluasi.skor}</div>
                </td>
                <td className="text-center">
                  <Badge
                    bg={
                      evaluasi.skor >= evaluasi.targetPencapaian
                        ? "success"
                        : "warning"
                    }
                    className="status-badge">
                    {evaluasi.skor >= evaluasi.targetPencapaian ? (
                      <>
                        <i className="bi bi-check-circle me-1"></i> Target
                        Tercapai
                      </>
                    ) : (
                      <>
                        <i className="bi bi-exclamation-circle me-1"></i> Belum
                        Tercapai
                      </>
                    )}
                  </Badge>
                </td>
                <td>
                  <div className="comment-text">{evaluasi.komentar || "-"}</div>
                </td>
                <td className="text-center">
                  <div className="action-buttons">
                    <Button
                      variant="light"
                      size="sm"
                      className="btn-icon me-2"
                      onClick={() => {
                        setSelectedEvaluasi(evaluasi);
                        setFormData({
                          atletId: evaluasi.atletId,
                          latihanAtletId: evaluasi.latihanAtletId,
                          skor: evaluasi.skor,
                          komentar: evaluasi.komentar,
                        });
                      }}>
                      <i className="bi bi-pencil"></i>
                    </Button>
                    <Button
                      variant="light"
                      size="sm"
                      className="btn-icon btn-delete"
                      onClick={() => handleDeleteEvaluasi(evaluasi.id)}>
                      <i className="bi bi-trash"></i>
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <Modal
        show={showAddModal}
        onHide={() => {
          setShowAddModal(false);
          setSelectedLatihan(null);
        }}
        size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Tambah Evaluasi Baru</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleAddEvaluasi}>
            <Form.Group className="mb-3">
              <Form.Label>Katalog Latihan</Form.Label>
              <Form.Select
                value={formData.latihanAtletId}
                onChange={(e) => handleLatihanChange(e.target.value)}
                required>
                <option value="">Pilih Katalog Latihan</option>
                {getUnevaluatedLatihan().map((latihan) => (
                  <option key={latihan.id} value={latihan.id}>
                    {latihan.atlet.nama} - {latihan.katalogLatihan.nama} (
                    {latihan.katalogLatihan.jenisLatihan})
                  </option>
                ))}
              </Form.Select>
              {getUnevaluatedLatihan().length === 0 && (
                <Form.Text className="text-muted">
                  Semua latihan yang selesai sudah dievaluasi.
                </Form.Text>
              )}
            </Form.Group>

            {selectedLatihan && (
              <Card className="mb-3 bg-light">
                <Card.Body>
                  <h6 className="mb-3">Detail Latihan:</h6>
                  <Row>
                    <Col md={6}>
                      <div className="mb-3">
                        <h6 className="mb-2 text-primary">Informasi Atlet</h6>
                        <p className="mb-2">
                          <strong>Nama:</strong>{" "}
                          {selectedLatihan.atlet?.nama || "N/A"}
                        </p>
                        <p className="mb-2">
                          <strong>Cabang Olahraga:</strong>{" "}
                          {selectedLatihan.atlet?.cabangOlahraga || "N/A"}
                        </p>
                        <p className="mb-2">
                          <strong>Tanggal Selesai:</strong>{" "}
                          {new Date(
                            selectedLatihan.tanggalSelesai
                          ).toLocaleDateString("id-ID")}
                        </p>
                      </div>
                    </Col>
                    <Col md={6}>
                      <div className="mb-3">
                        <h6 className="mb-2 text-primary">Informasi Latihan</h6>
                        <p className="mb-2">
                          <strong>Nama Katalog:</strong>{" "}
                          {selectedLatihan.katalogLatihan.nama}
                        </p>
                        <p className="mb-2">
                          <strong>Jenis Latihan:</strong>{" "}
                          <Badge bg="info">
                            {selectedLatihan.katalogLatihan.jenisLatihan}
                          </Badge>
                        </p>
                        <p className="mb-2">
                          <strong>Tingkat Kesulitan:</strong>{" "}
                          <Badge
                            bg={
                              selectedLatihan.katalogLatihan
                                .tingkatKesulitan === "PEMULA"
                                ? "success"
                                : selectedLatihan.katalogLatihan
                                    .tingkatKesulitan === "MENENGAH"
                                ? "warning"
                                : "danger"
                            }>
                            {selectedLatihan.katalogLatihan.tingkatKesulitan}
                          </Badge>
                        </p>
                        <p className="mb-2">
                          <strong>Target Skor:</strong>{" "}
                          <Badge bg="primary">
                            {selectedLatihan.katalogLatihan.targetSkor}
                          </Badge>
                        </p>
                      </div>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            )}

            {renderKriteriaPenilaian()}

            <Form.Group className="mb-3">
              <Form.Label>Skor (0-100)</Form.Label>
              <Form.Control
                type="number"
                min="0"
                max="100"
                value={formData.skor}
                onChange={(e) =>
                  setFormData({ ...formData, skor: e.target.value })
                }
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Komentar</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={formData.komentar}
                onChange={(e) =>
                  setFormData({ ...formData, komentar: e.target.value })
                }
                placeholder="Tambahkan komentar evaluasi di sini..."
              />
            </Form.Group>

            <Button type="submit" variant="primary" className="w-100">
              Simpan Evaluasi
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Edit Evaluasi Modal */}
      <Modal
        show={selectedEvaluasi !== null}
        onHide={() => setSelectedEvaluasi(null)}
        size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Edit Evaluasi</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleEditEvaluasi}>
            <Form.Group className="mb-3">
              <Form.Label>Skor (0-100)</Form.Label>
              <Form.Control
                type="number"
                min="0"
                max="100"
                value={formData.skor}
                onChange={(e) =>
                  setFormData({ ...formData, skor: e.target.value })
                }
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Komentar</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={formData.komentar}
                onChange={(e) =>
                  setFormData({ ...formData, komentar: e.target.value })
                }
              />
            </Form.Group>
            <Button type="submit">Update Evaluasi</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default EvaluasiAtlet;
