import { useState } from "react";

import BarraLateral from "./components/diseño/BarraLateral";
import Encabezado from "./components/diseño/Encabezado";
import Cultivos from "./pages/Cultivos";

export default function App() {
  const [pagina, setPagina] = useState("Cultivos");
  const [busqueda, setBusqueda] = useState("");

  return (
    <div className="min-h-screen bg-[#f5f7f5]">
      <BarraLateral
        paginaActual={pagina}
        cambiarPagina={setPagina}
      />

      <main className="lg:ml-[245px]">
        <Encabezado
          busqueda={busqueda}
          cambiarBusqueda={setBusqueda}
        />

        <div className="p-4 md:p-6">
          {pagina === "Cultivos" ? (
            <Cultivos busqueda={busqueda} />
          ) : (
            <div className="rounded-xl border border-[#dce6df] bg-white p-8 text-center shadow-sm">
              <h2 className="text-lg font-bold text-[#173b2a]">
                {pagina}
              </h2>

              <p className="mt-2 text-sm text-[#789184]">
                Este módulo será conectado próximamente.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}