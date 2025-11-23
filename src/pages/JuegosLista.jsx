import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import { GAMES } from '../assets/games.js';

export default function JuegosLista() {
  const [selected, setSelected] = useState(null);
  const detailRef = useRef(null);

  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const openId = searchParams.get('open');
    if (openId && !selected) {
      const g = GAMES.find((x) => String(x.id) === String(openId));
      if (g) setSelected(g);
    }
  }, []); 

  useEffect(() => {
    if (selected && detailRef.current) {
      detailRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });

      if (searchParams.get('open') !== String(selected.id)) {
        const sp = new URLSearchParams(searchParams);
        sp.set('open', selected.id);
        setSearchParams(sp, { replace: true });
      }
    }
  }, [selected, searchParams, setSearchParams]);


  const loginUrl = selected
    ? `/login-cliente?next=${encodeURIComponent(`/juegos?open=${selected.id}`)}`
    : `/login-cliente?next=${encodeURIComponent(location.pathname)}`;

  return (
    <div className="inicio-bg">
      <section className="games-listing">
        <Container className="container-xxl">
          <Row className="g-4 g-xl-5">
            {GAMES.map((game) => (
              <Col key={game.id ?? game.title} md={6} lg={4} xl={4}>
                <button
                  type="button"
                  className="game-card link-unstyled w-100 text-start p-0"
                  onClick={() => setSelected(game)}
                  aria-label={`Ver detalle de ${game.title}`}
                >
                  <div className="game-media">
                    <img src={game.cover} alt={game.title} className="game-img" />
                  </div>

                  <div className="game-body">
                    <h3 className="game-title">{game.title}</h3>
                    <p className="game-blurb">{game.blurb}</p>

                    <div className="game-meta">
                      <span className="game-cta">{game.cta}</span>
                      <span className="game-date">
                        {new Date(game.date).toLocaleDateString('es-AR')}
                      </span>
                      <span className="game-arrow">→</span>
                    </div>
                  </div>
                </button>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {selected && (
        <section className="game-detail-hero" ref={detailRef}>
          <Container className="container-xxl">
            <div className="gd-wrap">
              <div className="gd-media">
                <img src={selected.cover} alt={selected.title} />
              </div>

              <div className="gd-content">
                <h1 className="gd-title">{selected.title}</h1>
                <p className="gd-lead">{selected.blurb}</p>

                <div className="gd-meta">
                  <span className="text-white-50">
                    {new Date(selected.date).toLocaleDateString('es-AR')}
                  </span>
                </div>

                <div className="d-flex gap-2 mt-3">
                  <Button
                    as={Link}
                    to={loginUrl}
                    className="btn-pink"
                    onClick={() => {
                      alert('Iniciando juego correctamente...');
                    }}
                  >
                    Jugar ahora
                  </Button>

                  <Button
                    variant="outline-light"
                    onClick={() => {
                      setSelected(null);
                      if (searchParams.has('open')) {
                        const sp = new URLSearchParams(searchParams);
                        sp.delete('open');
                        setSearchParams(sp, { replace: true });
                      }
                    }}
                  >
                    Cerrar
                  </Button>
                </div>
              </div>
            </div>
          </Container>
        </section>
      )}
    </div>
  );
}
