# Daily-planner

Backend REST API for the Daily Planner application featuring JWT authentication and task management.

## Tech Stack

- Node.js
- Express
- MongoDB
- Mongoose
- bcrypt
- JSON Web Tokens (JWT)
- dotenv
- cors

## Folder structure

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

## Installation

1. Go to the `backend` folder:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Environment variables

Create a `.env` file in `backend/` with the following variables:

```env
PORT=3977
MONGO_URI=mongodb://localhost:27017/daily-planner
JWT_SECRET=your_jwt_secret
```

- `PORT`: the port where the backend runs.
- `MONGO_URI`: MongoDB connection URI.
- `JWT_SECRET`: secret key for signing and verifying JWT tokens.

## Running the project

- In production mode:
  ```bash
  npm start
  ```

- In development mode with `nodemon`:
  ```bash
  npm run dev
  ```

The server starts from `src/index.js`, which loads environment variables, connects to MongoDB, and starts Express.

## Models

### User
Fields in the `User` model:
- `name` (String, required)
- `email` (String, required, unique)
- `password` (String, required, `select: false`)
- `createdAt` (Date, default `Date.now`)

### Task
Fields in the `Task` model:
- `userId` (ObjectId, required)
- `title` (String, required)
- `description` (String, required)
- `status` (String, required)
- `dueDate` (Date, optional)
- `createdAt` (Date, default `Date.now`)

## API Endpoints

### Public routes

- `POST /api/auth/register`
  - Registers a new user.
  - Expects `name`, `email`, `password`.

- `POST /api/auth/login`
  - Authenticates a user and returns a JWT token.
  - Expects `email`, `password`.

- `POST /api/users`
- `GET /api/users`
- `GET /api/users/:id`
- `PUT /api/users/:id`
- `DELETE /api/users/:id`

> The user routes (`/api/users`) are not currently protected in `user.routes.js`.

### Protected routes

All routes under `/api/tasks` require a JWT token in the `Authorization` header.

- `POST /api/tasks`
- `GET /api/tasks`
- `GET /api/tasks/:id`
- `PUT /api/tasks/:id`
- `DELETE /api/tasks/:id`

## Authentication

- Login generates a JWT token valid for 1 hour.
- The token is signed using `JWT_SECRET`.
- Task routes use `authMiddleware` to validate the token.

### Authorization header

Send the token in each protected request:

```
Authorization: Bearer <token>
```

The middleware:
- checks that the header exists,
- verifies that it starts with `Bearer `,
- extracts the token,
- runs `jwt.verify(...)`,
- attaches the decoded payload to `req.user`.

## Current Status

- Backend MVP completed.
- JWT authentication with bcrypt password hashing.
- User-owned task CRUD.
- Basic user management.
- No automated tests or role-based authorization yet.
