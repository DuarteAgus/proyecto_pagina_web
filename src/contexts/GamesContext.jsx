import { createContext, useContext, useState } from 'react';

const GamesContext = createContext();

const juegosIniciales = [
  {
    id: 1,
    titulo: 'Call of Duty: Warzone',
    imagen:
      'https://xboxwire.thesourcemediaassets.com/sites/4/CODWZ_S1-X1_-1920x1080-enUS_JPG-7bfcc41943e5c8cfdb37-d86e258b3fb5ce954692.jpg',
    descripcion:
      'Battle royale gratuito con acción intensa y partidas rápidas.',
  },
  {
    id: 2,
    titulo: 'Grand Theft Auto V',
    imagen:
      'https://upload.wikimedia.org/wikipedia/en/a/a5/Grand_Theft_Auto_V.png',
    descripcion:
      'Mundo abierto enorme para recorrer Los Santos, hacer misiones y jugar online.',
  },
  {
    id: 3,
    titulo: 'The Witcher 3 Wild Hunt',
    imagen:
      'https://image.api.playstation.com/vulcan/ap/rnd/202211/0711/qezXTVn1ExqBjVjR5Ipm97IK.png',
    descripcion:
      'Eres Geralt de Rivia, cazador de monstruos.',
  },
];

export default function GamesProvider({ children }) {
  const [juegos, setJuegos] = useState(juegosIniciales);

  const updateJuego = (id, data) => {
    setJuegos((prev) =>
      prev.map((j) => (j.id === id ? { ...j, ...data } : j))
    );
  };

  return (
    <GamesContext.Provider value={{ juegos, updateJuego }}>
      {children}
    </GamesContext.Provider>
  );
}

export const useGames = () => useContext(GamesContext);
