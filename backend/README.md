# Backend - Planificador de Menús Semanal

Backend simple con Node.js, Express, TypeScript y Prisma (SQLite).

## 🚀 Cómo empezar

### 1. Instalar dependencias (ya hecho)
```bash
npm install
```

### 2. Configurar la base de datos
La base de datos SQLite ya está configurada en `prisma/dev.db`.

Si necesitas regenerar el cliente de Prisma:
```bash
npm run prisma:generate
```

### 3. Ejecutar el servidor en modo desarrollo
```bash
npm run dev
```

El servidor estará corriendo en: **http://localhost:3001**

## 📋 Endpoints disponibles

### Autenticación
- `POST /api/auth/register` - Registrar nuevo usuario
  ```json
  { "username": "usuario", "password": "contraseña" }
  ```

- `POST /api/auth/login` - Iniciar sesión
  ```json
  { "username": "usuario", "password": "contraseña" }
  ```

### Recetas
- `GET /api/recipes?userId=1` - Obtener todas las recetas de un usuario
- `GET /api/recipes/:id` - Obtener una receta específica
- `POST /api/recipes` - Crear nueva receta
  ```json
  {
    "name": "Lentejas",
    "type": ["Legumbre"],
    "ingredients": [
      { "name": "lentejas", "quantity": "400g" }
    ],
    "userId": 1
  }
  ```
- `DELETE /api/recipes/:id` - Eliminar receta

### Plan Semanal
- `GET /api/plans?userId=1` - Obtener plan semanal del usuario
- `POST /api/plans` - Añadir receta al plan
  ```json
  {
    "userId": 1,
    "day": "Lunes",
    "slot": "lunch",
    "recipeId": 1
  }
  ```
- `DELETE /api/plans` - Eliminar receta del plan

### Health Check
- `GET /api/health` - Verificar que el servidor está funcionando

## 🗄️ Base de Datos

La base de datos usa **SQLite** (archivo local `prisma/dev.db`).

### Modelos:
- **User**: Usuarios de la aplicación
- **Recipe**: Recetas con ingredientes
- **Ingredient**: Ingredientes de cada receta
- **WeeklyPlanEntry**: Entradas del planificador semanal

### Ver la base de datos:
```bash
npx prisma studio
```

Esto abre una interfaz web en http://localhost:5555 para ver y editar los datos.

## 📝 Notas

- Las contraseñas NO están hasheadas (solo para desarrollo)
- CORS está habilitado para permitir peticiones desde el frontend
- El servidor se reinicia automáticamente al hacer cambios (gracias a ts-node-dev)

## 🔧 Scripts disponibles

- `npm run dev` - Ejecutar en modo desarrollo
- `npm run build` - Compilar TypeScript a JavaScript
- `npm start` - Ejecutar versión compilada
- `npm run prisma:generate` - Regenerar Prisma Client
- `npm run prisma:migrate` - Crear nueva migración
