import { useState, useMemo } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';

const PLANES_DISPONIBLES = ['Plan Nebula', 'Plan Quantum', 'Plan Eclipse', '-'];

const clientesIniciales = [
  {
    id: 1,
    nombre: 'Doris Duarte',
    email: 'doris.duarte@gmail.com',
    plan: 'Plan Eclipse',
    estadoPlan: 'vigente',
    estadoPago: 'al_dia',
    proximoVencimiento: '15/11/2025',
  },
  {
    id: 2,
    nombre: 'Camila López',
    email: 'camila.lopez@gmail.com',
    plan: 'Plan Quantum',
    estadoPlan: 'vigente',
    estadoPago: 'deuda',
    proximoVencimiento: '10/11/2025',
  },
  {
    id: 3,
    nombre: 'Maria Gómez',
    email: 'maria.gomez@gmail.com',
    plan: 'Plan Nebula',
    estadoPlan: 'vigente',
    estadoPago: 'al_dia',
    proximoVencimiento: '22/11/2025',
  },
  {
    id: 4,
    nombre: 'Invitado sin plan',
    email: 'invitado@gmail.com',
    plan: '-',
    estadoPlan: 'sin_plan',
    estadoPago: 'al_dia',
    proximoVencimiento: '-',
  },
];

export default function AdminClientes() {
  const [clientes, setClientes] = useState(clientesIniciales);
  const [filtro, setFiltro] = useState('todos');
  const [showSuccess, setShowSuccess] = useState(false);

  const [nuevoCliente, setNuevoCliente] = useState({
    nombre: '',
    email: '',
    plan: 'Plan Nebula',
    estadoPlan: 'vigente',
    estadoPago: 'al_dia',
    proximoVencimiento: '',
  });

  const updateCliente = (id, data) => {
    setClientes((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...data } : c))
    );
  };

  const handleGuardar = () => {
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleEliminar = (id) => {
    setClientes((prev) => prev.filter((c) => c.id !== id));
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleAgregarCliente = (e) => {
    e.preventDefault();
    if (!nuevoCliente.nombre.trim() || !nuevoCliente.email.trim()) return;

    const maxId = clientes.reduce((max, c) => (c.id > max ? c.id : max), 0);

    const nuevo = {
      ...nuevoCliente,
      id: maxId + 1,
      estadoPlan:
        nuevoCliente.plan === '-' ? 'sin_plan' : nuevoCliente.estadoPlan,
      proximoVencimiento:
        nuevoCliente.plan === '-'
          ? '-'
          : nuevoCliente.proximoVencimiento || '-',
    };

    setClientes((prev) => [...prev, nuevo]);
    setNuevoCliente({
      nombre: '',
      email: '',
      plan: 'Plan Nebula',
      estadoPlan: 'vigente',
      estadoPago: 'al_dia',
      proximoVencimiento: '',
    });
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const resumen = useMemo(() => {
    const conPlan = clientes.filter((c) => c.estadoPlan !== 'sin_plan');
    const vigentes = clientes.filter((c) => c.estadoPlan === 'vigente');
    const conDeuda = clientes.filter((c) => c.estadoPago === 'deuda');

    return {
      totalConPlan: conPlan.length,
      totalVigentes: vigentes.length,
      totalDeuda: conDeuda.length,
    };
  }, [clientes]);

  const clientesFiltrados = useMemo(() => {
    switch (filtro) {
      case 'vigente':
        return clientes.filter((c) => c.estadoPlan === 'vigente');
      case 'deuda':
        return clientes.filter((c) => c.estadoPago === 'deuda');
      case 'sin_plan':
        return clientes.filter((c) => c.estadoPlan === 'sin_plan');
      default:
        return clientes;
    }
  }, [clientes, filtro]);

  const renderBadgePlan = (estado) => {
    if (estado === 'vigente') return <Badge bg="success">Vigente</Badge>;
    if (estado === 'vencido') return <Badge bg="secondary">Vencido</Badge>;
    return <Badge bg="dark">Sin plan</Badge>;
  };

  const renderBadgePago = (estado) => {
    if (estado === 'al_dia') return <Badge bg="info">Al día</Badge>;
    return <Badge bg="danger">Con deuda</Badge>;
  };

  return (
    <div className="inicio-bg py-5">
      <Container className="container-xxl">
        <header className="mb-3 mt-4">
          <h1 className="text-white mb-2 admin-title">
            Clientes y suscripciones
          </h1>
          <p className="text-white-50 mb-0">
            Consultá el estado de los clientes, sus planes y pagos de NuCloud
            Gaming. Como administradora podés actualizar los datos, agregar
            clientes nuevos o eliminar los que tengan planes vencidos.
          </p>
        </header>

        {showSuccess && (
          <Alert
            variant="success"
            className="mt-3 mb-4"
            style={{ backgroundColor: '#1e3a2f', borderColor: '#2ecc71' }}
          >
            Los cambios de los clientes fueron actualizados con éxito. ✅
          </Alert>
        )}

        <Row className="g-4 mb-4">
          <Col md={4}>
            <Card className="admin-card admin-card--stat h-100">
              <Card.Body>
                <div className="admin-card-pill">Clientes con plan</div>
                <Card.Text className="display-6 fw-bold mb-1">
                  {resumen.totalConPlan}
                </Card.Text>
                <Card.Text className="text-muted small mb-0">
                  Tienen algún plan contratado (vigente o vencido).
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card className="admin-card admin-card--stat h-100">
              <Card.Body>
                <div className="admin-card-pill">Planes vigentes</div>
                <Card.Text className="display-6 fw-bold mb-1">
                  {resumen.totalVigentes}
                </Card.Text>
                <Card.Text className="text-muted small mb-0">
                  Pueden jugar ahora mismo sin restricciones.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card className="admin-card admin-card--stat h-100">
              <Card.Body>
                <div className="admin-card-pill">Clientes con deuda</div>
                <Card.Text className="display-6 fw-bold mb-1 text-danger">
                  {resumen.totalDeuda}
                </Card.Text>
                <Card.Text className="text-muted small mb-0">
                  Tienen pagos pendientes de su plan.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Card className="admin-clientes-card admin-card admin-card--panel mb-4">
          <Card.Body>
            <div className="admin-panel-header d-flex flex-column flex-lg-row justify-content-between align-items-lg-center mb-3">
              <div>
                <Card.Title className="mb-1 text-white">Clientes</Card.Title>
                <Card.Text className="text-muted small mb-0">
                  Filtrá por plan vigente, deuda o clientes sin plan y editá el
                  estado de cada uno.
                </Card.Text>
              </div>

              <ButtonGroup className="mt-3 mt-lg-0">
                <Button
                  size="sm"
                  variant={filtro === 'todos' ? 'pink' : 'outline-light'}
                  className={filtro === 'todos' ? 'btn-pink' : ''}
                  onClick={() => setFiltro('todos')}
                >
                  Todos
                </Button>
                <Button
                  size="sm"
                  variant={filtro === 'vigente' ? 'pink' : 'outline-light'}
                  className={filtro === 'vigente' ? 'btn-pink' : ''}
                  onClick={() => setFiltro('vigente')}
                >
                  Plan vigente
                </Button>
                <Button
                  size="sm"
                  variant={filtro === 'deuda' ? 'pink' : 'outline-light'}
                  className={filtro === 'deuda' ? 'btn-pink' : ''}
                  onClick={() => setFiltro('deuda')}
                >
                  Con deuda
                </Button>
                <Button
                  size="sm"
                  variant={filtro === 'sin_plan' ? 'pink' : 'outline-light'}
                  className={filtro === 'sin_plan' ? 'btn-pink' : ''}
                  onClick={() => setFiltro('sin_plan')}
                >
                  Sin plan
                </Button>
              </ButtonGroup>
            </div>

            <div className="admin-add-client admin-add-client--list">
              <div className="table-responsive mb-0">
                <Table
                  hover
                  className="mb-0 align-middle admin-table text-white"
                >
                  <thead>
                    <tr>
                      <th>Cliente</th>
                      <th>Email</th>
                      <th>Plan</th>
                      <th>Estado plan</th>
                      <th>Pago</th>
                      <th>Próximo vencimiento</th>
                      <th className="text-end">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {clientesFiltrados.map((c) => (
                      <tr key={c.id}>
                        <td style={{ minWidth: 160 }}>
                          <Form.Control
                            size="sm"
                            type="text"
                            defaultValue={c.nombre}
                            className="bg-dark text-white border-secondary"
                            onBlur={(e) =>
                              updateCliente(c.id, { nombre: e.target.value })
                            }
                          />
                        </td>

                        <td style={{ minWidth: 200 }}>
                          <Form.Control
                            size="sm"
                            type="email"
                            defaultValue={c.email}
                            className="bg-dark text-white border-secondary"
                            onBlur={(e) =>
                              updateCliente(c.id, { email: e.target.value })
                            }
                          />
                        </td>

                        <td style={{ minWidth: 160 }}>
                          <Form.Select
                            size="sm"
                            value={c.plan}
                            className="bg-dark text-white border-secondary form-select-sm"
                            onChange={(e) =>
                              updateCliente(c.id, {
                                plan: e.target.value,
                                estadoPlan:
                                  e.target.value === '-'
                                    ? 'sin_plan'
                                    : c.estadoPlan,
                              })
                            }
                          >
                            {PLANES_DISPONIBLES.map((plan) => (
                              <option key={plan} value={plan}>
                                {plan === '-' ? 'Sin plan' : plan}
                              </option>
                            ))}
                          </Form.Select>
                        </td>

                        <td style={{ minWidth: 170 }}>
                          <div className="d-flex align-items-center gap-2">
                            {renderBadgePlan(c.estadoPlan)}
                            <Form.Select
                              size="sm"
                              value={c.estadoPlan}
                              className="bg-dark text-white border-secondary form-select-sm"
                              style={{ maxWidth: 115 }}
                              onChange={(e) =>
                                updateCliente(c.id, {
                                  estadoPlan: e.target.value,
                                })
                              }
                            >
                              <option value="vigente">Vigente</option>
                              <option value="vencido">Vencido</option>
                              <option value="sin_plan">Sin plan</option>
                            </Form.Select>
                          </div>
                        </td>

                        <td style={{ minWidth: 160 }}>
                          <div className="d-flex align-items-center gap-2">
                            {renderBadgePago(c.estadoPago)}
                            <Form.Select
                              size="sm"
                              value={c.estadoPago}
                              className="bg-dark text-white border-secondary form-select-sm"
                              style={{ maxWidth: 120 }}
                              onChange={(e) =>
                                updateCliente(c.id, {
                                  estadoPago: e.target.value,
                                })
                              }
                            >
                              <option value="al_dia">Al día</option>
                              <option value="deuda">Con deuda</option>
                            </Form.Select>
                          </div>
                        </td>

                        <td style={{ minWidth: 140 }}>
                          <Form.Control
                            size="sm"
                            type="text"
                            placeholder="dd/mm/aaaa"
                            defaultValue={c.proximoVencimiento}
                            className="bg-dark text-white border-secondary"
                            onBlur={(e) =>
                              updateCliente(c.id, {
                                proximoVencimiento: e.target.value || '-',
                              })
                            }
                          />
                        </td>

                        <td className="text-end" style={{ minWidth: 130 }}>
                          <Button
                            size="sm"
                            variant="outline-danger"
                            disabled={c.estadoPlan !== 'vencido'}
                            onClick={() => handleEliminar(c.id)}
                          >
                            Eliminar
                          </Button>
                          {c.estadoPlan !== 'vencido' && (
                            <div className="text-muted small mt-1">
                              Solo si el plan está vencido.
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}

                    {clientesFiltrados.length === 0 && (
                      <tr>
                        <td colSpan={7} className="text-center text-muted py-4">
                          No hay clientes que cumplan con este filtro.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </div>
            </div>

            <Form
              className="admin-add-client mt-4"
              onSubmit={handleAgregarCliente}
            >
              <h6 className="text-white mb-3">Agregar nuevo cliente</h6>
              <Row className="g-3 align-items-end">
                <Col md={3}>
                  <Form.Label className="text-muted small">Nombre</Form.Label>
                  <Form.Control
                    size="sm"
                    type="text"
                    placeholder="Nombre y apellido"
                    value={nuevoCliente.nombre}
                    className="bg-dark text-white border-secondary"
                    onChange={(e) =>
                      setNuevoCliente((nc) => ({
                        ...nc,
                        nombre: e.target.value,
                      }))
                    }
                  />
                </Col>
                <Col md={3}>
                  <Form.Label className="text-muted small">Email</Form.Label>
                  <Form.Control
                    size="sm"
                    type="email"
                    placeholder="correo@ejemplo.com"
                    value={nuevoCliente.email}
                    className="bg-dark text-white border-secondary"
                    onChange={(e) =>
                      setNuevoCliente((nc) => ({
                        ...nc,
                        email: e.target.value,
                      }))
                    }
                  />
                </Col>
                <Col md={2}>
                  <Form.Label className="text-muted small">Plan</Form.Label>
                  <Form.Select
                    size="sm"
                    value={nuevoCliente.plan}
                    className="bg-dark text-white border-secondary form-select-sm"
                    onChange={(e) =>
                      setNuevoCliente((nc) => ({
                        ...nc,
                        plan: e.target.value,
                      }))
                    }
                  >
                    {PLANES_DISPONIBLES.map((plan) => (
                      <option key={plan} value={plan}>
                        {plan === '-' ? 'Sin plan' : plan}
                      </option>
                    ))}
                  </Form.Select>
                </Col>
                <Col md={2}>
                  <Form.Label className="text-muted small">
                    Próx. vencimiento
                  </Form.Label>
                  <Form.Control
                    size="sm"
                    type="text"
                    placeholder="dd/mm/aaaa"
                    value={nuevoCliente.proximoVencimiento}
                    disabled={nuevoCliente.plan === '-'}
                    className="bg-dark text-white border-secondary"
                    onChange={(e) =>
                      setNuevoCliente((nc) => ({
                        ...nc,
                        proximoVencimiento: e.target.value,
                      }))
                    }
                  />
                </Col>
                <Col md={2} className="text-end">
                  <Button type="submit" className="btn-pink w-100" size="sm">
                    Agregar cliente
                  </Button>
                </Col>
              </Row>
              <p className="text-muted small mt-2 mb-0">
                Si seleccionás <strong>Sin plan</strong>, el cliente se creará
                sin fecha de vencimiento y con estado{' '}
                <strong>Sin plan</strong>.
              </p>
            </Form>

            <div className="d-flex justify-content-end mt-3">
              <Button className="btn-pink px-4" onClick={handleGuardar}>
                Guardar cambios
              </Button>
            </div>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

