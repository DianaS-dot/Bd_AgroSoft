import { Injectable, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '../../domain/entities/user.entity';
import type { UserRepository } from '../../domain/ports/user-repository.port';
import { USER_REPOSITORY } from '../../domain/ports/user-repository.port';

export interface LoginDto {
  correo_usuario: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  user: {
    id: number;
    nombre: string;
    correo_usuario: string;
    id_rol: number;
  };
}

@Injectable()
export class LoginUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async execute(loginDto: LoginDto): Promise<LoginResponse> {
    // 1. Buscar usuario por email
    const user = await this.userRepository.findByEmail(loginDto.correo_usuario);
    if (!user) {
      throw new Error('Credenciales inválidas');
    }

    // 2. Verificar contraseña
    const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);
    if (!isPasswordValid) {
      throw new Error('Credenciales inválidas');
    }

    // 3. Generar JWT
    const payload = {
      sub: user.id,
      nombre: user.nombre,
      correo_usuario: user.email,
      id_rol: user.rolId,
    };

    const access_token = this.jwtService.sign(payload);

    return {
      access_token,
      user: {
        id: user.id,
        nombre: user.nombre,
        correo_usuario: user.email,
        id_rol: user.rolId,
      },
    };
  }
}