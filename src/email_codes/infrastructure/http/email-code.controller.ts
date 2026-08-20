import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { CreateEmailCodeUseCase } from '../../application/use_cases/create-email-code.use-case';
import { GetEmailCodeUseCase } from '../../application/use_cases/get-email-code.use-case';
import { CreateEmailCodeDto } from './dto/create-email-code.dto';
import { VerifyEmailCodeDto } from './dto/verify-email-code.dto';

@Controller('email-codes')
export class EmailCodeController {
  constructor(
    private readonly createEmailCodeUseCase: CreateEmailCodeUseCase,
    private readonly getEmailCodeUseCase: GetEmailCodeUseCase,
  ) {}

  // ─── POST /api/v1/email-codes ─────────────────────────────────────────────────
  /**
   * Genera un código de verificación/recuperación y lo persiste.
   * En producción también dispararía el envío del correo aquí.
   */
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: CreateEmailCodeDto) {
    // El código y expiración los genera el caso de uso internamente
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minutos
    const codigo = Math.floor(100000 + Math.random() * 900000).toString(); // 6 dígitos

    const emailCode = await this.createEmailCodeUseCase.execute({
      usuarioId: dto.usuarioId,
      tipo: dto.tipo,
      codigo,
      expiresAt,
    });
    return { data: emailCode };
  }

  // ─── POST /api/v1/email-codes/verificar ──────────────────────────────────────
  /** Verifica si un código recibido es válido (no expirado, no usado) */
  @Post('verificar')
  @HttpCode(HttpStatus.OK)
  async verify(@Body() dto: VerifyEmailCodeDto) {
    const emailCode = await this.getEmailCodeUseCase.findByCodigo(dto.codigo);
    const esValido = emailCode.esValido();
    return {
      data: {
        valido: esValido,
        tipo: emailCode.tipo,
        usuarioId: emailCode.usuarioId,
      },
    };
  }

  // ─── GET /api/v1/email-codes/:id ─────────────────────────────────────────────
  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number) {
    const emailCode = await this.getEmailCodeUseCase.findById(id);
    return { data: emailCode };
  }

  // ─── GET /api/v1/email-codes/usuario/:usuarioId/tipo/:tipo ───────────────────
  /** Busca el código activo de un usuario para un tipo concreto */
  @Get('usuario/:usuarioId/tipo/:tipo')
  async findByUsuarioAndTipo(
    @Param('usuarioId', ParseIntPipe) usuarioId: number,
    @Param('tipo') tipo: 'VERIFICACION' | 'RECUPERACION',
  ) {
    const emailCode = await this.getEmailCodeUseCase.findByUsuarioIdAndTipo(
      usuarioId,
      tipo,
    );
    return { data: emailCode };
  }
}
