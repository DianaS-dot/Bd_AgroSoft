# Arquitectura hexagonal del modulo actividades

El modulo `actividades` queda separado en tres capas:

- `domain`: contiene el modelo `ActividadDomain` y el puerto `ActividadRepositoryPort`. No depende de NestJS ni de TypeORM.
- `application`: contiene los casos de uso: crear, listar, buscar, actualizar y eliminar actividades.
- `infrastructure`: contiene el adaptador `TypeOrmActividadRepository`, que implementa el puerto del dominio usando TypeORM.

El controlador HTTP se mantiene en la entrada del modulo y llama a `ActividadesService`, que funciona como fachada de aplicacion. La base de datos queda como detalle externo conectado por el puerto `ACTIVIDAD_REPOSITORY`.

## Conexion con otros modulos

Relaciones internas ya conectadas:

- `actividades.id_cultivo_real` -> `cultivo_real.id_cultivo_real`
- `actividades_responsables.id_actividad` -> `actividades.id_actividad`
- `actividades_evidencias.id_actividad` -> `actividades.id_actividad`
- `actividades_servicios.id_actividad` -> `actividades.id_actividad`
- `actividades_herramientas.id_actividad` -> `actividades.id_actividad`
- `actividad_historial.id_actividad` -> `actividades.id_actividad`

Puntos pendientes para tablas de otros equipos:

- `id_usuario` en responsables e historial debe conectarse cuando exista el modulo/entidad de usuarios.
- servicios y herramientas hoy guardan datos locales (`nombre_servicio`, `nombre_herramienta`). Si tus companeros tienen tablas `servicios` o `herramientas`, conviene reemplazar o complementar esos campos con `id_servicio` e `id_herramienta` y agregar las relaciones TypeORM correspondientes.

La regla para integrar tablas externas es que el dominio no importe entidades de infraestructura de otros modulos. Primero se crea un puerto en `domain/ports`, luego un caso de uso en `application`, y finalmente un adaptador en `infrastructure` que use TypeORM o el cliente externo necesario.
