import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EmailCode } from '../../domain/entities/email_code.entity';
import { TipoEmailCode } from '../../domain/entities/email_code.entity';
import { type EmailCodeRepository } from '../../domain/ports/email-code-repository.port';
import { EmailCodeOrmEntity } from './email-code.orm-entity';

@Injectable()
export class EmailCodeTypeOrmRepository implements EmailCodeRepository {
  constructor(
    @InjectRepository(EmailCodeOrmEntity)
    private readonly repository: Repository<EmailCodeOrmEntity>,
  ) {}

  async save(emailCode: EmailCode): Promise<EmailCode> {
    const ormEntity = this.repository.create({
      ...(emailCode.id != null && { id: emailCode.id }),
      usuarioId: emailCode.usuarioId,
      codigo: emailCode.codigo,
      tipo: emailCode.tipo,
      expiresAt: emailCode.expiresAt,
      usedAt: emailCode.usedAt,
    });

    const savedEntity = await this.repository.save(ormEntity);

    return this.toDomain(savedEntity);
  }

  async findById(id: number): Promise<EmailCode | null> {
    const entity = await this.repository.findOneBy({ id });

    return entity ? this.toDomain(entity) : null;
  }

  async findByCodigo(codigo: string): Promise<EmailCode | null> {
    const entity = await this.repository.findOneBy({ codigo });

    return entity ? this.toDomain(entity) : null;
  }

  async findByUsuarioIdAndTipo(
    usuarioId: number,
    tipo: TipoEmailCode,
  ): Promise<EmailCode | null> {
    const entity = await this.repository.findOneBy({ usuarioId, tipo });

    return entity ? this.toDomain(entity) : null;
  }

  private toDomain(entity: EmailCodeOrmEntity): EmailCode {
    return new EmailCode(
      entity.id,
      entity.usuarioId,
      entity.codigo,
      entity.tipo as EmailCode['tipo'],
      entity.expiresAt,
      entity.usedAt,
      entity.createdAt,
      entity.updatedAt,
      entity.deletedAt,
    );
  }
}
