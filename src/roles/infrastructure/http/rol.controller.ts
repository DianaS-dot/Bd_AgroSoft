import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { CreateRolUseCase } from '../../application/create-rol.use-case';
import { GetRolUseCase } from '../../application/get-rol.use-case';
import { CreateRolDto } from './dto/create-rol.dto';
import { UpdateRolDto } from './dto/update-rol.dto';

@Controller('roles')
export class RolController {
  constructor(
    private readonly createRolUseCase: CreateRolUseCase,
    private readonly getRolUseCase: GetRolUseCase,
  ) {}

  // ─── POST /api/v1/roles ──────────────────────────────────────────────────────
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: CreateRolDto) {
    const rol = await this.createRolUseCase.execute({
      nombre: dto.nombre,
      descripcion: dto.descripcion,
      estado: dto.estado,
    });
    return { data: rol };
  }

  // ─── GET /api/v1/roles/:id ───────────────────────────────────────────────────
  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number) {
    const rol = await this.getRolUseCase.findById(id);
    return { data: rol };
  }

  // ─── GET /api/v1/roles/nombre/:nombre ────────────────────────────────────────
  @Get('nombre/:nombre')
  async findByNombre(@Param('nombre') nombre: string) {
    const rol = await this.getRolUseCase.findByNombre(nombre);
    return { data: rol };
  }

  // ─── PATCH /api/v1/roles/:id ─────────────────────────────────────────────────
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() _dto: UpdateRolDto,
  ) {
    // TODO: implementar UpdateRolUseCase cuando esté disponible
    return {
      message: `Actualización del rol ${id} pendiente de implementación del caso de uso`,
    };
  }

  // ─── DELETE /api/v1/roles/:id ────────────────────────────────────────────────
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseIntPipe) id: number) {
    // TODO: implementar soft-delete en caso de uso
    return;
  }
}
