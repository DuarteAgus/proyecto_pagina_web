import { useMemo } from 'react';
import Carousel from 'react-bootstrap/Carousel';

function chunk(arr, size) {
  const out = [];
  for (let i = 0; i < arr.length; i += size) {
    out.push(arr.slice(i, i + size));
  }
  return out;
}

export default function PostersCarousel({
  posters = [],
  perSlide = 14,                               
  interval = 4500,
  cols = { mobile: 2, tablet: 4, desktop: 6 } 
}) {

  const slides = useMemo(() => {
    if (!posters.length) return [];
    return chunk(posters, perSlide);
  }, [posters, perSlide]);

  if (!slides.length) return null;

  const single = slides.length <= 1;

  return (
    <Carousel
      className="posters-carousel"
      interval={single ? null : interval}
      pause="hover"
      controls={!single}
      indicators={!single}
      touch
    >
      {slides.map((group, slideIdx) => (
        <Carousel.Item key={`slide-${slideIdx}`}>
          <ul
            className="pc-grid"
            style={{
              ['--pc-cols-mobile']: cols.mobile,
              ['--pc-cols-tablet']: cols.tablet,
              ['--pc-cols-desktop']: cols.desktop
            }}
          >
            {group.map((src, i) => (
              <li className="pc-cell" key={`p-${slideIdx}-${i}`}>
                <img
                  className="pc-img"
                  src={src}
                  alt=""
                  loading={slideIdx === 0 ? 'eager' : 'lazy'} 
                  decoding="async"
                  onError={(e) => {
                    const li = e.currentTarget.closest('.pc-cell');
                    if (li) li.style.display = 'none'; 
                  }}
                />
              </li>
            ))}
          </ul>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}
