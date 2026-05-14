import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('evidencia')
export class Evidencia {
  @PrimaryGeneratedColumn()
  id_evidencia!: number;

  @Column()
  tipo_evidencia!: string; // Ejemplo: imagen, documento

  @Column()
  archivo_url!: string;

  @Column({ type: 'text', nullable: true })
  descripcion!: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fecha_registro!: Date;

  @Column({ nullable: true })
  observaciones!: string;

  @Column({ nullable: true })
  resultado_preliminar!: string;

  // Nota: Aquí faltaría la relación con Incidencia si ya tienes ese módulo creado
}