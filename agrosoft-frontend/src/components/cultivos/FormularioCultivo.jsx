
import { useEffect, useState } from "react";
import ServicioLotes from "../../services/ServicioLotes";
import ServicioSublotes from "../../services/ServicioSublotes";

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

// Acepta diferentes nombres de campos del backend.
function obtenerNombreLote(lote) {
  return (
    lote.nombreLote ??
    lote.nombre ??
    lote.name ??
    lote.codigo ??
    `Lote ${lote.id}`
  );
}

function obtenerNombreSublote(sublote) {
  return (
    sublote.nombreSublote ??
    sublote.nombre ??
    sublote.codigo ??
    `Sublote ${sublote.id}`
  );
}

// Obtener el ID del lote al que pertenece el sublote.
function obtenerIdLoteDelSublote(sublote) {
  const id =
    sublote.loteId ??
    sublote.lote_id ??
    sublote.lote?.id;

  return id == null ? null : Number(id);
}

function obtenerLista(respuesta) {
  if (Array.isArray(respuesta)) return respuesta;
  if (Array.isArray(respuesta?.data)) return respuesta.data;
  return [];
}

export default function FormularioCultivo({
  abierto,
  modoEdicion,
  cultivo,
  alCerrar,
  alGuardar,
}) {
  const [formulario, setFormulario] = useState({
    ...formularioInicial,
  });

  const [lotes, setLotes] = useState([]);
  const [sublotes, setSublotes] = useState([]);
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState("");
  const [cargandoDatos, setCargandoDatos] = useState(false);

  // Cargar el cultivo cuando se abre el formulario.
  useEffect(() => {
    if (!abierto) return;

    if (modoEdicion && cultivo) {
      setFormulario({
        nombreCultivo: cultivo.nombreCultivo ?? "",
        tipoCultivo: cultivo.tipoCultivo ?? "",
        descripcion: cultivo.descripcion ?? "",
        loteId: String(
          cultivo.loteId ?? cultivo.lote?.id ?? ""
        ),
        subloteId: String(
          cultivo.subloteId ?? cultivo.sublote?.id ?? ""
        ),
        areaM2: String(cultivo.areaM2 ?? ""),
        imgCultivo: cultivo.imgCultivo ?? "",
        fechaSiembra: limpiarFecha(cultivo.fechaSiembra),
        fechaFinalizacion: limpiarFecha(
          cultivo.fechaFinalizacion
        ),
        costoTotal: String(cultivo.costoTotal ?? ""),
        estado: cultivo.estado ?? "Sembrado",
      });
    } else {
      setFormulario({ ...formularioInicial });
    }

    setError("");
  }, [abierto, modoEdicion, cultivo]);

  // Cargar lotes y sublotes reales desde el backend.
  useEffect(() => {
    if (!abierto) return;

    let activo = true;

    async function cargarDatos() {
      try {
        setCargandoDatos(true);
        setError("");

        const [respuestaLotes, respuestaSublotes] =
          await Promise.all([
            ServicioLotes.obtenerLotes(),
            ServicioSublotes.obtenerSublotes(),
          ]);

        const listaLotes = obtenerLista(respuestaLotes);
        const listaSublotes = obtenerLista(respuestaSublotes);

        console.log("LOTES RECIBIDOS:", listaLotes);
        console.log("SUBLOTES RECIBIDOS:", listaSublotes);

        if (activo) {
          setLotes(listaLotes);
          setSublotes(listaSublotes);
        }
      } catch (err) {
        console.error("Error al cargar lotes y sublotes:", err);

        if (activo) {
          setError(
            "No se pudieron cargar los lotes y sublotes. Intenta nuevamente."
          );
        }
      } finally {
        if (activo) setCargandoDatos(false);
      }
    }

    cargarDatos();

    return () => {
      activo = false;
    };
  }, [abierto]);

  // Cambiar campos. Al cambiar el lote, borrar el sublote.
  const cambiarCampo = (e) => {
    const { name, value } = e.target;

    setFormulario((actual) => ({
      ...actual,
      [name]: value,
      ...(name === "loteId" ? { subloteId: "" } : {}),
    }));

    setError("");
  };

  // Mostrar solo los sublotes pertenecientes al lote elegido.
  const sublotesFiltrados = sublotes.filter((sublote) => {
    if (!formulario.loteId) return false;

    const idLote = obtenerIdLoteDelSublote(sublote);

    // Si no se conoce la relación, no mostrar el sublote.
    return (
      idLote !== null &&
      idLote === Number(formulario.loteId)
    );
  });

  // Validar y guardar el cultivo.
  const guardar = async (e) => {
    e.preventDefault();
    setError("");

    if (!formulario.nombreCultivo.trim()) {
      setError("El nombre del cultivo es obligatorio.");
      return;
    }

    if (!formulario.tipoCultivo.trim()) {
      setError("El tipo de cultivo es obligatorio.");
      return;
    }

    const loteId = Number(formulario.loteId);
    const subloteId = Number(formulario.subloteId);
    const areaM2 = Number(formulario.areaM2);
    const costoTotal = Number(formulario.costoTotal);

    // Verificar que el lote elegido exista.
    const loteExiste = lotes.some(
      (lote) => Number(lote.id) === loteId
    );

    if (
      !formulario.loteId ||
      !Number.isInteger(loteId) ||
      loteId <= 0 ||
      !loteExiste
    ) {
      setError("Selecciona un lote existente.");
      return;
    }

    // Verificar que el sublote exista.
    const subloteSeleccionado = sublotes.find(
      (sublote) => Number(sublote.id) === subloteId
    );

    if (
      !formulario.subloteId ||
      !Number.isInteger(subloteId) ||
      subloteId <= 0 ||
      !subloteSeleccionado
    ) {
      setError("Selecciona un sublote existente.");
      return;
    }

    // Comprobar que el sublote pertenezca al lote seleccionado.
    const idLoteDelSublote =
      obtenerIdLoteDelSublote(subloteSeleccionado);

    if (
      idLoteDelSublote === null ||
      idLoteDelSublote !== loteId
    ) {
      setError(
        "El sublote seleccionado no pertenece al lote elegido."
      );
      return;
    }

    if (
      formulario.areaM2 === "" ||
      !Number.isFinite(areaM2) ||
      areaM2 <= 0
    ) {
      setError("El área debe ser un número mayor que cero.");
      return;
    }

    if (
      formulario.costoTotal === "" ||
      !Number.isFinite(costoTotal) ||
      costoTotal < 0
    ) {
      setError("El costo debe ser un número igual o mayor que cero.");
      return;
    }

    if (!formulario.fechaSiembra) {
      setError("Debes indicar la fecha de siembra.");
      return;
    }

    if (!formulario.fechaFinalizacion) {
      setError("Debes indicar la fecha de finalización.");
      return;
    }

    if (
      formulario.fechaFinalizacion < formulario.fechaSiembra
    ) {
      setError(
        "La fecha de finalización no puede ser anterior a la siembra."
      );
      return;
    }

    // Se envían los IDs reales de los registros seleccionados.
    // Los nombres son únicamente lo que ve el usuario.
    const datos = {
      nombreCultivo: formulario.nombreCultivo.trim(),
      tipoCultivo: formulario.tipoCultivo.trim(),
      descripcion: formulario.descripcion.trim(),
      loteId,
      subloteId,
      areaM2,
      imgCultivo: formulario.imgCultivo.trim(),
      fechaSiembra: formulario.fechaSiembra,
      fechaFinalizacion: formulario.fechaFinalizacion,
      costoTotal,
      estado: formulario.estado,
    };

    try {
      setGuardando(true);

      console.log("LOTE SELECCIONADO:", {
        id: loteId,
        nombre: obtenerNombreLote(
          lotes.find((lote) => Number(lote.id) === loteId)
        ),
      });

      console.log("SUBLOTE SELECCIONADO:", {
        id: subloteId,
        nombre: obtenerNombreSublote(subloteSeleccionado),
        loteId: idLoteDelSublote,
      });

      console.log("DATOS QUE SE VAN A ENVIAR:", datos);

      await alGuardar(datos);
      alCerrar();
    } catch (err) {
      console.error("Error al guardar:", err);
      console.error("Respuesta del servidor:", err?.response?.data);

      const mensaje = err?.response?.data?.message;

      setError(
        Array.isArray(mensaje)
          ? mensaje.join(", ")
          : mensaje || err?.message || "No se pudo guardar el cultivo."
      );
    } finally {
      setGuardando(false);
    }
  };

  if (!abierto) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#173b2a]/45 p-4 backdrop-blur-sm">
      <div className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl">

        <div className="flex items-center justify-between border-b border-[#e5ece7] px-6 py-4">
          <div>
            <h2 className="text-lg font-bold text-[#126033]">
              {modoEdicion ? "Editar cultivo" : "Agregar cultivo"}
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

        <form onSubmit={guardar} className="space-y-4 p-6">
          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          {cargandoDatos && (
            <p className="text-sm text-[#789184]">
              Cargando lotes y sublotes...
            </p>
          )}

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Campo
              label="Nombre del cultivo"
              name="nombreCultivo"
              value={formulario.nombreCultivo}
              onChange={cambiarCampo}
              required
            />

            <Campo
              label="Tipo de cultivo"
              name="tipoCultivo"
              value={formulario.tipoCultivo}
              onChange={cambiarCampo}
              required
            />

            {/* Seleccionar lote por su nombre */}
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-[#254c36]">
                Lote
              </label>

              <select
                name="loteId"
                value={formulario.loteId}
                onChange={cambiarCampo}
                required
                disabled={cargandoDatos || lotes.length === 0}
                className="h-10 w-full rounded-lg border border-[#cfe0d5] bg-white px-3 text-sm text-[#284b37] outline-none focus:border-[#168343] focus:ring-2 focus:ring-[#168343]/10 disabled:bg-gray-100"
              >
                <option value="">
                  {cargandoDatos
                    ? "Cargando lotes..."
                    : lotes.length === 0
                    ? "No hay lotes registrados"
                    : "Selecciona un lote"}
                </option>

                {lotes.map((lote) => (
                  <option key={lote.id} value={String(lote.id)}>
                    {obtenerNombreLote(lote)}
                  </option>
                ))}
              </select>
            </div>

            {/* Seleccionar sublote por su nombre */}
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-[#254c36]">
                Sublote
              </label>

              <select
                name="subloteId"
                value={formulario.subloteId}
                onChange={cambiarCampo}
                required
                disabled={
                  cargandoDatos ||
                  !formulario.loteId ||
                  sublotesFiltrados.length === 0
                }
                className="h-10 w-full rounded-lg border border-[#cfe0d5] bg-white px-3 text-sm text-[#284b37] outline-none focus:border-[#168343] focus:ring-2 focus:ring-[#168343]/10 disabled:bg-gray-100"
              >
                <option value="">
                  {!formulario.loteId
                    ? "Selecciona primero un lote"
                    : cargandoDatos
                    ? "Cargando sublotes..."
                    : sublotesFiltrados.length === 0
                    ? "Este lote no tiene sublotes"
                    : "Selecciona un sublote"}
                </option>

                {sublotesFiltrados.map((sublote) => (
                  <option
                    key={sublote.id}
                    value={String(sublote.id)}
                  >
                    {obtenerNombreSublote(sublote)}
                  </option>
                ))}
              </select>
            </div>

            <Campo
              label="Área (m²)"
              name="areaM2"
              type="number"
              min="0.01"
              step="any"
              value={formulario.areaM2}
              onChange={cambiarCampo}
              required
            />

            <Campo
              label="Fecha de siembra"
              name="fechaSiembra"
              type="date"
              value={formulario.fechaSiembra}
              onChange={cambiarCampo}
              required
            />

            <Campo
              label="Fecha de finalización"
              name="fechaFinalizacion"
              type="date"
              value={formulario.fechaFinalizacion}
              onChange={cambiarCampo}
              required
            />

            <Campo
              label="Costo total"
              name="costoTotal"
              type="number"
              min="0"
              step="any"
              value={formulario.costoTotal}
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
                <option value="Sembrado">Sembrado</option>
                <option value="En crecimiento">En crecimiento</option>
                <option value="En tratamiento">En tratamiento</option>
                <option value="Listo para cosecha">Listo para cosecha</option>
                <option value="Cosechado">Cosechado</option>
              </select>
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-semibold text-[#254c36]">
              Descripción
            </label>

            <textarea
              name="descripcion"
              value={formulario.descripcion}
              onChange={cambiarCampo}
              rows={4}
              placeholder="Puedes escribir letras, números y símbolos..."
              className="w-full resize-none rounded-lg border border-[#cfe0d5] px-3 py-2 text-sm text-[#284b37] outline-none focus:border-[#168343] focus:ring-2 focus:ring-[#168343]/10"
            />
          </div>

          <Campo
            label="URL de imagen"
            name="imgCultivo"
            value={formulario.imgCultivo}
            onChange={cambiarCampo}
            placeholder="https://..."
          />

          <div className="flex flex-col-reverse gap-2 pt-2 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={alCerrar}
              disabled={guardando}
              className="h-10 rounded-lg border border-[#bce9cd] px-5 text-sm font-semibold text-[#17663b] hover:bg-[#f0faf3] disabled:opacity-50"
            >
              Cancelar
            </button>

            <button
              type="submit"
              disabled={guardando || cargandoDatos}
              className="h-10 rounded-lg bg-[#126033] px-5 text-sm font-bold text-white hover:bg-[#0e4f29] disabled:cursor-not-allowed disabled:opacity-60"
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
        className="h-10 w-full rounded-lg border border-[#cfe0d5] bg-white px-3 text-sm text-[#284b37] outline-none placeholder:text-[#a0b0a5] focus:border-[#168343] focus:ring-2 focus:ring-[#168343]/10"
      />
    </div>
  );
}

function limpiarFecha(fecha) {
  if (!fecha) return "";
  return String(fecha).slice(0, 10);
}
