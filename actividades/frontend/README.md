# Frontend Actividades AgroSoft

Cliente React para el modulo de actividades. La estructura separa dominio, aplicacion, infraestructura HTTP y presentacion para mantener el mismo criterio de arquitectura hexagonal del backend.

## Requisitos

- Node.js 20 o superior
- Backend NestJS de AgroSoft corriendo en `http://localhost:3000`

## Configuracion

```bash
cp .env.example .env
```

`VITE_API_URL` debe apuntar al backend:

```env
VITE_API_URL=http://localhost:3000
```

## Ejecutar

```bash
npm install
npm run dev
```

El frontend queda en `http://localhost:5173`.

## Endpoints usados

- `GET /actividades`
- `POST /actividades`
- `PATCH /actividades/:id`
- `DELETE /actividades/:id`
