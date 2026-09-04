import { useState, useEffect, useRef } from "react";
import type { Producto } from "../App";

// ── Tipos ───────────────────────────────────────────────────
type FormData = Omit<Producto, "id">;

interface Props {
  abierto: boolean;
  productoEditar?: Producto | null;   // si viene un producto → modo edición
  onGuardar: (datos: FormData, id?: string) => void;
  onCerrar: () => void;
}

const CATEGORIAS = ["Fungicida", "Fertilizante", "Herbicida", "Insecticida", "Otro"];
const UNIDADES   = ["L", "kg", "g", "ml", "unidad"];

const VACIO: FormData = {
  nombre:     "",
  categoria:  "Fungicida",
  cantidad:   0,
  unidad:     "L",
  stockMinimo: 5,
};

// ── Componente ──────────────────────────────────────────────
export function ProductoModal({ abierto, productoEditar, onGuardar, onCerrar }: Props) {
  const [form, setForm] = useState<FormData>(VACIO);
  const [errores, setErrores] = useState<Partial<Record<keyof FormData, string>>>({});
  const primerCampoRef = useRef<HTMLInputElement>(null);

  // Rellenar formulario al abrir
  useEffect(() => {
    if (abierto) {
      setForm(productoEditar
        ? { nombre: productoEditar.nombre, categoria: productoEditar.categoria,
            cantidad: productoEditar.cantidad, unidad: productoEditar.unidad,
            stockMinimo: productoEditar.stockMinimo }
        : VACIO
      );
      setErrores({});
      // Enfocar el primer campo al abrir
      setTimeout(() => primerCampoRef.current?.focus(), 50);
    }
  }, [abierto, productoEditar]);

  // Cerrar con Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onCerrar(); };
    if (abierto) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [abierto, onCerrar]);

  // Actualizar campo genérico
  const set = (campo: keyof FormData, valor: string | number) =>
    setForm((prev) => ({ ...prev, [campo]: valor }));

  // Validación
  const validar = (): boolean => {
    const e: Partial<Record<keyof FormData, string>> = {};
    if (!form.nombre.trim())         e.nombre     = "El nombre es requerido.";
    if (form.cantidad < 0)           e.cantidad   = "No puede ser negativo.";
    if (form.stockMinimo < 0)        e.stockMinimo= "No puede ser negativo.";
    setErrores(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validar()) return;
    onGuardar(form, productoEditar?.id);
  };

  if (!abierto) return null;

  const esEdicion = !!productoEditar;
  const titulo    = esEdicion ? "Editar producto" : "Agregar producto";

  return (
    /* Overlay */
    <div
      className="modal-overlay"
      onClick={(e) => { if (e.target === e.currentTarget) onCerrar(); }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="modal-panel">

        {/* Cabecera */}
        <div className="modal-header">
          <h2 id="modal-title" className="modal-title">{titulo}</h2>
          <button className="modal-close" onClick={onCerrar} aria-label="Cerrar">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} noValidate>
          <div className="modal-body">

            {/* Nombre */}
            <div className="form-group">
              <label className="form-label" htmlFor="f-nombre">Nombre del producto</label>
              <input
                id="f-nombre"
                ref={primerCampoRef}
                className={`form-input${errores.nombre ? " form-input-error" : ""}`}
                type="text"
                placeholder="Ej: Propiconazol 25%"
                value={form.nombre}
                onChange={(e) => set("nombre", e.target.value)}
              />
              {errores.nombre && <p className="form-error">{errores.nombre}</p>}
            </div>

            {/* Categoría */}
            <div className="form-group">
              <label className="form-label" htmlFor="f-categoria">Categoría</label>
              <select
                id="f-categoria"
                className="form-input"
                value={form.categoria}
                onChange={(e) => set("categoria", e.target.value)}
              >
                {CATEGORIAS.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>

            {/* Cantidad + Unidad en fila */}
            <div className="form-row">
              <div className="form-group">
                <label className="form-label" htmlFor="f-cantidad">Cantidad inicial</label>
                <input
                  id="f-cantidad"
                  className={`form-input${errores.cantidad ? " form-input-error" : ""}`}
                  type="number"
                  min="0"
                  value={form.cantidad}
                  onChange={(e) => set("cantidad", Number(e.target.value))}
                />
                {errores.cantidad && <p className="form-error">{errores.cantidad}</p>}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="f-unidad">Unidad</label>
                <select
                  id="f-unidad"
                  className="form-input"
                  value={form.unidad}
                  onChange={(e) => set("unidad", e.target.value)}
                >
                  {UNIDADES.map((u) => <option key={u}>{u}</option>)}
                </select>
              </div>
            </div>

            {/* Stock mínimo */}
            <div className="form-group">
              <label className="form-label" htmlFor="f-stock">Stock mínimo</label>
              <input
                id="f-stock"
                className={`form-input${errores.stockMinimo ? " form-input-error" : ""}`}
                type="number"
                min="0"
                value={form.stockMinimo}
                onChange={(e) => set("stockMinimo", Number(e.target.value))}
              />
              {errores.stockMinimo && <p className="form-error">{errores.stockMinimo}</p>}
              <p className="form-hint">Se alertará cuando la cantidad llegue a este valor.</p>
            </div>

          </div>

          {/* Footer con acciones */}
          <div className="modal-footer">
            <button type="button" className="btn-secondary" onClick={onCerrar}>
              Cancelar
            </button>
            <button type="submit" className="btn-primary">
              {esEdicion ? "Guardar cambios" : "Agregar producto"}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}

export default ProductoModal;
