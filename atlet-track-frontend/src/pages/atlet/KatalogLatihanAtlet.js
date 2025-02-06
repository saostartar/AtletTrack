// atlet-track-frontend/src/pages/atlet/KatalogLatihan.js
import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Form, Badge, Button } from "react-bootstrap";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";

const KatalogLatihanAtlet = () => {
  const [catalogs, setCatalogs] = useState([]);
  const [filteredCatalogs, setFilteredCatalogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filters, setFilters] = useState({
    jenisLatihan: "",
    tingkatKesulitan: "",
    cabangOlahraga: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetchCatalogs();
  }, []);

  useEffect(() => {
    filterCatalogs();
  }, [filters, catalogs]);

  const fetchCatalogs = async () => {
    try {
      const response = await api.get("/atlet/catalogs");
      setCatalogs(response.data);
      setFilteredCatalogs(response.data);
      setLoading(false);
    } catch (error) {
      setError("Gagal memuat katalog latihan");
      setLoading(false);
    }
  };

  const filterCatalogs = () => {
    let filtered = [...catalogs];

    if (filters.jenisLatihan) {
      filtered = filtered.filter(
        (cat) => cat.jenisLatihan === filters.jenisLatihan
      );
    }
    if (filters.tingkatKesulitan) {
      filtered = filtered.filter(
        (cat) => cat.tingkatKesulitan === filters.tingkatKesulitan
      );
    }
    if (filters.cabangOlahraga) {
      filtered = filtered.filter(
        (cat) => cat.cabangOlahraga === filters.cabangOlahraga
      );
    }

    setFilteredCatalogs(filtered);
  };

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const handleViewDetail = (catalogId) => {
    navigate(`/atlet/catalog/${catalogId}`);
  };

  return (
    <Container className="py-4">
      <h2 className="mb-4">Katalog Latihan</h2>

      {/* Filters */}
      <Card className="mb-4">
        <Card.Body>
          <Row>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Jenis Latihan</Form.Label>
                <Form.Select
                  name="jenisLatihan"
                  value={filters.jenisLatihan}
                  onChange={handleFilterChange}>
                  <option value="">Semua Jenis</option>
                  <option value="KETAHANAN">Ketahanan</option>
                  <option value="KEKUATAN">Kekuatan</option>
                  <option value="KECEPATAN">Kecepatan</option>
                  <option value="KELINCAHAN">Kelincahan</option>
                  <option value="KOORDINASI">Koordinasi</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Tingkat Kesulitan</Form.Label>
                <Form.Select
                  name="tingkatKesulitan"
                  value={filters.tingkatKesulitan}
                  onChange={handleFilterChange}>
                  <option value="">Semua Tingkat</option>
                  <option value="PEMULA">Pemula</option>
                  <option value="MENENGAH">Menengah</option>
                  <option value="LANJUTAN">Lanjutan</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Cabang Olahraga</Form.Label>
                <Form.Control
                  type="text"
                  name="cabangOlahraga"
                  value={filters.cabangOlahraga}
                  onChange={handleFilterChange}
                  placeholder="Filter cabang olahraga..."
                />
              </Form.Group>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Catalog List */}
      <Row xs={1} md={2} lg={3} className="g-4">
        {filteredCatalogs.map((catalog) => (
          <Col key={catalog.id}>
            <Card className="h-100">
              <Card.Body>
                <Card.Title>{catalog.nama}</Card.Title>
                <div className="mb-2">
                  <Badge bg="info" className="me-2">
                    {catalog.jenisLatihan}
                  </Badge>
                  <Badge
                    bg={
                      catalog.tingkatKesulitan === "PEMULA"
                        ? "success"
                        : catalog.tingkatKesulitan === "MENENGAH"
                        ? "warning"
                        : "danger"
                    }>
                    {catalog.tingkatKesulitan}
                  </Badge>
                </div>
                <Card.Text>
                  <strong>Durasi:</strong> {catalog.durasi} menit
                  <br />
                  <strong>Cabang Olahraga:</strong> {catalog.cabangOlahraga}
                  <br />
                  <strong>Deskripsi:</strong> {catalog.deskripsi}
                  <br />
                  {catalog.peralatan && (
                    <>
                      <strong>Peralatan:</strong> {catalog.peralatan}
                      <br />
                    </>
                  )}
                </Card.Text>
                {catalog.manfaat && (
                  <div className="mt-2">
                    <strong>Manfaat:</strong>
                    <br />
                    {catalog.manfaat}
                  </div>
                )}

                <Button
                  variant="primary"
                  className="mt-3 w-100"
                  onClick={() => handleViewDetail(catalog.id)}>
                  Lihat Detail Latihan
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default KatalogLatihanAtlet;
