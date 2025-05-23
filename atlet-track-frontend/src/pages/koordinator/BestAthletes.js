import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Container, Row, Col, Card, Table, Form, Button, 
  Spinner, Alert, Badge, ProgressBar 
} from "react-bootstrap";
import { 
  FaMedal, FaTrophy, FaChartLine, FaFilter, 
  FaCalendarAlt, FaRunning, FaSearch, FaChevronRight 
} from "react-icons/fa";
import api from "../../services/api";
import "./style/BestAthletes.css";

const BestAthletes = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [bestAthletes, setBestAthletes] = useState(null);
  const [filters, setFilters] = useState({
    cabangOlahraga: "",
    limit: 10,
    startDate: "",
    endDate: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetchBestAthletes();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchBestAthletes = async () => {
    try {
      setLoading(true);
      setError("");

      const queryParams = new URLSearchParams();
      if (filters.cabangOlahraga) {
        queryParams.append("cabangOlahraga", filters.cabangOlahraga);
      }
      if (filters.limit) {
        queryParams.append("limit", filters.limit);
      }
      if (filters.startDate) {
        queryParams.append("startDate", filters.startDate);
      }
      if (filters.endDate) {
        queryParams.append("endDate", filters.endDate);
      }

      const response = await api.get(`/koordinator/athletes/best?${queryParams}`);
      setBestAthletes(response.data);
    } catch (error) {
      setError(
        error.response?.data?.message || "Gagal mengambil data atlet terbaik"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleViewAnalysis = (athleteId) => {
    navigate(`/koordinator/athletes/${athleteId}/analysis`);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  const handleApplyFilters = (e) => {
    e.preventDefault();
    fetchBestAthletes();
  };

  const getPerformanceLabel = (score) => {
    if (score >= 0.8) return "Istimewa";
    if (score >= 0.6) return "Baik";
    if (score >= 0.4) return "Rata-rata";
    if (score >= 0.2) return "Perlu Peningkatan";
    return "Kurang";
  };

  return (
    <div className="best-athletes-page">
      <Container>
        <div className="page-header">
          <h2>
            <FaTrophy /> Peringkat Atlet Terbaik
          </h2>
          <p>
            Peringkat ini dibuat menggunakan metode TOPSIS (Technique for Order of
            Preference by Similarity to Ideal Solution), yang mempertimbangkan
            performa dari berbagai kriteria.
          </p>
        </div>

        <Card className="filter-card">
          <Card.Header>
            <div>
              <FaFilter />
              <h5>Filter Peringkat</h5>
            </div>
          </Card.Header>
          <Card.Body>
            <Form onSubmit={handleApplyFilters} className="filter-controls">
              <Row>
                <Col md={3}>
                  <Form.Group>
                    <Form.Label>
                      <FaRunning /> Cabang Olahraga
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="cabangOlahraga"
                      value={filters.cabangOlahraga}
                      onChange={handleFilterChange}
                      placeholder="Masukkan cabang olahraga"
                    />
                  </Form.Group>
                </Col>
                
                <Col md={3}>
                  <Form.Group>
                    <Form.Label>
                      <FaSearch /> Jumlah Atlet
                    </Form.Label>
                    <Form.Control
                      type="number"
                      name="limit"
                      value={filters.limit}
                      onChange={handleFilterChange}
                      min="1"
                      max="100"
                    />
                  </Form.Group>
                </Col>
                
                <Col md={3}>
                  <Form.Group>
                    <Form.Label>
                      <FaCalendarAlt /> Tanggal Mulai
                    </Form.Label>
                    <Form.Control
                      type="date"
                      name="startDate"
                      value={filters.startDate}
                      onChange={handleFilterChange}
                    />
                  </Form.Group>
                </Col>
                
                <Col md={3}>
                  <Form.Group>
                    <Form.Label>
                      <FaCalendarAlt /> Tanggal Akhir
                    </Form.Label>
                    <Form.Control
                      type="date"
                      name="endDate"
                      value={filters.endDate}
                      onChange={handleFilterChange}
                    />
                  </Form.Group>
                </Col>
              </Row>
              
              <div className="filter-submit">
                <Button type="submit">
                  <FaSearch /> Terapkan Filter
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>

        {error && (
          <Alert variant="danger">
            {error}
          </Alert>
        )}

        {loading ? (
          <div className="loading-container">
            <Spinner animation="border" />
            <p>Menghitung peringkat...</p>
          </div>
        ) : (
          bestAthletes && (
            <>
              <Row>
                <Col lg={12}>
                  <Card className="criteria-card">
                    <Card.Header>
                      <div>
                        <FaChartLine />
                        <h5>Bobot Kriteria</h5>
                      </div>
                    </Card.Header>
                    <Card.Body>
                      <p>Bobot ini berdasarkan penelitian ilmiah dalam performa olahraga:</p>
                      <Row>
                        {Object.entries(bestAthletes.metadata.criteriaWeights).map(
                          ([criterion, weight]) => (
                            <Col key={criterion} sm={6} md={4}>
                              <Card className="criteria-item">
                                <Card.Body>
                                  <div className="criteria-weight">
                                    {Math.round(weight * 100)}%
                                  </div>
                                  <div className="criteria-info">
                                    <h5>{criterion}</h5>
                                    <small>Bobot Kriteria</small>
                                  </div>
                                </Card.Body>
                              </Card>
                            </Col>
                          )
                        )}
                      </Row>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>

              <Row className="g-4">
                {bestAthletes.results.map((athlete) => (
                  <Col key={athlete.id} lg={4} md={6} className="mb-4">
                    <Card className="h-100 shadow-sm border-0 athlete-card">
                      <Card.Body>
                        <div className="d-flex align-items-center mb-3">
                          <div className="rank-badge me-3">
                            {athlete.rank <= 3 ? (
                              <FaMedal className={`text-${athlete.rank === 1 ? 'warning' : athlete.rank === 2 ? 'secondary' : 'bronze'}`} size={24} />
                            ) : (
                              <span className="text-muted fw-bold">{athlete.rank}</span>
                            )}
                          </div>
                          <div>
                            <h5 className="mb-0 fw-bold">{athlete.nama}</h5>
                            <Badge bg="light" text="dark">{athlete.cabangOlahraga}</Badge>
                          </div>
                        </div>
                        
                        <div className="mb-3">
                          <div className="d-flex justify-content-between">
                            <span className="text-muted">Skor TOPSIS</span>
                            <span className="fw-bold">{athlete.topsisScore.toFixed(3)}</span>
                          </div>
                          <div className="d-flex justify-content-between">
                            <span className="text-muted">Level Performa</span>
                            <Badge bg={athlete.topsisScore >= 0.8 ? 'success' : athlete.topsisScore >= 0.6 ? 'primary' : athlete.topsisScore >= 0.4 ? 'info' : athlete.topsisScore >= 0.2 ? 'warning' : 'danger'}>
                              {getPerformanceLabel(athlete.topsisScore)}
                            </Badge>
                          </div>
                        </div>
                        
                        <div className="scores-section">
                          <h6 className="text-muted fw-bold">Detail Skor</h6>
                          {Object.entries(athlete.scores).map(([type, score]) => (
                            <div key={type} className="mb-2">
                              <div className="d-flex justify-content-between mb-1">
                                <small>{type}</small>
                                <small className="fw-bold">{score.toFixed(1)}</small>
                              </div>
                              <ProgressBar 
                                now={score} 
                                variant={score >= 80 ? 'success' : score >= 60 ? 'info' : score >= 40 ? 'primary' : score >= 20 ? 'warning' : 'danger'} 
                              />
                            </div>
                          ))}
                        </div>
                      </Card.Body>
                      <Card.Footer className="bg-white border-0">
                        <Button 
                          variant="primary" 
                          className="w-100"
                          onClick={() => handleViewAnalysis(athlete.id)}
                        >
                          <FaChevronRight className="me-2" /> Lihat Detail
                        </Button>
                      </Card.Footer>
                    </Card>
                  </Col>
                ))}
              </Row>

              <Card className="comparison-card">
                <Card.Header>
                  <div>
                    <FaChartLine />
                    <h5>Perbandingan Atlet Teratas</h5>
                  </div>
                </Card.Header>
                <Card.Body>
                  <div className="table-responsive">
                    <Table className="comparison-table">
                      <thead>
                        <tr>
                          <th>Atlet</th>
                          {Object.keys(bestAthletes.metadata.criteriaWeights).map(criterion => (
                            <th key={criterion}>{criterion}</th>
                          ))}
                          <th>Keseluruhan</th>
                        </tr>
                      </thead>
                      <tbody>
                        {bestAthletes.results.slice(0, 5).map((athlete) => (
                          <tr key={`comparison-${athlete.id}`}>
                            <td>
                              <div className="athlete-name">
                                {athlete.rank <= 3 && (
                                  <div className={`athlete-rank rank-${athlete.rank}`}>
                                    {athlete.rank}
                                  </div>
                                )}
                                <span>{athlete.nama}</span>
                              </div>
                            </td>
                            {Object.keys(bestAthletes.metadata.criteriaWeights).map(criterion => (
                              <td key={`${athlete.id}-${criterion}`}>
                                <span className="athlete-score-badge">
                                  {athlete.scores[criterion]?.toFixed(1) || 'N/A'}
                                </span>
                              </td>
                            ))}
                            <td>
                              <span className="topsis-score">
                                {athlete.topsisScore.toFixed(3)}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                </Card.Body>
              </Card>
            </>
          )
        )}
      </Container>
    </div>
  );
};

export default BestAthletes;