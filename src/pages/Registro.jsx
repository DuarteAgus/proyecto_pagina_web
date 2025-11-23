import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useAuth } from '@contexts/AuthContext';

export default function Registro() {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [pass2, setPass2] = useState('');
  const [acepta, setAcepta] = useState(false);
  const [error, setError] = useState('');
  const { LoginCliente } = useAuth();
  const navigate = useNavigate();

  const validar = () => {
    if (!nombre.trim()) return 'Ingresá tu nombre o alias.';
    if (!/^\S+@\S+\.\S+$/.test(email)) return 'Ingresá un email válido.';
    if (pass.length < 6) return 'La contraseña debe tener al menos 6 caracteres.';
    if (pass !== pass2) return 'Las contraseñas no coinciden.';
    if (!acepta) return 'Debés aceptar los Términos y Condiciones.';
    return '';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const msg = validar();
    if (msg) {
      setError(msg);
      return;
    }

    LoginCliente(email);

    navigate('/dashboard');
  };

  return (
    <div className="inicio-bg">
      <section className="auth-wrap">
        <Container className="container-xxl">
          <Row className="g-4 align-items-center">
            <Col lg={6}>
              <div className="auth-card">
                <h1 className="mb-1">Crear cuenta</h1>
                <p className="text-white-50 mb-4">
                  Unite a <strong>NuCloud Gaming</strong> y empezá a jugar en la nube.
                </p>

                <Form onSubmit={handleSubmit} noValidate>
                  <Form.Group className="mb-3">
                    <Form.Label>Nombre o alias</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Tu nombre"
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="tu@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Form.Group>

                  <Row className="g-3">
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Contraseña</Form.Label>
                        <Form.Control
                          type="password"
                          placeholder="••••••••"
                          value={pass}
                          onChange={(e) => setPass(e.target.value)}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Repetir contraseña</Form.Label>
                        <Form.Control
                          type="password"
                          placeholder="••••••••"
                          value={pass2}
                          onChange={(e) => setPass2(e.target.value)}
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Form.Group className="mb-3">
                    <Form.Check
                      type="checkbox"
                      id="acepta"
                      label={
                        <>
                          Acepto los{' '}
                          <a href="#" className="link-light">
                            Términos y Condiciones
                          </a>
                        </>
                      }
                      checked={acepta}
                      onChange={(e) => setAcepta(e.target.checked)}
                    />
                  </Form.Group>

                  {error && (
                    <div className="alert alert-danger py-2 px-3">{error}</div>
                  )}

                  <Button type="submit" className="btn-pink w-100 mt-1">
                    Crear cuenta
                  </Button>

                  <div className="text-white-50 mt-3 small">
                    ¿Ya tenés cuenta?{' '}
                    <Link to="/login-cliente" className="link-light">
                      Iniciar sesión
                    </Link>
                  </div>
                </Form>
              </div>
            </Col>

            <Col lg={6}>
              <div className="auth-hero">
                <img
                  src="https://blog.immunotec.com/wp-content/uploads/2023/08/Gamer.png"
                  alt="Registro NuCloud Gaming"
                  loading="lazy"
                />
                <div className="auth-hero-overlay" />
                <div className="auth-hero-copy">
                  <h2 className="mb-2">Jugá desde cualquier lugar</h2>
                  <p className="text-white-50 mb-0">
                    Activá tu cuenta, sumá tus bibliotecas y disfrutá AAA sin hardware
                    costoso.
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
