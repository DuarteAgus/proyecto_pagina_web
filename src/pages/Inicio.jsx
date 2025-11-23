import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import PostersCarousel from '@components/PostersCarousel';

import './Inicio.css';

export default function Inicio() {
  return (
    <div className="inicio-bg">
      <section className="inicio-hero inicio-hero-lg">
        <Container>
          <h1 className="inicio-hero-title">
            Tu nueva forma de jugar <br /> En la nube
          </h1>

          <p className="inicio-hero-desc">
            Con <strong>NuCloud Gaming</strong> convertí al instante tu celular, laptop o PC en
            una máquina lista para videojuegos exigentes. Accedé a tus títulos favoritos desde
            cualquier lugar y disfrutá de un rendimiento fluido sin necesidad de hardware costoso.
          </p>

          <p className="inicio-hero-muted">
            Compatible con plataformas como Steam, Epic Games, Xbox Cloud, GOG y más.
          </p>

          <div className="d-flex gap-3 mt-3">
            <Button as={Link} to="/ofertas" className="inicio-btn-cta">
              Descubrí todas las ofertas
            </Button>
          </div>
        </Container>
      </section>

      <section className="inicio-promo">
        <Container>
          <div className="inicio-promo-box mb-3">Promo del día: 3 meses -20%</div>
          <PostersCarousel posters={POSTERS} perSlide={12} />
        </Container>
      </section>

      <section className="inicio-beneficios">
        <Container className="container-xxl">
          <Row className="g-4 g-xl-5 text-center">
            <Col md={6} lg={3}>
              <div className="inicio-b-item">
                <div className="inicio-b-icon">
                  <svg viewBox="0 0 40 40" className="inicio-b-icon-svg">
                    <rect x="6" y="18" width="28" height="12" rx="6" />
                    <circle cx="16" cy="24" r="2" />
                    <rect x="13" y="23" width="6" height="1.6" rx="0.8" />
                    <circle cx="24" cy="22" r="1.7" />
                    <circle cx="28" cy="26" r="1.7" />
                  </svg>
                </div>
                <h3 className="inicio-b-title">Todos tus juegos</h3>
                <p className="inicio-b-text">
                  NuCloud es un PC Windows completo. Instalá cualquier juego de Steam,
                  Epic, Battle.net u otra plataforma y jugá sin límites.
                </p>
              </div>
            </Col>

            <Col md={6} lg={3}>
              <div className="inicio-b-item">
                <div className="inicio-b-icon">
                  <svg viewBox="0 0 40 40" className="inicio-b-icon-svg">
                    <rect x="8" y="10" width="24" height="16" rx="2" />
                    <rect x="6" y="27" width="28" height="3" rx="1.5" />
                  </svg>
                </div>
                <h3 className="inicio-b-title">Juegos de PC en Mac</h3>
                <p className="inicio-b-text">
                  Convertí tu Mac en una máquina gamer definitiva, sin particiones raras ni
                  problemas de compatibilidad.
                </p>
              </div>
            </Col>

            <Col md={6} lg={3}>
              <div className="inicio-b-item">
                <div className="inicio-b-icon">
                  <svg viewBox="0 0 40 40" className="inicio-b-icon-svg">
                    <rect x="5" y="11" width="22" height="14" rx="2" />
                    <rect x="24" y="16" width="9" height="14" rx="2" />
                    <rect x="13" y="27" width="6" height="2.5" rx="1.2" />
                  </svg>
                </div>
                <h3 className="inicio-b-title">Cualquier dispositivo</h3>
                <p className="inicio-b-text">
                  Jugá desde Windows, macOS, Linux, tablets o smartphones. Si tu equipo se
                  conecta a internet, puede correr NuCloud.
                </p>
              </div>
            </Col>

            <Col md={6} lg={3}>
              <div className="inicio-b-item">
                <div className="inicio-b-icon">
                  <svg viewBox="0 0 40 40" className="inicio-b-icon-svg">
                    <circle cx="20" cy="20" r="6" />
                    <rect x="19" y="9" width="2" height="4" rx="1" />
                    <rect x="19" y="27" width="2" height="4" rx="1" />
                    <rect x="9" y="19" width="4" height="2" rx="1" />
                    <rect x="27" y="19" width="4" height="2" rx="1" />
                    <rect x="12.5" y="12.5" width="3" height="3" rx="1"
                          transform="rotate(-45 14 14)" />
                    <rect x="24.5" y="24.5" width="3" height="3" rx="1"
                          transform="rotate(-45 26 26)" />
                  </svg>
                </div>
                <h3 className="inicio-b-title">Config alta</h3>
                <p className="inicio-b-text">
                  Disfrutá de gráficos en alta resolución y rendimiento estable, sin tener que
                  invertir en una PC gamer costosa.
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="inicio-cloud">
        <Container className="container-xxl">
          <Row className="align-items-center g-4 g-lg-5">
            <Col lg={6}>
              <div className="inicio-cloud-img-wrap">
                <img
                  className="inicio-cloud-img"
                  src="https://metronoticias.com.ar/download/multimedia.normal.bcd90e2a6f3c7226.SEQtd2FsbHBhcGVyLXBjLWdhbWVyX25vcm1hbC53ZWJw.webp"
                  alt="Jugando en la nube desde una notebook"
                />
              </div>
            </Col>

            <Col lg={6}>
              <h2 className="inicio-cloud-title">
                El cloud gaming, con <span className="text-pink">NuCloud PC</span>
              </h2>

              <p className="inicio-cloud-lead">
                Accedé a un PC Windows completo en la nube, ideal para jugar, streamear o
                usar tus apps de escritorio favoritas.
              </p>

              <p className="inicio-cloud-text">
                Con NuCloud jugás con tus bibliotecas de Steam, Epic, Xbox, Battle.net y más, como
                si estuvieran instaladas en tu propia PC. Sin preocuparte por requisitos mínimos,
                actualizaciones de hardware o espacio en disco. Solo iniciás sesión, elegís tu juego
                y listo: el resto lo hacemos nosotros desde el centro de datos.
              </p>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
}

const POSTERS = [
  'https://xboxwire.thesourcemediaassets.com/sites/4/CODWZ_S1-X1_-1920x1080-enUS_JPG-7bfcc41943e5c8cfdb37-d86e258b3fb5ce954692.jpg',
  'https://upload.wikimedia.org/wikipedia/en/a/a5/Grand_Theft_Auto_V.png',
  'https://image.api.playstation.com/cdn/EP0001/CUSA05847_00/pEBJnRh6DeL2BfyZRa9jZRrNuSav42QPJIXyqo6Rgcr52o9kYLwY4EpouAzWh4Fu.png',
  'https://image.api.playstation.com/cdn/UP0001/CUSA00663_00/arnlFWX6Y6ZlGyCCYWmth94Shtw44kON.png',
  'https://upload.wikimedia.org/wikipedia/en/9/9f/Cyberpunk_2077_box_art.jpg',
  'https://image.api.playstation.com/cdn/UP1004/CUSA03041_00/Hpl5MtwQgOVF9vJqlfui6SDB5Jl4oBSq.png?w=440',
  'https://cdn1.epicgames.com/offer/27aa2ebdcda14b3bb8a669aab73ca55f/EGS_TheElderScrollsOnline_ZeniMaxOnlineStudios_S2_1200x1600-5fc6dfa46dd3fe68292cd6b9ae75b0ee',
  'https://image.api.playstation.com/vulcan/ap/rnd/202211/0711/qezXTVn1ExqBjVjR5Ipm97IK.png',
  'https://assets.nintendo.com/image/upload/q_auto/f_auto/store/software/switch/70010000010192/f26fc9e1b11ce01369966ed9225e320a293c4eaad1329774f125e05629ffd437',
  'https://image.api.playstation.com/vulcan/ap/rnd/202206/0608/Oxr3X0TU9BRhpgweQoq5AGgy.png',
  'https://image.api.playstation.com/vulcan/ap/rnd/202009/2814/9J6nuH0EFjDlWOceK8RucMKD.png',
  'https://i.pinimg.com/564x/4c/c5/dc/4cc5dc80bcb00be1e268b5c6fd61fa60.jpg',
  'https://upload.wikimedia.org/wikipedia/en/b/b6/Ghost_of_Tsushima.jpg',
  'https://upload.wikimedia.org/wikipedia/en/9/9f/Cyberpunk_2077_box_art.jpg',
  'https://upload.wikimedia.org/wikipedia/en/b/b6/Ghost_of_Tsushima.jpg',
  'https://puregaming.es/wp-content/uploads/2019/09/destacada-2-Beyond-Two-Souls.jpg',
  'https://i.pinimg.com/474x/e2/f6/8c/e2f68c186f8bd12e12dca64b0836888a.jpg',
  'https://archive.org/download/grand-theft-auto-san-andreas-usa-v-3.00_202209/61N9DX5CRKL._SY445_.jpg',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJDxwnvlYdK31m8y2BAugSXy7HLJfMHvWbLw&s',
  'https://rickygame.com.ar/wp-content/uploads/2021/09/mk-111-a1a4e65d0c3dcafe1015880036696408-1024-1024.jpg',
  'https://image.api.playstation.com/vulcan/img/rnd/202106/1514/fkPaEpz998Uu7QaofSj1VIhr.png',
  'https://img.3kropki.pl/img_pg/0/3/3/0/7/7/4/64a6aa3cef63d_1.webp',
  'https://cdna.artstation.com/p/assets/covers/images/003/644/202/large/joseph-biwald-joseph-biwald-destiny-the-collection-thumbnail-01.jpg?1475957574',
  'https://cdn1.epicgames.com/offer/2a14cf8a83b149919a2399504e5686a6/SIMS4_EPIC_PORTRAIT-Product-Image_1200x1600_1200x1600-aab8b38d851dbd96bcba41d6507d3a32',
];
