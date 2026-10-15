# Guía de Contribución - AGROSOFT Backend

Gracias por tu interés en contribuir al proyecto AGROSOFT Backend. Esta guía te ayudará a configurar tu entorno de desarrollo y seguir las mejores prácticas del equipo.

## 📋 Requisitos Previos

- Node.js v20 (usa `nvm` para gestionar versiones)
- Docker y Docker Compose
- Git
- Un editor de código (VS Code recomendado)

## 🚀 Configuración Inicial

### 1. Clonar el Repositorio

```bash
git clone <repository-url>
cd backend
```

### 2. Configurar Node.js

```bash
# Usar la versión especificada en .nvmrc
nvm use
# Si no tienes la versión:
nvm install 20
nvm use 20
```

### 3. Instalar Dependencias

```bash
npm install
```

### 4. Configurar Variables de Entorno

```bash
# Copiar el archivo de ejemplo
cp .env.example .env
```

**IMPORTANTE**: No cambies los valores por defecto en `.env` a menos que sea necesario. Los valores ya están configurados para funcionar con Docker.

### 5. Iniciar la Base de Datos

```bash
# Usar el script de npm
npm run db:up

# O directamente con docker-compose
docker-compose up -d
```

### 6. Verificar que Todo Funciona

```bash
# Iniciar el servidor en modo desarrollo
npm run start:dev
```

El servidor debería iniciar en `http://localhost:3000`

## 🌿 Flujo de Trabajo con Git

### Crear una Rama de Trabajo

Cada desarrollador debe trabajar en su propia rama:

```bash
# Crear y cambiar a tu rama de feature
git checkout -b feature/nombre-de-tu-feature

# Para correcciones de bugs
git checkout -b fix/nombre-del-bug

# Para mejoras
git checkout -b improvement/nombre-de-mejora
```

### Hacer Commits

Usa mensajes de commit claros y descriptivos:

```bash
# Añadir archivos
git add .

# Hacer commit con mensaje claro
git commit -m "feat: add new endpoint for actividades"

# Opciones de prefijo:
# feat: nueva funcionalidad
# fix: corrección de bug
# docs: cambios en documentación
# style: cambios de formato (espacios, sangría)
# refactor: refactorización de código
# test: agregar o modificar tests
# chore: tareas de mantenimiento
```

### Subir tu Rama

```bash
# Subir tu rama al remoto
git push -u origin feature/nombre-de-tu-feature
```

### Crear Pull Request

1. Ve a GitHub
2. Crea un Pull Request desde tu rama hacia `main` o `develop`
3. Llena el template de PR con:
   - Descripción de los cambios
   - Tests realizados
   - Capturas de pantalla (si aplica)
4. Solicita revisión a al menos un miembro del equipo

## 📝 Convenciones de Código

### Estilo de Código

- Sigue la arquitectura hexagonal existente
- Usa TypeScript estricto
- Mantén las funciones pequeñas y enfocadas
- Usa nombres descriptivos para variables y funciones

### Linting y Formateo

Antes de hacer commit, asegúrate de:

```bash
# Lintear el código
npm run lint

# Formatear el código
npm run format
```

### Arquitectura

Mantén la estructura de capas:

- **Domain**: Lógica de negocio pura, sin dependencias externas
- **Application**: Casos de uso que orquestan el dominio
- **Infrastructure**: Implementaciones (HTTP, persistencia)

## 🧪 Testing

### Escribir Tests

Antes de agregar nueva funcionalidad, escribe tests:

```bash
# Ejecutar tests unitarios
npm run test

# Ejecutar tests con coverage
npm run test:cov

# Ejecutar tests E2E
npm run test:e2e
```

### Reglas de Testing

- Mantén tests independientes
- Usa nombres descriptivos para los tests
- Mockea dependencias externas
- Mantén tests rápidos

## 🐛 Reportar Bugs

Al reportar un bug, incluye:

1. **Descripción clara** del problema
2. **Pasos para reproducir**
3. **Comportamiento esperado** vs **comportamiento actual**
4. **Capturas de pantalla** o logs
5. **Entorno** (OS, Node.js version, etc.)

## 💡 Sugerencias de Mejoras

1. Abre un issue primero para discutir la mejora
2. Espera aprobación del equipo antes de implementar
3. Sigue el flujo de trabajo de Git estándar
4. Incluye tests para la nueva funcionalidad

## 📦 Scripts Útiles

```bash
# Desarrollo
npm run start:dev        # Iniciar con hot-reload
npm run start:debug      # Iniciar en modo debug

# Base de datos
npm run db:up            # Iniciar PostgreSQL con Docker
npm run db:down          # Detener PostgreSQL
npm run db:restart       # Reiniciar PostgreSQL
npm run db:logs          # Ver logs de PostgreSQL

# Calidad de código
npm run lint             # Lintear código
npm run format           # Formatear código

# Tests
npm run test             # Tests unitarios
npm run test:e2e         # Tests E2E
npm run test:cov         # Tests con coverage
```

## ⚠️ Problemas Comunes

### Puerto 5433 ya está en uso

```bash
# Ver qué está usando el puerto
docker-compose ps

# O cambiar el puerto en .env
POSTGRES_PORT_EXTERNAL=5434
```

### Error de conexión a la base de datos

```bash
# Verificar que Docker está corriendo
docker ps

# Reiniciar el contenedor
npm run db:restart

# Ver logs
npm run db:logs
```

### Errores de TypeScript

```bash
# Limpiar caché y reconstruir
rm -rf dist
npm run build
```

## 📞 Contacto

Para dudas o problemas:
- Crea un issue en el repositorio
- Contacta al equipo de desarrollo
- Revisa la documentación en el README.md

## 📄 Licencia

Este proyecto es propiedad de AGROSOFT. Todo el código es confidencial y propiedad de la empresa.
