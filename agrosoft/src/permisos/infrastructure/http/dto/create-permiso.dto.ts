import { IsString, IsNotEmpty, IsOptional, IsIn, MinLength, MaxLength } from 'class-validator';

/**
 * Basado en la tabla `permisos` del schema:
 *   modulo  varchar  - módulo del sistema al que aplica (ej: 'usuarios', 'cultivos')
 *   accion  varchar  - acción permitida            (ej: 'crear', 'leer', 'editar', 'eliminar')
 *   clave   varchar  - clave única compuesta       (ej: 'usuarios:crear')
 *
 * NOTA: La entidad de dominio usa 'nombre' y 'descripcion', pero la tabla
 * real tiene 'modulo', 'accion' y 'clave'. Se mantiene coherencia con el schema.
 */
export class CreatePermisoDto {
  /** Módulo del sistema al que pertenece el permiso (ej: 'usuarios', 'cultivos') */
  @IsString()
  @IsNotEmpty({ message: 'El módulo es obligatorio' })
  @MinLength(2, { message: 'El módulo debe tener al menos 2 caracteres' })
  @MaxLength(100)
  modulo: string;

  /** Acción que habilita este permiso (ej: 'crear', 'leer', 'editar', 'eliminar') */
  @IsString()
  @IsNotEmpty({ message: 'La acción es obligatoria' })
  @MinLength(2, { message: 'La acción debe tener al menos 2 caracteres' })
  @MaxLength(50)
  accion: string;

  /**
   * Clave única que identifica el permiso (ej: 'usuarios:crear').
   * Normalmente se genera como `${modulo}:${accion}`, pero se permite
   * recibirla explícitamente para mayor flexibilidad.
   */
  @IsString()
  @IsNotEmpty({ message: 'La clave del permiso es obligatoria' })
  @MaxLength(150)
  clave: string;
}
