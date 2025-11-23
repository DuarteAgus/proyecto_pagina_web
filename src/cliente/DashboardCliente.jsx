import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useAuth } from '@contexts/AuthContext';

export default function DashboardCliente() {
  const { user } = useAuth();
  const email = user?.email || 'cliente@nucloud.com';


  const [tab, setTab] = useState('faq');

  const [planContratado, setPlanContratado] = useState(null);

  const [actividadReciente, setActividadReciente] = useState(null);

  useEffect(() => {
    try {
      const rawPlan = localStorage.getItem('nucloud_plan_cliente');
      const rawAct = localStorage.getItem('nucloud_actividad_reciente');

      let planData = null;

      if (rawPlan) {
        planData = JSON.parse(rawPlan);
        setPlanContratado(planData);
      }

      if (rawAct) {
        setActividadReciente(JSON.parse(rawAct));
      } else if (planData) {
        const fakeActivity = {
          tipo: 'contratacion',
          planNombre: planData.nombre,
          precio: planData.precio,
          metodoPago: planData.metodoPagoTexto || 'Método de pago guardado',
          dataCenter: planData.dataCenter,
          fecha: planData.fechaContratacion || new Date().toISOString(),
        };

        setActividadReciente(fakeActivity);
        localStorage.setItem(
          'nucloud_actividad_reciente',
          JSON.stringify(fakeActivity)
        );
      }
    } catch (err) {
      console.error('No se pudo leer datos del cliente', err);
    }
  }, []);

  const renderHelpContent = () => {
    switch (tab) {
      case 'soporte':
        return (
          <>
            <p className="mb-1">
              Si tenés problemas con tu plan o no podés acceder a tu NuCloud:
            </p>
            <ul className="mb-0">
              <li>
                Escribí a <strong>soporte@nucloudgaming.com</strong> con tu email
                de registro.
              </li>
              <li>
                Adjuntá capturas de pantalla si ves algún error o mensaje raro.
              </li>
              <li>
                Nuestro equipo te va a responder dentro del horario del servicio
                (texto ilustrativo para el parcial).
              </li>
            </ul>
          </>
        );

      case 'estado':
        return (
          <>
            <p className="mb-1">
              Acá, en un sistema real, verías el estado del servicio:
            </p>
            <ul className="mb-0">
              <li>Mantenimientos programados.</li>
              <li>Incidencias en tu centro de datos.</li>
              <li>Historial de cortes o problemas recientes.</li>
            </ul>
          </>
        );

      case 'faq':
      default:
        return (
          <>
            <p className="mb-1">
              Algunas dudas típicas que podrías responder en la plataforma:
            </p>
            <ul className="mb-0">
              <li>
                <strong>¿Qué necesito para jugar?</strong> Una PC o notebook con
                navegador moderno y buena conexión a Internet (recomendado 20 Mbps
                o más).
              </li>
              <li>
                <strong>¿Puedo jugar desde varios dispositivos?</strong> Sí, pero
                sólo un dispositivo puede usar el NuCloud al mismo tiempo.
              </li>
              <li>
                <strong>¿Qué pasa si se vence el pago?</strong> El servicio se
                pausa hasta que regularices el pago; tus datos quedan guardados por
                un tiempo limitado.
              </li>
            </ul>
          </>
        );
    }
  };

  return (
    <div className="inicio-bg cliente-page">
      <Container className="container-xxl py-5">
        <Row className="g-4 align-items-start">
          <Col lg={7} xl={8}>
            <header className="mb-4">
              <div className="d-flex flex-column flex-lg-row justify-content-between align-items-lg-center gap-3">
                <div>
                  <h1 className="cliente-title mb-1">
                    Hola <span className="cliente-email">{email}</span> 
                  </h1>
                  <p className="cliente-subtitle mb-0">
                    Desde tu panel vas a poder ver tus planes contratados, revisar
                    pagos y acceder a tu NuCloud en la nube.
                  </p>
                </div>

                <div className="d-flex flex-wrap gap-2 cliente-header-actions">
                  <Button
                    as={Link}
                    to="/ofertas"
                    className="btn-pink rounded-pill px-4"
                  >
                    Ver mis planes
                  </Button>
                  <Button
                    as={Link}
                    to="/juegos"
                    variant="outline-light"
                    className="rounded-pill px-4 btn-outline-light-soft"
                  >
                    Ir a juegos
                  </Button>
                </div>
              </div>
            </header>

            <Card className="cliente-card mb-3">
              <Card.Body>
                <h2 className="cliente-card-title">Mis planes</h2>

                {planContratado ? (
                  <>
                    <p className="cliente-card-text mb-2">
                      Estás usando <strong>{planContratado.nombre}</strong> en el
                      centro de datos <strong>{planContratado.dataCenter}</strong>.
                    </p>
                    <p className="cliente-card-muted mb-1">
                      Precio mensual actual:{' '}
                      <strong>
                        {Number(planContratado.precio).toLocaleString('es-AR')} ARS
                      </strong>
                      .
                    </p>
                    <p className="cliente-card-muted mb-0">
                      Método de pago:{' '}
                      <strong>{planContratado.metodoPagoTexto}</strong> <br />
                      Fecha de alta:{' '}
                      {new Date(
                        planContratado.fechaContratacion
                      ).toLocaleDateString('es-AR')}
                    </p>
                  </>
                ) : (
                  <>
                    <p className="cliente-card-text">
                      Acá vas a ver el detalle de tu plan activo, próximo
                      vencimiento y opciones de upgrade o cancelación.
                    </p>
                    <p className="cliente-card-muted mb-0">
                      Todavía no mostramos planes reales. Cuando contrates un plan
                      desde la sección <strong>Ofertas</strong>, el resumen va a
                      aparecer en este panel.
                    </p>
                  </>
                )}
              </Card.Body>
            </Card>

            <Card className="cliente-card mb-3">
              <Card.Body>
                <h2 className="cliente-card-title">Actividad reciente</h2>

                {actividadReciente ? (
                  <>
                    <p className="cliente-card-text mb-2">
                      Último movimiento en tu cuenta:
                    </p>
                    <p className="cliente-card-muted mb-1">
                      <strong>
                        {new Date(
                          actividadReciente.fecha
                        ).toLocaleString('es-AR')}
                      </strong>{' '}
                      : contrataste{' '}
                      <strong>{actividadReciente.planNombre}</strong> desde el
                      centro de datos{' '}
                      <strong>{actividadReciente.dataCenter}</strong> usando{' '}
                      <strong>{actividadReciente.metodoPago}</strong>.
                    </p>
                    <p className="cliente-card-muted mb-0">
                      Importe:{' '}
                      <strong>
                        {Number(
                          actividadReciente.precio
                        ).toLocaleString('es-AR')}{' '}
                        ARS
                      </strong>
                      .
                    </p>
                  </>
                ) : (
                  <>
                    <p className="cliente-card-text">
                      Un resumen rápido de lo que hagas en la plataforma: pagos,
                      contrataciones y avisos importantes.
                    </p>
                    <p className="cliente-card-muted mb-0">
                       Aún no hay movimientos recientes. Cuando confirmes un pago
                      desde la pantalla de <strong>Orden</strong>, lo vas a ver acá.
                    </p>
                  </>
                )}
              </Card.Body>
            </Card>

            <Card className="cliente-card">
              <Card.Body>
                <h2 className="cliente-card-title mb-2">Centro de ayuda</h2>
                <p className="cliente-card-text">
                  ¿Problemas con tu plan o con el acceso a tu NuCloud? Estas
                  opciones son ilustrativas para el parcial.
                </p>

                <div className="d-flex flex-wrap gap-2 mb-3">
                  <Button
                    size="sm"
                    variant="outline-light"
                    className={
                      'cliente-pill ' + (tab === 'faq' ? 'cliente-pill-active' : '')
                    }
                    onClick={() => setTab('faq')}
                  >
                    Preguntas frecuentes
                  </Button>
                  <Button
                    size="sm"
                    variant="outline-light"
                    className={
                      'cliente-pill ' +
                      (tab === 'soporte' ? 'cliente-pill-active' : '')
                    }
                    onClick={() => setTab('soporte')}
                  >
                    Contactar soporte
                  </Button>
                  <Button
                    size="sm"
                    variant="outline-light"
                    className={
                      'cliente-pill ' +
                      (tab === 'estado' ? 'cliente-pill-active' : '')
                    }
                    onClick={() => setTab('estado')}
                  >
                    Ver estado del servicio
                  </Button>
                </div>

                <div className="cliente-help-content">{renderHelpContent()}</div>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={5} xl={4} className="mt-4 mt-lg-0">
            <div className="cliente-hero-card">
              <img
                className="cliente-hero-img"
                src="https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg"
                alt="Setup gamer con teclado, mouse y auriculares RGB"
                loading="lazy"
              />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
