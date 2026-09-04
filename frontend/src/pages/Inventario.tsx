import { useState, useEffect } from "react";
import AlertaBanner from "../components/AlertaBanner";
import InventarioTabla from "../components/InventarioTabla";
import ProductoModal from "../components/ProductoModal";
import { getProductos, createProducto, updateProducto, deleteProducto, registrarEntrada, registrarSalida } from "../api/productosService";

export interface Producto {
  id: string;
  nombre: string;
  categoria: string;
  cantidad: number;
  unidad: 'L' | 'kg' | string;
  stockMinimo: number;
}

function Inventario() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Estado del modal
  const [modalAbierto, setModalAbierto] = useState(false);
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

  return (
    <>
      {/* Page header */}
      <div className="page-header animate-fadeIn">
        <div>
          <div className="page-header-eyebrow">
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

      {/* Modal agregar / editar */}
      <ProductoModal
        abierto={modalAbierto}
        productoEditar={productoEditando}
        onGuardar={handleGuardar}
        onCerrar={handleCerrarModal}
      />
    </>
  );
}

export default Inventario;
