
function TarjetaSublote({
  sublote,
  onEditar,
  onEliminar,
}) {
  const area =
    sublote.areaHa !== undefined && sublote.areaHa !== null
      ? `${sublote.areaHa} ha`
      : sublote.areaM2 !== undefined && sublote.areaM2 !== null
        ? `${sublote.areaM2} m²`
        : "Sin área";

  return (
    <div className="rounded-lg border border-[#E1E9E3] bg-white p-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h4 className="font-semibold text-[#14532D]">
            {sublote.nombre || `Sublote #${sublote.id}`}
          </h4>

          <p className="mt-1 text-xs text-gray-500">
            ID: {sublote.id}
          </p>
        </div>

        <span className="w-fit rounded-full bg-[#DDF9E8] px-3 py-1 text-xs font-medium text-[#15803D]">
          {sublote.estado || "Activo"}
        </span>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="rounded-lg bg-[#F4F8F5] p-3">
          <p className="text-xs text-gray-500">Área</p>
          <p className="mt-1 text-sm font-semibold text-[#164D35]">
            {area}
          </p>
        </div>

        <div className="rounded-lg bg-[#F4F8F5] p-3">
          <p className="text-xs text-gray-500">Descripción</p>
          <p className="mt-1 text-sm text-gray-700">
            {sublote.descripcion || "Sin descripción"}
          </p>
        </div>

        <div className="rounded-lg bg-[#F4F8F5] p-3">
          <p className="text-xs text-gray-500">Cultivo</p>
          <p className="mt-1 text-sm text-gray-700">
            {sublote.cultivo?.nombre ||
              sublote.cultivo ||
              "Sin cultivo"}
          </p>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap justify-end gap-2 border-t border-[#E1E9E3] pt-3">
        <button
          type="button"
          onClick={() => onEditar(sublote)}
          className="rounded-lg border border-[#C9DCCF] px-4 py-2 text-sm font-medium text-[#14532D] transition hover:bg-[#F0F8F2]"
        >
          Editar
        </button>

        <button
          type="button"
          onClick={() => onEliminar(sublote)}
          className="rounded-lg border border-red-200 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
        >
          Eliminar
        </button>
      </div>
    </div>
  );
}

export default TarjetaSublote;