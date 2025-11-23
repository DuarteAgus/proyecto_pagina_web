import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@contexts/AuthContext';

export default function DashboardAdmin() {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="inicio-bg admin-page">
      <Container className="container-xxl pb-5">
        <header className="mb-3 mt-2">
          <div className="mb-3">
            <span className="badge text-bg-dark border border-pink fw-normal">
              Panel administrativo
            </span>
          </div>

          <h1 className="text-white mb-2 admin-title">
            Bienvenido,{' '}
            <span className="text-pink">
              {user?.email || 'admin@nucloud.com'}
            </span>
          </h1>

          <p className="text-white-50 mb-1">
            Desde este panel vas a poder revisar clientes y suscripciones,
            ajustar planes y precios, y mantener actualizado el catálogo de
            juegos de <strong>NuCloud Gaming</strong>.
          </p>
          <p className="text-white-50 small mb-0">
            Elegí una de las secciones de abajo para comenzar.
          </p>
        </header>

        <div className="admin-hero-img-wrapper mb-5">
          <img
            src="https://www.tictronik.com/wp-content/uploads/2022/10/setup-gammer.jpg"
            alt="Panel administrador NuCloud Gaming"
            className="admin-hero-img"
            loading="lazy"
          />
          <div className="admin-hero-overlay" />
        </div>

        <Row className="g-4">
          <Col md={4}>
            <div className="admin-option-card h-100">
              <div className="admin-option-pill">CLIENTES</div>
              <Card
                className="admin-option-card-inner h-100"
                onClick={() => navigate('/admin/clientes')}
              >
                <Card.Body className="d-flex flex-column">
                  <Card.Title className="mb-2 text-white">
                    Clientes y suscripciones
                  </Card.Title>
                  <Card.Text className="text-muted small flex-grow-1">
                    Ver quién tiene plan vigente, quién debe pagos y quién
                    todavía no contrató NuCloud Gaming.
                  </Card.Text>
                  <Button className="btn-pink w-100 mt-3">
                    Ver clientes
                  </Button>
                </Card.Body>
              </Card>
            </div>
          </Col>

          <Col md={4}>
            <div className="admin-option-card h-100">
              <div className="admin-option-pill">PLANES</div>
              <Card
                className="admin-option-card-inner h-100"
                onClick={() => navigate('/admin/planes')}
              >
                <Card.Body className="d-flex flex-column">
                  <Card.Title className="mb-2 text-white">
                    Planes y precios
                  </Card.Title>
                  <Card.Text className="text-muted small flex-grow-1">
                    Consultá y ajustá precios, duración y estado de los planes
                    (Nebula, Quantum, Eclipse o los que definas en el TP).
                  </Card.Text>
                  <Button className="btn-pink w-100 mt-3">
                    Gestionar planes
                  </Button>
                </Card.Body>
              </Card>
            </div>
          </Col>
          <Col md={4}>
            <div className="admin-option-card h-100">
              <div className="admin-option-pill">CATÁLOGO</div>
              <Card
                className="admin-option-card-inner h-100"
                onClick={() => navigate('/admin/juegos')}
              >
                <Card.Body className="d-flex flex-column">
                  <Card.Title className="mb-2 text-white">
                    Gestión de juegos
                  </Card.Title>
                  <Card.Text className="text-muted small flex-grow-1">
                    Cambiá carátulas, títulos y descripciones de los juegos que
                    aparecen en la sección <strong>Juegos</strong>.
                  </Card.Text>
                  <Button className="btn-pink w-100 mt-3">
                    Editar juegos
                  </Button>
                </Card.Body>
              </Card>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
