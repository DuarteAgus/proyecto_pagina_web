import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import './Ofertas.css';

const PLANES = [
  {
    id: 'nebula',
    titulo: 'PLAN NEBULA',
    precio: 10000,
    desc:
      'Ideal para jugadores casuales: 60 fps estables en 1080p y sesiones diarias con consumo optimizado.',
    features: ['Catálogo base', 'Soporte estándar', '1 dispositivo a la vez'],
  },
  {
    id: 'quantum',
    titulo: 'PLAN QUANTUM',
    precio: 15000,
    desc:
      'Pensado para gamers exigentes: 120 fps en 1080p / 60 fps en 1440p, priorización de red y colas rápidas.',
    features: ['Catálogo completo', 'Soporte prioritario', 'Hasta 2 dispositivos simultáneos'],
  },
  {
    id: 'eclipse',
    titulo: 'PLAN ECLIPSE',
    precio: 20000,
    desc:
      'Lo máximo para streamers: 4K HDR, servidores premium y soporte dedicado 24/7.',
    features: ['Catálogo + DLCs selectos', 'Soporte dedicado', 'Hasta 3 dispositivos simultáneos'],
  },
];

export default function Ofertas() {
  const navigate = useNavigate();

  return (
    <div className="inicio-bg">
      <section className="of-hero of-hero-lg">
        <Container className="container-xxl">
          <h1 className="of-title mb-3">Una experiencia gamer de otro nivel</h1>
          <p className="of-desc">
            Elegí el plan que mejor se adapte a tu estilo. Baja latencia, gráficos fluidos y hasta 4K.
          </p>
        </Container>
      </section>

      <section className="of-section">
        <Container className="container-xxl">
          <Row className="g-4 g-xl-5">
            {PLANES.map(p => (
              <Col key={p.id} md={6} lg={4}>
                <Card className="of-card of-dark border-0 position-relative">
                  <div className="of-price fw-700">
                    {p.precio.toLocaleString('es-AR')} ARS / mes
                  </div>

                  <Card.Body>
                    <Card.Title className="of-title fw-800 mb-2 text-white">
                      {p.titulo}
                    </Card.Title>

                    <Card.Text className="of-sub mb-3">
                      {p.desc}
                    </Card.Text>

                    <ul className="of-features mb-4">
                      {p.features.map((f, i) => <li key={i}>{f}</li>)}
                    </ul>

                    <Button
                      className="btn-pink w-100"
                      onClick={() => navigate(`/orden/${p.id}`)}
                    >
                      Ordenar ahora
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </div>
  );
}
