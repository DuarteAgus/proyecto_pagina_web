import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { useAuth } from '@contexts/AuthContext';

export default function LoginAdmin() {
  const navigate = useNavigate();
  const { loginAdmin } = useAuth();
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [showError, setShowError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowError('');

    if (!email.trim() || !pass.trim()) {
      setShowError('Ingresá usuario y contraseña de administrador.');
      return;
    }

    loginAdmin(email.trim());
    navigate('/dashboard-admin');
  };

  return (
    <div className="inicio-bg">
      <section className="auth-page py-5 mt-4 mt-lg-5">
        <Container className="container-xxl">
          <Row className="g-4 g-xl-5 align-items-center">
            <Col lg={6}>
              <div className="auth-card">
                <h1 className="auth-title mb-1">Panel administrativo</h1>
                <p className="auth-sub mb-4">
                  Ingresá para gestionar juegos, planes, medios de pago y
                  clientes de NuCloud Gaming.
                </p>

                {showError && (
                  <Alert variant="danger" className="mb-3">
                    {showError}
                  </Alert>
                )}

                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3" controlId="adminEmail">
                    <Form.Label>Email administrador</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="admin@nucloud.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group className="mb-4" controlId="adminPass">
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Tu contraseña"
                      value={pass}
                      onChange={(e) => setPass(e.target.value)}
                    />
                  </Form.Group>

                  <Button type="submit" className="btn-pink w-100">
                    Iniciar sesión admin
                  </Button>

                  <div className="text-white-50 mt-3 small">
                    Acceso reservado al equipo de administración de la
                    plataforma.
                  </div>
                </Form>
              </div>
            </Col>

            <Col lg={6}>
              <div className="auth-hero-img text-center">
                <img
                  className="img-fluid rounded-4"
                  src="https://images.pexels.com/photos/9071738/pexels-photo-9071738.jpeg"
                  alt="Panel administrador"
                  loading="lazy"
                />
                <div className="mt-3 text-start text-white">
                  <h2 className="h4 fw-bold">Controlá tu plataforma</h2>
                  <p className="mb-0 text-white-50 small">
                    Actualizá catálogos de juegos, ajustá precios de planes y
                    revisá el estado de las suscripciones desde un solo lugar.
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
