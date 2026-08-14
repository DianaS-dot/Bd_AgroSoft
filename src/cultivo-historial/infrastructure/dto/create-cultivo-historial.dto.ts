import {
    IsInt,
    IsString,
} from "class-validator";

export class CreateCultivoHistorialDto {

    @IsInt()
    cultivoId!: number;

    @IsInt()
    usuarioId!: number;

    @IsString()
    motivo!: string;

    @IsString()
    cambios!: string;

}