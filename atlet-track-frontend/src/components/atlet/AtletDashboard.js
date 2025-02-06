// src/components/atlet/AtletDashboard.js
import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Table, Button, Spinner, Alert } from 'react-bootstrap';
import api from '../../services/api';
import { useNavigate } from 'react-router-dom';
import { FaBook, FaChartLine, FaClipboardCheck } from 'react-icons/fa';
import "./AtletDashboard.css";

const AtletDashboard = () => {
  const [katalogLatihan, setKatalogLatihan] = useState([]);
  const [progressPelatihan, setProgressPelatihan] = useState([]);
  const [evaluasiTerkini, setEvaluasiTerkini] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const navigate = useNavigate();

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const dashboardRes = await api.get('/atlet/dashboard');
      const catalogRes = await api.get('/atlet/catalogs');
      
      setKatalogLatihan(catalogRes.data.slice(0, 5)); // Get latest 5 catalogs
      setProgressPelatihan(dashboardRes.data.progressPelatihan);
      setEvaluasiTerkini(dashboardRes.data.evaluasiTerkini);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
      setError('Gagal memuat data dashboard.');
      setLoading(false);
    }
  };

  const handleViewAllCatalogs = () => {
    navigate('/atlet/catalog');
  };



  const handleViewAllEvaluations = () => {
    navigate('/atlet/evaluations');
  };

  if (loading) {
    return (
      <Container className="mt-4 text-center">
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-4">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container fluid className="p-4 bg-light min-vh-100">
      <h2 className="mb-4 fw-bold text-primary">Atlet Dashboard</h2>
      <Row className="g-4">
        <Col lg={6}>
          <Card className="shadow-sm h-100 border-0">
            <Card.Body className="p-4">
              <div className="d-flex align-items-center mb-4">
                <FaBook className="text-primary me-2" size={24} />
                <Card.Title className="mb-0 fw-bold">Katalog Latihan Terbaru</Card.Title>
              </div>
              <div className="table-responsive">
                <Table hover className="align-middle">
                  <thead className="bg-light">
                    <tr>
                      <th>Nama Latihan</th>
                      <th>Jenis</th>
                      <th>Tingkat Kesulitan</th>
                    </tr>
                  </thead>
                  <tbody>
                    {katalogLatihan.length > 0 ? (
                      katalogLatihan.map((catalog) => (
                        <tr key={catalog.id}>
                          <td>{catalog.nama}</td>
                          <td>{catalog.jenisLatihan}</td>
                          <td>
                            <span className={`badge bg-${
                              catalog.tingkatKesulitan === 'PEMULA' ? 'success' :
                              catalog.tingkatKesulitan === 'MENENGAH' ? 'warning' : 'danger'
                            }`}>
                              {catalog.tingkatKesulitan}
                            </span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="3" className="text-center text-muted py-4">
                          Tidak ada katalog latihan
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </div>
              <Button variant="outline-primary" onClick={handleViewAllCatalogs} className="mt-3">
                Lihat Semua Katalog
              </Button>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={6}>
          <Card className="shadow-sm h-100 border-0">
            <Card.Body className="p-4">
              <div className="d-flex align-items-center mb-4">
                <FaChartLine className="text-success me-2" size={24} />
                <Card.Title className="mb-0 fw-bold">Progress Pelatihan</Card.Title>
              </div>
              <div className="table-responsive">
                <Table hover className="align-middle">
                  <thead className="bg-light">
                    <tr>
                      <th>Tanggal</th>
                      <th>Rata-rata Skor</th>
                    </tr>
                  </thead>
                  <tbody>
                    {progressPelatihan.length > 0 ? (
                      progressPelatihan.map((item, index) => (
                        <tr key={index}>
                          <td>{item.date}</td>
                          <td>
                            <span className="badge bg-success">{item.avgScore}</span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="2" className="text-center text-muted py-4">
                          Tidak ada data progres
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </div>
              
            </Card.Body>
          </Card>
        </Col>

        <Col lg={12}>
          <Card className="shadow-sm border-0">
            <Card.Body className="p-4">
              <div className="d-flex align-items-center mb-4">
                <FaClipboardCheck className="text-info me-2" size={24} />
                <Card.Title className="mb-0 fw-bold">Evaluasi Terkini</Card.Title>
              </div>
              <div className="table-responsive">
                <Table hover className="align-middle">
                  <thead className="bg-light">
                    <tr>
                      <th>Jenis Latihan</th>
                      <th>Skor</th>
                      <th>Komentar</th>
                    </tr>
                  </thead>
                  <tbody>
                    {evaluasiTerkini.length > 0 ? (
                      evaluasiTerkini.map((evalItem) => (
                        <tr key={evalItem.id}>
                          <td>{evalItem.jenisLatihan || 'N/A'}</td>
                          <td>
                            <span className="badge bg-info">{evalItem.skor}</span>
                          </td>
                          <td>{evalItem.komentar}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="3" className="text-center text-muted py-4">
                          Tidak ada evaluasi terbaru
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </div>
              <Button variant="outline-info" onClick={handleViewAllEvaluations} className="mt-3">
                Lihat Semua Evaluasi
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AtletDashboard;