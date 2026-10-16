import api from '../axiosConfig';

import type { CreateCategoriasDto, UpdateCategoriasDto, deleteCategoriasDto } from './categoriasTypes';


export const createCategoria = async (categoria: CreateCategoriasDto): Promise<void> => {
    const response = await api.post('/categorias', categoria);
    return response.data;
};

export const updateCategoria = async (id: number, categoria: UpdateCategoriasDto): Promise<void> => {
    const response = await api.put(`/categorias/${id}`, categoria);
    return response.data;
};

export const deleteCategoria = async (categoria: deleteCategoriasDto): Promise<void> => {
    const response = await api.delete(`/categorias/${categoria.id}`);
    return response.data;
};