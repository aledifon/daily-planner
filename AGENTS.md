# Daily Planner

Daily Planner is an educational full-stack web application built to learn modern software engineering practices.

The objective is not only to build a working application, but also to understand the architecture, technologies and design decisions behind every implementation.

Prioritize maintainability, readability and learning over implementation speed.

---

# Stack

## Frontend

- Angular 21+
- TypeScript (strict mode)
- Signals
- RxJS
- Angular Router

## Backend

- Node.js
- Express
- MongoDB
- Mongoose
- JWT Authentication
- bcrypt

## Tooling

- Git
- VS Code
- OpenCode
- npm

---

# Development

## Prerequisites

- Node.js
- Angular CLI
- MongoDB 8 (local)

---

## Startup Order

When working with the full application, start services in this order:

1. Start MongoDB.
2. Start the backend.
3. Start the frontend.

---

## Database

Development uses a local MongoDB instance.

Start MongoDB:

```bash
mongod --dbpath C:\data8\db
```

The backend reads the MongoDB connection string from `backend/.env` using the `MONGO_URI` environment variable.

The backend assumes MongoDB is already running before it starts.

---

## Backend

Run from the `backend` directory.

Install dependencies:

```bash
npm install
```

Start development server:

```bash
npm run dev
```

Start production server:

```bash
npm start
```

---

## Frontend

Run from the `frontend` directory.

Install dependencies:

```bash
npm install
```

Start Angular development server:

```bash
ng serve
```

Build production bundle:

```bash
ng build
```

---

## Notes

- Do not start the backend unless MongoDB is already running.
- Prefer project npm scripts instead of invoking tools directly.
- Do not modify environment variables or secrets unless explicitly requested.

---

# Project Structure

## frontend/

Contains the Angular application.

Common folders may include:

- `components/` — Reusable UI components.
- `pages/` — Routed application pages.
- `services/` — Business logic and API communication.
- `models/` — Interfaces and data models.
- `pipes/` — Custom Angular pipes, when needed.
- `guards/` — Route protection, when needed.
- `interceptors/` — HTTP request and response handling, when needed.

Do not create folders preemptively. Add them only when the project requires them.

## backend/

Contains the REST API.

Common folders may include:

- `routes/` — API endpoint definitions.
- `controllers/` — Request handling and orchestration.
- `middleware/` — Authentication and request middleware.
- `models/` — Mongoose models and schemas.
- `config/` — Database and application configuration.
- `utils/` — Shared helper functions, when needed.

Do not create folders preemptively. Add them only when the project requires them.

---

# Documentation & Project Knowledge

Consult additional project documentation before implementing significant changes.

When available, use the following resources:

- `/docs/` — General project documentation.
- `/docs/architecture/` — System architecture and design decisions.
- `/docs/specs/` — Feature specifications.
- `/docs/adr/` — Architecture Decision Records (ADR).
- Context7 MCP — Official and up-to-date documentation for frameworks and libraries (e.g. Angular, Express, Mongoose, Node.js).

Documentation takes precedence over assumptions.

Prefer consulting project documentation first for project-specific behavior.

When framework or library documentation is required, prefer using Context7 instead of relying on model knowledge.

When neither project documentation nor official documentation is available, analyze the existing implementation before making recommendations.

If both documentation and implementation are inconsistent, highlight the inconsistency before making changes.

---

# Development Philosophy

This is an educational project.

The goal is to understand every important implementation.

Always:

- Analyze the existing code before making changes.
- Explain the proposed solution.
- Wait for approval before significant implementations or refactors.
- Implement incrementally.
- Summarize the work once finished.

Avoid "vibe coding".

Prefer engineering decisions over quick solutions.

---

# Code Conventions

## TypeScript

- Use strict typing.
- Avoid `any`.
- Prefer `unknown` when appropriate.
- Prefer type inference when obvious.

## Angular

- Use standalone components.
- Do not explicitly set `standalone: true`.
- Use Signals for local component state.
- Use `computed()` for derived state.
- Use `input()` and `output()`.
- Use `ChangeDetectionStrategy.OnPush`.
- Prefer Reactive Forms.
- Use native control flow (`@if`, `@for`, `@switch`).
- Keep components small and focused on a single responsibility.
- Keep templates simple.
- Prefer `class` bindings over `ngClass`.
- Prefer `style` bindings over `ngStyle`.

## Services

- Single responsibility.
- Use `providedIn: 'root'` when appropriate.
- Prefer `inject()` over constructor injection.

---

# Architecture

Prefer the following separation:

Component
↓

Service
↓

API / Repository

Business logic should not live inside Angular components.

Respect the existing architecture.

Do not introduce new architectural patterns unless there is a clear benefit.

---

# Workflow

For any non-trivial task:

1. Understand the request.
2. Analyze the current implementation.
3. Explain the proposed solution.
4. Wait for approval before:
    - Installing dependencies.
    - Performing significant refactors.
    - Making architectural changes.
    - Deleting or renaming files.
5. Implement one logical change at a time.
6. Summarize the completed work.

If confidence is below 80%, ask instead of assuming.

---

# Testing

When completing a feature:

- Suggest manual verification steps.
- Mention relevant edge cases.
- If automated tests exist, run them or recommend running them before considering the task complete.

---

# Git

Do not create commits automatically.

When a task is complete, suggest:

- A commit message.
- A brief summary of the modified files.

---

# Do Not

Never:

- Install dependencies without approval.
- Delete files without approval.
- Rename folders without approval.
- Modify unrelated code.
- Perform large refactors unless explicitly requested.
- Generate code that cannot be explained.

Do not modify backend files while working on frontend unless explicitly requested.

Likewise, do not modify frontend files while working on backend unless explicitly requested.

---

# Communication

Be concise.

Explain important technical decisions.

If multiple valid approaches exist:

- Briefly explain the available options.
- Recommend one.
- Explain why it is the preferred approach.

When introducing a new technology or Angular feature, explain:

- Why it is used.
- What problem it solves.
- Possible alternatives.

Always optimize for learning.

---

# Agent Behavior

Always prioritize, in this order:

1. Correctness
2. Maintainability
3. Readability
4. Simplicity
5. Performance

Never sacrifice readability for clever or overly abstract code.

Prefer explicit, understandable implementations over unnecessary abstractions.

Prefer consistency with the existing codebase over introducing new patterns or unnecessary abstractions.

The human developer is responsible for the project.

The AI assists with implementation, analysis and recommendations, but should never make important architectural decisions without user approval.
