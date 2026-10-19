import { useEffect, useState } from "react";

const estadoInicial = {
  nombre: "",
  areaM2: "",
  areaHa: "",
  descripcion: "",
  geom: "",
  centroide: "",
  estado: "ACTIVO",
};

function FormularioLote({
  lote,
  onGuardar,
  onCerrar,
  guardando,
}) {
  const [formulario, setFormulario] = useState(estadoInicial);

  useEffect(() => {
    if (lote) {
      setFormulario({
        nombre: lote.nombre || "",
        areaM2: lote.areaM2 ?? "",
        areaHa: lote.areaHa ?? "",
        descripcion: lote.descripcion || "",
        geom: lote.geom || "",
        centroide: lote.centroide || "",
        estado: lote.estado || "ACTIVO",
      });
    } else {
      setFormulario(estadoInicial);
    }
  }, [lote]);

  const cambiarCampo = (e) => {
    const { name, value } = e.target;

    setFormulario((anterior) => ({
      ...anterior,
      [name]: value,
    }));
  };

  const enviarFormulario = (e) => {
    e.preventDefault();

    const datos = {
      nombre: formulario.nombre,
      areaM2:
        formulario.areaM2 === ""
          ? null
          : Number(formulario.areaM2),
      areaHa:
        formulario.areaHa === ""
          ? null
          : Number(formulario.areaHa),
      descripcion: formulario.descripcion,
      geom: formulario.geom,
      centroide: formulario.centroide,
      estado: formulario.estado,
    };

    onGuardar(datos);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">

      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-xl">

        {/* ENCABEZADO */}
        <div className="flex items-center justify-between border-b border-gray-100 p-5">

          <div>
            <h2 className="text-lg font-semibold text-[#14532D]">
              {lote ? "Editar lote" : "Agregar lote"}
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              {lote
                ? "Actualiza la información del lote"
                : "Registra un nuevo lote en tu finca"}
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

        {/* FORMULARIO */}
        <form onSubmit={enviarFormulario} className="p-5">

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

            {/* NOMBRE */}
            <div className="sm:col-span-2">
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Nombre del lote
              </label>

              <input
                type="text"
                name="nombre"
                value={formulario.nombre}
                onChange={cambiarCampo}
                required
                placeholder="Ej. Lote Norte"
                className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-[#2BAE66]"
              />
            </div>

            {/* ÁREA M2 */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Área m²
              </label>

              <input
                type="number"
                name="areaM2"
                value={formulario.areaM2}
                onChange={cambiarCampo}
                min="0"
                step="0.01"
                placeholder="Ej. 55000"
                className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-[#2BAE66]"
              />
            </div>

            {/* ÁREA HA */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Área ha
              </label>

              <input
                type="number"
                name="areaHa"
                value={formulario.areaHa}
                onChange={cambiarCampo}
                min="0"
                step="0.01"
                placeholder="Ej. 5.5"
                className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-[#2BAE66]"
              />
            </div>

            {/* ESTADO */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Estado
              </label>

              <select
                name="estado"
                value={formulario.estado}
                onChange={cambiarCampo}
                className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#2BAE66]"
              >
                <option value="ACTIVO">Activo</option>
                <option value="INACTIVO">Inactivo</option>
              </select>
            </div>

            {/* DESCRIPCIÓN */}
            <div className="sm:col-span-2">
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Descripción
              </label>

              <textarea
                name="descripcion"
                value={formulario.descripcion}
                onChange={cambiarCampo}
                rows="3"
                placeholder="Descripción del lote..."
                className="w-full resize-none rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-[#2BAE66]"
              />
            </div>

            {/* GEOM */}
            <div className="sm:col-span-2">
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Geometría
              </label>

              <textarea
                name="geom"
                value={formulario.geom}
                onChange={cambiarCampo}
                rows="2"
                placeholder="Geometría del lote"
                className="w-full resize-none rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-[#2BAE66]"
              />
            </div>

            {/* CENTROIDE */}
            <div className="sm:col-span-2">
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Centroide
              </label>

              <input
                type="text"
                name="centroide"
                value={formulario.centroide}
                onChange={cambiarCampo}
                placeholder="Centroide"
                className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-[#2BAE66]"
              />
            </div>

          </div>

          {/* BOTONES */}
          <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">

            <button
              type="button"
              onClick={onCerrar}
              className="rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50"
            >
              Cancelar
            </button>

            <button
              type="submit"
              disabled={guardando}
              className="rounded-lg bg-[#125D32] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#0E4C29] disabled:opacity-50"
            >
              {guardando
                ? "Guardando..."
                : lote
                ? "Guardar cambios"
                : "Agregar lote"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default FormularioLote;