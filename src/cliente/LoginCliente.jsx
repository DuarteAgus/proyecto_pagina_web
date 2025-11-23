import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { useAuth } from '@contexts/AuthContext';

export default function LoginCliente() {
  const navigate = useNavigate();
  const location = useLocation();
  const { loginCliente } = useAuth();

  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [showError, setShowError] = useState('');

  const searchParams = new URLSearchParams(location.search);
  const next = searchParams.get('next') || '/dashboard-cliente';

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowError('');

    if (!email.trim() || !pass.trim()) {
      setShowError('Ingresá tu email y contraseña para continuar.');
      return;
    }

    loginCliente(email.trim());
    navigate(next);
  };

  const irARegistro = () => {
    navigate('/registro');
  };

  return (
    <div className="inicio-bg">
      <section className="auth-page py-5 mt-4 mt-lg-5">
        <Container className="container-xxl">
          <Row className="g-4 g-xl-5 align-items-center">
            <Col lg={6}>
              <div className="auth-card">
                <h1 className="auth-title mb-1">Panel cliente</h1>
                <p className="auth-sub mb-4">
                  Iniciá sesión para ver tu plan, tus pagos y acceder a tu
                  NuCloud en la nube.
                </p>

                {showError && (
                  <Alert variant="danger" className="mb-3">
                    {showError}
                  </Alert>
                )}

                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3" controlId="clienteEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="cliente@nucloud.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group className="mb-4" controlId="clientePass">
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Tu contraseña"
                      value={pass}
                      onChange={(e) => setPass(e.target.value)}
                    />
                  </Form.Group>

                  <Button type="submit" className="btn-pink w-100">
                    Iniciar sesión
                  </Button>

                  <div className="text-white-50 mt-3 small text-center">
                    ¿No tenés cuenta?{' '}
                    <button
                      type="button"
                      onClick={irARegistro}
                      className="btn btn-link p-0 align-baseline text-decoration-none"
                    >
                      Registrate acá
                    </button>
                  </div>
                </Form>
              </div>
            </Col>
            <Col lg={6}>
              <div className="auth-hero-img text-center">
                <img
                  className="img-fluid rounded-4"
                  src="https://images.pexels.com/photos/9072380/pexels-photo-9072380.jpeg"
                  alt="Jugador en PC gamer"
                  loading="lazy"
                />
                <div className="mt-3 text-start text-white">
                  <h2 className="h4 fw-bold">Jugá desde cualquier lugar</h2>
                  <p className="mb-0 text-white-50 small">
                    Accedé a tu PC gamer en la nube, gestioná tu plan y tus
                    pagos desde un panel pensado para vos.
                  </p>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
}
