export default function DetalleCultivo({
  cultivo,
  alCerrar,
}) {
  if (!cultivo) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#173b2a]/45 p-4 backdrop-blur-sm">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-[#e5ece7] px-6 py-4">
          <div>
            <h2 className="text-lg font-bold text-[#126033]">
              {cultivo.nombreCultivo}
            </h2>

            <p className="text-xs text-[#789184]">
              Cultivo #{cultivo.id}
            </p>
          </div>

          <button
            type="button"
            onClick={alCerrar}
            className="flex h-8 w-8 items-center justify-center rounded-full text-[#728b7d] hover:bg-[#f0f4f1]"
          >
            ✕
          </button>
        </div>

        <div className="space-y-5 p-6">
          {cultivo.imgCultivo && (
            <img
              src={cultivo.imgCultivo}
              alt={cultivo.nombreCultivo}
              className="h-56 w-full rounded-xl object-cover"
              onError={(e) => {
                e.currentTarget.style.display =
                  "none";
              }}
            />
          )}

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Dato
              nombre="Tipo"
              valor={cultivo.tipoCultivo}
            />

            <Dato
              nombre="Estado"
              valor={cultivo.estado}
            />

            <Dato
              nombre="Lote"
              valor={`Lote ${cultivo.loteId}`}
            />

            <Dato
              nombre="Sublote"
              valor={`Sublote ${cultivo.subloteId}`}
            />

            <Dato
              nombre="Fecha de siembra"
              valor={formatearFecha(
                cultivo.fechaSiembra
              )}
            />

            <Dato
              nombre="Fecha de finalización"
              valor={formatearFecha(
                cultivo.fechaFinalizacion
              )}
            />

            <Dato
              nombre="Costo total"
              valor={formatearMoneda(
                cultivo.costoTotal
              )}
            />
          </div>

          <div>
            <p className="mb-1 text-xs font-semibold text-[#789184]">
              Descripción
            </p>

            <p className="rounded-lg bg-[#f8faf8] p-4 text-sm text-[#294e3a]">
              {cultivo.descripcion ||
                "Sin descripción"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Dato({ nombre, valor }) {
  return (
    <div className="rounded-lg border border-[#e5ece7] p-3">
      <p className="text-[11px] font-semibold text-[#789184]">
        {nombre}
      </p>

      <p className="mt-1 text-sm font-semibold text-[#294e3a]">
        {valor}
      </p>
    </div>
  );
}

function formatearFecha(fecha) {
  if (!fecha) {
    return "—";
  }

  const limpia = String(fecha).slice(0, 10);

  const fechaObjeto = new Date(
    `${limpia}T00:00:00`
  );

  if (Number.isNaN(fechaObjeto.getTime())) {
    return "—";
  }

  return fechaObjeto.toLocaleDateString(
    "es-CO"
  );
}

function formatearMoneda(valor) {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(valor || 0);
}