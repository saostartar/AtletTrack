// src/pages/atlet/Latihan.js
import React, { useState, useEffect } from "react";
import {
  Container,
  Card,
  Button,
  Alert,
  ProgressBar,
  Badge,
  Spinner,
  Form,
} from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/api";

const Latihan = () => {
  const [latihan, setLatihan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentOpsi, setCurrentOpsi] = useState(null);
  const [timer, setTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [repetisi, setRepetisi] = useState(0);
  const { katalogId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    checkAndStartLatihan();
  }, [katalogId]);

  useEffect(() => {
    let interval;
    if (isTimerRunning && currentOpsi) {
      interval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 60000); // Update setiap menit
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, currentOpsi]);

  const checkAndStartLatihan = async () => {
    try {
      setLoading(true);
      setError("");

      if (!katalogId) {
        const ongoingResponse = await api.get("/atlet/latihan/ongoing");
        if (ongoingResponse.data) {
          setLatihan(ongoingResponse.data);
          setupCurrentOpsi(ongoingResponse.data);
        } else {
          setError(
            "Tidak ada latihan yang sedang berlangsung. Silakan pilih katalog latihan."
          );
          navigate("/atlet/catalog");
        }
      } else {
        try {
          const response = await api.post(`/atlet/latihan/${katalogId}/start`);
          setLatihan(response.data);
          setupCurrentOpsi(response.data);
        } catch (error) {
          if (error.response?.status === 400) {
            setError(error.response.data.message);
            setTimeout(() => navigate("/atlet/catalog"), 2000);
          } else {
            throw error;
          }
        }
      }
    } catch (error) {
      setError(error.response?.data?.message || "Gagal memulai latihan");
    } finally {
      setLoading(false);
    }
  };

  const setupCurrentOpsi = (latihanData) => {
    if (latihanData.progressLatihan && latihanData.progressLatihan.length > 0) {
      const currentOpsi =
        latihanData.progressLatihan[latihanData.currentOpsiIndex];
      setCurrentOpsi(currentOpsi);
      setRepetisi(currentOpsi.repetisi || 0);
      if (currentOpsi.sedangBerjalan) {
        setIsTimerRunning(true);
        const startTime = new Date(currentOpsi.waktuMulai);
        const elapsedMinutes = Math.floor((new Date() - startTime) / 60000);
        setTimer(elapsedMinutes);
      }
    }
  };

  const startCurrentOpsi = async () => {
    try {
      if (!latihan?.id) throw new Error("Data latihan tidak valid");
      await api.post(`/atlet/latihan/${latihan.id}/opsi/start`);
      setIsTimerRunning(true);
      const updatedOpsi = {
        ...currentOpsi,
        sedangBerjalan: true,
        waktuMulai: new Date().toISOString(),
      };
      setCurrentOpsi(updatedOpsi);
      setTimer(0);
      setRepetisi(0);
    } catch (error) {
      setError("Gagal memulai opsi latihan");
    }
  };

  const updateProgress = async (forceComplete = false) => {
    try {
      if (!latihan?.id) throw new Error("Data latihan tidak valid");
      const response = await api.put(`/atlet/latihan/${latihan.id}/progress`, {
        repetisi: repetisi,
        forceComplete: forceComplete,
      });

      setLatihan(response.data);
      if (response.data.status === "COMPLETED") {
        navigate("/atlet/latihan/history");
      } else if (
        response.data.progressLatihan &&
        response.data.currentOpsiIndex >= 0
      ) {
        setCurrentOpsi(
          response.data.progressLatihan[response.data.currentOpsiIndex]
        );
        setRepetisi(0);
        setTimer(0);
        setIsTimerRunning(false);
      }
    } catch (error) {
      setError("Gagal mengupdate progress");
    }
  };

  const handleRepetisiChange = (e) => {
    setRepetisi(parseInt(e.target.value) || 0);
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

  if (!latihan?.katalogLatihan) {
    return (
      <Container className="py-4">
        <Alert variant="info">Memuat data latihan...</Alert>
      </Container>
    );
  }

  const currentOpsiDetail = latihan.katalogLatihan.opsiLatihan?.find(
    (o) => o.id === currentOpsi?.opsiId
  );

  const progress = Math.round(
    (latihan.currentOpsiIndex / (latihan.progressLatihan?.length || 1)) * 100
  );

  return (
    <Container className="py-4">
      <Card className="mb-4">
        <Card.Body>
          <h2>{latihan.katalogLatihan.nama}</h2>
          <ProgressBar now={progress} label={`${progress}%`} className="mb-4" />

          {currentOpsiDetail && (
            <div>
              <h4>Latihan Saat Ini: {currentOpsiDetail.nama}</h4>
              <div className="mb-3">
                <Badge bg="info" className="me-2">
                  Durasi: {currentOpsiDetail.durasi} menit
                </Badge>
                <Badge bg="primary">
                  Target Repetisi: {currentOpsiDetail.repetisi}x
                </Badge>
              </div>

              <div className="mb-3">
                <h5>Deskripsi:</h5>
                <p>{currentOpsiDetail.deskripsi}</p>
              </div>

              <div className="mb-3">
                <h5>Target:</h5>
                <p>{currentOpsiDetail.target}</p>
              </div>

              <div className="mb-4">
                <h5>Instruksi:</h5>
                <p>{currentOpsiDetail.instruksi}</p>
              </div>

              {!currentOpsi.sedangBerjalan ? (
                <Button
                  variant="primary"
                  onClick={startCurrentOpsi}
                  className="mb-3">
                  Mulai Latihan Ini
                </Button>
              ) : (
                currentOpsi.sedangBerjalan && (
                  <div>
                    <p>Waktu berjalan: {timer} menit</p>
                    <Form.Group className="mb-3">
                      <Form.Label>Jumlah Repetisi:</Form.Label>
                      <Form.Control
                        type="number"
                        value={repetisi}
                        onChange={handleRepetisiChange}
                        min="0"
                      />
                    </Form.Group>
                    <div className="d-flex gap-2">
                      <Button
                        variant="success"
                        onClick={() => updateProgress(true)}>
                        Selesaikan Latihan Ini
                      </Button>
                      {(timer >= currentOpsiDetail.durasi ||
                        repetisi >= currentOpsiDetail.repetisi) && (
                        <Button
                          variant="primary"
                          onClick={() => updateProgress(false)}>
                          Target Tercapai - Lanjut
                        </Button>
                      )}
                    </div>
                  </div>
                )
              )}
            </div>
          )}

          {!currentOpsiDetail && (
            <div className="text-center">
              <h4>Semua latihan selesai!</h4>
              <div className="d-flex justify-content-center gap-3">
                <Button
                  variant="primary"
                  onClick={() => navigate("/atlet/latihan/history")}>
                  Lihat Riwayat Latihan
                </Button>
                <Button
                  variant="success"
                  onClick={() =>
                    navigate(`/atlet/catalog/${latihan.katalogLatihanId}`)
                  }>
                  Ulangi Latihan Ini
                </Button>
              </div>
            </div>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Latihan;
