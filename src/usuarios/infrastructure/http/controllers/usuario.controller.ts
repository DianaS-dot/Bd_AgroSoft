import {
  Body,
  Controller,
  Post,
} from '@nestjs/common';

import { CreateUsuarioUseCase } from '../../../application/use_cases/create-usuario.use-case.js';
import { CreateUsuarioDto } from '../dto/create-usuario.dto.js';

@Controller('usuarios')
export class UsuarioController {
  constructor(
    private readonly createUsuarioUseCase: CreateUsuarioUseCase,
  ) {}

  @Post()
  async create(
    @Body() dto: CreateUsuarioDto,
  ) {
    return this.createUsuarioUseCase.execute(dto);
  }
}