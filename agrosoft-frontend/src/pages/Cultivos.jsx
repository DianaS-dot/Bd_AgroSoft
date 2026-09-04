import { useEffect, useMemo, useState } from "react";

import {
  obtenerCultivos,
  obtenerCultivo,
  crearCultivo,
  actualizarCultivo,
  eliminarCultivo,
} from "../services/ServicioCultivos";

import TablaCultivos from "../components/cultivos/TablaCultivos";
import FormularioCultivo from "../components/cultivos/FormularioCultivo";
import DetalleCultivo from "../components/cultivos/DetalleCultivo";
export default function Cultivos({
  busqueda = "",
}) {
  const [cultivos, setCultivos] = useState([]);

  const [cargando, setCargando] =
    useState(true);

  const [error, setError] = useState("");

  const [modalFormulario, setModalFormulario] =
    useState(false);

  const [modoEdicion, setModoEdicion] =
    useState(false);

  const [cultivoSeleccionado, setCultivoSeleccionado] =
    useState(null);

  const [cultivoDetalle, setCultivoDetalle] =
    useState(null);

  const cargarCultivos = async () => {
    try {
      setCargando(true);
      setError("");

      const datos = await obtenerCultivos();

      setCultivos(datos);
    } catch (error) {
      console.error(
        "Error al obtener cultivos:",
        error
      );

      setError(
        "No se pudieron cargar los cultivos."
      );
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarCultivos();
  }, []);

  const cultivosFiltrados = useMemo(() => {
    const texto = busqueda
      .trim()
      .toLowerCase();

    if (!texto) {
      return cultivos;
    }

    return cultivos.filter((cultivo) => {
      return [
        cultivo.nombreCultivo,
        cultivo.tipoCultivo,
        cultivo.estado,
        String(cultivo.loteId),
        String(cultivo.subloteId),
      ].some((valor) =>
        String(valor)
          .toLowerCase()
          .includes(texto)
      );
    });
  }, [cultivos, busqueda]);

  const abrirNuevo = () => {
    setModoEdicion(false);
    setCultivoSeleccionado(null);
    setModalFormulario(true);
  };

  const abrirEditar = (cultivo) => {
    setModoEdicion(true);
    setCultivoSeleccionado(cultivo);
    setModalFormulario(true);
  };

  const cerrarFormulario = () => {
    setModalFormulario(false);
    setCultivoSeleccionado(null);
  };

 const guardarCultivo = async (datos) => {
  try {
    setError("");

    let cultivoGuardado;

    if (modoEdicion && cultivoSeleccionado?.id) {
      cultivoGuardado = await actualizarCultivo(
        cultivoSeleccionado.id,
        datos
      );
    } else {
      cultivoGuardado = await crearCultivo(datos);
    }

    console.log("✅ CULTIVO GUARDADO:", cultivoGuardado);

    // Agregar inmediatamente el cultivo a la tabla
    if (!modoEdicion) {
      setCultivos((actuales) => [
        ...actuales,
        cultivoGuardado,
      ]);
    } else {
      setCultivos((actuales) =>
        actuales.map((cultivo) =>
          cultivo.id === cultivoGuardado.id
            ? cultivoGuardado
            : cultivo
        )
      );
    }

    setModalFormulario(false);
    setCultivoSeleccionado(null);
    setModoEdicion(false);

  } catch (error) {
    console.error(
      "❌ Error al guardar cultivo:",
      error
    );

    setError(
      error.response?.data?.message ||
      "No se pudo guardar el cultivo."
    );
  }
};

  const eliminar = async (id) => {
    const confirmar = window.confirm(
      "¿Seguro que deseas eliminar este cultivo?"
    );

    if (!confirmar) {
      return;
    }

    try {
      setError("");

      await eliminarCultivo(id);

      setCultivos((actuales) =>
        actuales.filter(
          (cultivo) => cultivo.id !== id
        )
      );
    } catch (error) {
      console.error(
        "Error al eliminar cultivo:",
        error
      );

      setError(
        "No se pudo eliminar el cultivo."
      );
    }
  };

  return (
    <section>
      {/* Encabezado de página */}
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#ddf9e7] text-[#08753a]">
              <PlantaIcono />
            </div>

            <h2 className="text-xl font-bold text-[#173b2a]">
              Mis cultivos
            </h2>
          </div>

          <p className="mt-1 text-xs text-[#789184]">
            Administra y controla tus cultivos.
          </p>
        </div>

        <button
          type="button"
          onClick={abrirNuevo}
          className="flex h-10 items-center justify-center gap-2 rounded-lg bg-[#126033] px-4 text-sm font-bold text-white transition hover:bg-[#0e4f29]"
        >
          <span className="text-lg leading-none">
            +
          </span>

          Nuevo cultivo
        </button>
      </div>

      {/* Mensaje de error */}
      {error && (
        <div className="mb-4 flex flex-col gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 sm:flex-row sm:items-center sm:justify-between">
          <span>{error}</span>

          <button
            type="button"
            onClick={cargarCultivos}
            className="font-semibold underline"
          >
            Reintentar
          </button>
        </div>
      )}

      {/* Contenido */}
      {cargando ? (
        <div className="rounded-xl border border-[#dce6df] bg-white px-6 py-14 text-center shadow-sm">
          <div className="mx-auto mb-3 h-7 w-7 animate-spin rounded-full border-2 border-[#d7e9dd] border-t-[#178343]" />

          <p className="text-sm text-[#789184]">
            Cargando cultivos...
          </p>
        </div>
      ) : (
        <TablaCultivos
          cultivos={cultivosFiltrados}
          alVer={setCultivoDetalle}
          alEditar={abrirEditar}
          alEliminar={eliminar}
        />
      )}

      {/* Crear / editar */}
      <FormularioCultivo
        abierto={modalFormulario}
        modoEdicion={modoEdicion}
        cultivo={cultivoSeleccionado}
        alCerrar={cerrarFormulario}
        alGuardar={guardarCultivo}
      />

      {/* Ver detalle */}
      <DetalleCultivo
        cultivo={cultivoDetalle}
        alCerrar={() => setCultivoDetalle(null)}
      />
    </section>
  );
}

function PlantaIcono() {
  return (
    <svg
      width="18"
      height="18"
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