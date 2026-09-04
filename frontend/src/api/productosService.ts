import api from './axiosConfig';
import type { Producto } from '../App';

/* ── Tipos del Backend Hexagonal (Insumos) ─────────────────── */

// Estructura de Insumo del backend
export interface InsumoBackend {
  id: number;
  nombre: string;
  descripcion: string;
  stockUso: number;
  unidadUso: string;
  costoUnitario: number;
  estado: string;
  categoriaId?: number;
  almacenId?: number;
  proveedorId?: number;
}

// DTO para crear insumo (backend)
export interface CreateInsumoDto {
  nombre: string;
  descripcion?: string;
  stockUso: number;
  unidadUso: string;
  costoUnitario: number;
  estado: string;
  categoriaId?: number;
  almacenId?: number;
  proveedorId?: number;
}

/* ── Tipos de la API ───────────────────────────────────────── */

// Payload para crear un producto (sin id)
export type ProductoPayload = Omit<Producto, 'id'>;

// Respuesta paginada genérica (ajusta según tu backend)
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
}

/* ── Funciones de Mapeo ───────────────────────────────────── */

// Mapea InsumoBackend → Producto (frontend)
const mapInsumoToProducto = (insumo: InsumoBackend): Producto => ({
  id: String(insumo.id),
  nombre: insumo.nombre,
  categoria: insumo.descripcion || 'Sin categoría',
  cantidad: insumo.stockUso,
  unidad: insumo.unidadUso as 'L' | 'kg' | string,
  stockMinimo: 5, // Valor por defecto, puedes ajustarlo según negocio
});

// Mapea Producto → CreateInsumoDto (backend)
const mapProductoToInsumoDto = (producto: ProductoPayload): CreateInsumoDto => ({
  nombre: producto.nombre,
  descripcion: producto.categoria,
  stockUso: producto.cantidad,
  unidadUso: producto.unidad,
  costoUnitario: 0, // Valor por defecto, puedes ajustarlo
  estado: 'activo', // Valor por defecto
});

/* ── CRUD de Insumos (Backend Hexagonal) ──────────────────── */

/**
 * Obtiene todos los insumos del inventario.
 * GET /api/insumos
 */
export const getProductos = async (): Promise<Producto[]> => {
  const { data } = await api.get<InsumoBackend[]>('/insumos');
  return data.map(mapInsumoToProducto);
};

/**
 * Obtiene un insumo por ID.
 * GET /api/insumos/:id
 */
export const getProductoById = async (id: string): Promise<Producto> => {
  const { data } = await api.get<InsumoBackend>(`/insumos/${id}`);
  return mapInsumoToProducto(data);
};

/**
 * Crea un nuevo insumo.
 * POST /api/insumos
 */
export const createProducto = async (payload: ProductoPayload): Promise<Producto> => {
  const insumoDto = mapProductoToInsumoDto(payload);
  const { data } = await api.post<InsumoBackend>('/insumos', insumoDto);
  return mapInsumoToProducto(data);
};

/**
 * Actualiza un insumo existente.
 * PUT /insumos/:id
 */
export const updateProducto = async (id: string, payload: Partial<ProductoPayload>): Promise<Producto> => {
  const insumoDto = mapProductoToInsumoDto(payload as ProductoPayload);
  const { data } = await api.put<InsumoBackend>(`/insumos/${id}`, insumoDto);
  return mapInsumoToProducto(data);
};

/**
 * Registra una entrada de stock (+1 por defecto).
 * NOTA: Esto requeriría un endpoint específico en el backend
 * Por ahora, usamos updateProducto para ajustar el stock
 */
export const registrarEntrada = async (id: string, cantidad = 1): Promise<Producto> => {
  // Primero obtenemos el insumo actual
  const current = await getProductoById(id);
  // Actualizamos con el nuevo stock
  return updateProducto(id, { cantidad: current.cantidad + cantidad });
};

/**
 * Registra una salida de stock (-1 por defecto).
 * NOTA: Esto requeriría un endpoint específico en el backend
 * Por ahora, usamos updateProducto para ajustar el stock
 */
export const registrarSalida = async (id: string, cantidad = 1): Promise<Producto> => {
  // Primero obtenemos el insumo actual
  const current = await getProductoById(id);
  // Actualizamos con el nuevo stock (mínimo 0)
  return updateProducto(id, { cantidad: Math.max(0, current.cantidad - cantidad) });
};

/**
 * Elimina un insumo.
 * DELETE /insumos/:id
 */
export const deleteProducto = async (id: string): Promise<void> => {
  await api.delete(`/insumos/${id}`);
};
