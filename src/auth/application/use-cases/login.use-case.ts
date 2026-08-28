import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { USUARIO_REPOSITORY } from '../../../usuarios/domain/ports/usuario-repository.port';
import type { UsuarioRepository } from '../../../usuarios/domain/ports/usuario-repository.port';

@Injectable()
export class LoginUseCase {
  constructor(
    @Inject(USUARIO_REPOSITORY)
    private readonly usuarioRepository: UsuarioRepository,

    private readonly jwtService: JwtService,
  ) {}

  async execute(correo: string, password: string) {
    const usuario = await this.usuarioRepository.findByCorreo(correo);

    if (!usuario) {
      throw new UnauthorizedException('Correo o contraseña incorrectos');
    }

    const passwordValida = await bcrypt.compare(
      password,
      usuario.passwordHash,
    );

    if (!passwordValida) {
      throw new UnauthorizedException('Correo o contraseña incorrectos');
    }

    if (usuario.estado !== 'ACTIVO') {
      throw new UnauthorizedException(
        'El usuario no se encuentra activo',
      );
    }

    usuario.registrarLogin();

    await this.usuarioRepository.save(usuario);

    const payload = {
      sub: usuario.id,
      correo: usuario.correo,
      rolId: usuario.rolId,
    };

    return {
      access_token: this.jwtService.sign(payload),
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        correo: usuario.correo,
        rolId: usuario.rolId,
      },
    };
  }
}