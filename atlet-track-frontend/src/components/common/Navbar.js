// src/components/common/Navbar.js
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import {
  Navbar as BootstrapNavbar,
  Nav,
  NavDropdown,
  Container,
  Button,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faEnvelope,
  faChartLine,
  faTasks,
  faTachometerAlt,
  faUsers,
  faHistory,
  faRunning,
  faClipboardCheck,
  faComments,
  faTrophy,
  faUserCircle,
  faSignOutAlt,
  faBook,
  faList,
} from "@fortawesome/free-solid-svg-icons";
import "./Navbar.css";

const Navbar = () => {
  const { auth, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <BootstrapNavbar
      bg="white"
      variant="light"
      expand="lg"
      fixed="top"
      className="navbar-modern shadow-sm py-2"
      expanded={expanded}
      onToggle={() => setExpanded(!expanded)}>
      <Container>
        <BootstrapNavbar.Brand as={Link} to="/" className="brand-logo">
          <FontAwesomeIcon icon={faRunning} className="me-2 text-primary" />
          <span className="fw-bold">JejakAtlet</span>
        </BootstrapNavbar.Brand>

        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          {auth.token && (
            <Nav className="me-auto">
              {auth.role === "admin" && (
                <>
                  <Nav.Link
                    as={Link}
                    to="/admin/dashboard"
                    className="nav-link-custom">
                    <FontAwesomeIcon icon={faTachometerAlt} className="me-2" />
                    Beranda
                  </Nav.Link>
                  <Nav.Link
                    as={Link}
                    to="/admin/koordinators"
                    className="nav-link-custom">
                    <FontAwesomeIcon icon={faUsers} className="me-2" />
                    Koordinator
                  </Nav.Link>
                  <Nav.Link
                    as={Link}
                    to="/admin/activity-logs"
                    className="nav-link-custom">
                    <FontAwesomeIcon icon={faHistory} className="me-2" />
                    Riwayat Aktivitas
                  </Nav.Link>
                </>
              )}
              {auth.role === "koordinator" && (
                <>
                  {/* Dashboard Link */}
                  <NavDropdown
                    title={
                      <>
                        <FontAwesomeIcon
                          icon={faTachometerAlt}
                          className="me-2"
                        />
                        Beranda
                      </>
                    }
                    className="nav-dropdown-custom">
                    <NavDropdown.Item as={Link} to="/koordinator/dashboard">
                      <FontAwesomeIcon icon={faHome} className="me-2" />
                      Dashboard
                    </NavDropdown.Item>
                  </NavDropdown>

                  {/* Athletes Management Dropdown */}
                  <NavDropdown
                    title={
                      <>
                        <FontAwesomeIcon icon={faRunning} className="me-2" />
                        Manajemen Atlet
                      </>
                    }
                    className="nav-dropdown-custom">
                    <NavDropdown.Item as={Link} to="/koordinator/atlets">
                      <FontAwesomeIcon icon={faUsers} className="me-2" />
                      Data Atlet
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/koordinator/analytics">
                      <FontAwesomeIcon icon={faChartLine} className="me-2" />
                      Performa
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      as={Link}
                      to="/koordinator/evaluasi-atlet">
                      <FontAwesomeIcon
                        icon={faClipboardCheck}
                        className="me-2"
                      />
                      Evaluasi
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/koordinator/pencapaian">
                      <FontAwesomeIcon icon={faTrophy} className="me-2" />
                      Pencapaian
                    </NavDropdown.Item>
                  </NavDropdown>

                  {/* Training Management Dropdown */}
                  <NavDropdown
                    title={
                      <>
                        <FontAwesomeIcon icon={faBook} className="me-2" />
                        Program Latihan
                      </>
                    }
                    className="nav-dropdown-custom">
                    <NavDropdown.Item
                      as={Link}
                      to="/koordinator/katalog-latihan">
                      <FontAwesomeIcon icon={faList} className="me-2" />
                      Katalog Latihan
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/koordinator/opsi-latihan">
                      <FontAwesomeIcon icon={faTasks} className="me-2" />
                      Opsi Latihan
                    </NavDropdown.Item>
                  </NavDropdown>

                  {/* Communication Dropdown */}
                  <NavDropdown
                    title={
                      <>
                        <FontAwesomeIcon icon={faComments} className="me-2" />
                        Komunikasi
                      </>
                    }
                    className="nav-dropdown-custom">
                    <NavDropdown.Item as={Link} to="/koordinator/pesan-atlet">
                      <FontAwesomeIcon icon={faEnvelope} className="me-2" />
                      Pesan
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              )}
              {auth.role === "atlet" && (
                <>
                  <Nav.Link
                    as={Link}
                    to="/atlet/dashboard"
                    className="nav-link-custom">
                    <FontAwesomeIcon icon={faTachometerAlt} className="me-2" />
                    Beranda
                  </Nav.Link>
                  <Nav.Link
                    as={Link}
                    to="/atlet/catalog"
                    className="nav-link-custom">
                    <FontAwesomeIcon icon={faBook} className="me-2" />
                    Katalog Latihan
                  </Nav.Link>
                  <Nav.Link
                    as={Link}
                    to="/atlet/latihan/history"
                    className="nav-link-custom">
                    <FontAwesomeIcon icon={faHistory} className="me-2" />
                    Riwayat Latihan
                  </Nav.Link>
                  <Nav.Link
                    as={Link}
                    to="/atlet/evaluations"
                    className="nav-link-custom">
                    <FontAwesomeIcon icon={faClipboardCheck} className="me-2" />
                    Evaluasi
                  </Nav.Link>
                  <Nav.Link
                    as={Link}
                    to="/atlet/profile"
                    className="nav-link-custom">
                    <FontAwesomeIcon icon={faUserCircle} className="me-2" />
                    Profil
                  </Nav.Link>
                  <Nav.Link
                    as={Link}
                    to="/atlet/achivement"
                    className="nav-link-custom">
                    <FontAwesomeIcon icon={faTrophy} className="me-2" />
                    Pencapaian
                  </Nav.Link>
                  <Nav.Link
                    as={Link}
                    to="/atlet/communication"
                    className="nav-link-custom">
                    <FontAwesomeIcon icon={faComments} className="me-2" />
                    Komunikasi
                  </Nav.Link>
                </>
              )}
            </Nav>
          )}
          <Nav>
            {auth.token ? (
              <Button
                variant="outline-primary"
                onClick={handleLogout}
                className="logout-btn">
                <FontAwesomeIcon icon={faSignOutAlt} className="me-2" />
                Keluar
              </Button>
            ) : (
              <Nav.Link as={Link} to="/" className="nav-link-custom">
                <FontAwesomeIcon icon={faHome} className="me-2" />
                Beranda
              </Nav.Link>
            )}
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
};

export default Navbar;
