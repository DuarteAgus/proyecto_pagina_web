import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Nav from 'react-bootstrap/Nav'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="footer-nc">
      <Container>
        <Row className="gy-4">
          <Col md={4}>
            <h5 className="mb-2">NuCloud Gaming</h5>
            <p className="text-white-50 mb-0">
              Juega en la nube sin límites. Rendimiento fluido, donde estés.
            </p>
          </Col>

          <Col md={4}>
            <h6 className="mb-2">Secciones</h6>
            <Nav className="flex-column">
              <Nav.Link href="/" className="link-light px-0">Inicio</Nav.Link>
              <Nav.Link href="/juegos" className="link-light px-0">Juegos</Nav.Link>
              <Nav.Link href="/ofertas" className="link-light px-0">Ofertas</Nav.Link>
              <Nav.Link href="/nosotros" className="link-light px-0">Sobre Nosotros</Nav.Link>
            </Nav>
          </Col>

          <Col md={4}>
            <h6 className="mb-2">Contacto</h6>
            <div className="text-white-50 small">
              soporte@nucloud.gg<br/>
              Lunes a Viernes 9-18h
            </div>
          </Col>
        </Row>

        <hr className="my-4 border-secondary-subtle" />
        <div className="d-flex justify-content-between align-items-center text-white-50 small">
          <span>© {year} NuCloud Gaming</span>
        </div>
      </Container>
    </footer>
  )
}
