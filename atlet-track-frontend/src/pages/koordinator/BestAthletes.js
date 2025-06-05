import React, { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  Table,
  Form,
  Button,
  Spinner,
  Alert,
  Badge,
  ProgressBar,
  Modal,
  Accordion,
} from "react-bootstrap";
import {
  FaMedal,
  FaTrophy,
  FaChartLine,
  FaFilter,
  FaCalendarAlt,
  FaRunning,
  FaSearch,
  FaChevronRight,
  FaCalculator,
  FaInfoCircle,
} from "react-icons/fa";
import api from "../../services/api";
import "./style/BestAthletes.css";

const BestAthletes = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [bestAthletes, setBestAthletes] = useState(null);
  const [showCalculationModal, setShowCalculationModal] = useState(false);
  const [calculationSteps, setCalculationSteps] = useState(null);
  const [loadingCalculation, setLoadingCalculation] = useState(false);
  const [filters, setFilters] = useState({
    cabangOlahraga: "",
    limit: 11,
    startDate: "",
    endDate: "",
  });
  const navigate = useNavigate();
  const [visibleCards, setVisibleCards] = useState([]);
  const [showCards, setShowCards] = useState(false);
  const [animationTrigger, setAnimationTrigger] = useState("button"); // 'auto' or 'button'
  const cardRefs = useRef([]);
  const sectionRef = useRef(null);

  const observerCallback = useCallback(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && animationTrigger === "auto") {
          setShowCards(true);
          triggerCardAnimation();
        }
      });
    },
    [animationTrigger]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.1,
      rootMargin: "50px",
    });

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [observerCallback]);

  const triggerCardAnimation = useCallback(() => {
    if (!bestAthletes?.results) return;

    setVisibleCards([]);
    bestAthletes.results.forEach((_, index) => {
      setTimeout(() => {
        setVisibleCards((prev) => [...prev, index]);
      }, index * 150); // Stagger animation by 150ms
    });
  }, [bestAthletes]);

  useEffect(() => {
    if (bestAthletes && animationTrigger === "auto") {
      setVisibleCards([]);
      setShowCards(false);
    }
  }, [bestAthletes, animationTrigger]);

  const handleShowAthletes = () => {
    setShowCards(true);
    triggerCardAnimation();
  };

  const toggleAnimationMode = () => {
    setAnimationTrigger((prev) => (prev === "auto" ? "button" : "auto"));
    setShowCards(false);
    setVisibleCards([]);
  };

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

      const response = await api.get(
        `/koordinator/athletes/best?${queryParams}`
      );
      setBestAthletes(response.data);
    } catch (error) {
      setError(
        error.response?.data?.message || "Gagal mengambil data atlet terbaik"
      );
    } finally {
      setLoading(false);
    }
  };

  const fetchTopsisCalculationSteps = async () => {
    try {
      setLoadingCalculation(true);

      const queryParams = new URLSearchParams();
      if (filters.cabangOlahraga) {
        queryParams.append("cabangOlahraga", filters.cabangOlahraga);
      }
      if (filters.startDate) {
        queryParams.append("startDate", filters.startDate);
      }
      if (filters.endDate) {
        queryParams.append("endDate", filters.endDate);
      }

      const response = await api.get(
        `/koordinator/athletes/topsis-calculation?${queryParams}`
      );
      setCalculationSteps(response.data);
      setShowCalculationModal(true);
    } catch (error) {
      setError("Gagal mengambil langkah perhitungan TOPSIS");
    } finally {
      setLoadingCalculation(false);
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

  const safeToFixed = (num, digits) => {
    const number = parseFloat(num);
    if (isNaN(number)) {
      return "N/A";
    }
    return number.toFixed(digits);
  };

  const TopsisCalculationModal = () => {
    if (!calculationSteps) return null;

    return (
      <Modal
        show={showCalculationModal}
        onHide={() => setShowCalculationModal(false)}
        size="xl"
        scrollable>
        <Modal.Header closeButton>
          <Modal.Title>
            <FaCalculator className="me-2" />
            Perhitungan TOPSIS Detail
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Alert variant="info" className="mb-4">
            <FaInfoCircle className="me-2" />
            Berikut adalah langkah-langkah perhitungan TOPSIS menggunakan data
            evaluasi atlet aktual dari sistem.
          </Alert>

          <Accordion defaultActiveKey="0">
            {/* Step 1: Raw Data */}
            <Accordion.Item eventKey="0">
              <Accordion.Header>
                <strong>
                  Langkah 1: Data Evaluasi Atlet (Matriks Keputusan Awal)
                </strong>
              </Accordion.Header>
              <Accordion.Body>
                <Table striped bordered hover responsive size="sm">
                  <thead className="table-light">
                    <tr>
                      <th>Atlet</th>
                      {calculationSteps.criterias.map((c) => (
                        <th key={c}>{c.toUpperCase()}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {calculationSteps.athleteData.map((athlete, index) => (
                      <tr key={index}>
                        <td>{athlete.nama}</td>
                        {calculationSteps.criterias.map((c) => (
                          <td key={c}>
                            {safeToFixed(
                              athlete.scores[c.toUpperCase()] || 0,
                              1
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </Table>
                <Alert variant="light" className="mt-3">
                  <small>
                    Data di atas adalah rata-rata skor evaluasi untuk setiap
                    jenis latihan berdasarkan data aktual dari sistem.
                  </small>
                </Alert>
              </Accordion.Body>
            </Accordion.Item>

            {/* Step 2: Weights */}
            <Accordion.Item eventKey="1">
              <Accordion.Header>
                <strong>Langkah 2: Bobot Kriteria (W)</strong>
              </Accordion.Header>
              <Accordion.Body>
                <Alert variant="secondary" className="mb-3">
                  <strong>Metode Penentuan Bobot:</strong> Bobot dihitung
                  berdasarkan target minimal setiap jenis latihan.
                  <br />
                  <code>
                    Bobot (w<sub>j</sub>) = Target<sub>j</sub> / ΣTarget
                    <sub>k</sub>
                  </code>
                </Alert>
                <Table striped bordered hover responsive>
                  <thead className="table-light">
                    <tr>
                      <th>Kriteria</th>
                      <th>Target Minimal</th>
                      <th>
                        Bobot (w<sub>j</sub>)
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(calculationSteps.jenisLatihan).map(
                      ([type, data]) => (
                        <tr key={type}>
                          <td>{type}</td>
                          <td>{data.targetMinimal}</td>
                          <td>
                            {safeToFixed(calculationSteps.weights[type], 3)}
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </Table>
              </Accordion.Body>
            </Accordion.Item>

            {/* Step 3: Normalization */}
            <Accordion.Item eventKey="2">
              <Accordion.Header>
                <strong>Langkah 3: Normalisasi Matriks Keputusan (R)</strong>
              </Accordion.Header>
              <Accordion.Body>
                <Alert variant="secondary">
                  <strong>Rumus:</strong> r<sub>ij</sub> = x<sub>ij</sub> / √(Σx
                  <sub>ik</sub>
                  <sup>2</sup>)
                </Alert>

                <h6>Pembagi Normalisasi:</h6>
                <Table
                  striped
                  bordered
                  hover
                  responsive
                  size="sm"
                  className="mb-3">
                  <thead className="table-light">
                    <tr>
                      {calculationSteps.criterias.map((c) => (
                        <th key={c}>{c.toUpperCase()}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      {calculationSteps.criterias.map((c) => (
                        <td key={c}>
                          {safeToFixed(
                            calculationSteps.columnNorms[c.toUpperCase()],
                            4
                          )}
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </Table>

                <h6>Matriks Ternormalisasi:</h6>
                <Table striped bordered hover responsive size="sm">
                  <thead className="table-light">
                    <tr>
                      <th>Atlet</th>
                      {calculationSteps.criterias.map((c) => (
                        <th key={c}>{c.toUpperCase()}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {calculationSteps.normalizationResults.map(
                      (result, index) => (
                        <tr key={index}>
                          <td>{result.nama}</td>
                          {calculationSteps.criterias.map((c) => (
                            <td key={c}>
                              {safeToFixed(
                                result.normalizedScores[c.toUpperCase()],
                                6
                              )}
                            </td>
                          ))}
                        </tr>
                      )
                    )}
                  </tbody>
                </Table>
              </Accordion.Body>
            </Accordion.Item>

            {/* Step 4: Weighted Normalization */}
            <Accordion.Item eventKey="3">
              <Accordion.Header>
                <strong>Langkah 4: Matriks Ternormalisasi Berbobot (V)</strong>
              </Accordion.Header>
              <Accordion.Body>
                <Alert variant="secondary">
                  <strong>Rumus:</strong> v<sub>ij</sub> = w<sub>j</sub> × r
                  <sub>ij</sub>
                </Alert>
                <Table striped bordered hover responsive size="sm">
                  <thead className="table-light">
                    <tr>
                      <th>Atlet</th>
                      {calculationSteps.criterias.map((c) => (
                        <th key={c}>
                          {c.toUpperCase()} (w=
                          {safeToFixed(
                            calculationSteps.weights[c.toUpperCase()],
                            2
                          )}
                          )
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {calculationSteps.weightedResults.map((result, index) => (
                      <tr key={index}>
                        <td>{result.nama}</td>
                        {calculationSteps.criterias.map((c) => (
                          <td key={c}>
                            {safeToFixed(
                              result.weightedScores[c.toUpperCase()],
                              6
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Accordion.Body>
            </Accordion.Item>

            {/* Step 5: Ideal Solutions */}
            <Accordion.Item eventKey="4">
              <Accordion.Header>
                <strong>
                  Langkah 5: Solusi Ideal Positif (A+) dan Negatif (A-)
                </strong>
              </Accordion.Header>
              <Accordion.Body>
                <Table striped bordered hover responsive>
                  <thead className="table-light">
                    <tr>
                      <th>Solusi Ideal</th>
                      {calculationSteps.criterias.map((c) => (
                        <th key={c}>{c.toUpperCase()}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <strong>Positif (A+)</strong>
                      </td>
                      {calculationSteps.criterias.map((c) => (
                        <td key={c}>
                          {safeToFixed(
                            calculationSteps.idealSolutions.positive[
                              c.toUpperCase()
                            ],
                            6
                          )}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td>
                        <strong>Negatif (A-)</strong>
                      </td>
                      {calculationSteps.criterias.map((c) => (
                        <td key={c}>
                          {safeToFixed(
                            calculationSteps.idealSolutions.negative[
                              c.toUpperCase()
                            ],
                            6
                          )}
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </Table>
              </Accordion.Body>
            </Accordion.Item>

            {/* Step 6: Distances */}
            <Accordion.Item eventKey="5">
              <Accordion.Header>
                <strong>Langkah 6: Jarak ke Solusi Ideal (D+ dan D-)</strong>
              </Accordion.Header>
              <Accordion.Body>
                <Alert variant="secondary">
                  <strong>Rumus:</strong> D<sub>i</sub>
                  <sup>+</sup> = √(Σ(v<sub>ij</sub> - v<sub>j</sub>
                  <sup>+</sup>)<sup>2</sup>)
                </Alert>
                <Table striped bordered hover responsive>
                  <thead className="table-light">
                    <tr>
                      <th>Atlet</th>
                      <th>
                        Jarak ke A+ (D<sub>i</sub>
                        <sup>+</sup>)
                      </th>
                      <th>
                        Jarak ke A- (D<sub>i</sub>
                        <sup>-</sup>)
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {calculationSteps.distances.map((distance, index) => (
                      <tr key={index}>
                        <td>{distance.nama}</td>
                        <td>{safeToFixed(distance.positiveDistance, 6)}</td>
                        <td>{safeToFixed(distance.negativeDistance, 6)}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Accordion.Body>
            </Accordion.Item>

            {/* Step 7: Relative Closeness */}
            <Accordion.Item eventKey="6">
              <Accordion.Header>
                <strong>
                  Langkah 7: Kedekatan Relatif (C<sub>i</sub>)
                </strong>
              </Accordion.Header>
              <Accordion.Body>
                <Alert variant="secondary">
                  <strong>Rumus:</strong> C<sub>i</sub> = D<sub>i</sub>
                  <sup>-</sup> / (D<sub>i</sub>
                  <sup>+</sup> + D<sub>i</sub>
                  <sup>-</sup>)
                </Alert>
                <Table striped bordered hover responsive>
                  <thead className="table-light">
                    <tr>
                      <th>Atlet</th>
                      <th>
                        Kedekatan Relatif (C<sub>i</sub>)
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {calculationSteps.relativeCloseness.map(
                      (closeness, index) => (
                        <tr key={index}>
                          <td>{closeness.nama}</td>
                          <td>{safeToFixed(closeness.score, 6)}</td>
                        </tr>
                      )
                    )}
                  </tbody>
                </Table>
              </Accordion.Body>
            </Accordion.Item>

            {/* Step 8: Final Rankings */}
            <Accordion.Item eventKey="7">
              <Accordion.Header>
                <strong>Langkah 8: Peringkat Akhir</strong>
              </Accordion.Header>
              <Accordion.Body>
                <Table striped bordered hover responsive>
                  <thead className="table-light">
                    <tr>
                      <th>Peringkat</th>
                      <th>Atlet</th>
                      <th>Skor TOPSIS</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {calculationSteps.finalRankings.map((rank, index) => (
                      <tr
                        key={index}
                        className={
                          rank.rank === 1 ? "table-success fw-bold" : ""
                        }>
                        <td>
                          <strong>{rank.rank}</strong>
                        </td>
                        <td>{rank.nama}</td>
                        <td>{safeToFixed(rank.topsisScore, 3)}</td>
                        <td>
                          <Badge
                            bg={
                              rank.topsisScore >= 0.8
                                ? "success"
                                : rank.topsisScore >= 0.6
                                ? "primary"
                                : rank.topsisScore >= 0.4
                                ? "info"
                                : rank.topsisScore >= 0.2
                                ? "warning"
                                : "danger"
                            }>
                            {getPerformanceLabel(rank.topsisScore)}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowCalculationModal(false)}>
            Tutup
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  return (
    <div className="best-athletes-page">
      <Container>
        <div className="page-header">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h2>
                <FaTrophy /> Peringkat Atlet Terbaik
              </h2>
              <p>
                Peringkat ini dibuat menggunakan metode TOPSIS (Technique for
                Order of Preference by Similarity to Ideal Solution), yang
                mempertimbangkan performa dari berbagai kriteria.
              </p>
            </div>
            <div>
              <Button
                variant="info"
                onClick={fetchTopsisCalculationSteps}
                disabled={loadingCalculation || !bestAthletes}
                className="mb-2">
                {loadingCalculation ? (
                  <>
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      className="me-2"
                    />
                    Memuat...
                  </>
                ) : (
                  <>
                    <FaCalculator className="me-2" />
                    Lihat Perhitungan Detail
                  </>
                )}
              </Button>
            </div>
          </div>
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

        {error && <Alert variant="danger">{error}</Alert>}

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
                      <p>
                        Bobot ini berdasarkan target minimal setiap jenis
                        latihan:
                      </p>
                      <Row>
                        {Object.entries(
                          bestAthletes.metadata.criteriaWeights
                        ).map(([criterion, weight]) => (
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
                        ))}
                      </Row>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>

              {animationTrigger === "button" && !showCards && (
                <div className="text-center mb-4">
                  <Button
                    variant="success"
                    size="lg"
                    onClick={handleShowAthletes}
                    className="animate-button">
                    <FaTrophy className="me-2" />
                    Tampilkan Peringkat Atlet
                  </Button>
                </div>
              )}

              <div ref={sectionRef} className="athletes-section">
                {(showCards || animationTrigger === "auto") && (
                  <Row className="g-4">
                    {bestAthletes.results.map((athlete, index) => (
                      <Col
                        key={athlete.id}
                        lg={4}
                        md={6}
                        className="mb-4"
                        ref={(el) => (cardRefs.current[index] = el)}>
                        <Card
                          className={`h-100 shadow-sm border-0 athlete-card ${
                            visibleCards.includes(index)
                              ? "animate-in"
                              : "animate-hidden"
                          }`}
                          style={{
                            animationDelay: `${index * 150}ms`,
                          }}>
                          <Card.Body>
                            <div className="d-flex align-items-center mb-3">
                              <div className="rank-badge me-3">
                                {athlete.rank <= 3 ? (
                                  <FaMedal
                                    className={`text-${
                                      athlete.rank === 1
                                        ? "warning"
                                        : athlete.rank === 2
                                        ? "secondary"
                                        : "bronze"
                                    }`}
                                    size={24}
                                  />
                                ) : (
                                  <span className="text-muted fw-bold">
                                    {athlete.rank}
                                  </span>
                                )}
                              </div>
                              <div>
                                <h5 className="mb-0 fw-bold">{athlete.nama}</h5>
                                <Badge bg="light" text="dark">
                                  {athlete.cabangOlahraga}
                                </Badge>
                              </div>
                            </div>

                            <div className="mb-3">
                              <div className="d-flex justify-content-between">
                                <span className="text-muted">Skor TOPSIS</span>
                                <span className="fw-bold">
                                  {athlete.topsisScore.toFixed(3)}
                                </span>
                              </div>
                              <div className="d-flex justify-content-between">
                                <span className="text-muted">
                                  Level Performa
                                </span>
                                <Badge
                                  bg={
                                    athlete.topsisScore >= 0.8
                                      ? "success"
                                      : athlete.topsisScore >= 0.6
                                      ? "primary"
                                      : athlete.topsisScore >= 0.4
                                      ? "info"
                                      : athlete.topsisScore >= 0.2
                                      ? "warning"
                                      : "danger"
                                  }>
                                  {getPerformanceLabel(athlete.topsisScore)}
                                </Badge>
                              </div>
                            </div>

                            <div className="scores-section">
                              <h6 className="text-muted fw-bold">
                                Detail Skor
                              </h6>
                              {Object.entries(athlete.scores).map(
                                ([type, score]) => (
                                  <div key={type} className="mb-2">
                                    <div className="d-flex justify-content-between mb-1">
                                      <small>{type}</small>
                                      <small className="fw-bold">
                                        {score.toFixed(1)}
                                      </small>
                                    </div>
                                    <ProgressBar
                                      now={score}
                                      variant={
                                        score >= 80
                                          ? "success"
                                          : score >= 60
                                          ? "info"
                                          : score >= 40
                                          ? "primary"
                                          : score >= 20
                                          ? "warning"
                                          : "danger"
                                      }
                                    />
                                  </div>
                                )
                              )}
                            </div>
                          </Card.Body>
                          <Card.Footer className="bg-white border-0">
                            <Button
                              variant="primary"
                              className="w-100"
                              onClick={() => handleViewAnalysis(athlete.id)}>
                              <FaChevronRight className="me-2" /> Lihat Detail
                            </Button>
                          </Card.Footer>
                        </Card>
                      </Col>
                    ))}
                  </Row>
                )}
              </div>

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
                          {Object.keys(
                            bestAthletes.metadata.criteriaWeights
                          ).map((criterion) => (
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
                                  <div
                                    className={`athlete-rank rank-${athlete.rank}`}>
                                    {athlete.rank}
                                  </div>
                                )}
                                <span>{athlete.nama}</span>
                              </div>
                            </td>
                            {Object.keys(
                              bestAthletes.metadata.criteriaWeights
                            ).map((criterion) => (
                              <td key={`${athlete.id}-${criterion}`}>
                                <span className="athlete-score-badge">
                                  {athlete.scores[criterion]?.toFixed(1) ||
                                    "N/A"}
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

        <TopsisCalculationModal />
      </Container>
    </div>
  );
};

export default BestAthletes;
