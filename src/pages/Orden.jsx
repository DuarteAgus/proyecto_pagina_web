import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { useAuth } from '@contexts/AuthContext';


const PLANES = {
  nebula: {
    id: 'nebula',
    nombre: 'NuCloud Gaming - Nebula',
    tituloCorto: 'Nebula',
    precio: 10000,
  },
  quantum: {
    id: 'quantum',
    nombre: 'NuCloud Gaming - Quantum',
    tituloCorto: 'Quantum',
    precio: 15000,
  },
  eclipse: {
    id: 'eclipse',
    nombre: 'NuCloud Gaming - Eclipse',
    tituloCorto: 'Eclipse',
    precio: 20000,
  },
};

const METODO_LABEL = {
  mercadopago: 'Mercado Pago',
  tarjeta: 'Tarjeta de crédito / débito',
  paypal: 'PayPal',
};

export default function Orden() {
  const { planId } = useParams();
  const navigate = useNavigate();
  const { is_logueado } = useAuth();

  const plan = PLANES[planId] || PLANES.nebula;

  const [dataCenter, setDataCenter] = useState('FRSBG01');
  const [teclado, setTeclado] = useState('QWERTY - Español');
  const [metodoPago, setMetodoPago] = useState('mercadopago');
  const [tarjetaAlias, setTarjetaAlias] = useState('');
  const [cupon, setCupon] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const tieneDescuento = cupon.trim().toUpperCase() === 'NUCLOUD20';
  const total = tieneDescuento ? Math.round(plan.precio * 0.8) : plan.precio;

  const handleConfirmarPago = (e) => {
    e.preventDefault();
    setErrorMsg('');
    setShowSuccess(false);

    if (!is_logueado) {
      navigate(`/login-cliente?next=/orden/${plan.id}`);
      return;
    }

    if (!tarjetaAlias.trim()) {
      setErrorMsg('Ingresá el número de tarjeta o un alias para continuar.');
      return;
    }

    try {
      const planContratado = {
        id: plan.id,
        nombre: plan.nombre,
        precio: total,
        dataCenter,
        teclado,
        metodoPago,
        metodoPagoTexto: METODO_LABEL[metodoPago] || metodoPago,
        fechaContratacion: new Date().toISOString(),
      };

      localStorage.setItem(
        'nucloud_plan_cliente',
        JSON.stringify(planContratado)
      );

      const actividad = {
        tipo: 'contratacion',
        planNombre: plan.nombre,
        precio: total,
        metodoPago: METODO_LABEL[metodoPago] || metodoPago,
        dataCenter,
        fecha: new Date().toISOString(),
      };

      localStorage.setItem(
        'nucloud_actividad_reciente',
        JSON.stringify(actividad)
      );
    } catch (err) {
      console.error('No se pudo guardar info en localStorage', err);
    }
 
    setShowSuccess(true);

    setTimeout(() => {
      navigate('/dashboard-cliente');
    }, 2500);
  };

  const irALoginCliente = () => {
    navigate(`/login-cliente?next=/orden/${plan.id}`);
  };

  const irARegistro = () => {
    navigate('/registro');
  };

  return (
    <div className="inicio-bg py-5 orden-page">
      <Container className="container-xxl">
        <Row className="justify-content-center">
          <Col lg={9} xl={8}>
            <h1 className="text-white h4 mb-4">{plan.nombre}</h1>
          </Col>
        </Row>

        <Row className="g-4">
          <Col lg={9} xl={8}>
            <Card className="bg-dark border-0 shadow-sm orden-card">
              <Card.Body className="p-4">
                <div className="mb-4">
                  <ul className="text-white-50 small mb-0 orden-specs">
                    <li>AMD EPYC 3.25GHz 8vCores</li>
                    <li>1 Gb/s de ancho de banda descendente</li>
                    <li>NVIDIA RTX 2000 ADA 16GB</li>
                    <li>Windows 11 Home</li>
                    <li>16 GB RAM</li>
                    <li>D: 0 GB HDD</li>
                    <li>C: 512 GB SSD</li>
                    <li>QWERTY - Español</li>
                  </ul>
                </div>

                <Form onSubmit={handleConfirmarPago}>
                  <Row className="g-3">
                    <Col md={6}>
                      <Form.Group controlId="ordenDataCenter">
                        <Form.Label className="text-white-50 small">
                          Centro de datos
                        </Form.Label>
                        <Form.Select
                          value={dataCenter}
                          onChange={(e) => setDataCenter(e.target.value)}
                          className="bg-dark text-white border-secondary"
                        >
                          <option value="FRSBG01">FRSBG01</option>
                          <option value="DEBER01">DEBER01</option>
                          <option value="USNYC01">USNYC01</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>

                    <Col md={6}>
                      <Form.Group controlId="ordenTeclado">
                        <Form.Label className="text-white-50 small">
                          Idioma del teclado
                        </Form.Label>
                        <Form.Select
                          value={teclado}
                          onChange={(e) => setTeclado(e.target.value)}
                          className="bg-dark text-white border-secondary"
                        >
                          <option>QWERTY - Español</option>
                          <option>QWERTY - English (US)</option>
                          <option>AZERTY - Français</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group controlId="ordenMetodoPago">
                        <Form.Label className="text-white-50 small">
                          Método de pago
                        </Form.Label>
                        <Form.Select
                          value={metodoPago}
                          onChange={(e) => setMetodoPago(e.target.value)}
                          className="bg-dark text-white border-secondary"
                        >
                          <option value="mercadopago">Mercado Pago</option>
                          <option value="tarjeta">
                            Tarjeta de crédito / débito
                          </option>
                          <option value="paypal">PayPal</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group controlId="ordenTarjetaAlias">
                        <Form.Label className="text-white-50 small">
                          Número de tarjeta / Alias
                        </Form.Label>
                        <Form.Control
                          type="text"
                          value={tarjetaAlias}
                          onChange={(e) => setTarjetaAlias(e.target.value)}
                          className="bg-dark text-white border-secondary"
                          placeholder="Ej: 1234 5678 9012 3456 o ALIAS.MP"
                        />
                      </Form.Group>
                    </Col>

                    <Col md={12}>
                      <Form.Group controlId="ordenCupon">
                        <Form.Label className="text-white-50 small">
                          Cupón o código de referido
                        </Form.Label>
                        <Form.Control
                          type="text"
                          value={cupon}
                          onChange={(e) => setCupon(e.target.value)}
                          className="bg-dark text-white border-secondary orden-cupon-input"
                          placeholder="Ingresá tu cupón (ej: NUCLOUD20)"
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <div className="mt-3">
                    {errorMsg && (
                      <Alert variant="danger" className="py-2 mb-2">
                        {errorMsg}
                      </Alert>
                    )}
                    {showSuccess && (
                      <Alert variant="success" className="py-2 mb-0 orden-exito-texto">
                        ¡Listo! Tu plan <strong>{plan.tituloCorto}</strong> fue
                        contratado con éxito. En unos segundos te llevamos a tu
                        panel de cliente.
                      </Alert>
                    )}
                  </div>

                  <div className="mt-4 d-flex justify-content-end">
                    <Button type="submit" className="btn-pink px-4 btn-confirmar-pago">
                      Confirmar pago
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={3} xl={4}>
            <Card className="bg-dark border-0 shadow-sm h-100 orden-resumen-card">
              <Card.Body className="d-flex flex-column justify-content-between">
                <div>
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="text-white-50 small">NuCloud Gaming</span>
                    <span className="text-white fw-bold">
                      {plan.precio.toLocaleString('es-AR')} ARS
                    </span>
                  </div>

                  <div className="text-white-50 small mb-3">mensual</div>

                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="text-white-50 small">Data Center</span>
                    <span className="text-white-50 small">{dataCenter}</span>
                  </div>

                  <hr className="border-secondary" />

                  <div className="d-flex justify-content-between align-items-center mb-1">
                    <span className="orden-resumen-total-label">Total</span>
                    <span className="orden-resumen-total-monto text-white">
                      {total.toLocaleString('es-AR')} ARS
                    </span>
                  </div>

                  {tieneDescuento && (
                    <div className="text-success small">
                      Cupón NUCLOUD20 aplicado · 20% OFF
                    </div>
                  )}
                </div>

                <div className="mt-4">
                  <Button
                    className="btn-pink w-100 mb-2"
                    onClick={handleConfirmarPago}
                  >
                    Confirmar pago
                  </Button>

                  <Button
                    variant="dark"
                    className="w-100 mb-2 border-secondary"
                    onClick={irALoginCliente}
                  >
                    Iniciar sesión
                  </Button>

                  <Button
                    variant="outline-light"
                    className="w-100"
                    onClick={irARegistro}
                  >
                    Crear cuenta
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
