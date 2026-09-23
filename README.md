# Bookmark App

A full-stack bookmark management application where users can create an account, log in using email and password, and manage their bookmarks.

The application is being built incrementally, with additional functionality and complexity added as the project evolves.

## Tech Stack

| Area            | Technologies                 |
| --------------- | ---------------------------- |
| Frontend        | React, TypeScript, Vite      |
| Backend         | Node.js, Express, TypeScript |
| Database        | PostgreSQL                   |
| Database access | `pg`                         |
| Authentication  | bcrypt                       |
| Development     | Docker, Docker Compose       |

The backend communicates directly with PostgreSQL using `pg` rather than an ORM.

## Architecture

```text
┌──────────────────────┐
│     React Client     │
│   TypeScript + Vite  │
└──────────┬───────────┘
           │
           │ HTTP / JSON
           ▼
┌──────────────────────┐
│    Express Server    │
│   Node.js + TypeScript│
└──────────┬───────────┘
           │
           │ pg
           ▼
┌──────────────────────┐
│      PostgreSQL      │
│    Docker Container  │
└──────────────────────┘
```

The frontend communicates with the backend through HTTP APIs. The backend handles authentication, validation, business logic, and database operations.

## Project Structure

```text
bookmark-app/
├── client/             # React + TypeScript frontend
│   ├── src/
│   └── README.md       # Frontend documentation
│
├── server/             # Node.js + Express backend
│   ├── src/
│   └── README.md       # Backend documentation
│
├── docker-compose.yml  # Local PostgreSQL setup
├── .gitignore
└── README.md
```

## Documentation

Detailed documentation is maintained separately for each part of the application:

- [Frontend Documentation](./client/README.md)
- [Backend Documentation](./server/README.md)

The frontend README covers the React application, UI behavior, API integration, and frontend development guidelines.

The backend README covers the Express application, authentication APIs, PostgreSQL integration, database structure, error handling, and backend development guidelines.

## Prerequisites

Make sure the following are installed:

- Node.js
- npm
- Docker
- Git

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/pravinkumar172929/bookmark-app
cd bookmark-app
```

### 2. Install dependencies

Install frontend dependencies:

```bash
cd client
npm install
```

Install backend dependencies:

```bash
cd ../server
npm install
```

### 3. Configure environment variables

Create a `.env` file in the project root:

```env
DB_NAME=bookmark_db
DB_USER=bookmark_user
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=5432
```

Do not commit `.env` or other files containing secrets.

### 4. Start PostgreSQL

From the project root:

```bash
docker compose up -d
```

Check the running containers:

```bash
docker ps
```

### 5. Start the backend

```bash
cd server
npm run dev
```

The backend runs on:

```text
http://localhost:5001
```

### 6. Start the frontend

In another terminal:

```bash
cd client
npm run dev
```

The frontend runs on:

```text
http://localhost:5173
```

## Current Features

- React + TypeScript frontend
- Node.js + Express backend
- PostgreSQL database
- Docker-based PostgreSQL development environment
- User signup
- Password hashing with bcrypt
- User login
- Frontend API error handling
- Loading states
- CORS configuration for local development

## Planned Development

The application will continue to evolve incrementally.

Potential future functionality includes:

- JWT/session-based authentication
- Protected API routes
- Bookmark CRUD operations
- User-specific bookmarks
- Bookmark management UI
- Request validation
- Centralized backend error handling
- Improved logging and observability
- Automated tests
- Additional production-ready infrastructure

These plans may change as the project evolves.

## Development Workflow

Development is done using feature branches.

```text
main
 │
 └── feature/<feature-name>
      │
      ├── Make changes
      ├── Test locally
      ├── Commit changes
      ├── Push branch
      └── Create Pull Request
                │
                ▼
              Review
                │
                ▼
              Merge
```

Keep changes focused on the issue or feature being worked on.
