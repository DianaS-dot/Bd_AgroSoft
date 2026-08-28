import { Injectable, Inject } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from '../../domain/entities/user.entity';
import type { UserRepository } from '../../domain/ports/user-repository.port';
import { USER_REPOSITORY } from '../../domain/ports/user-repository.port';

export interface RegisterDto {
  nombre: string;
  correo_usuario: string;
  password: string;
  id_rol: number;
  telefono?: string;
  id_cultivo_real?: number;
}

@Injectable()
export class RegisterUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
  ) {}

  async execute(registerDto: RegisterDto): Promise<User> {
    // 1. Verificar si el email ya está en uso
    const existingEmail = await this.userRepository.findByEmail(registerDto.correo_usuario);
    if (existingEmail) {
      throw new Error('El email ya está en uso');
    }

    // 2. Hashear la contraseña
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);

    // 3. Crear el usuario
    const user = User.create({
      nombre: registerDto.nombre,
      email: registerDto.correo_usuario,
      password: hashedPassword,
      rolId: registerDto.id_rol,
      telefono: registerDto.telefono,
      cultivoRealId: registerDto.id_cultivo_real,
    });

    // 4. Guardar en la base de datos
    return await this.userRepository.save(user);
  }
}