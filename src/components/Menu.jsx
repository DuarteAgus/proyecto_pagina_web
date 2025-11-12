// Menu.jsx
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@contexts/AuthContext';
import { Button } from 'react-bootstrap';

export default function Menu() {
  const { is_logueado, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
    navigate('/logout');
  };

  return (
    <Navbar expand="lg" className="bg-transparent topbar-abs" data-bs-theme="dark">
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold text-white">
          NuCloud Gaming
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/" className="text-white-50">Inicio</Nav.Link>
            <Nav.Link as={Link} to="/juegos" className="text-white-50">Juegos</Nav.Link>
            <Nav.Link as={Link} to="/ofertas" className="text-white-50">Ofertas</Nav.Link>
          </Nav>

          <div className="d-flex align-items-center gap-3 mt-3 mt-lg-0">
            <Button as={Link} to="/empezar" size="sm" className="btn-pink">
              Empieza ahora
            </Button>

            <NavDropdown title="Cuenta" id="basic-nav-dropdown" align="end" menuVariant="dark">
              {is_logueado ? (
                <>
                  <NavDropdown.Item as={Link} to="/dashboard">Dashboard</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={handleLogout}>Cerrar sesión</NavDropdown.Item>
                </>
              ) : (
                <>
                  <NavDropdown.Item as={Link} to="/login">Iniciar sesión</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/registro">Registrarse</NavDropdown.Item>
                </>
              )}
            </NavDropdown>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
