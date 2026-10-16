

export interface categoriasBackend{
    id: number;
    nombre: string;
    descripcion: string;
    tipoInsumo: string;

}

//Dto paracrear categorias
export interface CreateCategoriasDto {
    nombre: string;
    descripcion?: string;
    tipoInsumo: string;
}

export interface UpdateCategoriasDto {
    nombre?: string;
    descripcion?: string;
    tipoInsumo?: string;
}

export interface deleteCategoriasDto {
    id: number;
}

