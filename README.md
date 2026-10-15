# AGROSOFT - Backend API

API RESTful para el módulo de actividades de AGROSOFT, implementada con NestJS y arquitectura hexagonal.

## 🛠️ Tecnologías

- **NestJS** v11.0.1
- **TypeScript** v5.7.3
- **TypeORM** v0.3.20
- **PostgreSQL** 15
- **class-validator** v0.15.1
- **class-transformer** v0.5.1
- **Node.js** v20

## 📁 Estructura

```
src/
├── actividades/                  # Módulo de actividades
│   ├── application/
│   │   └── use-cases/           # Casos de uso
│   ├── domain/
│   │   ├── entities/            # Entidades del dominio
│   │   └── ports/               # Interfaces de repositorios
│   └── infrastructure/
│       ├── http/
│       │   ├── controllers/     # Controladores REST
│       │   └── dto/             # Data Transfer Objects
│       └── persistence/         # Implementación TypeORM
├── actividad-historial/          # Módulo de historial
├── actividades-evidencias/       # Módulo de evidencias
├── actividades-herramientas/     # Módulo de herramientas
├── actividades-responsables/     # Módulo de responsables
├── actividades-servicios/        # Módulo de servicios
├── app.module.ts                 # Módulo raíz
└── main.ts                       # Punto de entrada
```

## 🚀 Guía de Inicio Rápido (Setup para desarrolladores)

### Requisitos Previos

- Node.js v20 (use `nvm` para gestionar versiones)
- Docker y Docker Compose (para PostgreSQL)
- Git

### 1. Clonar el repositorio

```bash
git clone <repository-url>
cd backend
```

### 2. Instalar la versión correcta de Node.js

```bash
# Si tienes nvm instalado:
nvm use
# o instalar la versión específica:
nvm install 20
nvm use 20
```

### 3. Instalar dependencias

```bash
npm install
```

### 4. Configurar variables de entorno

```bash
# Copiar el archivo de ejemplo
cp .env.example .env

# Editar .env si necesitas cambiar valores (opcional para desarrollo)
# Los valores por defecto ya están configurados para funcionar con Docker
```

**IMPORTANTE**: Las variables de entorno en `.env` deben coincidir con `docker-compose.yml`:
- `DB_HOST=localhost`
- `DB_PORT=5433` (puerto externo de Docker)
- `DB_USERNAME=backend_user`
- `DB_PASSWORD=change_this_secure_password` (cámbialo en producción)
- `DB_DATABASE=db_agrosoft`

### 5. Iniciar la base de datos con Docker

```bash
# Solo base de datos (desarrollo local)
docker-compose up -d

# Verificar que PostgreSQL está corriendo
docker-compose ps
```

### 6. Iniciar el servidor en modo desarrollo

```bash
npm run start:dev
```

El servidor estará disponible en `http://localhost:3000`

## 🏃 Ejecución

### Desarrollo

```bash
# Iniciar base de datos
docker-compose up -d

# Iniciar servidor con hot-reload
npm run start:dev
```

### Producción con Docker

```bash
# Construir y levantar todos los servicios (backend + postgres)
docker-compose -f docker-compose.prod.yml up -d --build

# Ver logs
docker-compose -f docker-compose.prod.yml logs -f
```

### Sin Docker (desarrollo local con PostgreSQL instalado)

```bash
# Configurar .env con tus credenciales de PostgreSQL local
# DB_PORT=5432 (puerto por defecto de PostgreSQL)

# Iniciar servidor
npm run start:dev
```

### Tests

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Coverage
npm run test:cov
```

### Linting y Formateo

```bash
# Lintear código
npm run lint

# Formatear código
npm run format
```

## 🌿 Trabajo con Ramas (Git Workflow)

Este es un proyecto colaborativo. Cada desarrollador debe trabajar en su propia rama:

```bash
# Crear y cambiar a tu rama de trabajo
git checkout -b feature/tu-feature

# Hacer cambios y commits
git add .
git commit -m "Add: tu descripción"

# Subir tu rama al remoto
git push -u origin feature/tu-feature

# Crear Pull Request en GitHub para revisión
```

## 📡 API Endpoints

### Actividades

|| Método | Endpoint | Descripción |
||--------|----------|-------------|
|| GET | `/actividades` | Listar todas las actividades |
|| GET | `/actividades/:id` | Obtener una actividad por ID |
|| POST | `/actividades` | Crear una nueva actividad |
|| PUT | `/actividades/:id` | Actualizar una actividad |
|| DELETE | `/actividades/:id` | Eliminar una actividad |

### Otros módulos

Similar estructura para:
- `/actividad-historial`
- `/actividades-evidencias`
- `/actividades-herramientas`
- `/actividades-responsables`
- `/actividades-servicios`

## 🏗️ Arquitectura Hexagonal

El proyecto sigue la arquitectura hexagonal (Ports and Adapters):

### Domain Layer
- Contiene la lógica de negocio pura
- No depende de frameworks externos
- Define entidades y puertos (interfaces)

### Application Layer
- Contiene los casos de uso
- Orquesta las operaciones del dominio
- Usa DTOs para transferencia de datos

### Infrastructure Layer
- Implementa los puertos del dominio
- Controladores HTTP
- Repositorios TypeORM
- Configuración externa

## 🔒 Seguridad

- Validación de DTOs con class-validator
- Configuración de CORS
- Variables de entorno para datos sensibles
- Transformación automática de tipos
- `.env` excluido de Git (ver `.gitignore`)

## 📝 Scripts Disponibles

|| Script | Descripción |
||--------|-------------|
|| `npm run build` | Compila el proyecto |
|| `npm run format` | Formatea el código con Prettier |
|| `npm run start` | Inicia la aplicación en modo prod |
|| `npm run start:dev` | Inicia en modo desarrollo con watch |
|| `npm run start:debug` | Inicia en modo debug |
|| `npm run start:prod` | Inicia en modo producción |
|| `npm run lint` | Ejecuta ESLint |
|| `npm run test` | Ejecuta tests unitarios |
|| `npm run test:cov` | Ejecuta tests con coverage |
|| `npm run test:e2e` | Ejecuta tests E2E |

## 🐳 Comandos Docker

```bash
# Iniciar servicios de desarrollo
docker-compose up -d

# Detener servicios
docker-compose down

# Ver logs
docker-compose logs -f

# Reconstruir contenedores
docker-compose up -d --build

# Eliminar volúmenes (borra datos de la base de datos)
docker-compose down -v
```

## ⚠️ Solución de Problemas Comunes

### Error: "Connection refused" al conectar a PostgreSQL

**Causa**: El puerto 5433 ya está en uso o Docker no está corriendo.

**Solución**:
```bash
# Verificar que el contenedor está corriendo
docker-compose ps

# Reiniciar el contenedor
docker-compose restart

# Si el puerto está en uso, cambiar POSTGRES_PORT_EXTERNAL en .env
```

### Error: "Module not found" después de npm install

**Solución**:
```bash
# Limpiar caché y reinstalar
rm -rf node_modules package-lock.json
npm install
```

### Error de permisos en Docker (Linux/Mac)

**Solución**:
```bash
# Asegurarse de que el usuario tenga permisos en Docker
sudo usermod -aG docker $USER
# Cerrar sesión y volver a entrar
```

## 📞 Soporte

Para dudas o problemas:
- Revisar la documentación de [NestJS](https://docs.nestjs.com/)
- Revisar la documentación de [TypeORM](https://typeorm.io/)
- Crear un issue en el repositorio del proyecto
