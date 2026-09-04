export default function TablaCultivos({
  cultivos = [],
  alVer,
  alEditar,
  alEliminar,
}) {
  if (!cultivos || cultivos.length === 0) {
    return (
      <div className="rounded-xl border border-[#dce6df] bg-white px-6 py-14 text-center shadow-sm">
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#eef7f0] text-[#178343]">
          <PlantaIcono />
        </div>

        <p className="text-sm font-semibold text-[#294e3a]">
          No hay cultivos registrados
        </p>

        <p className="mt-1 text-xs text-[#789184]">
          Agrega un cultivo para comenzar.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-[#dce6df] bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[950px] text-left">
          <thead className="border-b border-[#dce6df] bg-[#f8faf8]">
            <tr>
              <th className="px-4 py-3 text-[11px] font-semibold text-[#27543a]">
                Cultivo
              </th>

              <th className="px-4 py-3 text-[11px] font-semibold text-[#27543a]">
                Tipo
              </th>

              <th className="px-4 py-3 text-[11px] font-semibold text-[#27543a]">
                Lote
              </th>

              <th className="px-4 py-3 text-[11px] font-semibold text-[#27543a]">
                Sublote
              </th>

              <th className="px-4 py-3 text-[11px] font-semibold text-[#27543a]">
                Siembra
              </th>

              <th className="px-4 py-3 text-[11px] font-semibold text-[#27543a]">
                Finalización
              </th>

              <th className="px-4 py-3 text-[11px] font-semibold text-[#27543a]">
                Estado
              </th>

              <th className="px-4 py-3 text-center text-[11px] font-semibold text-[#27543a]">
                Acciones
              </th>
            </tr>
          </thead>

          <tbody>
            {cultivos.map((cultivo) => (
              <tr
                key={cultivo.id}
                className="border-b border-[#e8eee9] transition hover:bg-[#f9fcfa]"
              >
                {/* CULTIVO */}
                <td className="px-4 py-3">
                  <p className="text-xs font-bold text-[#155b36]">
                    {cultivo.nombreCultivo || "Sin nombre"}
                  </p>

                  <p className="mt-0.5 text-[10px] text-[#8a9d91]">
                    Cultivo #{cultivo.id}
                  </p>
                </td>

                {/* TIPO */}
                <td className="px-4 py-3 text-xs text-[#294e3a]">
                  {cultivo.tipoCultivo || "—"}
                </td>

                {/* LOTE */}
                <td className="px-4 py-3 text-xs text-[#385c47]">
                  {cultivo.loteId ? `Lote ${cultivo.loteId}` : "—"}
                </td>

                {/* SUBLOTE */}
                <td className="px-4 py-3 text-xs text-[#385c47]">
                  {cultivo.subloteId
                    ? `Sublote ${cultivo.subloteId}`
                    : "—"}
                </td>

                {/* FECHA SIEMBRA */}
                <td className="px-4 py-3 text-xs text-[#385c47]">
                  {formatearFecha(cultivo.fechaSiembra)}
                </td>

                {/* FECHA FINALIZACIÓN */}
                <td className="px-4 py-3 text-xs text-[#385c47]">
                  {formatearFecha(cultivo.fechaFinalizacion)}
                </td>

                {/* ESTADO */}
                <td className="px-4 py-3">
                  <EstadoCultivo estado={cultivo.estado} />
                </td>

                {/* ACCIONES */}
                <td className="px-4 py-3">
                  <div className="flex justify-center gap-1.5">
                    {/* VER */}
                    <button
                      type="button"
                      title="Ver cultivo"
                      onClick={() => alVer(cultivo)}
                      className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#b9efd0] text-[#197348] transition hover:bg-[#e9f9ef]"
                    >
                      <VerIcono />
                    </button>

                    {/* EDITAR */}
                    <button
                      type="button"
                      title="Editar cultivo"
                      onClick={() => alEditar(cultivo)}
                      className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#b9efd0] text-[#197348] transition hover:bg-[#e9f9ef]"
                    >
                      <EditarIcono />
                    </button>

                    {/* ELIMINAR */}
                    <button
                      type="button"
                      title="Eliminar cultivo"
                      onClick={() => alEliminar(cultivo.id)}
                      className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-500 text-white transition hover:bg-red-600"
                    >
                      <EliminarIcono />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* =====================================================
   ESTADO DEL CULTIVO
===================================================== */

function EstadoCultivo({ estado }) {
  const estilos = {
    Sembrado: "bg-blue-100 text-blue-700",
    "En crecimiento": "bg-emerald-100 text-emerald-700",
    "En tratamiento": "bg-amber-100 text-amber-700",
    "Listo para cosecha": "bg-green-100 text-green-700",
    Cosechado: "bg-gray-100 text-gray-700",
  };

  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-semibold ${
        estilos[estado] || "bg-gray-100 text-gray-700"
      }`}
    >
      {estado || "Sin estado"}
    </span>
  );
}

/* =====================================================
   FORMATEAR FECHA
===================================================== */

function formatearFecha(fecha) {
  if (!fecha) {
    return "—";
  }

  const fechaLimpia = String(fecha).slice(0, 10);

  const fechaObjeto = new Date(
    `${fechaLimpia}T00:00:00`
  );

  if (Number.isNaN(fechaObjeto.getTime())) {
    return "—";
  }

  return fechaObjeto.toLocaleDateString("es-CO");
}

/* =====================================================
   ICONO PLANTA
===================================================== */

function PlantaIcono() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 21V9" />
      <path d="M12 13c-4 0-6-2-6-6 4 0 6 2 6 6Z" />
      <path d="M12 10c0-4 2-6 6-6 0 4-2 6-6 6Z" />
    </svg>
  );
}

/* =====================================================
   ICONO VER
===================================================== */

function VerIcono() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z" />
      <circle cx="12" cy="12" r="2.5" />
    </svg>
  );
}

/* =====================================================
   ICONO EDITAR
===================================================== */

function EditarIcono() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m4 16 9.5-9.5a2.1 2.1 0 0 1 3 3L7 19l-4 1Z" />
      <path d="m13 7 4 4" />
    </svg>
  );
}

/* =====================================================
   ICONO ELIMINAR
===================================================== */

function EliminarIcono() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 7h16" />
      <path d="M10 11v6" />
      <path d="M14 11v6" />
      <path d="m9 7 .7-2h4.6l.7 2" />
      <path d="M6 7l1 14h10l1-14" />
    </svg>
  );
}