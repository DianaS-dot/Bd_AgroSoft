import api from '../axiosConfig';
import type { categoriasBackend } from './categoriasTypes';


export const getCategorias = async (): Promise<categoriasBackend[]> => {
    const response = await api.get<categoriasBackend[]>('/categorias');
    return response.data;
}

export const createCategoria = async (categoria: Omit<categoriasBackend, 'id'>): Promise<categoriasBackend> => {
    const response = await api.post<categoriasBackend>('/categorias', categoria);
    return response.data;
}

export const updateCategoria = async (id: number, categoria: Partial<Omit<categoriasBackend, 'id'>>): Promise<categoriasBackend> => {
    const response = await api.put<categoriasBackend>(`/categorias/${id}`, categoria);
    return response.data;
}

export const deleteCategoria = async (id: number): Promise<void> => {
    await api.delete(`/categorias/${id}`);
}