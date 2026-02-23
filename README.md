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

## Cómo empezar

1. **Instalar todas las dependencias**:
   ```bash
   npm run install:all
   ```

2. **Ejecutar en desarrollo**:
   - Para ejecutar ambos (frontend y backend):
     ```bash
     npm run dev
     ```
   - Solo frontend:
     ```bash
     npm run dev:frontend
     ```
   - Solo backend:
     ```bash
     npm run dev:backend
     ```
