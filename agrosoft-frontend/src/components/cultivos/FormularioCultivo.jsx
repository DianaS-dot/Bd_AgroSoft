import { useEffect, useState } from "react";

const formularioInicial = {
  nombreCultivo: "",
  tipoCultivo: "",
  descripcion: "",
  loteId: "",
  subloteId: "",
  areaM2: "",
  imgCultivo: "",
  fechaSiembra: "",
  fechaFinalizacion: "",
  costoTotal: "",
  estado: "Sembrado",
};

export default function FormularioCultivo({
  abierto,
  modoEdicion,
  cultivo,
  alCerrar,
  alGuardar,
}) {
  const [formulario, setFormulario] = useState(
    formularioInicial
  );

  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!abierto) return;

    if (modoEdicion && cultivo) {
      setFormulario({
        nombreCultivo:
          cultivo.nombreCultivo || "",
        tipoCultivo:
          cultivo.tipoCultivo || "",
        descripcion:
          cultivo.descripcion || "",
        loteId:
          cultivo.loteId?.toString() || "",
        subloteId:
          cultivo.subloteId?.toString() || "",
        areaM2:
          cultivo.areaM2?.toString() || "",
        imgCultivo:
          cultivo.imgCultivo || "",
        fechaSiembra:
          limpiarFecha(cultivo.fechaSiembra),
        fechaFinalizacion:
          limpiarFecha(
            cultivo.fechaFinalizacion
          ),
        costoTotal:
          cultivo.costoTotal?.toString() || "",
        estado:
          cultivo.estado || "Sembrado",
      });
    } else {
      setFormulario({
        ...formularioInicial,
      });
    }

    setError("");
  }, [abierto, modoEdicion, cultivo]);

  if (!abierto) {
    return null;
  }

  const cambiarCampo = (e) => {
    const { name, value } = e.target;

    setFormulario((actual) => ({
      ...actual,
      [name]: value,
    }));
  };

  const guardar = async (e) => {
    e.preventDefault();
    setError("");

    if (!formulario.nombreCultivo.trim()) {
      setError(
        "El nombre del cultivo es obligatorio."
      );
      return;
    }

    if (!formulario.tipoCultivo.trim()) {
      setError(
        "El tipo de cultivo es obligatorio."
      );
      return;
    }

    const loteId = Number(formulario.loteId);
    const subloteId = Number(
      formulario.subloteId
    );
    const costoTotal = Number(
      formulario.costoTotal
    );
    const areaM2 = Number(formulario.areaM2);

    if (
      !Number.isInteger(loteId) ||
      loteId <= 0
    ) {
      setError("El lote no es válido.");
      return;
    }

    if (
      !Number.isInteger(subloteId) ||
      subloteId <= 0
    ) {
      setError("El sublote no es válido.");
      return;
    }

    if (
      Number.isNaN(costoTotal) ||
      costoTotal < 0
    ) {
      setError(
        "El costo total no es válido."
      );
      return;
    }

    if (!formulario.fechaSiembra) {
      setError(
        "Debes indicar la fecha de siembra."
      );
      return;
    }

    if (!formulario.fechaFinalizacion) {
      setError(
        "Debes indicar la fecha de finalización."
      );
      return;
    }

    if (
  Number.isNaN(areaM2) ||
  areaM2 <= 0
) {
  setError("El área en m² no es válida.");
  return;
}

    const datos = {
      nombreCultivo:
        formulario.nombreCultivo.trim(),

      tipoCultivo:
        formulario.tipoCultivo.trim(),

      descripcion:
        formulario.descripcion.trim(),

      loteId,
      subloteId,
      areaM2,
      imgCultivo:
        formulario.imgCultivo.trim(),

      fechaSiembra:
        formulario.fechaSiembra,

      fechaFinalizacion:
        formulario.fechaFinalizacion,

      costoTotal,

      estado: formulario.estado,
    };

    try {
      setGuardando(true);

      console.log("DATOS QUE SE VAN A ENVIAR:", datos);

      await alGuardar(datos);

      alCerrar();
    } catch (error) {
  console.error("ERROR COMPLETO:", error);
  console.error("DATOS DEL SERVIDOR:", error?.response?.data);
  console.error("ESTADO:", error?.response?.status);

  const mensaje = error?.response?.data?.message;

  if (Array.isArray(mensaje)) {
    setError(mensaje.join(", "));
  } else {
    setError(
      mensaje ||
        "No se pudo guardar el cultivo."
    );
  }
}finally {
      setGuardando(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#173b2a]/45 p-4 backdrop-blur-sm">
      <div className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
        {/* Encabezado */}
        <div className="flex items-center justify-between border-b border-[#e5ece7] px-6 py-4">
          <div>
            <h2 className="text-lg font-bold text-[#126033]">
              {modoEdicion
                ? "Editar cultivo"
                : "Agregar cultivo"}
            </h2>

            <p className="mt-1 text-xs text-[#789184]">
              Completa la información del cultivo.
            </p>
          </div>

          <button
            type="button"
            onClick={alCerrar}
            disabled={guardando}
            className="flex h-8 w-8 items-center justify-center rounded-full text-[#728b7d] hover:bg-[#f0f4f1]"
          >
            ✕
          </button>
        </div>

        {/* Formulario */}
        <form
          onSubmit={guardar}
          className="space-y-4 p-6"
        >
          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Campo
              label="Nombre del cultivo"
              name="nombreCultivo"
              value={
                formulario.nombreCultivo
              }
              onChange={cambiarCampo}
              required
            />

            <Campo
              label="Tipo de cultivo"
              name="tipoCultivo"
              value={
                formulario.tipoCultivo
              }
              onChange={cambiarCampo}
              required
            />

            <Campo
              label="Lote"
              name="loteId"
              type="number"
              min="1"
              value={formulario.loteId}
              onChange={cambiarCampo}
              required
            />

            <Campo
              label="Sublote"
              name="subloteId"
              type="number"
              min="1"
              value={
                formulario.subloteId
              }
              onChange={cambiarCampo}
              required
            />
            
            <Campo
  label="Área (m²)"
  name="areaM2"
  type="number"
  min="0.01"
  step="0.01"
  value={formulario.areaM2}
  onChange={cambiarCampo}
  required
/>

            <Campo
              label="Fecha de siembra"
              name="fechaSiembra"
              type="date"
              value={
                formulario.fechaSiembra
              }
              onChange={cambiarCampo}
              required
            />

            <Campo
              label="Fecha de finalización"
              name="fechaFinalizacion"
              type="date"
              value={
                formulario.fechaFinalizacion
              }
              onChange={cambiarCampo}
              required
            />

            <Campo
              label="Costo total"
              name="costoTotal"
              type="number"
              min="0"
              step="0.01"
              value={
                formulario.costoTotal
              }
              onChange={cambiarCampo}
              required
            />

            <div>
              <label className="mb-1.5 block text-xs font-semibold text-[#254c36]">
                Estado
              </label>

              <select
                name="estado"
                value={formulario.estado}
                onChange={cambiarCampo}
                className="h-10 w-full rounded-lg border border-[#cfe0d5] bg-white px-3 text-sm text-[#284b37] outline-none focus:border-[#168343] focus:ring-2 focus:ring-[#168343]/10"
              >
                <option value="Sembrado">
                  Sembrado
                </option>

                <option value="En crecimiento">
                  En crecimiento
                </option>

                <option value="En tratamiento">
                  En tratamiento
                </option>

                <option value="Listo para cosecha">
                  Listo para cosecha
                </option>

                <option value="Cosechado">
                  Cosechado
                </option>
              </select>
            </div>
          </div>

          {/* Descripción */}
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-[#254c36]">
              Descripción
            </label>

            <textarea
              name="descripcion"
              value={
                formulario.descripcion
              }
              onChange={cambiarCampo}
              rows="4"
              placeholder="Escribe observaciones del cultivo..."
              className="w-full resize-none rounded-lg border border-[#cfe0d5] px-3 py-2 text-sm text-[#284b37] outline-none focus:border-[#168343] focus:ring-2 focus:ring-[#168343]/10"
            />
          </div>

          {/* Imagen */}
          <Campo
            label="URL de imagen"
            name="imgCultivo"
            value={
              formulario.imgCultivo
            }
            onChange={cambiarCampo}
            placeholder="https://..."
          />

          {/* Botones */}
          <div className="flex flex-col-reverse gap-2 pt-2 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={alCerrar}
              disabled={guardando}
              className="h-10 rounded-lg border border-[#bce9cd] px-5 text-sm font-semibold text-[#17663b] transition hover:bg-[#f0faf3] disabled:opacity-50"
            >
              Cancelar
            </button>

            <button
              type="submit"
              disabled={guardando}
              className="h-10 rounded-lg bg-[#126033] px-5 text-sm font-bold text-white transition hover:bg-[#0e4f29] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {guardando
                ? "Guardando..."
                : modoEdicion
                ? "Guardar cambios"
                : "Guardar cultivo"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Campo({
  label,
  name,
  type = "text",
  value,
  onChange,
  required = false,
  placeholder = "",
  min,
  step,
}) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-semibold text-[#254c36]">
        {label}
      </label>

      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        min={min}
        step={step}
        className="h-10 w-full rounded-lg border border-[#cfe0d5] bg-white px-3 text-sm text-[#284b37] outline-none transition placeholder:text-[#a0b0a5] focus:border-[#168343] focus:ring-2 focus:ring-[#168343]/10"
      />
    </div>
  );
}

function limpiarFecha(fecha) {
  if (!fecha) return "";

  return String(fecha).slice(0, 10);
}