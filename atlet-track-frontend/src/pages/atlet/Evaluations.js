// src/pages/atlet/Evaluations.js
import React, { useState, useEffect } from "react";
import {
  Container,
  Table,
  Card,
  Alert,
  Spinner,
  Badge,
  Row,
  Col,
  ProgressBar,
} from "react-bootstrap";
import { Line } from "react-chartjs-2";
import api from "../../services/api";

const Evaluations = () => {
  const [evaluations, setEvaluations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [progressData, setProgressData] = useState({
    byType: {},
    overall: {
      average: 0,
      total: 0,
      trend: 0,
    },
  });

  useEffect(() => {
    fetchEvaluations();
  }, []);

  const fetchEvaluations = async () => {
    try {
      const response = await api.get("/atlet/evaluasi");
      setEvaluations(response.data);
      calculateProgress(response.data);
      setLoading(false);
    } catch (error) {
      setError("Failed to fetch evaluations");
      setLoading(false);
    }
  };

  const calculateProgress = (data) => {
    const byType = data.reduce((acc, evaluation) => {
      const type = evaluation.jenisLatihan;
      if (!acc[type]) {
        acc[type] = {
          scores: [],
          average: 0,
          total: 0,
          trend: 0,
          targetAchieved: 0,
        };
      }
      acc[type].scores.push(evaluation.skor);
      return acc;
    }, {});

    // Calculate statistics for each type
    Object.keys(byType).forEach((type) => {
      const scores = byType[type].scores;
      byType[type].average = (
        scores.reduce((a, b) => a + b, 0) / scores.length
      ).toFixed(1);
      byType[type].total = scores.length;
      byType[type].trend =
        scores.length > 1
          ? (
              ((scores[scores.length - 1] - scores[0]) / scores[0]) *
              100
            ).toFixed(1)
          : 0;
      byType[type].targetAchieved = scores.filter(
        (score) => score >= 70
      ).length;
    });

    // Calculate overall statistics
    const allScores = data.map((evaluation) => evaluation.skor);
    const overall = {
      average: allScores.length
        ? (allScores.reduce((a, b) => a + b, 0) / allScores.length).toFixed(1)
        : 0,
      total: allScores.length,
      trend:
        allScores.length > 1
          ? (
              ((allScores[allScores.length - 1] - allScores[0]) /
                allScores[0]) *
              100
            ).toFixed(1)
          : 0,
    };

    setProgressData({ byType, overall });
  };

  const chartData = {
    labels: evaluations.map((evaluation) =>
      new Date(evaluation.createdAt).toLocaleDateString()
    ),
    datasets: [
      {
        label: "Skor Evaluasi",
        data: evaluations.map((evaluation) => evaluation.skor),
        fill: true,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Perkembangan Skor Evaluasi",
      },
    },
    scales: {
      y: {
        min: 0,
        max: 100,
      },
    },
  };

  if (loading) {
    return (
      <Container className="mt-4 text-center">
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <h2 className="mb-4">Evaluasi dan Perkembangan</h2>
      {error && <Alert variant="danger">{error}</Alert>}

      {/* Overall Progress */}
      <Row className="mb-4">
        <Col md={4}>
          <Card className="h-100">
            <Card.Body>
              <h6 className="text-muted mb-2">Rata-rata Keseluruhan</h6>
              <h3 className="mb-0">{progressData.overall.average}%</h3>
              <Badge
                bg={progressData.overall.trend >= 0 ? "success" : "danger"}
                className="mt-2">
                {progressData.overall.trend > 0 ? "+" : ""}
                {progressData.overall.trend}%
              </Badge>
            </Card.Body>
          </Card>
        </Col>
        <Col md={8}>
          <Card className="h-100">
            <Card.Body>
              <h6 className="text-muted mb-3">Grafik Perkembangan</h6>
              <Line data={chartData} options={chartOptions} />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Progress by Type */}
      <Card className="mb-4">
        <Card.Body>
          <h5 className="mb-4">Progress per Jenis Latihan</h5>
          {Object.entries(progressData.byType).map(([type, data]) => (
            <div key={type} className="mb-4">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <div>
                  <h6 className="mb-0">{type}</h6>
                  <small className="text-muted">
                    {data.targetAchieved} dari {data.total} evaluasi mencapai
                    target
                  </small>
                </div>
                <div className="text-end">
                  <h5 className="mb-0">{data.average}%</h5>
                  <Badge
                    bg={data.trend >= 0 ? "success" : "danger"}
                    className="ms-2">
                    {data.trend > 0 ? "+" : ""}
                    {data.trend}%
                  </Badge>
                </div>
              </div>
              <ProgressBar now={data.average} variant="info" className="mb-2" />
            </div>
          ))}
        </Card.Body>
      </Card>

      {/* Evaluation History */}
      <Card>
        <Card.Body>
          <h5 className="mb-4">Riwayat Evaluasi</h5>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Tanggal</th>
                <th>Jenis Latihan</th>
                <th>Skor</th>
                <th>Target</th>
                <th>Status</th>
                <th>Komentar</th>
              </tr>
            </thead>
            <tbody>
              {evaluations.length > 0 ? (
                evaluations.map((evaluation) => (
                  <tr key={evaluation.id}>
                    <td>
                      {new Date(evaluation.createdAt).toLocaleDateString()}
                    </td>
                    <td>{evaluation.jenisLatihan}</td>
                    <td>
                      <Badge bg="primary">{evaluation.skor}</Badge>
                    </td>
                    <td>{evaluation.targetPencapaian}</td>
                    <td>
                      <Badge
                        bg={
                          evaluation.skor >= evaluation.targetPencapaian
                            ? "success"
                            : "warning"
                        }>
                        {evaluation.skor >= evaluation.targetPencapaian
                          ? "Mencapai Target"
                          : "Belum Mencapai Target"}
                      </Badge>
                    </td>
                    <td>{evaluation.komentar || "-"}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center">
                    Tidak ada evaluasi.
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Evaluations;
