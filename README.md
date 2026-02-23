# Planificador de Menús Semanal

Este proyecto está dividido en dos partes principales:

- **Frontend**: Aplicación React construida con Vite.
- **Backend**: API Node.js con Express y Prisma.

## Estructura del Proyecto

```
planificador-de-menus-semanal/
├── frontend/          # Aplicación React
├── backend/           # API Node.js
└── package.json       # Configuración de root (workspaces)
```

## Despliegue (Vercel)

Este proyecto está preparado para ser desplegado en **Vercel** (sin necesidad de tarjeta).

### 1. Backend (API)
- Crea un nuevo proyecto en Vercel.
- Selecciona el repositorio.
- En **Root Directory**, selecciona la carpeta `backend`.
- Configura las variables de entorno (ej: `DATABASE_URL` de Neon.tech).

### 2. Frontend (App)
- Crea otro proyecto en Vercel con el mismo repositorio.
- En **Root Directory**, selecciona la carpeta `frontend`.
- Configura `VITE_API_URL` apuntando a la URL del backend que te dio Vercel.
