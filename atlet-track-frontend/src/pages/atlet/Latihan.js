// src/pages/atlet/Latihan.js
import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Container,
  Card,
  Button,
  Alert,
  ProgressBar,
  Badge,
  Spinner,
  Form,
  Row,
  Col,
} from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/api";

const Latihan = () => {
  const [latihan, setLatihan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentOpsiProgress, setCurrentOpsiProgress] = useState(null); // From latihan.progressLatihan
  const [currentOpsiDetail, setCurrentOpsiDetail] = useState(null); // From latihan.katalogLatihan.opsiLatihan
  const [timer, setTimer] = useState(0); // Timer for the current running option segment, in minutes
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [repetisiInput, setRepetisiInput] = useState(0); // Input for reps in current segment

  const { katalogId: katalogIdParam } = useParams(); // Renamed to avoid conflict
  const navigate = useNavigate();

  // Ref to prevent multiple session start attempts for the same katalogId
  const isStartingSessionRef = useRef(false);
  const hasAttemptedLoadRef = useRef(false);


  const setupCurrentOpsiState = useCallback((latihanData) => {
    if (
      latihanData &&
      latihanData.progressLatihan &&
      latihanData.progressLatihan.length > 0 &&
      latihanData.currentOpsiIndex >= 0 &&
      latihanData.currentOpsiIndex < latihanData.progressLatihan.length
    ) {
      const opsiProgress =
        latihanData.progressLatihan[latihanData.currentOpsiIndex];
      setCurrentOpsiProgress(opsiProgress);

      const opsiDetailData = latihanData.katalogLatihan?.opsiLatihan?.find(
        (o) => o.id === opsiProgress.opsiId
      );
      setCurrentOpsiDetail(opsiDetailData || null);
      
      // Set initial repetisi input based on current progress if needed, or reset
      setRepetisiInput(0); // Typically reset for new input segment

      if (opsiProgress.sedangBerjalan && opsiProgress.waktuMulai) {
        setIsTimerRunning(true);
        const startTime = new Date(opsiProgress.waktuMulai);
        const elapsedSeconds = Math.floor((new Date() - startTime) / 1000);
        setTimer(Math.floor(elapsedSeconds / 60)); // Display timer in minutes
      } else {
        setIsTimerRunning(false);
        setTimer(opsiProgress.durasi ? Math.floor(opsiProgress.durasi / 60) : 0); // Show accumulated minutes if not running
      }
    } else {
      setCurrentOpsiProgress(null);
      setCurrentOpsiDetail(null);
      setIsTimerRunning(false);
      setTimer(0);
      // If all options are done (index out of bounds or status COMPLETED)
      if (latihanData?.status === "COMPLETED" || 
          (latihanData && latihanData.currentOpsiIndex >= latihanData.progressLatihan?.length)) {
        // Handled by navigation or "Semua latihan selesai!" message
      }
    }
  }, []);


  useEffect(() => {
    const loadLatihan = async () => {
      if (hasAttemptedLoadRef.current && katalogIdParam === loadLatihan.lastKatalogId) return;
      
      hasAttemptedLoadRef.current = true;
      loadLatihan.lastKatalogId = katalogIdParam;

      setLoading(true);
      setError("");

      try {
        if (!katalogIdParam) {
          // No katalogId in URL, try to fetch an ongoing latihan
          const ongoingResponse = await api.get("/atlet/latihan/ongoing");
          if (ongoingResponse.data) {
            setLatihan(ongoingResponse.data);
            setupCurrentOpsiState(ongoingResponse.data);
          } else {
            setError(
              "Tidak ada latihan yang sedang berlangsung. Silakan pilih katalog latihan."
            );
            // Consider navigating after a delay or showing a button
             setTimeout(() => navigate("/atlet/catalog"), 3000);
          }
        } else {
          // KatalogId is present in URL, attempt to start a new latihan
          if (isStartingSessionRef.current) {
            setLoading(false); // Already attempting, prevent re-entry
            return;
          }
          isStartingSessionRef.current = true;

          try {
            const response = await api.post(
              `/atlet/latihan/${katalogIdParam}/start`
            );
            setLatihan(response.data);
            setupCurrentOpsiState(response.data);
          } catch (err) {
            if (err.response?.status === 400) {
              // This might mean an ongoing session already exists (due to race or previous attempt)
              setError(
                err.response.data.message +
                  " Mencoba memuat latihan yang ada..."
              );
              // Attempt to fetch the ongoing session
              const ongoingResponse = await api.get("/atlet/latihan/ongoing");
              if (ongoingResponse.data) {
                 // Check if the ongoing session matches the one we tried to start, or if it's a different one
                if (ongoingResponse.data.katalogLatihanId === parseInt(katalogIdParam)) {
                    setLatihan(ongoingResponse.data);
                    setupCurrentOpsiState(ongoingResponse.data);
                    setError(""); // Clear error, successfully loaded the existing session
                } else {
                    setLatihan(ongoingResponse.data);
                    setupCurrentOpsiState(ongoingResponse.data);
                    setError("Anda sudah memiliki sesi latihan lain yang sedang berlangsung. Silakan selesaikan atau batalkan terlebih dahulu.");
                }
              } else {
                // Failed to load ongoing, stick with original 400 error or navigate
                 setError(err.response.data.message + " Gagal memuat latihan yang ada.");
                 setTimeout(() => navigate("/atlet/catalog"), 3000);
              }
            } else {
              setError(
                err.response?.data?.message || "Gagal memulai latihan baru."
              );
            }
          } finally {
            isStartingSessionRef.current = false;
          }
        }
      } catch (generalError) {
        setError(
          generalError.response?.data?.message ||
            "Terjadi kesalahan saat memuat data latihan."
        );
      } finally {
        setLoading(false);
      }
    };

    loadLatihan();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [katalogIdParam, navigate, setupCurrentOpsiState]);
  
  // Effect for the live timer when an option is running
  useEffect(() => {
    let intervalId;
    if (isTimerRunning && currentOpsiProgress?.sedangBerjalan && currentOpsiProgress?.waktuMulai) {
      intervalId = setInterval(() => {
        const startTime = new Date(currentOpsiProgress.waktuMulai);
        const elapsedSeconds = Math.floor((new Date() - startTime) / 1000);
        setTimer(Math.floor(elapsedSeconds / 60)); // Update timer in minutes
      }, 10000); // Update timer display every 10 seconds for responsiveness, still based on minutes
    }
    return () => clearInterval(intervalId);
  }, [isTimerRunning, currentOpsiProgress]);


  const handleStartCurrentOpsi = async () => {
    if (!latihan?.id || !currentOpsiProgress || currentOpsiProgress.sedangBerjalan) return;
    try {
      setError("");
      const response = await api.post(
        `/atlet/latihan/${latihan.id}/opsi/start`
      );
      setLatihan(response.data); // Backend returns the full updated LatihanAtlet
      setupCurrentOpsiState(response.data); // This will correctly set timer and isTimerRunning
      setRepetisiInput(0); // Reset input field for the new option
    } catch (err) {
      setError(err.response?.data?.message || "Gagal memulai opsi latihan.");
    }
  };

  const handleUpdateProgress = async (forceComplete = false) => {
    if (!latihan?.id || !currentOpsiProgress || !currentOpsiProgress.sedangBerjalan) return;
    try {
      setError("");
      const response = await api.put(
        `/atlet/latihan/${latihan.id}/progress`,
        {
          repetisi: repetisiInput, // Send the reps done in this specific attempt/segment
          forceComplete: forceComplete,
        }
      );
      setLatihan(response.data);

      if (response.data.status === "COMPLETED") {
        navigate("/atlet/latihan/history");
      } else {
        setupCurrentOpsiState(response.data); // Setup for next or current (if not completed)
        setRepetisiInput(0); // Reset input field for the next segment
      }
    } catch (err) {
      setError(err.response?.data?.message || "Gagal memperbarui progress.");
    }
  };

  const handleRepetisiInputChange = (e) => {
    setRepetisiInput(parseInt(e.target.value, 10) || 0);
  };

  if (loading) {
    return (
      <Container className="py-4 text-center">
        <Spinner animation="border" variant="primary" />
        <p>Memuat data latihan...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-4">
        <Alert variant="danger">{error}</Alert>
        <Button onClick={() => navigate("/atlet/catalog")} variant="secondary">Kembali ke Katalog</Button>
      </Container>
    );
  }

  if (!latihan || !latihan.katalogLatihan) {
    return (
      <Container className="py-4">
        <Alert variant="info">Tidak ada data latihan yang dapat ditampilkan.</Alert>
         <Button onClick={() => navigate("/atlet/catalog")} variant="primary">Pilih Latihan dari Katalog</Button>
      </Container>
    );
  }

  // Overall progress for the entire training plan
  const overallProgressPercent = latihan.progressLatihan?.length
    ? Math.round(
        (latihan.currentOpsiIndex / latihan.progressLatihan.length) * 100
      )
    : 0;
  
  const allOptionsCompleted = currentOpsiProgress === null && latihan.status !== 'COMPLETED' && latihan.currentOpsiIndex >= latihan.progressLatihan?.length;


  return (
    <Container className="py-4">
      <Card className="mb-4 shadow-sm">
        <Card.Header as="h4" className="bg-primary text-white">
          {latihan.katalogLatihan.nama}
        </Card.Header>
        <Card.Body>
          <div className="mb-3">
            <p className="mb-1">Progress Keseluruhan:</p>
            <ProgressBar
              now={overallProgressPercent}
              label={`${overallProgressPercent}%`}
              variant="success"
              animated
              className="mb-4"
            />
          </div>

          {currentOpsiDetail && currentOpsiProgress ? (
            <div>
              <h4>Latihan Saat Ini: {currentOpsiDetail.nama}</h4>
              <Row className="mb-3">
                <Col md={6}>
                  <Badge bg="info" className="me-2 p-2">
                    Target Durasi: {currentOpsiDetail.durasi || 0} menit
                  </Badge>
                  <Badge bg="primary" className="p-2">
                    Target Repetisi: {currentOpsiDetail.repetisi || 0}x
                  </Badge>
                </Col>
                 <Col md={6} className="text-md-end">
                    <Badge bg="secondary" className="p-2 me-2">
                        Total Durasi Tercapai (Opsi Ini): {Math.floor((currentOpsiProgress.durasi || 0) / 60)} menit
                    </Badge>
                     <Badge bg="secondary" className="p-2">
                        Total Repetisi Tercapai (Opsi Ini): {currentOpsiProgress.repetisi || 0}x
                    </Badge>
                </Col>
              </Row>

              {currentOpsiDetail.deskripsi && <p><strong>Deskripsi:</strong> {currentOpsiDetail.deskripsi}</p>}
              {currentOpsiDetail.target && <p><strong>Target Spesifik:</strong> {currentOpsiDetail.target}</p>}
              {currentOpsiDetail.instruksi && <p><strong>Instruksi:</strong> {currentOpsiDetail.instruksi}</p>}

              {!currentOpsiProgress.sedangBerjalan ? (
                <Button
                  variant="success"
                  onClick={handleStartCurrentOpsi}
                  className="mt-3 mb-3"
                  disabled={currentOpsiProgress.selesai}
                >
                  {currentOpsiProgress.selesai ? "Opsi Selesai" : `Mulai Opsi: ${currentOpsiDetail.nama}`}
                </Button>
              ) : (
                <div className="mt-3 p-3 border rounded bg-light">
                  <h5>Sedang Berjalan...</h5>
                  <p>Waktu berjalan (segmen ini): {timer} menit</p>
                  <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="4">
                      Repetisi Dilakukan (segmen ini):
                    </Form.Label>
                    <Col sm="8">
                      <Form.Control
                        type="number"
                        value={repetisiInput}
                        onChange={handleRepetisiInputChange}
                        min="0"
                        placeholder="Masukkan jumlah repetisi"
                      />
                    </Col>
                  </Form.Group>
                  <div className="d-flex flex-wrap gap-2">
                    <Button
                      variant="danger"
                      onClick={() => handleUpdateProgress(true)}
                    >
                      Selesaikan Opsi Ini
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ) : (
             allOptionsCompleted && (
            <div className="text-center">
              <h4>Semua opsi latihan dalam katalog ini telah selesai!</h4>
              <p>Anda akan diarahkan ke riwayat latihan.</p>
              <Button
                variant="primary"
                onClick={() => navigate("/atlet/latihan/history")}
                className="me-2"
              >
                Lihat Riwayat Latihan
              </Button>
              <Button
                variant="success"
                onClick={() =>
                  navigate(`/atlet/catalog`) // Go back to catalog list
                }
              >
                Pilih Latihan Lain
              </Button>
            </div>
            )
          )}
           {latihan.status === "COMPLETED" && (
             <div className="text-center mt-4 p-3 bg-success-subtle rounded">
                <h4>Latihan Telah Selesai!</h4>
                <p>Selamat, Anda telah menyelesaikan seluruh katalog latihan ini.</p>
                 <Button variant="info" onClick={() => navigate("/atlet/latihan/history")}>Lihat Riwayat</Button>
             </div>
           )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Latihan;
