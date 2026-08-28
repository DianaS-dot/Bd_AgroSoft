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
import { CreateUsuarioUseCase } from '../../../application/use_cases/create-usuario.use-case';
import { GetUsuarioUseCase } from '../../../application/use_cases/get-usuario.use-case';
import { CreateUsuarioDto } from '../dto/create-usuario.dto';
import { UpdateUsuarioDto } from '../dto/update-usuario.dto';
import { ChangePasswordDto } from '../dto/change-password.dto';
import { ChangeEstadoDto } from '../dto/change-estado.dto';
import * as bcrypt from 'bcrypt';
@Controller('usuarios')
export class UsuarioController {
  constructor(
    private readonly createUsuarioUseCase: CreateUsuarioUseCase,
    private readonly getUsuarioUseCase: GetUsuarioUseCase,
  ) {}

  // ─── POST /api/v1/usuarios ───────────────────────────────────────────────────
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: CreateUsuarioDto) {
    const usuario = await this.createUsuarioUseCase.execute({
      nombre: dto.nombre,
      apellido: dto.apellido,
      identificacion: dto.identificacion,
      idFicha: dto.idFicha,
      programaFormacionId: dto.programaFormacionId,
      telefono: dto.telefono,
      correo: dto.correo,
      // En producción se haría hash aquí antes de pasar al caso de uso
      // ej: passwordHash: await bcrypt.hash(dto.password, 10)
      passwordHash: await bcrypt.hash(dto.password, 10),   
      rolId: dto.rolId,
      estado: dto.estado,
    });
    return { data: usuario };
  }

  // ─── GET /api/v1/usuarios/:id ────────────────────────────────────────────────
  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number) {
    const usuario = await this.getUsuarioUseCase.findById(id);
    return { data: usuario };
  }

  // ─── GET /api/v1/usuarios/correo/:correo ─────────────────────────────────────
  @Get('correo/:correo')
  async findByCorreo(@Param('correo') correo: string) {
    const usuario = await this.getUsuarioUseCase.findByCorreo(correo);
    return { data: usuario };
  }

  // ─── PATCH /api/v1/usuarios/:id ──────────────────────────────────────────────
  /**
   * Actualización parcial de datos no sensibles.
   * Los campos sensibles (password, estado) tienen endpoints dedicados.
   */
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() _dto: UpdateUsuarioDto,
  ) {
    // TODO: implementar UpdateUsuarioUseCase cuando esté disponible
    return {
      message: `Actualización de usuario ${id} pendiente de implementación del caso de uso`,
    };
  }

  // ─── PATCH /api/v1/usuarios/:id/estado ───────────────────────────────────────
  @Patch(':id/estado')
  async changeEstado(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: ChangeEstadoDto,
  ) {
    // TODO: implementar cambio de estado en caso de uso
    return {
      message: `Cambio de estado a '${dto.estado}' del usuario ${id} pendiente de implementación`,
    };
  }

  // ─── PATCH /api/v1/usuarios/:id/password ─────────────────────────────────────
  @Patch(':id/password')
  @HttpCode(HttpStatus.NO_CONTENT)
  async changePassword(
    @Param('id', ParseIntPipe) id: number,
    @Body() _dto: ChangePasswordDto,
  ) {
    // TODO: implementar cambio de contraseña en caso de uso
    // Pasos: findById → verificar passwordActual → cambiarPassword → save
    return;
  }

  // ─── DELETE /api/v1/usuarios/:id ─────────────────────────────────────────────
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseIntPipe) id: number) {
    // TODO: implementar soft-delete en caso de uso
    return;
  }
}
