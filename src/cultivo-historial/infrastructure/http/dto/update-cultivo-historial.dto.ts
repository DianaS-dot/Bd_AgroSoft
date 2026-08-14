import { PartialType } from "@nestjs/mapped-types";
import { CreateCultivoHistorialDto } from "./create-cultivo-historial.dto";

export class UpdateCultivoHistorialDto extends PartialType(
    CreateCultivoHistorialDto,
) {}