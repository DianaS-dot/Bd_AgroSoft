import { useState } from "react";
import TarjetaSublote from "../Sublotes/TarjetaSublote";

function TarjetaLote({
  lote,
  onVer,
  onEditar,
  onEliminar,
  onAgregarSublote,
  onEditarSublote,
  onEliminarSublote,
}) {
  const [mostrarSublotes, setMostrarSublotes] = useState(false);

  const sublotes = lote.sublotes || [];

  const area =
    lote.areaHa !== undefined && lote.areaHa !== null
      ? `${lote.areaHa} ha`
      : lote.areaM2 !== undefined && lote.areaM2 !== null
      ? `${lote.areaM2} m²`
      : "Sin área";

  return (
    <div>
      <article className="rounded-xl border border-[#E1E9E3] bg-white p-4 sm:p-5 shadow-sm hover:shadow-md transition">

        
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">

          <div className="flex items-start gap-3">

            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[#B9EBCB] bg-[#F7FFF9] text-xl text-[#15803D]">
              ›
            </div>

            <div>
              <h2 className="text-base font-semibold text-[#14532D]">
                {lote.nombre || `Lote #${lote.id}`}
              </h2>

              <p className="mt-1 text-sm text-[#6AA181]">
                 {lote.descripcion || "Sin descripción"}
              </p>
            </div>

          </div>

          <span className="w-fit rounded-full bg-[#DDF9E8] px-3 py-1 text-xs font-medium text-[#15803D]">
            {lote.estado || "Activo"}
          </span>

        </div>

       
        <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-3">
          <div className="rounded-lg bg-[#F7F9F7] px-3 py-3">
            <p className="text-[10px] font-medium uppercase text-[#5A9C76]">
              Área
            </p>

            <p className="mt-1 text-sm font-semibold text-[#164D35]">
              {area}
            </p>
          </div>

          <div className="rounded-lg bg-[#F7F9F7] px-3 py-3">
            <p className="text-[10px] font-medium uppercase text-[#5A9C76]">
              Sublotes
            </p>

            <p className="mt-1 text-sm font-semibold text-[#164D35]">
              {sublotes.length}
            </p>
          </div>

          <div className="rounded-lg bg-[#F7F9F7] px-3 py-3">
            <p className="text-[10px] font-medium uppercase text-[#5A9C76]">
              Descripción
            </p>

            <p className="mt-1 truncate text-sm font-semibold text-[#164D35]">
              {lote.descripcion || "Sin descripción"}
            </p>
          </div>

        </div>

        {/* BOTONES */}
    
<div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
  <div className="flex flex-wrap gap-2">
    <button
      type="button"
      onClick={() => onVer(lote)}
      className="rounded-lg border border-[#B9EBCB] px-3 py-2 text-xs font-medium text-[#176B3A] transition hover:bg-[#F0FFF4]"
    >
      👁 Ver
    </button>

    <button
      type="button"
      onClick={() => onEditar(lote)}
      className="rounded-lg border border-[#B9EBCB] px-3 py-2 text-xs font-medium text-[#176B3A] transition hover:bg-[#F0FFF4]"
    >
      ✎ Editar
    </button>

    <button
      type="button"
      onClick={() => onEliminar(lote)}
      className="rounded-lg bg-red-500 px-3 py-2 text-xs font-medium text-white transition hover:bg-red-600"
    >
      🗑 Eliminar
    </button>

    {/* AGREGAR SUBLOTE */}
    <button
      type="button"
      onClick={() => onAgregarSublote(lote)}
      className="rounded-lg bg-[#15803D] px-3 py-2 text-xs font-medium text-white transition hover:bg-[#166534]"
    >
      + Agregar sublote
    </button>
  </div>

  <button
    type="button"
    onClick={() => setMostrarSublotes(!mostrarSublotes)}
    className="rounded-lg border border-[#B9EBCB] px-3 py-2 text-xs font-medium text-[#176B3A] transition hover:bg-[#F0FFF4]"
  >
    ▱{" "}
    {mostrarSublotes
      ? "Ocultar sublotes"
      : `Ver sublotes (${sublotes.length})`}
  </button>
</div>


          

      </article>
  


      {/* SUBLOTES */}
      {mostrarSublotes && (
        <div className="mt-3 rounded-xl border border-[#DCE9DF] bg-[#FAFCFA] p-4">

          <div className="mb-4 flex items-center justify-between">

            <div>
              <h3 className="text-sm font-semibold text-[#164D35]">
                Sublotes de {lote.nombre}
              </h3>

              <p className="mt-1 text-xs text-gray-500">
                Información de los sublotes asociados
              </p>
            </div>

          </div>

          {sublotes.length === 0 ? (
            <div className="rounded-lg border border-dashed border-[#CFE0D4] bg-white p-6 text-center">
              <p className="text-sm text-gray-500">
                Este lote no tiene sublotes registrados.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
           
{sublotes.map((sublote) => (
  <TarjetaSublote
    key={sublote.id}
    sublote={sublote}
    onEditar={
      typeof onEditarSublote === "function"
        ? onEditarSublote
        : () => console.error(
            "Falta la función onEditarSublote en TarjetaLote"
          )
    }
    onEliminar={
      typeof onEliminarSublote === "function"
        ? onEliminarSublote
        : () => console.error(
            "Falta la función onEliminarSublote en TarjetaLote"
          )
    }
  />
))}

            </div>
          )}

        </div>
      )}

    </div>
  );
}

export default TarjetaLote;