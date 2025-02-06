// src/pages/koordinator/PerformaAtlet.js
import React, { useState, useEffect } from "react";
import { Container, Card, Row, Col, Form, Alert, Badge } from "react-bootstrap";
import { Line, Bar, Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
  RadialLinearScale,
  Filler,
} from "chart.js";
import api from "../../services/api";
import "./style/PerformaAtlet.css";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
  Filler
);

const PerformaAtlet = () => {
  const [performaData, setPerformaData] = useState({});
  const [selectedAtlet, setSelectedAtlet] = useState("");
  const [atletList, setAtletList] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [chartInstances, setChartInstances] = useState({
    line: null,
    bar: null,
    radar: null,
  });

  useEffect(() => {
    fetchPerformaData();

    // Cleanup function to destroy chart instances
    return () => {
      Object.values(chartInstances).forEach((instance) => {
        if (instance) instance.destroy();
      });
    };
  }, []);

  const fetchPerformaData = async () => {
    try {
      const response = await api.get("/koordinator/analytics/performa");
      setPerformaData(response.data);
      const atlets = Object.keys(response.data);
      setAtletList(atlets);
      if (atlets.length > 0) {
        setSelectedAtlet(atlets[0]);
      }
      setLoading(false);
    } catch (error) {
      setError("Gagal memuat data performa");
      setLoading(false);
    }
  };

  // Main Performance Chart Data
  const mainChartData = {
    labels:
      selectedAtlet && performaData[selectedAtlet]?.dataEvaluasi
        ? performaData[selectedAtlet].dataEvaluasi.map((item) =>
            new Date(item.tanggal).toLocaleDateString("id-ID")
          )
        : [],
    datasets: [
      {
        label: "Skor Evaluasi",
        data:
          selectedAtlet && performaData[selectedAtlet]?.dataEvaluasi
            ? performaData[selectedAtlet].dataEvaluasi.map((item) => item.skor)
            : [],
        fill: true,
        backgroundColor: "rgba(52, 152, 219, 0.1)",
        borderColor: "#3498db",
        tension: 0.4,
        pointRadius: 6,
        pointBackgroundColor: "#3498db",
        pointBorderColor: "#fff",
        pointHoverRadius: 8,
      },
      {
        label: "Target Minimal",
        data:
          selectedAtlet && performaData[selectedAtlet]?.dataEvaluasi
            ? performaData[selectedAtlet].dataEvaluasi.map(() => 70)
            : [],
        borderColor: "rgba(231, 76, 60, 0.5)",
        borderDash: [5, 5],
        fill: false,
        pointRadius: 0,
      },
    ],
  };

  // Exercise Type Performance Chart Data
  const exerciseTypeChartData = {
    labels:
      selectedAtlet && performaData[selectedAtlet]?.ringkasan.jenisLatihan
        ? Object.keys(performaData[selectedAtlet].ringkasan.jenisLatihan)
        : [],
    datasets: [
      {
        label: "Rata-rata Skor per Jenis Latihan",
        data:
          selectedAtlet && performaData[selectedAtlet]?.ringkasan.jenisLatihan
            ? Object.values(
                performaData[selectedAtlet].ringkasan.jenisLatihan
              ).map((j) => j.rataRataSkor)
            : [],
        backgroundColor: [
          "rgba(52, 152, 219, 0.6)",
          "rgba(46, 204, 113, 0.6)",
          "rgba(155, 89, 182, 0.6)",
          "rgba(241, 196, 15, 0.6)",
          "rgba(230, 126, 34, 0.6)",
        ],
      },
    ],
  };

  const skillBalanceData = {
    labels: ["KETAHANAN", "KEKUATAN", "KECEPATAN", "KELINCAHAN", "KOORDINASI"],
    datasets: [
      {
        label: "Keseimbangan Kemampuan",
        data:
          selectedAtlet && performaData[selectedAtlet]?.ringkasan.jenisLatihan
            ? [
                performaData[selectedAtlet].ringkasan.jenisLatihan["KETAHANAN"]
                  ?.rataRataSkor || 0,
                performaData[selectedAtlet].ringkasan.jenisLatihan["KEKUATAN"]
                  ?.rataRataSkor || 0,
                performaData[selectedAtlet].ringkasan.jenisLatihan["KECEPATAN"]
                  ?.rataRataSkor || 0,
                performaData[selectedAtlet].ringkasan.jenisLatihan["KELINCAHAN"]
                  ?.rataRataSkor || 0,
                performaData[selectedAtlet].ringkasan.jenisLatihan["KOORDINASI"]
                  ?.rataRataSkor || 0,
              ]
            : [],
        backgroundColor: "rgba(52, 152, 219, 0.2)",
        borderColor: "#3498db",
        pointBackgroundColor: "#3498db",
      },
    ],
  };

  const commonChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          font: {
            family: "'Poppins', sans-serif",
            size: 12,
            weight: 500,
          },
        },
      },
      tooltip: {
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        titleColor: "#2c3e50",
        bodyColor: "#2c3e50",
        borderColor: "#e1e8ef",
        borderWidth: 1,
        padding: 12,
      },
    },
  };

  const calculateStats = () => {
    if (!selectedAtlet || !performaData[selectedAtlet]?.dataEvaluasi?.length) {
      return {
        tertinggi: 0,
        terendah: 0,
        rataRata: '0.0',
        totalLatihan: 0,
        tren: {
          harian: {
            skor: 0,
            perubahan: '0.0',
            jumlahEvaluasi: 0
          },
          bulanan: {
            skor: 0,
            perubahan: '0.0',
            jumlahEvaluasi: 0
          },
          tahunan: {
            skor: 0,
            perubahan: '0.0',
            jumlahEvaluasi: 0
          }
        }
      };
    }
  
    const data = performaData[selectedAtlet].dataEvaluasi;
    const scores = data.map(item => item.skor);
    const tren = performaData[selectedAtlet]?.ringkasan?.tren || {
      harian: { skor: 0, perubahan: '0.0', jumlahEvaluasi: 0 },
      bulanan: { skor: 0, perubahan: '0.0', jumlahEvaluasi: 0 },
      tahunan: { skor: 0, perubahan: '0.0', jumlahEvaluasi: 0 }
    };
  
    return {
      tertinggi: Math.max(...scores),
      terendah: Math.min(...scores),
      rataRata: (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1),
      totalLatihan: data.length,
      tren: {
        harian: {
          skor: parseFloat(tren.harian?.skor || 0),
          perubahan: tren.harian?.perubahan || '0.0',
          jumlahEvaluasi: tren.harian?.jumlahEvaluasi || 0
        },
        bulanan: {
          skor: parseFloat(tren.bulanan?.skor || 0),
          perubahan: tren.bulanan?.perubahan || '0.0',
          jumlahEvaluasi: tren.bulanan?.jumlahEvaluasi || 0
        },
        tahunan: {
          skor: parseFloat(tren.tahunan?.skor || 0),
          perubahan: tren.tahunan?.perubahan || '0.0',
          jumlahEvaluasi: tren.tahunan?.jumlahEvaluasi || 0
        }
      }
    };
  };

  const stats = calculateStats();

  return (
    <div className="performa-page bg-light min-vh-100">
      <Container fluid className="py-4 px-4">
        {/* Header Section */}
        <div className="header-section mb-4">
          <Row className="align-items-center">
            <Col>
              <h2 className="fw-bold text-primary mb-0">
                <i className="bi bi-graph-up me-2"></i>
                Analisis Performa Atlet
              </h2>
              <p className="text-muted mb-0 mt-1">
                Pantau dan analisis perkembangan atlet secara detail
              </p>
            </Col>
            <Col md={3}>
              <Form.Group>
                <Form.Select
                  value={selectedAtlet}
                  onChange={(e) => setSelectedAtlet(e.target.value)}
                  className="form-select-lg shadow-sm border-0">
                  {atletList.map((atlet) => (
                    <option key={atlet} value={atlet}>
                      {atlet}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
        </div>

        {error && (
          <Alert variant="danger" className="shadow-sm">
            <i className="bi bi-exclamation-triangle me-2"></i>
            {error}
          </Alert>
        )}

        {stats && (
          <Row className="g-4">
            {/* Quick Stats Cards */}
            <Col md={12} className="mb-4">
              <Row className="g-4">
                <Col md={3}>
                  <Card className="border-0 shadow-sm h-100 stat-card">
                    <Card.Body>
                      <div className="d-flex align-items-center">
                        <div className="stat-icon bg-primary bg-opacity-10 text-primary">
                          <i className="bi bi-trophy"></i>
                        </div>
                        <div className="ms-3">
                          <h6 className="text-muted mb-1">Skor Tertinggi</h6>
                          <h3 className="mb-0 fw-bold">{stats.tertinggi}</h3>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={3}>
                  <Card className="border-0 shadow-sm h-100 stat-card">
                    <Card.Body>
                      <div className="d-flex align-items-center">
                        <div className="stat-icon bg-success bg-opacity-10 text-success">
                          <i className="bi bi-graph-up-arrow"></i>
                        </div>
                        <div className="ms-3">
                          <h6 className="text-muted mb-1">Rata-rata Skor</h6>
                          <h3 className="mb-0 fw-bold">{stats.rataRata}</h3>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={3}>
                  <Card className="border-0 shadow-sm h-100 stat-card">
                    <Card.Body>
                      <div className="d-flex align-items-center">
                        <div className="stat-icon bg-info bg-opacity-10 text-info">
                          <i className="bi bi-calendar-check"></i>
                        </div>
                        <div className="ms-3">
                          <h6 className="text-muted mb-1">Total Evaluasi</h6>
                          <h3 className="mb-0 fw-bold">{stats.totalLatihan}</h3>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>

                <Col md={3}>
                  <Card className="border-0 shadow-sm h-100 stat-card">
                    <Card.Body>
                      <div className="d-flex align-items-center">
                        <div className="stat-icon bg-warning bg-opacity-10 text-warning">
                          <i className="bi bi-arrow-up-right"></i>
                        </div>
                        <div className="ms-3">
                          <h6 className="text-muted mb-1">Perkembangan</h6>
                          <div className="progress-stats">
                            <div className="mb-2">
                              <small className="text-muted">Hari ini:</small>
                              <Badge
                                bg={
                                  parseFloat(stats.tren.harian.perubahan) >= 0
                                    ? "success"
                                    : "danger"
                                }
                                className="rounded-pill ms-2">
                                {stats.tren.harian.perubahan > 0 ? "+" : ""}
                                {stats.tren.harian.perubahan}%
                              </Badge>
                            </div>

                            {/* Monthly Trend */}
                            <div className="mb-2">
                              <small className="text-muted">Bulan ini:</small>
                              <Badge
                                bg={
                                  parseFloat(stats.tren.bulanan.perubahan) >= 0
                                    ? "success"
                                    : "danger"
                                }
                                className="rounded-pill ms-2">
                                {stats.tren.bulanan.perubahan > 0 ? "+" : ""}
                                {stats.tren.bulanan.perubahan}%
                              </Badge>
                            </div>

                            {/* Yearly Trend */}
                            <div>
                              <small className="text-muted">Tahun ini:</small>
                              <Badge
                                bg={
                                  parseFloat(stats.tren.tahunan.perubahan) >= 0
                                    ? "success"
                                    : "danger"
                                }
                                className="rounded-pill ms-2">
                                {stats.tren.tahunan.perubahan > 0 ? "+" : ""}
                                {stats.tren.tahunan.perubahan}%
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Col>

            {/* Charts Section */}
            <Col md={8}>
              <div className="charts-wrapper">
                <Card className="border-0 shadow-sm mb-4">
                  <Card.Body>
                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <div>
                        <h5 className="fw-bold mb-1">
                          Perkembangan Skor Evaluasi
                        </h5>
                        <p className="text-muted mb-0">
                          Tren performa dari waktu ke waktu
                        </p>
                      </div>
                    </div>
                    <div style={{ height: "400px", position: "relative" }}>
                      <Line
                        data={mainChartData}
                        options={commonChartOptions}
                        key={`line-${selectedAtlet}`}
                      />
                    </div>
                  </Card.Body>
                </Card>

                <Row className="g-4">
                  <Col md={6}>
                    <Card className="border-0 shadow-sm h-100">
                      <Card.Body>
                        <h5 className="fw-bold mb-3">
                          Performa per Jenis Latihan
                        </h5>
                        <div style={{ height: "300px" }}>
                          <Bar
                            data={exerciseTypeChartData}
                            options={commonChartOptions}
                            key={`bar-${selectedAtlet}`}
                          />
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col md={6}>
                    <Card className="border-0 shadow-sm h-100">
                      <Card.Body>
                        <h5 className="fw-bold mb-3">Keseimbangan Kemampuan</h5>
                        <div style={{ height: "300px" }}>
                          <Radar
                            data={skillBalanceData}
                            options={commonChartOptions}
                            key={`radar-${selectedAtlet}`}
                          />
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              </div>
            </Col>

            {/* Sidebar Analysis */}
            <Col md={4}>
              <div className="analysis-wrapper">
                <Card className="border-0 shadow-sm mb-4">
                  <Card.Body>
                    <h5 className="fw-bold mb-4">Analisis Tren</h5>
                    
                    {/* Daily Trend */}
                    <div className="trend-item mb-4">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <span className="text-muted">Hari Ini</span>
                        <div className="d-flex align-items-center">
                          <h4 className="mb-0 fw-bold me-2">{stats.tren.harian.skor}</h4>
                          <Badge 
                            bg={parseFloat(stats.tren.harian.perubahan) >= 0 ? "success" : "danger"}
                            className="trend-badge"
                          >
                            {stats.tren.harian.perubahan > 0 ? "+" : ""}
                            {stats.tren.harian.perubahan}%
                          </Badge>
                        </div>
                      </div>
                      <div className="progress" style={{ height: "8px" }}>
                        <div
                          className="progress-bar bg-primary"
                          style={{ width: `${stats.tren.harian.skor}%` }}
                        />
                      </div>
                      <small className="text-muted mt-1">
                        {stats.tren.harian.jumlahEvaluasi} evaluasi hari ini
                      </small>
                    </div>
            
                    {/* Monthly Trend */}
                    <div className="trend-item mb-4">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <span className="text-muted">Bulan Ini</span>
                        <div className="d-flex align-items-center">
                          <h4 className="mb-0 fw-bold me-2">{stats.tren.bulanan.skor}</h4>
                          <Badge 
                            bg={parseFloat(stats.tren.bulanan.perubahan) >= 0 ? "success" : "danger"}
                            className="trend-badge"
                          >
                            {stats.tren.bulanan.perubahan > 0 ? "+" : ""}
                            {stats.tren.bulanan.perubahan}%
                          </Badge>
                        </div>
                      </div>
                      <div className="progress" style={{ height: "8px" }}>
                        <div
                          className="progress-bar bg-info"
                          style={{ width: `${stats.tren.bulanan.skor}%` }}
                        />
                      </div>
                      <small className="text-muted mt-1">
                        {stats.tren.bulanan.jumlahEvaluasi} evaluasi bulan ini
                      </small>
                    </div>
            
                    {/* Yearly Trend */}
                    <div className="trend-item">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <span className="text-muted">Tahun Ini</span>
                        <div className="d-flex align-items-center">
                          <h4 className="mb-0 fw-bold me-2">{stats.tren.tahunan.skor}</h4>
                          <Badge 
                            bg={parseFloat(stats.tren.tahunan.perubahan) >= 0 ? "success" : "danger"}
                            className="trend-badge"
                          >
                            {stats.tren.tahunan.perubahan > 0 ? "+" : ""}
                            {stats.tren.tahunan.perubahan}%
                          </Badge>
                        </div>
                      </div>
                      <div className="progress" style={{ height: "8px" }}>
                        <div
                          className="progress-bar bg-warning"
                          style={{ width: `${stats.tren.tahunan.skor}%` }}
                        />
                      </div>
                      <small className="text-muted mt-1">
                        {stats.tren.tahunan.jumlahEvaluasi} evaluasi tahun ini
                      </small>
                    </div>
                  </Card.Body>
                </Card>
              </div>
            </Col>
          </Row>
        )}
      </Container>
    </div>
  );
};

export default PerformaAtlet;
