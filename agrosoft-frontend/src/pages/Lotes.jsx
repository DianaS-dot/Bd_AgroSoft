
import { useEffect, useState } from "react";

import TarjetaLote from "../components/Lotes/TarjetaLote";
import FormularioLote from "../components/Lotes/FormularioLote";
import DetalleLote from "../components/Lotes/DetallesLote";
import FormularioSublote from "../components/Sublotes/FormularioSublote";

import ServicioLotes from "../services/ServicioLotes";
import ServicioSublotes from "../services/ServicioSublotes";

function Lotes() {
  const [lotes, setLotes] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  // Estados de los formularios de lotes
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [loteEditar, setLoteEditar] = useState(null);
  const [guardando, setGuardando] = useState(false);

  // Estado del detalle del lote
  const [loteSeleccionado, setLoteSeleccionado] = useState(null);

  // Estados de los formularios de sublotes
  const [loteParaSublote, setLoteParaSublote] = useState(null);
  const [subloteEditar, setSubloteEditar] = useState(null);
  const [mostrarFormularioSublote, setMostrarFormularioSublote] =
    useState(false);
  const [guardandoSublote, setGuardandoSublote] = useState(false);

  // ==========================================
  // CARGAR LOTES Y SUBLOTES
  // ==========================================

  const cargarLotes = async () => {
    try {
      setCargando(true);
      setError("");

      const [respuestaLotes, respuestaSublotes] = await Promise.all([
        ServicioLotes.obtenerLotes(),
        ServicioSublotes.obtenerSublotes(),
      ]);

      const listaLotes = Array.isArray(respuestaLotes)
        ? respuestaLotes
        : respuestaLotes?.data ?? [];

      const listaSublotes = Array.isArray(respuestaSublotes)
        ? respuestaSublotes
        : respuestaSublotes?.data ?? [];

      const lotesConSublotes = listaLotes.map((lote) => {
        const sublotesDelLote = listaSublotes.filter((sublote) => {
          const idLote =
            sublote.loteId ??
            sublote.lote_id ??
            sublote.lote?.id;

          return Number(idLote) === Number(lote.id);
        });

        return {
          ...lote,
          sublotes: sublotesDelLote,
        };
      });

      setLotes(lotesConSublotes);
    } catch (error) {
      console.error("Error al cargar lotes y sublotes:", error);

      setError(
        error.response?.data?.message ||
          "No fue posible cargar los lotes y sublotes."
      );
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarLotes();
  }, []);

  // ==========================================
  // CREAR Y EDITAR LOTES
  // ==========================================

  const abrirNuevoLote = () => {
    setLoteEditar(null);
    setMostrarFormulario(true);
  };

  const abrirEditar = (lote) => {
    setLoteEditar(lote);
    setMostrarFormulario(true);
  };

  const guardarLote = async (datos) => {
    try {
      setGuardando(true);
      setError("");

      if (loteEditar) {
        await ServicioLotes.actualizarLote(loteEditar.id, datos);
      } else {
        await ServicioLotes.crearLote(datos);
      }

      setMostrarFormulario(false);
      setLoteEditar(null);

      await cargarLotes();
    } catch (error) {
      console.error("Error al guardar el lote:", error);

      setError(
        error.response?.data?.message ||
          "No fue posible guardar el lote."
      );
    } finally {
      setGuardando(false);
    }
  };

  // ==========================================
  // ELIMINAR LOTES
  // ==========================================

  const eliminarLote = async (lote) => {
    const confirmar = window.confirm(
      `¿Seguro que deseas eliminar el lote "${lote.nombre}"?`
    );

    if (!confirmar) return;

    try {
      setError("");

      await ServicioLotes.eliminarLote(lote.id);
      await cargarLotes();
    } catch (error) {
      console.error("Error al eliminar el lote:", error);

      setError(
        error.response?.data?.message ||
          "No fue posible eliminar el lote."
      );
    }
  };

  // ==========================================
  // ABRIR FORMULARIO PARA CREAR SUBLOTE
  // ==========================================

  const abrirAgregarSublote = (lote) => {
    setError("");
    setSubloteEditar(null);
    setLoteParaSublote(lote);
    setMostrarFormularioSublote(true);
  };

  

  const abrirEditarSublote = (sublote) => {
    const idLote =
      sublote.loteId ??
      sublote.lote_id ??
      sublote.lote?.id;

    const lotePadre = lotes.find(
      (lote) => Number(lote.id) === Number(idLote)
    );

    if (!lotePadre) {
      console.error(
        "No se encontró el lote del sublote:",
        sublote
      );

      setError(
        "No se encontró el lote al que pertenece este sublote."
      );
      return;
    }

    setError("");
    setLoteParaSublote(lotePadre);
    setSubloteEditar(sublote);
    setMostrarFormularioSublote(true);
  };


  const guardarSublote = async (datos) => {
    try {
      setGuardandoSublote(true);
      setError("");

      if (subloteEditar) {
        await ServicioSublotes.actualizarSublote(
          subloteEditar.id,
          datos
        );
      } else {
        await ServicioSublotes.crearSublote(datos);
      }

      setMostrarFormularioSublote(false);
      setLoteParaSublote(null);
      setSubloteEditar(null);

      await cargarLotes();
    } catch (error) {
      console.error("Error al guardar el sublote:", error);

      setError(
        error.response?.data?.message ||
          "No fue posible guardar el sublote."
      );

      throw error;
    } finally {
      setGuardandoSublote(false);
    }
  };

  // ==========================================
  // ELIMINAR SUBLOTE
  // ==========================================

  const eliminarSublote = async (sublote) => {
    const confirmar = window.confirm(
      `¿Seguro que deseas eliminar el sublote "${sublote.nombre || `#${sublote.id}`}"?`
    );

    if (!confirmar) return;

    try {
      setError("");

      await ServicioSublotes.eliminarSublote(sublote.id);

      // Actualizar la información desde el backend
      await cargarLotes();
    } catch (error) {
      console.error("Error al eliminar el sublote:", error);

      setError(
        error.response?.data?.message ||
          "No fue posible eliminar el sublote."
      );
    }
  };

  // ==========================================
  // CERRAR FORMULARIO DE SUBLOTE
  // ==========================================

  const cerrarFormularioSublote = () => {
    if (guardandoSublote) return;

    setMostrarFormularioSublote(false);
    setLoteParaSublote(null);
    setSubloteEditar(null);
  };

  // ==========================================
  // VER DETALLE DEL LOTE
  // ==========================================

  const verLote = (lote) => {
    setLoteSeleccionado(lote);
  };

  // ==========================================
  // RENDERIZADO
  // ==========================================

  return (
    <main className="min-h-full bg-[#F4F6F4] p-4 sm:p-6 lg:p-7">

      {/* ENCABEZADO */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-semibold text-[#164D35] sm:text-2xl">
            Lotes
          </h1>

          <p className="mt-1 text-sm text-[#4B9B72]">
            Gestiona los lotes y sublotes de tu finca
          </p>
        </div>

        <button
          type="button"
          onClick={abrirNuevoLote}
          className="w-full rounded-lg bg-[#125D32] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0E4C29] sm:w-auto"
        >
          + Agregar lote
        </button>
      </div>

      {/* MENSAJE DE ERROR */}
      {error && (
        <div
          role="alert"
          className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600"
        >
          {Array.isArray(error) ? error.join(", ") : error}
        </div>
      )}

      {/* CARGANDO Y LISTA DE LOTES */}
      {cargando ? (
        <div className="rounded-xl bg-white p-10 text-center shadow-sm">
          <p className="text-sm text-gray-500">
            Cargando lotes y sublotes...
          </p>
        </div>
      ) : lotes.length === 0 ? (
        <div className="rounded-xl border border-[#E1E9E3] bg-white p-10 text-center shadow-sm">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#EAF8EF] text-2xl text-[#15803D]">
            ◈
          </div>

          <h2 className="mt-4 font-semibold text-[#164D35]">
            No hay lotes registrados
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Comienza agregando el primer lote de tu finca.
          </p>

          <button
            type="button"
            onClick={abrirNuevoLote}
            className="mt-5 rounded-lg bg-[#125D32] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#0E4C29]"
          >
            + Agregar lote
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {lotes.map((lote) => (
            <TarjetaLote
              key={lote.id}
              lote={lote}
              onVer={verLote}
              onEditar={abrirEditar}
              onEliminar={eliminarLote}
              onAgregarSublote={abrirAgregarSublote}
              onEditarSublote={abrirEditarSublote}
              onEliminarSublote={eliminarSublote}
            />
          ))}
        </div>
      )}

      {/* FORMULARIO DE LOTE */}
      {mostrarFormulario && (
        <FormularioLote
          lote={loteEditar}
          onGuardar={guardarLote}
          onCerrar={() => {
            if (guardando) return;

            setMostrarFormulario(false);
            setLoteEditar(null);
          }}
          guardando={guardando}
        />
      )}

      {/* DETALLE DEL LOTE */}
      {loteSeleccionado && (
        <DetalleLote
          lote={loteSeleccionado}
          onCerrar={() => setLoteSeleccionado(null)}
        />
      )}

      {/* FORMULARIO PARA CREAR O EDITAR SUBLOTE */}
      {mostrarFormularioSublote && loteParaSublote && (
        <FormularioSublote
          key={
            subloteEditar?.id ??
            `nuevo-${loteParaSublote.id}`
          }
          lote={loteParaSublote}
          sublote={subloteEditar}
          onGuardar={guardarSublote}
          onCerrar={cerrarFormularioSublote}
          guardando={guardandoSublote}
        />
      )}
    </main>
  );
}

export default Lotes;