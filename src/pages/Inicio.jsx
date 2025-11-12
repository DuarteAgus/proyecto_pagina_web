import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import PostersCarousel from '@components/PostersCarousel'
import './Inicio.css'

export default function Inicio() {
  return (
    <div className="inicio-bg">
      <section className="inicio-hero">
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
            <Button className="inicio-btn-cta" href="#juegos">Descubrí todas las ofertas</Button>
            <Button variant="outline-light">Saber más</Button>
          </div>
        </Container>
      </section>

      <section className="inicio-promo" id="juegos">
        <Container>
          <div className="inicio-promo-box mb-3">Promo del día: 3 meses −20%</div>
          <PostersCarousel posters={POSTERS} perSlide={12} />
        </Container>
      </section>

      <section className="inicio-beneficios">
        <Container className="container-xxl">
          <div className="row g-4 g-xl-5 text-center">
            <div className="col-12 col-md-6 col-xl-3">
              <div className="inicio-b-item">
                <span className="inicio-b-icon">
                  <svg viewBox="0 0 24 24" width="40" height="40" aria-hidden="true">
                    <path d="M7 12h4M9 10v4M16.5 10.5h.01M18.5 12.5h.01M6 16l2-2h8l2 2" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    <rect x="2" y="9" width="20" height="8" rx="4" ry="4" fill="none" stroke="currentColor" strokeWidth="1.8"/>
                  </svg>
                </span>
                <h3 className="inicio-b-title">Todos tus juegos</h3>
                <p className="inicio-b-text">PC Windows completo en la nube. Instalá lo que quieras y jugá.</p>
              </div>
            </div>

            <div className="col-12 col-md-6 col-xl-3">
              <div className="inicio-b-item">
                <span className="inicio-b-icon">
                  <svg viewBox="0 0 24 24" width="40" height="40" aria-hidden="true">
                    <path d="M4 13v4a3 3 0 0 0 3 3h1v-7H7a3 3 0 0 0-3 3zm16 0v4a3 3 0 0 1-3 3h-1v-7h1a3 3 0 0 1 3 3zM4 13a8 8 0 0 1 16 0" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
                <h3 className="inicio-b-title">Juegos de PC en Mac</h3>
                <p className="inicio-b-text">Usá tus juegos de Windows en macOS, sin complicaciones.</p>
              </div>
            </div>

            <div className="col-12 col-md-6 col-xl-3">
              <div className="inicio-b-item">
                <span className="inicio-b-icon">
                  <svg viewBox="0 0 24 24" width="40" height="40" aria-hidden="true">
                    <rect x="2" y="6" width="14" height="10" rx="2" fill="none" stroke="currentColor" strokeWidth="1.8"/>
                    <rect x="10" y="14" width="12" height="6" rx="2" fill="none" stroke="currentColor" strokeWidth="1.8"/>
                    <path d="M6 18h6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                  </svg>
                </span>
                <h3 className="inicio-b-title">Cualquier dispositivo</h3>
                <p className="inicio-b-text">Windows, Linux, macOS, Android TV o navegador.</p>
              </div>
            </div>

            <div className="col-12 col-md-6 col-xl-3">
              <div className="inicio-b-item">
                <span className="inicio-b-icon">
                  <svg viewBox="0 0 24 24" width="40" height="40" aria-hidden="true">
                    <rect x="4" y="4" width="16" height="16" rx="3" fill="none" stroke="currentColor" strokeWidth="1.8"/>
                    <path d="M8 10h8M8 14h8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                  </svg>
                </span>
                <h3 className="inicio-b-title">Configuración alta</h3>
                <p className="inicio-b-text">Hasta 4K, RTX y DLSS según plan.</p>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  )
}

const POSTERS = [
  'https://xboxwire.thesourcemediaassets.com/sites/4/CODWZ_S1-X1_-1920x1080-enUS_JPG-7bfcc41943e5c8cfdb37-d86e258b3fb5ce954692.jpg',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnhz1_T2eH2uaoadDVjiKNpIKUaBNu9MoVkw&s',
  'https://image.api.playstation.com/cdn/EP0001/CUSA05847_00/pEBJnRh6DeL2BfyZRa9jZRrNuSav42QPJIXyqo6Rgcr52o9kYLwY4EpouAzWh4Fu.png',
  'https://image.api.playstation.com/cdn/UP0001/CUSA00663_00/arnlFWX6Y6ZlGyCCYWmth94Shtw44kON.png',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFulAwQjM6PIRNmj34U6_suJHb-5FRsA3aXg&s',
  'https://image.api.playstation.com/cdn/UP1004/CUSA03041_00/Hpl5MtwQgOVF9vJqlfui6SDB5Jl4oBSq.png?w=440',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYi_VwfybGy4oasXB2Ij3EZd77nWMfZsC4DA&s',
  'https://image.api.playstation.com/vulcan/ap/rnd/202211/0711/qezXTVn1ExqBjVjR5Ipm97IK.png',
  'https://assets.nintendo.com/image/upload/q_auto/f_auto/store/software/switch/70010000010192/f26fc9e1b11ce01369966ed9225e320a293c4eaad1329774f125e05629ffd437',
  'https://image.api.playstation.com/vulcan/ap/rnd/202206/0608/Oxr3X0TU9BRhpgweQoq5AGgy.png',
  'https://image.api.playstation.com/vulcan/ap/rnd/202009/2814/9J6nuH0EFjDlWOceK8RucMKD.png',
  'https://cdn.eliteguias.com/img/recomendados/the-last-of-us.jpg',
  'https://upload.wikimedia.org/wikipedia/en/4/4f/The_Last_of_Us_box_art.jpg',
  'https://upload.wikimedia.org/wikipedia/en/7/7b/Resident_Evil_2_Remake.jpg',
  'https://upload.wikimedia.org/wikipedia/en/3/3c/Doom_Cover.jpg'
]
