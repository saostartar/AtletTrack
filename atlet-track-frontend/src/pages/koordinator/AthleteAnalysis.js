import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Card, Table, Badge, ProgressBar, Spinner, Alert } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartLine, faDumbbell, faArrowUp, faArrowDown, faLightbulb, faHistory, faMedal } from "@fortawesome/free-solid-svg-icons";
import api from "../../services/api";
import "./style/AthleteAnalysis.css";

const AthleteAnalysis = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [analysis, setAnalysis] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetchAthleteAnalysis();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchAthleteAnalysis = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/koordinator/athletes/${id}/analysis`);
      setAnalysis(response.data);
    } catch (error) {
      setError(error.response?.data?.message || "Gagal mengambil data analisis atlet");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return (
    <div className="loading-container d-flex justify-content-center align-items-center min-vh-100">
      <div className="text-center">
        <Spinner animation="border" variant="primary" className="mb-3" />
        <p className="text-muted">Memuat analisis atlet...</p>
      </div>
    </div>
  );

  if (error) return (
    <Container className="py-5">
      <Alert variant="danger" className="shadow-sm">
        <FontAwesomeIcon icon="exclamation-triangle" className="me-2" />
        {error}
      </Alert>
    </Container>
  );
  
  if (!analysis) return (
    <Container className="py-5">
      <Alert variant="info" className="shadow-sm">
        <FontAwesomeIcon icon="info-circle" className="me-2" />
        Tidak ada data analisis tersedia
      </Alert>
    </Container>
  );

  // Mendapatkan status performa berdasarkan skor
  const getPerformanceStatus = (score) => {
    if (score >= 85) return "Sangat Baik";
    if (score >= 70) return "Baik";
    if (score >= 55) return "Cukup";
    if (score >= 40) return "Perlu Perbaikan";
    return "Kurang";
  };

  // Mendapatkan warna berdasarkan skor
  const getScoreVariant = (score) => {
    if (score >= 85) return "success";
    if (score >= 70) return "primary";
    if (score >= 55) return "info";
    if (score >= 40) return "warning";
    return "danger";
  };

  return (
    <div className="athlete-analysis-page py-4 bg-light min-vh-100">
      <Container>
        {/* Header Section */}
        <div className="header-section p-4 bg-white rounded-lg shadow-sm mb-4">
          <Row className="align-items-center mb-2">
            <Col md={7}>
              <h2 className="fw-bold text-gradient mb-2">
                <FontAwesomeIcon icon={faChartLine} className="me-2" />
                Analisis Performa: {analysis.nama}
              </h2>
              <div className="d-flex align-items-center mb-3">
                <Badge bg="secondary" className="me-2 py-2 px-3">
                  {analysis.cabangOlahraga}
                </Badge>
                <div className="vr mx-3 opacity-25"></div>
                <div className="d-flex align-items-center">
                  <div className="circle-score me-2" style={{ backgroundColor: `var(--bs-${getScoreVariant(analysis.overallWeightedScore)})` }}>
                    {analysis.overallWeightedScore.toFixed(0)}
                  </div>
                  <div>
                    <span className="text-muted small">Skor Keseluruhan</span>
                    <div className="fw-bold">{getPerformanceStatus(analysis.overallWeightedScore)}</div>
                  </div>
                </div>
              </div>
            </Col>
            <Col md={5}>
              <Card className="border-0 shadow-sm h-100 stat-card">
                <Card.Body className="d-flex align-items-center">
                  <div className={`stat-icon bg-${getScoreVariant(analysis.overallWeightedScore)} bg-opacity-10 text-${getScoreVariant(analysis.overallWeightedScore)}`}>
                    <FontAwesomeIcon icon={faMedal} />
                  </div>
                  <div className="ms-3">
                    <h6 className="text-muted mb-1">Skor Tertimbang</h6>
                    <h3 className="mb-0 fw-bold">{analysis.overallWeightedScore.toFixed(1)}</h3>
                  </div>
                </Card.Body>
                </Card>
            </Col>
          </Row>
        </div>

        <Row className="g-4 mb-4">
          {/* Kategori Latihan */}
          <Col lg={12}>
            <Card className="border-0 shadow-sm mb-4">
              <Card.Header className="bg-white border-0">
                <h5 className="fw-bold mb-0">
                  <FontAwesomeIcon icon={faDumbbell} className="me-2 text-primary" />
                  Performa Berdasarkan Kategori Latihan
                </h5>
              </Card.Header>
              <Card.Body className="p-0">
                <div className="table-responsive">
                  <Table hover className="align-middle mb-0 custom-table">
                    <thead className="bg-light">
                      <tr>
                        <th>Jenis Latihan</th>
                        <th>Rata-rata</th>
                        <th>Skor Terbaru</th>
                        <th>Bobot</th>
                        <th>Skor Tertimbang</th>
                        <th>Evaluasi</th>
                        <th>Progres</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.entries(analysis.evaluationsByType).map(([type, data]) => (
                        <tr key={type}>
                          <td className="fw-bold text-primary">{type}</td>
                          <td>
                            <Badge bg={getScoreVariant(data.averageScore)} className="score-badge">
                              {data.averageScore.toFixed(1)}
                            </Badge>
                          </td>
                          <td>
                            <Badge bg={getScoreVariant(data.latestScore)} className="score-badge">
                              {data.latestScore}
                            </Badge>
                          </td>
                          <td>{(data.weight * 100).toFixed(0)}%</td>
                          <td className="fw-bold">{data.weightedScore.toFixed(1)}</td>
                          <td>{data.count}</td>
                          <td className="progress-column">
                            <ProgressBar 
                              now={data.averageScore} 
                              variant={getScoreVariant(data.averageScore)} 
                              className="custom-progress" 
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              </Card.Body>
            </Card>
          </Col>
          
          {/* Kekuatan dan Kelemahan */}
          <Col md={6}>
            <Card className="border-0 shadow-sm h-100">
              <Card.Header className="bg-white border-0">
                <h5 className="fw-bold mb-0">
                  <FontAwesomeIcon icon={faArrowUp} className="me-2 text-success" />
                  Kekuatan
                </h5>
              </Card.Header>
              <Card.Body>
                {analysis.strengths.length > 0 ? (
                  <div className="strength-list">
                    {analysis.strengths.map((strength, index) => (
                      <div key={index} className="strength-item mb-3 p-3 bg-success bg-opacity-10 rounded-3">
                        <div className="d-flex justify-content-between align-items-center mb-2">
                          <span className="fw-bold">{strength.type}</span>
                          <Badge bg="success" className="rounded-pill px-3">{strength.score.toFixed(1)}</Badge>
                        </div>
                        <ProgressBar 
                          now={strength.score} 
                          variant="success" 
                          className="custom-progress" 
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <p className="text-muted">Tidak ada kekuatan signifikan yang teridentifikasi.</p>
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>
          
          <Col md={6}>
            <Card className="border-0 shadow-sm h-100">
              <Card.Header className="bg-white border-0">
                <h5 className="fw-bold mb-0">
                  <FontAwesomeIcon icon={faArrowDown} className="me-2 text-danger" />
                  Area Peningkatan
                </h5>
              </Card.Header>
              <Card.Body>
                {analysis.weaknesses.length > 0 ? (
                  <div className="weakness-list">
                    {analysis.weaknesses.map((weakness, index) => (
                      <div key={index} className="weakness-item mb-3 p-3 bg-danger bg-opacity-10 rounded-3">
                        <div className="d-flex justify-content-between align-items-center mb-2">
                          <span className="fw-bold">{weakness.type}</span>
                          <Badge bg="danger" className="rounded-pill px-3">{weakness.score.toFixed(1)}</Badge>
                        </div>
                        <ProgressBar 
                          now={weakness.score} 
                          variant="danger" 
                          className="custom-progress" 
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <p className="text-muted">Tidak ada kelemahan signifikan yang teridentifikasi.</p>
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Rekomendasi */}
        <Card className="border-0 shadow-sm mb-4">
          <Card.Header className="bg-white border-0">
            <h5 className="fw-bold mb-0">
              <FontAwesomeIcon icon={faLightbulb} className="me-2 text-warning" />
              Rekomendasi
            </h5>
          </Card.Header>
          <Card.Body>
            {analysis.recommendations.length > 0 ? (
              <div className="recommendation-list">
                {analysis.recommendations.map((recommendation, index) => (
                  <div key={index} className="recommendation-item p-3 mb-3 bg-light rounded-3 border-start border-warning border-4">
                    <p className="mb-0">{recommendation.recommendation}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-4">
                <p className="text-muted">Tidak ada rekomendasi saat ini.</p>
              </div>
            )}
          </Card.Body>
        </Card>

        {/* Riwayat Evaluasi */}
        <Card className="border-0 shadow-sm mb-4">
          <Card.Header className="bg-white border-0">
            <h5 className="fw-bold mb-0">
              <FontAwesomeIcon icon={faHistory} className="me-2 text-info" />
              Riwayat Evaluasi Detail
            </h5>
          </Card.Header>
          <Card.Body>
            <div className="accordion" id="evaluationHistory">
              {Object.entries(analysis.evaluationsByType).map(([type, data], index) => (
                <div className="accordion-item border-0 mb-3 shadow-sm" key={`history-${type}`}>
                  <h2 className="accordion-header" id={`heading${index}`}>
                    <button 
                      className="accordion-button collapsed bg-light fw-bold" 
                      type="button" 
                      data-bs-toggle="collapse" 
                      data-bs-target={`#collapse${index}`} 
                      aria-expanded="false" 
                      aria-controls={`collapse${index}`}
                    >
                      Evaluasi {type} ({data.evaluations.length})
                    </button>
                  </h2>
                  <div 
                    id={`collapse${index}`} 
                    className="accordion-collapse collapse" 
                    aria-labelledby={`heading${index}`} 
                    data-bs-parent="#evaluationHistory"
                  >
                    <div className="accordion-body p-0">
                      {data.evaluations.length > 0 ? (
                        <div className="table-responsive">
                          <Table hover className="mb-0 custom-table">
                            <thead className="bg-light">
                              <tr>
                                <th>Tanggal</th>
                                <th>Skor</th>
                                <th>Komentar</th>
                              </tr>
                            </thead>
                            <tbody>
                              {data.evaluations.map((evaluation) => (
                                <tr key={evaluation.id}>
                                  <td>{new Date(evaluation.tanggal).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}</td>
                                  <td>
                                    <Badge bg={getScoreVariant(evaluation.skor)} className="score-badge">
                                      {evaluation.skor}
                                    </Badge>
                                  </td>
                                  <td className="comment-cell">{evaluation.komentar || "Tidak ada komentar"}</td>
                                </tr>
                              ))}
                            </tbody>
                          </Table>
                        </div>
                      ) : (
                        <div className="p-4 text-center">
                          <p className="text-muted mb-0">Tidak ada evaluasi untuk kategori ini.</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default AthleteAnalysis;