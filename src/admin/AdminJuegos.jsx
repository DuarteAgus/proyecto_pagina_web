import React, { useState } from "react";

const STORAGE_KEY = "nucloud-games";

const DEFAULT_GAMES = [
  {
    id: 1,
    title: "Call of Duty: Warzone",
    imageUrl:
      "https://xboxwire.thesourcemediaassets.com/sites/4/CODWZ_S1-X1_-1920x1080-enUS_JPG-7bfcc41943e5c8cfdb37-d86e258b3fb5ce954692.jpg",
    description:
      "Battle royale gratuito con acción intensa y partidas rápidas.",
  },
  {
    id: 2,
    title: "Grand Theft Auto V",
    imageUrl:
      "https://images.ctfassets.net/wn7ipiv9ue5v/3pONeYMJjOw9y5i7HRSKY2/0f58fd316bef6a7503ca1e227595e39f/gta-v-compare-hero.jpg",
    description:
      "Mundo abierto enorme para recorrer Los Santos, hacer misiones y jugar online.",
  },
  {
    id: 3,
    title: "Far Cry 6",
    imageUrl:
      "https://image.api.playstation.com/vulcan/ap/rnd/202106/2415/4iFd7pUCnF2NH9pX9Yx9yXyl.png",
    description:
      "Shooter en primera persona en una isla caribeña bajo un régimen dictatorial.",
  },
];

function loadInitialGames() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
  } catch (e) {
    console.error("Error leyendo juegos de localStorage", e);
  }
  return DEFAULT_GAMES;
}

export default function AdminJuegos() {
  const [games, setGames] = useState(loadInitialGames);

  const handleGameChange = (id, field, value) => {
    setGames((prev) =>
      prev.map((g) => (g.id === id ? { ...g, [field]: value } : g))
    );
  };

  const handleAddGame = () => {
    const newId = Date.now();
    setGames((prev) => [
      ...prev,
      {
        id: newId,
        title: "Nuevo juego",
        imageUrl: "",
        description: "",
      },
    ]);
  };

  const handleDeleteGame = (id) => {
    if (!window.confirm("¿Seguro que querés eliminar este juego?")) return;
    setGames((prev) => prev.filter((g) => g.id !== id));
  };

  const handleSave = (e) => {
    e.preventDefault();
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(games));
      alert("Los cambios fueron guardados con éxito ✅");
    } catch (err) {
      console.error("Error guardando juegos", err);
      alert("Hubo un error guardando los cambios.");
    }
  };

  return (
    <div className="inicio-bg admin-page">
      <div className="container py-4">
        <h1 className="h3 text-white mb-2">Gestión de juegos</h1>

        <p className="admin-note mb-4">
          Los cambios se aplican directamente al catálogo que ve el cliente en
          la sección <strong>Juegos</strong>.
        </p>

        <form onSubmit={handleSave}>
          {games.map((game) => (
            <div
              key={game.id}
              className="row g-3 mb-4 p-3 admin-add-client admin-game-block"
            >
              <div className="col-md-3 admin-game-cover">
                <img
                  src={game.imageUrl}
                  alt={game.title}
                  className="img-fluid rounded"
                  style={{ height: 220, width: "100%", objectFit: "cover" }}
                  onError={(e) => {
                    e.currentTarget.src =
                      "https://via.placeholder.com/400x220/1b1036/ffffff?text=Sin+imagen";
                  }}
                />
                <small className="text-muted d-block mt-2">
                  Vista previa de la carátula.
                </small>
              </div>

              <div className="col-md-9">
                <div className="mb-2">
                  <label className="form-label text-white-75">
                    Título del juego
                  </label>
                  <input
                    type="text"
                    className="form-control admin-game-input"
                    value={game.title}
                    onChange={(e) =>
                      handleGameChange(game.id, "title", e.target.value)
                    }
                  />
                </div>

                <div className="mb-2">
                  <label className="form-label text-white-75">
                    URL de la imagen
                  </label>
                  <input
                    type="text"
                    className="form-control admin-game-input"
                    value={game.imageUrl}
                    onChange={(e) =>
                      handleGameChange(game.id, "imageUrl", e.target.value)
                    }
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label text-white-75">
                    Descripción
                  </label>
                  <textarea
                    rows={3}
                    className="form-control admin-game-input"
                    value={game.description}
                    onChange={(e) =>
                      handleGameChange(game.id, "description", e.target.value)
                    }
                  />
                </div>

                <div className="text-end">
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => handleDeleteGame(game.id)}
                  >
                    Eliminar juego
                  </button>
                </div>
              </div>
            </div>
          ))}

          <div className="d-flex justify-content-between align-items-center mt-3">
            <button
              type="button"
              className="btn btn-sm btn-outline-light"
              onClick={handleAddGame}
            >
              + Agregar juego
            </button>

            <button type="submit" className="btn btn-admin-primary">
              Guardar cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
