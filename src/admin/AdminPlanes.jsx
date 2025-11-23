import React, { useState } from "react";

const initialPlans = [
  {
    id: "nebula",
    name: "Plan Nebula",
    price: "10000",
    description:
      "Ideal para jugadores casuales: 60 fps estables en 1080p y sesiones diarias con consumo optimizado.",
    status: "activo",
  },
  {
    id: "quantum",
    name: "Plan Quantum",
    price: "15000",
    description:
      "Pensado para gamers exigentes: 120 fps en 1080p / 60 fps en 1440p, priorización de red y colas rápidas.",
    status: "activo",
  },
  {
    id: "eclipse",
    name: "Plan Eclipse",
    price: "20000",
    description:
      "Lo máximo para streamers: 4K HDR, servidores premium y soporte dedicado 24/7.",
    status: "pausado",
  },
];

export default function AdminPlanes() {
  const [plans, setPlans] = useState(initialPlans);

  const handleChange = (id, field, value) => {
    setPlans((prev) =>
      prev.map((plan) =>
        plan.id === id ? { ...plan, [field]: value } : plan
      )
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Planes actualizados:", plans);
    alert("Los cambios fueron guardados con éxito ");
  };

  return (
    <div className="inicio-bg admin-page">
      <div className="container py-4">
        <h1 className="h3 text-white mb-2">Editar planes</h1>
        <p className="admin-planes-intro mb-4">
          Ajustá el <strong>precio</strong>, la <strong>descripción</strong> y el{" "}
          <strong>estado</strong> de cada plan que aparece en la sección{" "}
          <strong>Ofertas</strong>.
        </p>

        <div className="card admin-card admin-card--panel">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              {plans.map((plan) => (
                <div key={plan.id} className="admin-plan-row">
                  <div className="admin-plan-field">
                    <label className="form-label">Plan</label>
                    <input
                      type="text"
                      className="form-control admin-plan-input"
                      value={plan.name}
                      onChange={(e) =>
                        handleChange(plan.id, "name", e.target.value)
                      }
                    />

                    <label className="form-label mt-3">
                      Precio (ARS / mes)
                    </label>
                    <input
                      type="number"
                      min="0"
                      className="form-control admin-plan-input"
                      value={plan.price}
                      onChange={(e) =>
                        handleChange(plan.id, "price", e.target.value)
                      }
                    />
                  </div>

                  <div className="admin-plan-field">
                    <label className="form-label">Descripción</label>
                    <textarea
                      rows={4}
                      className="form-control admin-plan-input"
                      value={plan.description}
                      onChange={(e) =>
                        handleChange(plan.id, "description", e.target.value)
                      }
                    />
                  </div>

                  <div className="admin-plan-field">
                    <label className="form-label">Estado del plan</label>
                    <select
                      className="form-select admin-plan-input"
                      value={plan.status}
                      onChange={(e) =>
                        handleChange(plan.id, "status", e.target.value)
                      }
                    >
                      <option value="activo">Activo</option>
                      <option value="pausado">Pausado</option>
                      <option value="oculto">Oculto</option>
                    </select>
                  </div>
                </div>
              ))}

              <div className="text-end mt-4">
                <button
                  type="submit"
                  className="btn btn-pink px-4"
                >
                  Guardar cambios
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
