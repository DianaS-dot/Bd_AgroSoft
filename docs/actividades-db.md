# Base de datos - Modulo de actividades

Este modulo organiza la gestion de actividades agricolas y sus elementos relacionados.

## Tablas

### actividades

Tabla principal del modulo. Representa una actividad programada o ejecutada.

| Campo | Tipo | Descripcion |
| --- | --- | --- |
| id_actividad | PK | Identificador de la actividad |
| titulo | string | Nombre corto de la actividad |
| descripcion | text | Detalle de la actividad |
| tipo_actividad | string | Tipo de labor o actividad |
| estado | string | Estado actual: pendiente, en proceso, completada, cancelada |
| prioridad | string | Prioridad: baja, media, alta |
| fecha_programada | date | Fecha planeada |
| fecha_inicio | date | Fecha en que inicia |
| fecha_fin | date | Fecha en que termina |
| id_cultivo_real | number | Cultivo real asociado, si aplica |
| fecha_creacion | timestamp | Fecha de creacion |
| fecha_actualizacion | timestamp | Fecha de ultima actualizacion |

### actividades_responsables

Relaciona usuarios responsables con una actividad.

| Campo | Tipo | Descripcion |
| --- | --- | --- |
| id_actividad_responsable | PK | Identificador del registro |
| id_actividad | FK | Actividad asignada |
| id_usuario | number | Usuario responsable |
| rol | string | Rol del responsable |
| estado_asignacion | string | Estado de la asignacion |

### actividades_evidencias

Guarda evidencias asociadas a una actividad.

| Campo | Tipo | Descripcion |
| --- | --- | --- |
| id_actividad_evidencia | PK | Identificador de la evidencia |
| id_actividad | FK | Actividad relacionada |
| tipo_evidencia | string | Tipo: imagen, documento, video, etc. |
| archivo_url | string | Ruta o URL del archivo |
| descripcion | text | Descripcion de la evidencia |
| observaciones | string | Observaciones adicionales |
| fecha_registro | timestamp | Fecha de registro |

### actividades_servicios

Registra servicios usados en una actividad.

| Campo | Tipo | Descripcion |
| --- | --- | --- |
| id_actividad_servicio | PK | Identificador del servicio |
| id_actividad | FK | Actividad relacionada |
| nombre_servicio | string | Nombre del servicio |
| descripcion | text | Detalle del servicio |
| costo | decimal | Costo del servicio |
| proveedor | string | Proveedor del servicio |

### actividades_herramientas

Registra herramientas usadas en una actividad.

| Campo | Tipo | Descripcion |
| --- | --- | --- |
| id_actividad_herramienta | PK | Identificador de la herramienta |
| id_actividad | FK | Actividad relacionada |
| nombre_herramienta | string | Nombre de la herramienta |
| cantidad | int | Cantidad usada |
| unidad_medida | string | Unidad de medida |
| estado_uso | string | Estado o condicion de uso |
| observaciones | text | Observaciones adicionales |

### actividad_historial

Registra cambios y acciones realizadas sobre una actividad.

| Campo | Tipo | Descripcion |
| --- | --- | --- |
| id_actividad_historial | PK | Identificador del historial |
| id_actividad | FK | Actividad relacionada |
| accion | string | Accion realizada |
| estado_anterior | string | Estado anterior |
| estado_nuevo | string | Estado nuevo |
| id_usuario | number | Usuario que realizo la accion |
| observaciones | text | Observaciones del cambio |
| fecha_registro | timestamp | Fecha de registro |

## Relaciones

- `actividades` tiene muchos `actividades_responsables`.
- `actividades` tiene muchas `actividades_evidencias`.
- `actividades` tiene muchos `actividades_servicios`.
- `actividades` tiene muchas `actividades_herramientas`.
- `actividades` tiene muchos registros en `actividad_historial`.

Ver diagrama visual en [`actividades-db.svg`](./actividades-db.svg).
