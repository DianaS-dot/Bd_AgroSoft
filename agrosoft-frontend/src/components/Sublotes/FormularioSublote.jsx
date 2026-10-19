
import { useState } from "react";

function FormularioSublote({
  lote,
  sublote = null,
  onGuardar,
  onCerrar,
  guardando = false,
}) {
  const [nombre, setNombre] = useState(sublote?.nombre || "");

  const [areaHa, setAreaHa] = useState(
    sublote?.areaHa != null
      ? String(sublote.areaHa)
      : sublote?.areaM2 != null
        ? String(Number(sublote.areaM2) / 10000)
        : ""
  );

  const [descripcion, setDescripcion] = useState(
    sublote?.descripcion || ""
  );

  const [estado, setEstado] = useState(
    sublote?.estado || "Activo"
  );

  const [error, setError] = useState("");

  // ------------------------------------------------
  // GUARDAR O ACTUALIZAR SUBLOTE
  // ------------------------------------------------

  const manejarEnvio = async (e) => {
    e.preventDefault();
    setError("");

    const nombreLimpio = nombre.trim();
    const hectareas = Number(areaHa);

    if (!nombreLimpio) {
      setError("Escribe el nombre del sublote.");
      return;
    }

    if (!Number.isFinite(hectareas) || hectareas <= 0) {
      setError("Ingresa un área mayor que cero.");
      return;
    }

    if (!lote?.id) {
      setError("No se encontró el lote asociado.");
      return;
    }

    const datos = {
      nombre: nombreLimpio,
      loteId: Number(lote.id),
      areaHa: hectareas,
      areaM2: hectareas * 10000,

      // Se conservan los datos geométricos existentes al editar.
      geom: sublote?.geom ?? "",
      centroide: sublote?.centroide ?? "",

      descripcion: descripcion.trim(),
      estado,
    };

    try {
      await onGuardar(datos);
    } catch (err) {
      console.error("Error al guardar el sublote:", err);

      const mensaje = err.response?.data?.message;

      setError(
        Array.isArray(mensaje)
          ? mensaje.join(", ")
          : typeof mensaje === "string"
            ? mensaje
            : "No fue posible guardar el sublote. Revisa el backend."
      );
    }
  };

  // ------------------------------------------------
  // INTERFAZ
  // ------------------------------------------------

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/40 p-4">
      <div className="my-auto w-full max-w-lg rounded-2xl bg-white shadow-xl">

        {/* ENCABEZADO */}
        <div className="flex items-start justify-between border-b border-[#E1E9E3] p-5">
          <div>
            <h2 className="text-xl font-semibold text-[#164D35]">
              {sublote ? "Editar sublote" : "Agregar sublote"}
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Lote: {lote?.nombre || `#${lote?.id}`}
            </p>
          </div>

          <button
            type="button"
            onClick={onCerrar}
            disabled={guardando}
            aria-label="Cerrar formulario"
            className="rounded-lg px-3 py-1 text-xl text-gray-500 hover:bg-gray-100 disabled:opacity-50"
          >
            ×
          </button>
        </div>

        {/* FORMULARIO */}
        <form
          onSubmit={manejarEnvio}
          className="space-y-4 p-5"
        >
          {/* ERROR */}
          {error && (
            <div
              role="alert"
              className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600"
            >
              {error}
            </div>
          )}

          {/* NOMBRE */}
          <div>
            <label
              htmlFor="nombreSublote"
              className="mb-1.5 block text-sm font-medium text-gray-700"
            >
              Nombre del sublote *
            </label>

            <input
              id="nombreSublote"
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Ej. Sublote Norte"
              maxLength={100}
              required
              disabled={guardando}
              className="w-full rounded-lg border border-[#D5E2D9] px-3 py-2.5 text-sm outline-none focus:border-[#25804A] focus:ring-2 focus:ring-[#25804A]/20 disabled:bg-gray-100"
            />
          </div>

          {/* LOTE ASOCIADO */}
          <div>
            <label
              htmlFor="loteSublote"
              className="mb-1.5 block text-sm font-medium text-gray-700"
            >
              Lote asociado
            </label>

            <input
              id="loteSublote"
              type="text"
              value={lote?.nombre || `Lote #${lote?.id}`}
              readOnly
              className="w-full rounded-lg border border-[#D5E2D9] bg-gray-50 px-3 py-2.5 text-sm text-gray-600"
            />

            <p className="mt-1 text-xs text-gray-500">
              El sublote quedará relacionado con este lote.
            </p>
          </div>

          {/* ÁREA */}
          <div>
            <label
              htmlFor="areaSublote"
              className="mb-1.5 block text-sm font-medium text-gray-700"
            >
              Área en hectáreas *
            </label>

            <input
              id="areaSublote"
              type="number"
              min="0.0001"
              step="any"
              value={areaHa}
              onChange={(e) => setAreaHa(e.target.value)}
              placeholder="Ej. 0.5"
              required
              disabled={guardando}
              className="w-full rounded-lg border border-[#D5E2D9] px-3 py-2.5 text-sm outline-none focus:border-[#25804A] focus:ring-2 focus:ring-[#25804A]/20 disabled:bg-gray-100"
            />

            {areaHa !== "" &&
              Number.isFinite(Number(areaHa)) &&
              Number(areaHa) > 0 && (
                <p className="mt-1 text-xs text-gray-500">
                  Equivale a{" "}
                  {(Number(areaHa) * 10000).toLocaleString("es-CO")} m².
                </p>
              )}
          </div>

          {/* DESCRIPCIÓN */}
          <div>
            <label
              htmlFor="descripcionSublote"
              className="mb-1.5 block text-sm font-medium text-gray-700"
            >
              Descripción
            </label>

            <textarea
              id="descripcionSublote"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              placeholder="Describe este sublote..."
              rows={3}
              disabled={guardando}
              className="w-full resize-y rounded-lg border border-[#D5E2D9] px-3 py-2.5 text-sm outline-none focus:border-[#25804A] focus:ring-2 focus:ring-[#25804A]/20 disabled:bg-gray-100"
            />
          </div>

          {/* ESTADO */}
          <div>
            <label
              htmlFor="estadoSublote"
              className="mb-1.5 block text-sm font-medium text-gray-700"
            >
              Estado
            </label>

            <select
              id="estadoSublote"
              value={estado}
              onChange={(e) => setEstado(e.target.value)}
              disabled={guardando}
              className="w-full rounded-lg border border-[#D5E2D9] bg-white px-3 py-2.5 text-sm outline-none focus:border-[#25804A] disabled:bg-gray-100"
            >
              <option value="Activo">Activo</option>
              <option value="Inactivo">Inactivo</option>
            </select>
          </div>

          {/* BOTONES */}
          <div className="flex flex-col-reverse gap-3 border-t border-[#E1E9E3] pt-4 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onCerrar}
              disabled={guardando}
              className="rounded-lg border border-[#D5E2D9] px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
            >
              Cancelar
            </button>

            <button
              type="submit"
              disabled={guardando}
              className="rounded-lg bg-[#125D32] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0E4C29] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {guardando
                ? "Guardando..."
                : sublote
                  ? "Guardar cambios"
                  : "Guardar sublote"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FormularioSublote;