function DetalleLote({ lote, onCerrar }) {
  if (!lote) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">

      <div className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl bg-white shadow-xl">

        <div className="flex items-center justify-between border-b border-gray-100 p-5">

          <div>
            <h2 className="text-lg font-semibold text-[#14532D]">
              {lote.nombre}
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Información del lote
            </p>
          </div>

          <button
            type="button"
            onClick={onCerrar}
            className="text-xl text-gray-400 hover:text-gray-600"
          >
            ×
          </button>

        </div>

        <div className="space-y-4 p-5">

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">

            <div className="rounded-lg bg-[#F7F9F7] p-4">
              <p className="text-xs text-[#5A9C76]">
                ID
              </p>

              <p className="mt-1 font-semibold text-[#164D35]">
                {lote.id}
              </p>
            </div>

            <div className="rounded-lg bg-[#F7F9F7] p-4">
              <p className="text-xs text-[#5A9C76]">
                Estado
              </p>

              <p className="mt-1 font-semibold text-[#164D35]">
                {lote.estado || "Activo"}
              </p>
            </div>

            <div className="rounded-lg bg-[#F7F9F7] p-4">
              <p className="text-xs text-[#5A9C76]">
                Área m²
              </p>

              <p className="mt-1 font-semibold text-[#164D35]">
                {lote.areaM2 ?? "No registrada"}
              </p>
            </div>

            <div className="rounded-lg bg-[#F7F9F7] p-4">
              <p className="text-xs text-[#5A9C76]">
                Área ha
              </p>

              <p className="mt-1 font-semibold text-[#164D35]">
                {lote.areaHa ?? "No registrada"}
              </p>
            </div>

          </div>

          <div className="rounded-lg bg-[#F7F9F7] p-4">
            <p className="text-xs text-[#5A9C76]">
              Descripción
            </p>

            <p className="mt-1 text-sm text-[#164D35]">
              {lote.descripcion || "Sin descripción"}
            </p>
          </div>

          <div className="rounded-lg bg-[#F7F9F7] p-4">
            <p className="text-xs text-[#5A9C76]">
              Sublotes
            </p>

            <p className="mt-1 font-semibold text-[#164D35]">
              {lote.sublotes?.length || 0}
            </p>
          </div>

        </div>

        <div className="border-t border-gray-100 p-5">

          <button
            type="button"
            onClick={onCerrar}
            className="w-full rounded-lg bg-[#125D32] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#0E4C29]"
          >
            Cerrar
          </button>

        </div>

      </div>

    </div>
  );
}

export default DetalleLote;