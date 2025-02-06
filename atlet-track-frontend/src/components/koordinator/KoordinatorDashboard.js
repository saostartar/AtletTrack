// src/components/koordinator/KoordinatorDashboard.js
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "./KoordinatorDashboard.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const KoordinatorDashboard = () => {
  const [jumlahAtlet, setJumlahAtlet] = useState(0);
  const [jumlahKatalog, setJumlahKatalog] = useState(0);
  const [evaluasiTerkini, setEvaluasiTerkini] = useState([]);
  const [performa, setPerforma] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await api.get("/koordinator/dashboard");
      const { jumlahAtlet, jumlahKatalog, evaluasiTerkini, performa } =
        response.data;

      setJumlahAtlet(jumlahAtlet);
      setJumlahKatalog(jumlahKatalog);
      setEvaluasiTerkini(evaluasiTerkini);

      // Format performa data
      const parsedPerforma = performa.map((item) => ({
        bulan: new Date(item.month + "-01").toLocaleDateString("id-ID", {
          month: "long",
          year: "numeric",
        }),
        rataRataSkor: Number(parseFloat(item.avgScore).toFixed(2)),
      }));

      setPerforma(parsedPerforma);
    } catch (error) {
      console.error("Gagal mengambil data dashboard:", error);
    }
  };

  const chartData = {
    labels: performa.map((item) => item.bulan),
    datasets: [
      {
        label: "Rata-rata Skor Evaluasi",
        data: performa.map((item) => item.rataRataSkor),
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
        data: performa.map(() => 70),
        borderColor: "rgba(231, 76, 60, 0.5)",
        borderDash: [5, 5],
        fill: false,
        pointRadius: 0,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        align: "end",
        labels: {
          boxWidth: 15,
          usePointStyle: true,
          padding: 20,
          font: {
            family: "'Poppins', sans-serif",
            size: 12,
            weight: 500,
          },
        },
      },
      title: {
        display: true,
        text: "Perkembangan Rata-rata Performa Atlet",
        font: {
          family: "'Poppins', sans-serif",
          size: 16,
          weight: 600,
        },
        padding: 20,
      },
      tooltip: {
        mode: "index",
        intersect: false,
        backgroundColor: "rgba(255, 255, 255, 0.95)",
        titleColor: "#2c3e50",
        bodyColor: "#2c3e50",
        borderColor: "#e1e8ef",
        borderWidth: 1,
        padding: 12,
        bodySpacing: 8,
        callbacks: {
          title: (context) => `Periode: ${context[0].label}`,
          label: (context) => {
            const value = context.parsed.y.toFixed(1);
            if (context.datasetIndex === 0) {
              return `Rata-rata Skor: ${value}`;
            }
            return `Target Minimal: ${value}`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        min: 0,
        max: 100,
        grid: {
          color: "rgba(0, 0, 0, 0.05)",
          drawBorder: false,
        },
        ticks: {
          callback: (value) => `${value}%`,
          font: {
            family: "'Poppins', sans-serif",
            size: 11,
          },
          padding: 10,
          stepSize: 20,
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            family: "'Poppins', sans-serif",
            size: 11,
          },
          maxRotation: 45,
          minRotation: 45,
        },
      },
    },
    interaction: {
      intersect: false,
      mode: "index",
    },
  };

  const handleViewAllEvaluations = () => {
    navigate("/koordinator/evaluasi-atlet");
  };

  return (
    <div className="dashboard-wrapper">
      <Container fluid className="dashboard-container p-4">
        <h2 className="dashboard-title mb-4">Dashboard Koordinator</h2>

        <Row className="g-4">
          <Col md={4}>
            <Card className="stat-card h-100 shadow-sm">
              <Card.Body className="d-flex flex-column align-items-center justify-content-center p-4">
                <Card.Title className="text-muted mb-3">Total Atlet</Card.Title>
                <div className="stat-value">{jumlahAtlet}</div>
                <Button
                  variant="outline-primary"
                  className="mt-3 w-100"
                  onClick={() => navigate("/koordinator/atlets")}>
                  Kelola Atlet
                </Button>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card className="stat-card h-100 shadow-sm">
              <Card.Body className="d-flex flex-column align-items-center justify-content-center p-4">
                <Card.Title className="text-muted mb-3">
                  Katalog Latihan
                </Card.Title>
                <div className="stat-value">{jumlahKatalog}</div>
                <Button
                  variant="outline-primary"
                  className="mt-3 w-100"
                  onClick={() => navigate("/koordinator/katalog-latihan")}>
                  Kelola Katalog
                </Button>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card className="stat-card h-100 shadow-sm">
              <Card.Body className="p-4">
                <Card.Title className="text-muted mb-3">
                  Evaluasi Terkini
                </Card.Title>
                {evaluasiTerkini.length > 0 ? (
                  <div className="table-responsive">
                    <Table className="table-borderless table-hover">
                      <thead>
                        <tr>
                          <th>Atlet</th>
                          <th>Skor</th>
                          <th>Tanggal</th>
                        </tr>
                      </thead>
                      <tbody>
                        {evaluasiTerkini.slice(0, 3).map((evalItem) => (
                          <tr key={evalItem.id}>
                            <td>{evalItem.atlet?.nama || "N/A"}</td>
                            <td>
                              <span
                                className={`score-badge ${
                                  evalItem.skor >= evalItem.targetPencapaian
                                    ? "bg-success text-white"
                                    : "bg-warning"
                                }`}>
                                {evalItem.skor}
                              </span>
                            </td>
                            <td>
                              {new Date(evalItem.createdAt).toLocaleDateString(
                                "id-ID"
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                ) : (
                  <p className="text-muted text-center">
                    Belum ada evaluasi terbaru
                  </p>
                )}
                <Button
                  variant="outline-primary"
                  className="w-100 mt-3"
                  onClick={handleViewAllEvaluations}>
                  Lihat Semua Evaluasi
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="mt-4">
          <Col md={8}>
            <Card className="chart-card shadow-sm">
              <Card.Body className="p-4">
                <Card.Title className="text-muted mb-4">
                  Grafik Performa Atlet
                </Card.Title>
                {performa.length > 0 ? (
                  <div style={{ height: "400px", position: "relative" }}>
                    <Line data={chartData} options={chartOptions} />
                    <div className="chart-legend mt-4">
                      <small className="text-muted d-block text-center">
                        * Garis putus-putus menunjukkan target minimal yang
                        harus dicapai
                      </small>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-5">
                    <p className="text-muted mb-0">
                      Belum ada data performa untuk ditampilkan
                    </p>
                    <small className="text-muted">
                      Data akan muncul setelah evaluasi pertama dilakukan
                    </small>
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card className="shadow-sm">
              <Card.Body className="p-4">
                <h5 className="text-muted mb-4">Ringkasan Performa</h5>
                <div className="performance-stats">
                  <div className="stat-item mb-4">
                    <div className="d-flex justify-content-between mb-2">
                      <span className="text-muted">Rata-rata Bulanan</span>
                      <span className="fw-bold">
                        {performa.length > 0
                          ? performa[performa.length - 1].rataRataSkor.toFixed(
                              1
                            )
                          : "0.0"}
                        %
                      </span>
                    </div>
                    <div className="progress" style={{ height: "8px" }}>
                      <div
                        className="progress-bar bg-primary"
                        style={{
                          width: `${
                            performa.length > 0
                              ? performa[performa.length - 1].rataRataSkor
                              : 0
                          }%`,
                        }}
                      />
                    </div>
                  </div>

                  <div className="stat-item">
                    <div className="d-flex justify-content-between mb-2">
                      <span className="text-muted">Target Pencapaian</span>
                      <span className="fw-bold text-success">70%</span>
                    </div>
                    <div className="progress" style={{ height: "8px" }}>
                      <div
                        className="progress-bar bg-success"
                        style={{ width: "70%" }}
                      />
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default KoordinatorDashboard;
