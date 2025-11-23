import { useParams, Link, useLocation } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import './JuegosLista.css';

import { GAMES } from '@assets/games.js';

export default function JuegoItem() {
  const { id } = useParams();
  const location = useLocation();

  const game = GAMES.find((g) => String(g.id) === String(id));

  if (!game) {
    return (
      <div className="inicio-bg">
        <Container className="py-5">
          <h2 className="text-white">Juego no encontrado</h2>
          <Link to="/juegos" className="btn btn-light mt-3">
            Volver
          </Link>
        </Container>
      </div>
    );
  }

  const loginUrl = `/login-cliente?next=${encodeURIComponent(location.pathname)}`;

  const handleJugarAhora = () => {
    alert('Iniciando juego correctamente... ¡Preparando tu Shadow PC en la nube!');
  };

  return (
    <div className="inicio-bg">
      <section className="game-detail-hero">
        <Container className="container-xxl">
          <div className="gd-wrap">
            <div className="gd-media">
              <img src={game.cover} alt={game.title} />
            </div>

            <div className="gd-content">
              <h1 className="gd-title">{game.title}</h1>
              <p className="gd-lead">{game.blurb}</p>

              <div className="gd-meta">
                <span className="badge bg-primary-subtle text-white">
                  {game.cta}
                </span>
                <span className="text-white-50">
                  {new Date(game.date).toLocaleDateString('es-AR')}
                </span>
              </div>

              <div className="d-flex gap-2 mt-3">
                <Button
                  as={Link}
                  to={loginUrl}
                  className="btn-pink"
                  onClick={handleJugarAhora}
                >
                  Jugar ahora
                </Button>

                <Link to="/juegos" className="btn btn-outline-light">
                  Volver a la lista
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
