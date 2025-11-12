import { useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

const PLANES = {
  nebula: {
    nombre: 'Shadow PC – Nebula',
    precio: 10000,
    specs: [
      'AMD EPYC 3.25GHz 8vCores',
      '1 Gb/s de ancho de banda descendente',
      'NVIDIA RTX 2000 ADA 16GB',
      'Windows 11 Home',
      '16 GB RAM',
      'D: 0 GB HDD',
      'C: 512 GB SSD',
      'QWERTY – Español',
    ],
  },
  quantum: {
    nombre: 'Shadow PC – Quantum',
    precio: 15000,
    specs: [
      'AMD EPYC 3.5GHz 8vCores',
      '1 Gb/s de ancho de banda descendente',
      'NVIDIA RTX 4000 20GB',
      'Windows 11 Home',
      '24 GB RAM',
      'D: 0 GB HDD',
      'C: 1 TB SSD',
      'QWERTY – Español',
    ],
  },
  eclipse: {
    nombre: 'Shadow PC – Eclipse',
    precio: 20000,
    specs: [
      'AMD EPYC 3.8GHz 12vCores',
      '1 Gb/s de ancho de banda descendente',
      'NVIDIA RTX 5000 24GB',
      'Windows 11 Home',
      '32 GB RAM',
      'D: 0 GB HDD',
      'C: 1 TB SSD',
      'QWERTY – Español',
    ],
  },
};

export default function Orden() {
  const { planId } = useParams();
  const navigate = useNavigate();
  const [datacenter, setDatacenter] = useState('frsbg01');
  const [cupon, setCupon] = useState('');

  const plan = PLANES[planId] ?? PLANES.nebula;

  const descuento = useMemo(() => {
    if (cupon.trim().toUpperCase() === 'NUCLOUD20') return plan.precio * 0.2;
    return 0;
  }, [cupon, plan.precio]);

  const total = Math.max(0, plan.precio - descuento);

  return (
    <div className="inicio-bg">
      <section className="checkout-wrap">
        <Container className="container-xxl">
          <Row className="g-4">
            <Col lg={8}>
              <div className="spec-card">
                <h5 className="mb-3">{plan.nombre}</h5>

                <div className="spec-list">
                  {plan.specs.map((s, i) => (
                    <div key={i} className="spec-item">
                      <span className="spec-dot" />
                      <span>{s}</span>
                    </div>
                  ))}
                </div>

                <hr className="my-4 border-secondary-subtle" />

                <Row className="gy-3">
                  <Col md={6}>
                    <div className="form-inline-tile">
                      <div className="label">Centro de datos</div>
                      <select
                        className="form-select form-select-sm"
                        value={datacenter}
                        onChange={e => setDatacenter(e.target.value)}
                      >
                        <option value="frsbg01">FRSBG01</option>
                        <option value="usmia01">USMIA01</option>
                        <option value="brsao01">BRSAO01</option>
                      </select>
                    </div>
                  </Col>

                  <Col md={6}>
                    <div className="form-inline-tile">
                      <div className="label">Idioma del teclado</div>
                      <select className="form-select form-select-sm" defaultValue="es">
                        <option value="es">QWERTY – Español</option>
                        <option value="en">QWERTY – Inglés</option>
                        <option value="pt">QWERTY – Portugués</option>
                      </select>
                    </div>
                  </Col>

                  <Col md={12}>
                    <div className="form-inline-tile">
                      <div className="label">Cupón o código de referido</div>
                      <div className="d-flex gap-2">
                        <input
                          className="form-control form-control-sm"
                          placeholder="Ingresá tu cupón (ej: NUCLOUD20)"
                          value={cupon}
                          onChange={(e) => setCupon(e.target.value)}
                        />
                      </div>
                      {descuento > 0 && (
                        <div className="text-success small mt-1">
                          Descuento aplicado: −{descuento.toLocaleString('es-AR')} ARS
                        </div>
                      )}
                    </div>
                  </Col>
                </Row>
              </div>
            </Col>

            <Col lg={4}>
              <div className="summary-card">
                <div className="d-flex justify-content-between">
                  <h6 className="mb-0">Shadow PC</h6>
                  <div className="fw-700">{plan.precio.toLocaleString('es-AR')} ARS</div>
                </div>
                <div className="text-white-50 small mb-3">mensual</div>

                <div className="summary-line">
                  <div className="small">Data Center</div>
                  <div className="small fw-700 text-white-50">{datacenter.toUpperCase()}</div>
                </div>

                <div className="summary-total mt-3">
                  <div>Total</div>
                  <div className="fw-800">{total.toLocaleString('es-AR')} ARS</div>
                </div>

                <div className="text-white-50 small mt-1">Con IVA</div>

                <div className="delivery small mt-3">
                  <span className="text-white-50">Presupuesto de entrega</span>
                  <span>una hora</span>
                </div>

                <div className="d-grid gap-2 mt-3">
                  <Button className="btn-pink" onClick={() => alert('Crear cuenta')}>
                    Crear cuenta
                  </Button>
                  <Button variant="outline-light" onClick={() => navigate('/login')}>
                    Iniciar sesión
                  </Button>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
}
