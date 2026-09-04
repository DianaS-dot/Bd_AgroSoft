import { useState, useEffect } from "react";
import AlertaBanner from "./components/AlertaBanner";
import InventarioTabla from "./components/InventarioTabla";
import ProductoModal from "./components/ProductoModal";
import { getProductos, createProducto, updateProducto, deleteProducto, registrarEntrada, registrarSalida } from "./api/productosService";

// Definimos la estructura del producto
export interface Producto {
  id: string;
  nombre: string;
  categoria: string;
  cantidad: number;
  unidad: 'L' | 'kg' | string;
  stockMinimo: number;
}



// Ítems del sidebar
const NAV_ITEMS = [
  { icon: "home",         label: "Inicio"        },
  { icon: "user",         label: "Perfil"        },
  { icon: "leaf",         label: "Cultivos"      },
  { icon: "layers",       label: "Lotes"         },
  { icon: "flask",        label: "Tratamientos"  },
  { icon: "bug",          label: "Enfermedades"  },
  { icon: "package",      label: "Stock",        active: true },
  { icon: "tag",          label: "Ventas"        },
  { icon: "bar-chart",    label: "Estadísticas"  },
  { icon: "users",        label: "Usuarios"      },
  { icon: "settings",     label: "Configuración" },
];

// Íconos SVG ligeros
function Icon({ name, size = 18 }: { name: string; size?: number }) {
  const s = size;
  const icons: Record<string, JSX.Element> = {
    home: (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9.5L12 3l9 6.5V21a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z"/>
        <polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
    user: (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
      </svg>
    ),
    leaf: (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 8C8 10 5.9 16.17 3.82 19.34a1 1 0 0 0 1.46 1.32C7.7 18.4 13 15 21 15c0-5-1-9-4-7z"/>
        <path d="M3.82 19.34C6 14 9 9 17 8"/>
      </svg>
    ),
    layers: (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/>
      </svg>
    ),
    flask: (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 3h6v9l4 9H5L9 12V3z"/><line x1="9" y1="3" x2="15" y2="3"/>
      </svg>
    ),
    bug: (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="8" y="6" width="8" height="12" rx="4"/>
        <path d="M19 9h-2M5 9h2M19 15h-2M5 15h2M12 2v4M8.5 4.5l1.5 1.5M15.5 4.5l-1.5 1.5"/>
      </svg>
    ),
    package: (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16.5 9.4l-9-5.19M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
        <polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/>
      </svg>
    ),
    tag: (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/>
        <line x1="7" y1="7" x2="7.01" y2="7"/>
      </svg>
    ),
    "bar-chart": (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>
      </svg>
    ),
    users: (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    settings: (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3"/>
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
      </svg>
    ),
    logout: (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
        <polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
      </svg>
    ),
    bell: (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
        <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
      </svg>
    ),
    search: (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
      </svg>
    ),
  };
  return icons[name] ?? null;
}

function App() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Estado del modal
  const [modalAbierto,    setModalAbierto]    = useState(false);
  const [productoEditando, setProductoEditando] = useState<Producto | null>(null);

  // Cargar productos desde la API al inicio
  useEffect(() => {
    const loadProductos = async () => {
      try {
        const data = await getProductos();
        setProductos(data);
        setError(null);
      } catch (err) {
        console.error("Error cargando productos:", err);
        setError("Error al cargar los productos del servidor");
        // Datos de fallback si falla la API
        setProductos([
          { id: "1", nombre: "Propiconazol 25%", categoria: "Fungicida",    cantidad: 12,  unidad: "L",  stockMinimo: 5  },
          { id: "2", nombre: "Mancozeb 80%",     categoria: "Fungicida",    cantidad: 3,   unidad: "kg", stockMinimo: 5  },
          { id: "3", nombre: "Urea 46%",         categoria: "Fertilizante", cantidad: 200, unidad: "kg", stockMinimo: 50 },
          { id: "4", nombre: "DAP 18-46-0",      categoria: "Fertilizante", cantidad: 0,   unidad: "kg", stockMinimo: 50 },
          { id: "5", nombre: "Glifosato 48%",    categoria: "Herbicida",    cantidad: 20,  unidad: "L",  stockMinimo: 10 },
          { id: "6", nombre: "Cypermethrin",     categoria: "Insecticida",  cantidad: 4,   unidad: "L",  stockMinimo: 5  },
        ]);
      } finally {
        setLoading(false);
      }
    };

    loadProductos();
  }, []);

  // 1. Registrar Entrada (+1)
  const handleEntrada = async (id: string) => {
    try {
      const updated = await registrarEntrada(id);
      setProductos(productos.map((p) => p.id === id ? updated : p));
    } catch (err) {
      console.error("Error registrando entrada:", err);
      // Fallback: actualizar localmente
      setProductos(productos.map((p) => p.id === id ? { ...p, cantidad: p.cantidad + 1 } : p));
    }
  };

  // 2. Registrar Salida (-1, mínimo 0)
  const handleSalida = async (id: string) => {
    try {
      const updated = await registrarSalida(id);
      setProductos(productos.map((p) => p.id === id ? updated : p));
    } catch (err) {
      console.error("Error registrando salida:", err);
      // Fallback: actualizar localmente
      setProductos(productos.map((p) =>
        p.id === id ? { ...p, cantidad: Math.max(0, p.cantidad - 1) } : p
      ));
    }
  };

  // 3. Eliminar producto (con confirmación)
  const handleDelete = async (id: string) => {
    if (window.confirm("¿Estás seguro de eliminar este insumo del inventario?")) {
      try {
        await deleteProducto(id);
        setProductos(productos.filter((p) => p.id !== id));
      } catch (err) {
        console.error("Error eliminando producto:", err);
        // Fallback: eliminar localmente
        setProductos(productos.filter((p) => p.id !== id));
      }
    }
  };

  // 4. Abrir modal en modo edición
  const handleEdit = (producto: Producto) => {
    setProductoEditando(producto);
    setModalAbierto(true);
  };

  // 5. Guardar desde el modal (crear o actualizar)
  const handleGuardar = async (datos: Omit<Producto, "id">, id?: string) => {
    try {
      if (id) {
        // Actualizar producto existente
        const updated = await updateProducto(id, datos);
        setProductos(productos.map((p) => p.id === id ? updated : p));
      } else {
        // Crear producto nuevo
        const nuevo = await createProducto(datos);
        setProductos([...productos, nuevo]);
      }
      setModalAbierto(false);
      setProductoEditando(null);
    } catch (err) {
      console.error("Error guardando producto:", err);
      // Fallback: guardar localmente
      if (id) {
        setProductos(productos.map((p) => p.id === id ? { ...p, ...datos } : p));
      } else {
        const nuevoId = String(Date.now());
        setProductos([...productos, { id: nuevoId, ...datos }]);
      }
      setModalAbierto(false);
      setProductoEditando(null);
    }
  };

  // 6. Cerrar modal sin guardar
  const handleCerrarModal = () => {
    setModalAbierto(false);
    setProductoEditando(null);
  };

  /* ── Render ────────────────────────────────────────────── */
  return (
    <div className="app-shell">

      {/* ── Sidebar ───────────────────────────────────────── */}
      <aside className="sidebar">
        {/* Logo */}
        <div className="sidebar-logo">
          <div className="sidebar-logo-icon">🌱</div>
          <div>
            <p className="sidebar-logo-name">AGROSOFT</p>
            <p className="sidebar-logo-sub">Gestión de finca</p>
          </div>
        </div>

        {/* Nav */}
        <nav className="sidebar-nav">
          {NAV_ITEMS.map(({ icon, label, active }) => (
            <a
              key={label}
              href="#"
              className={`sidebar-nav-item${active ? " active" : ""}`}
            >
              <span className="sidebar-nav-icon"><Icon name={icon} /></span>
              {label}
            </a>
          ))}
        </nav>

        {/* Cerrar sesión */}
        <div className="sidebar-footer">
          <button className="sidebar-logout">
            <Icon name="logout" />
            Cerrar sesión
          </button>
        </div>
      </aside>

      {/* ── Contenido principal ───────────────────────────── */}
      <div className="main-wrapper">

        {/* Top bar */}
        <header className="topbar">
          <div className="topbar-search">
            <span className="topbar-search-icon"><Icon name="search" size={15} /></span>
            <input type="text" placeholder="Buscar cultivos, lotes, tratamientos..." className="topbar-search-input" />
          </div>
          <div className="topbar-actions">
            <button className="topbar-bell" aria-label="Notificaciones">
              <Icon name="bell" size={18} />
              <span className="topbar-bell-dot" />
            </button>
            <div className="topbar-avatar">
              <span className="topbar-avatar-initials">AM</span>
              <div>
                <p className="topbar-avatar-name">Andrés Morales</p>
                <p className="topbar-avatar-role">Administrador</p>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="page-content">

          {/* Page header */}
          <div className="page-header animate-fadeIn">
            <div>
              <div className="page-header-eyebrow">
                <Icon name="package" size={15} />
                Stock e inventario
              </div>
              <p className="page-header-sub">Control de insumos y materiales de la finca</p>
            </div>
            <button className="btn-primary" onClick={() => { setProductoEditando(null); setModalAbierto(true); }}>
              + Agregar producto
            </button>
          </div>

          {loading ? (
            <div className="text-center py-8">
              <p className="text-gray-500">Cargando productos...</p>
            </div>
          ) : error ? (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
              <p>{error}</p>
              <p className="text-sm mt-1">Mostrando datos de ejemplo. Verifica que el backend esté corriendo en http://localhost:3000</p>
            </div>
          ) : (
            <>
              <AlertaBanner productos={productos} />

              <InventarioTabla
                productos={productos}
                onEntrada={handleEntrada}
                onSalida={handleSalida}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            </>
          )}
        </main>
      </div>

      {/* Modal agregar / editar */}
      <ProductoModal
        abierto={modalAbierto}
        productoEditar={productoEditando}
        onGuardar={handleGuardar}
        onCerrar={handleCerrarModal}
      />
    </div>
  );
}

export default App;