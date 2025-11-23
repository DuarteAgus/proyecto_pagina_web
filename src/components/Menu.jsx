import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '@contexts/AuthContext';

export default function Menu() {
  const { is_logueado, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
    navigate('/');
  };

  const linkClass = ({ isActive }) =>
    `nav-link ${isActive ? 'active fw-semibold' : ''}`;

  return (
    <Navbar
      expand="lg"
      bg="dark"
      data-bs-theme="dark"
      className="shadow-sm topbar-abs"
    >
      <Container fluid className="container-xxl">
        <Navbar.Brand as={Link} to="/" className="fw-bold text-pink">
          NuCloud Gaming
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/" end className={linkClass}>
              Inicio
            </Nav.Link>
            <Nav.Link as={NavLink} to="/juegos" className={linkClass}>
              Juegos
            </Nav.Link>
            <Nav.Link as={NavLink} to="/ofertas" className={linkClass}>
              Ofertas
            </Nav.Link>
          </Nav>

          <div className="d-flex align-items-center gap-3 mt-3 mt-lg-0">
            <Button as={Link} to="/ofertas" size="sm" className="btn-pink">
              Empieza ahora
            </Button>

            <NavDropdown
              title="Cuenta"
              id="cuenta-dropdown"
              align="end"
              menuVariant="dark"
            >
              {!is_logueado ? (
                <>
                  <NavDropdown.Item as={Link} to="/login-cliente">
                    Portal cliente
                  </NavDropdown.Item>

                  <NavDropdown.Item as={Link} to="/login-admin">
                    Portal admin
                  </NavDropdown.Item>

                  <NavDropdown.Divider />

                  <NavDropdown.Item as={Link} to="/registro">
                    Registrarse
                  </NavDropdown.Item>
                </>
              ) : (
                <>
                  <NavDropdown.Header>
                    {user?.role === 'admin' ? 'Administrador' : 'Cliente'}
                    {user?.email && ` · ${user.email}`}
                  </NavDropdown.Header>

                  {user?.role === 'admin' && (
                    <NavDropdown.Item as={Link} to="/dashboard-admin">
                      Dashboard admin
                    </NavDropdown.Item>
                  )}

                  {user?.role === 'cliente' && (
                    <NavDropdown.Item as={Link} to="/dashboard-cliente">
                      Mi panel
                    </NavDropdown.Item>
                  )}

                  <NavDropdown.Divider />

                  <NavDropdown.Item onClick={handleLogout}>
                    Cerrar sesión
                  </NavDropdown.Item>
                </>
              )}
            </NavDropdown>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
