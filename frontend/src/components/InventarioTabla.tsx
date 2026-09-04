import type { Producto } from "../App";

interface Props {
  productos: Producto[];
  onEntrada: (id: string) => void;
  onSalida:  (id: string) => void;
  onEdit:    (producto: Producto) => void;
  onDelete:  (id: string) => void;
}

const rowAnimClass = [
  "animate-row-1","animate-row-2","animate-row-3",
  "animate-row-4","animate-row-5","animate-row-6",
];

// SVG icons inline
function IconDownload() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
      <polyline points="7 10 12 15 17 10"/>
      <line x1="12" y1="15" x2="12" y2="3"/>
    </svg>
  );
}

function IconUpload() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
      <polyline points="17 8 12 3 7 8"/>
      <line x1="12" y1="3" x2="12" y2="15"/>
    </svg>
  );
}

function IconEdit() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
    </svg>
  );
}

function IconTrash() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 6 5 6 21 6"/>
      <path d="M19 6l-1 14H6L5 6"/>
      <path d="M10 11v6"/><path d="M14 11v6"/>
      <path d="M9 6V4h6v2"/>
    </svg>
  );
}

function obtenerEstado(cantidad: number, stockMinimo: number) {
  if (cantidad === 0) return { texto: "Agotado",    clase: "badge-agotado"   };
  if (cantidad <= stockMinimo) return { texto: "Stock bajo", clase: "badge-bajo"      };
  return                       { texto: "Disponible",clase: "badge-disponible" };
}

function cantidadClase(cantidad: number, stockMinimo: number) {
  if (cantidad === 0)          return "qty-empty";
  if (cantidad <= stockMinimo) return "qty-low";
  return "qty-ok";
}

export function InventarioTabla({ productos, onEntrada, onSalida, onEdit, onDelete }: Props) {
  return (
    <div className="tabla-card animate-slideUp">
      <div className="tabla-overflow">
        <table>
          <thead>
            <tr>
              <th>Producto</th>
              <th>Categoría</th>
              <th>Cantidad</th>
              <th>Unidad</th>
              <th>Stock mínimo</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((p, idx) => {
              const estado = obtenerEstado(p.cantidad, p.stockMinimo);
              const animClass = rowAnimClass[idx] ?? "animate-slideUp";

              return (
                <tr key={p.id} className={animClass}>
                  {/* Nombre */}
                  <td className="td-nombre">{p.nombre}</td>

                  {/* Categoría */}
                  <td>
                    <span className="badge-cat">{p.categoria}</span>
                  </td>

                  {/* Cantidad */}
                  <td>
                    <span className={cantidadClase(p.cantidad, p.stockMinimo)}>
                      {p.cantidad}
                    </span>
                  </td>

                  {/* Unidad */}
                  <td className="td-unit">{p.unidad}</td>

                  {/* Stock mínimo */}
                  <td className="td-unit">{p.stockMinimo}</td>

                  {/* Estado */}
                  <td>
                    <span className={`badge-estado ${estado.clase}`}>
                      <span className="badge-dot" />
                      {estado.texto}
                    </span>
                  </td>

                  {/* Acciones */}
                  <td>
                    <div className="acciones-group">
                      <button
                        className="btn-entrada"
                        onClick={() => onEntrada(p.id)}
                        title="Registrar entrada"
                      >
                        <IconDownload /> Entrada
                      </button>

                      <button
                        className="btn-salida"
                        onClick={() => onSalida(p.id)}
                        title="Registrar salida"
                      >
                        <IconUpload /> Salida
                      </button>

                      <button
                        className="btn-icon btn-icon-edit"
                        onClick={() => onEdit(p)}
                        title="Editar"
                      >
                        <IconEdit />
                      </button>

                      <button
                        className="btn-icon btn-icon-delete"
                        onClick={() => onDelete(p.id)}
                        title="Eliminar"
                      >
                        <IconTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {productos.length === 0 && (
          <div className="tabla-empty">
            <div className="tabla-empty-icon">📭</div>
            <p>No hay productos en el inventario</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default InventarioTabla;
