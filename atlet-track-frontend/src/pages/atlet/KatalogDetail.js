// atlet-track-frontend/src/pages/atlet/KatalogDetail.js
import React, { useState, useEffect } from 'react';
import { Container, Card, Badge, Row, Col, Table, Alert, Spinner, Button } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../services/api';

const KatalogDetail = () => {
  const [catalog, setCatalog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchCatalogDetail();
  }, [id]);

  const fetchCatalogDetail = async () => {
    try {
      const response = await api.get(`/atlet/catalogs/${id}`);
      setCatalog(response.data);
      setLoading(false);
    } catch (error) {
      setError('Gagal memuat detail katalog');
      setLoading(false);
    }
  };

  const handleStartLatihan = () => {
    navigate(`/atlet/latihan/${id}`);
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
      <Card className="mb-4">
        <Card.Body>
          <div className="d-flex justify-content-between align-items-start mb-3">
            <div>
              <h2 className="mb-3">{catalog.nama}</h2>
              <div className="mb-3">
                <Badge bg="info" className="me-2">{catalog.jenisLatihan}</Badge>
                <Badge bg={
                  catalog.tingkatKesulitan === 'PEMULA' ? 'success' :
                  catalog.tingkatKesulitan === 'MENENGAH' ? 'warning' : 'danger'
                }>{catalog.tingkatKesulitan}</Badge>
              </div>
            </div>
            <Badge bg="primary" className="p-2">
              Durasi: {catalog.durasi} menit
            </Badge>
          </div>

          <Row className="mb-4">
            <Col md={6}>
              <h5>Deskripsi</h5>
              <p>{catalog.deskripsi}</p>
            </Col>
            <Col md={6}>
              <h5>Manfaat</h5>
              <p>{catalog.manfaat}</p>
            </Col>
          </Row>

          {catalog.peralatan && (
            <div className="mb-4">
              <h5>Peralatan yang Dibutuhkan</h5>
              <p>{catalog.peralatan}</p>
            </div>
          )}

          <h4 className="mb-3">Opsi Latihan</h4>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Nama Latihan</th>
                <th>Durasi</th>
                <th>Repetisi</th>
                <th>Target</th>
                <th>Instruksi</th>
              </tr>
            </thead>
            <tbody>
              {catalog.opsiLatihan?.length > 0 ? (
                catalog.opsiLatihan.map((opsi) => (
                  <tr key={opsi.id}>
                    <td>{opsi.nama}</td>
                    <td>{opsi.durasi} menit</td>
                    <td>{opsi.repetisi}x</td>
                    <td>{opsi.target}</td>
                    <td>{opsi.instruksi}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center">
                    Tidak ada opsi latihan tersedia
                  </td>
                </tr>
              )}
            </tbody>
          </Table>

          {/* Add Start Training Button */}
          <div className="text-center mt-4">
            <Button 
              variant="primary" 
              size="lg" 
              onClick={handleStartLatihan}
              disabled={!catalog.opsiLatihan?.length}
            >
              Mulai Latihan
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default KatalogDetail;