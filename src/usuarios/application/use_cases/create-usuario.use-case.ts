import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import * as bcrypt from 'bcrypt';

import { CreateUsuarioDto } from '../../infrastructure/http/dto/create-usuario.dto';
import { UsuarioOrmEntity } from '../../infrastructure/persistence/usuario.orm-entity';
import { RolOrmEntity } from '../../../roles/infrastructure/persistence/rol.orm-entity';

import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CreateUsuarioUseCase {
  constructor(
    @InjectRepository(UsuarioOrmEntity)
    private readonly usuarioRepository: Repository<UsuarioOrmEntity>,

    @InjectRepository(RolOrmEntity)
    private readonly rolRepository: Repository<RolOrmEntity>,
  ) {}

  async execute(dto: CreateUsuarioDto) {
    // Buscar rol
    const rol = await this.rolRepository.findOne({
      where: {
        id: dto.rolId,
      },
    });

    if (!rol) {
      throw new NotFoundException(
        `El rol con ID ${dto.rolId} no existe`,
      );
    }

    // Verificar correo
    const usuarioCorreo =
      await this.usuarioRepository.findOne({
        where: {
          correo: dto.correo,
        },
      });

    if (usuarioCorreo) {
      throw new ConflictException(
        'El correo ya está registrado',
      );
    }

    // Verificar identificación
    const usuarioIdentificacion =
      await this.usuarioRepository.findOne({
        where: {
          identificacion: dto.identificacion,
        },
      });

    if (usuarioIdentificacion) {
      throw new ConflictException(
        'La identificación ya está registrada',
      );
    }

    // Hashear contraseña
    const passwordHash = await bcrypt.hash(
      dto.password,
      10,
    );

    const usuario = this.usuarioRepository.create({
      nombre: dto.nombre,
      apellido: dto.apellido,
      identificacion: dto.identificacion,
      idFicha: dto.idFicha ?? null,
      programaFormacionId: dto.programaFormacionId,
      telefono: dto.telefono ?? null,
      correo: dto.correo,
      passwordHash,
      emailVerifiedAt: null,
      estado: dto.estado ?? 'ACTIVO',
      lastLoginAt: null,
      avatarUrl: null,

      // Aquí se guarda el ID real del rol
      rolId: rol.id,

      rol,
    });

    const usuarioGuardado =
      await this.usuarioRepository.save(usuario);

    return {
      id: usuarioGuardado.id,
      nombre: usuarioGuardado.nombre,
      apellido: usuarioGuardado.apellido,
      correo: usuarioGuardado.correo,
      estado: usuarioGuardado.estado,
      rolId: usuarioGuardado.rolId,
      rol: {
        id: rol.id,
        nombre: rol.nombre,
      },
    };
  }
}