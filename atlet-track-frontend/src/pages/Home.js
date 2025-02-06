// src/pages/Home.js
import React from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaUserShield, FaUserTie, FaRunning, FaChartLine, FaCalendarCheck, FaMedal } from 'react-icons/fa';
import heroImage from '../assets/bg-hero.jpg';

const Home = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="hero-section position-relative">
        <div className="hero-overlay"></div>
        <Container className="py-6">
          <Row className="align-items-center">
            <Col lg={6} className="mb-5 mb-lg-0 text-center text-lg-start">
              <h1 className="display-4 fw-bold text-white mb-4 animate__animated animate__fadeInUp">
                JejakAtlet
              </h1>
              <p className="lead text-white-50 mb-5 animate__animated animate__fadeInUp animate__delay-1s">
                Tingkatkan performa atletik Anda dengan platform pemantauan 
                dan pengelolaan yang modern dan komprehensif.
              </p>
              <div className="animate__animated animate__fadeInUp animate__delay-2s">
                <Button
                  as={Link}
                  to="/login/koordinator"
                  variant="light"
                  size="lg"
                  className="rounded-pill px-4 me-3"
                >
                  Mulai Sekarang
                </Button>
                <Button
                  as={Link}
                  to="/about"
                  variant="outline-light"
                  size="lg"
                  className="rounded-pill px-4"
                >
                  Pelajari Lebih Lanjut
                </Button>
              </div>
            </Col>
            <Col lg={6} className="d-none d-lg-block">
              <img
                src={heroImage}
                alt="Hero"
                className="img-fluid rounded-3 shadow-lg animate__animated animate__fadeInRight"
              />
            </Col>
          </Row>
        </Container>
      </section>

      {/* Bagian Fitur */}
      <section className="features-section py-6 bg-light">
        <Container>
          <Row className="text-center mb-5">
            <Col>
              <h6 className="text-primary fw-bold text-uppercase mb-3">Fitur Utama</h6>
              <h2 className="display-5 fw-bold mb-4">Mengapa Memilih JejakAtlet?</h2>
            </Col>
          </Row>
          <Row className="g-4">
            <Col md={4}>
              <Card className="feature-card border-0 h-100 shadow-sm">
                <Card.Body className="p-4">
                  <div className="feature-icon rounded-circle mb-4">
                    <FaChartLine className="text-primary" size={24} />
                  </div>
                  <h5 className="fw-bold mb-3">Analisis Performa</h5>
                  <p className="text-muted mb-0">
                    Pantau dan analisis perkembangan atlet dengan metrik yang terukur
                  </p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="feature-card border-0 h-100 shadow-sm">
                <Card.Body className="p-4">
                  <div className="feature-icon rounded-circle mb-4">
                    <FaCalendarCheck className="text-success" size={24} />
                  </div>
                  <h5 className="fw-bold mb-3">Manajemen Jadwal</h5>
                  <p className="text-muted mb-0">
                    Atur jadwal latihan dengan mudah dan efisien
                  </p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="feature-card border-0 h-100 shadow-sm">
                <Card.Body className="p-4">
                  <div className="feature-icon rounded-circle mb-4">
                    <FaMedal className="text-warning" size={24} />
                  </div>
                  <h5 className="fw-bold mb-3">Pencatatan Prestasi</h5>
                  <p className="text-muted mb-0">
                    Catat dan rayakan setiap pencapaian yang diraih
                  </p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Bagian Pilihan Login */}
      <section className="py-6">
        <Container>
          <Row className="g-4">
            <Col lg={4}>
              <Card className="login-card border-0 shadow-sm h-100 hover-lift">
                <Card.Body className="p-5 text-center">
                  <div className="icon-circle bg-primary-soft mb-4">
                    <FaRunning size={30} className="text-primary" />
                  </div>
                  <h4 className="fw-bold mb-3">Atlet</h4>
                  <p className="text-muted mb-4">
                    Akses jadwal latihan, evaluasi, dan pencapaian Anda
                  </p>
                  <Button as={Link} to="/login/atlet" variant="primary" className="rounded-pill px-4">
                    Masuk sebagai Atlet
                  </Button>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={4}>
              <Card className="login-card border-0 shadow-sm h-100 hover-lift">
                <Card.Body className="p-5 text-center">
                  <div className="icon-circle bg-success-soft mb-4">
                    <FaUserTie size={30} className="text-success" />
                  </div>
                  <h4 className="fw-bold mb-3">Koordinator</h4>
                  <p className="text-muted mb-4">
                    Kelola atlet dan program pelatihan dengan efektif
                  </p>
                  <Button as={Link} to="/login/koordinator" variant="success" className="rounded-pill px-4">
                    Masuk sebagai Koordinator
                  </Button>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={4}>
              <Card className="login-card border-0 shadow-sm h-100 hover-lift">
                <Card.Body className="p-5 text-center">
                  <div className="icon-circle bg-warning-soft mb-4">
                    <FaUserShield size={30} className="text-warning" />
                  </div>
                  <h4 className="fw-bold mb-3">Admin</h4>
                  <p className="text-muted mb-4">
                    Kelola sistem dan pantau aktivitas platform
                  </p>
                  <Button as={Link} to="/login/admin" variant="warning" className="rounded-pill px-4">
                    Masuk sebagai Admin
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Footer */}
      <footer className="footer py-5 bg-dark">
        <Container>
          <Row className="align-items-center">
            <Col md={6} className="text-center text-md-start mb-3 mb-md-0">
              <h5 className="text-white mb-2">JejakAtlet</h5>
              <p className="text-white-50 mb-0">
                Membantu atlet mencapai potensi terbaiknya
              </p>
            </Col>
          </Row>
        </Container>
      </footer>

      {/* Custom Styles */}
      <style>{`
        .hero-section {
          background: linear-gradient(135deg, #0061f2 0%, #00ba94 100%);
          min-height: 100vh;
          display: flex;
          align-items: center;
          position: relative;
        }

        .hero-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url('data:image/svg+xml,...') center center/cover;
          opacity: 0.1;
        }

        .feature-icon {
          width: 60px;
          height: 60px;
          background: #f8f9fa;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto;
        }

        .icon-circle {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto;
        }

        .bg-primary-soft { background-color: rgba(0, 97, 242, 0.1); }
        .bg-success-soft { background-color: rgba(0, 186, 148, 0.1); }
        .bg-warning-soft { background-color: rgba(255, 171, 0, 0.1); }

        .hover-lift {
          transition: transform 0.2s ease-in-out;
        }

        .hover-lift:hover {
          transform: translateY(-10px);
        }

        @media (min-width: 992px) {
          .hero-section {
            min-height: 80vh;
          }
        }

        .py-6 {
          padding-top: 5rem;
          padding-bottom: 5rem;
        }
      `}</style>
    </>
  );
};

export default Home;