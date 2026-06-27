# daily-planner

Backend API para la aplicación Daily Planner.
Esta API ofrece autenticación con JWT, gestión de usuarios y CRUD de tareas.

## Tecnologías utilizadas

- Node.js
- Express
- MongoDB
- Mongoose
- bcrypt
- JSON Web Tokens (JWT)
- dotenv
- cors

## Estructura de carpetas

```
backend/
  package.json
  src/
    app.js
    index.js
    config/
      db.js
    controllers/
      auth.controller.js
      task.controller.js
      user.controller.js
    middlewares/
      authMiddleware.js
    models/
      task.model.js
      user.model.js
    routes/
      auth.routes.js
      task.routes.js
      user.routes.js
```

## Instalación

1. Ve a la carpeta `backend`:
   ```bash
   cd backend
   ```

2. Instala dependencias:
   ```bash
   npm install
   ```

## Variables de entorno

Crea un archivo `.env` en `backend/` con las siguientes variables:

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/daily-planner
JWT_SECRET=tu_secreto_jwt
```

- `PORT`: puerto donde corre el backend.
- `MONGO_URI`: URI de conexión a MongoDB.
- `JWT_SECRET`: clave para firmar y verificar tokens JWT.

## Cómo ejecutar

- En modo producción:
  ```bash
  npm start
  ```

- En modo desarrollo con `nodemon`:
  ```bash
  npm run dev
  ```

El servidor se inicia desde `src/index.js`, que carga las variables de entorno, conecta a MongoDB y arranca Express.

## Modelos

### User
Campos del modelo `User`:
- `name` (String, requerido)
- `email` (String, requerido, único)
- `password` (String, requerido, `select: false`)
- `createdAt` (Date, default `Date.now`)

### Task
Campos del modelo `Task`:
- `userId` (ObjectId, requerido)
- `title` (String, requerido)
- `description` (String, requerido)
- `status` (String, requerido)
- `dueDate` (Date, opcional)
- `createdAt` (Date, default `Date.now`)

## Endpoints implementados

### Rutas públicas

- `POST /api/auth/register`
  - Registra un nuevo usuario.
  - Recibe `name`, `email`, `password`.

- `POST /api/auth/login`
  - Autentica un usuario y devuelve un token JWT.
  - Recibe `email`, `password`.

- `POST /api/users`
- `GET /api/users`
- `GET /api/users/:id`
- `PUT /api/users/:id`
- `DELETE /api/users/:id`

> Las rutas de usuario (`/api/users`) no están protegidas actualmente en `user.routes.js`.

### Rutas protegidas

Todas las rutas bajo `/api/tasks` requieren JWT en el header `Authorization`.

- `POST /api/tasks`
- `GET /api/tasks`
- `GET /api/tasks/:id`
- `PUT /api/tasks/:id`
- `DELETE /api/tasks/:id`

## Autenticación

- El login genera un token JWT válido por 1 hora.
- El token se firma con `JWT_SECRET`.
- Las rutas de tareas usan `authMiddleware` para validar el token.

### Header Authorization

Envía el token en cada petición protegida:

```
Authorization: Bearer <token>
```

El middleware:
- comprueba que el header exista,
- verifica que empieza con `Bearer `,
- extrae el token,
- ejecuta `jwt.verify(...)`,
- añade el payload decodificado a `req.user`.

## Estado actual del proyecto

- Backend MVP funcional.
- Autenticación con JWT y bcrypt.
- CRUD básico de tareas.
- Gestión de usuarios básica.
- No incluye tests automatizados ni roles avanzados.
