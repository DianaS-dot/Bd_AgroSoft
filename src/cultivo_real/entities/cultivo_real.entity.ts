import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { CultivoBase } from '../../cultivo_base/entities/cultivo_base.entity';

@Entity('cultivo_real')
export class CultivoReal {
  @PrimaryGeneratedColumn()
  id_cultivo_real!: number;

  @Column({ type: 'date' })
  fecha_inicio!: string;

  @Column()
  tamaño_lote!: string;

  @Column({ default: 'en proceso' })
  estado!: string;

  // Relación con CultivoBase
  @ManyToOne(() => CultivoBase, (cultivoBase) => cultivoBase.cultivosReales)
  @JoinColumn({ name: 'id_cultivo_base' })
  cultivoBase!: CultivoBase;
}