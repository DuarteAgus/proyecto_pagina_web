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

 const handleLogout = (e) =>{
       e.preventDefault();
       logout();
       navigate("/logout");
   }

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand as={Link} to="/">NuCloud Gaming</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Inicio</Nav.Link>
            <Nav.Link as={Link} to="/juegos">Ofertas</Nav.Link>
            <Nav.Link as={Link} to="/nosotros">Sobre Nosotros</Nav.Link>

            <NavDropdown title="Empezar ahora" id="basic-nav-dropdown">
              {is_logueado ? (
                <>
                  <NavDropdown.Item as={Link} to="/dashboard">Dashboard</NavDropdown.Item>
                  <NavDropdown.Item onClick={handleLogout}>Cerrar sesión</NavDropdown.Item>
                </>
              ) : (
                <>
                  <NavDropdown.Item as={Link} to="/login">Iniciar sesión</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/registro">Registrarse</NavDropdown.Item>
                </>
              )}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
