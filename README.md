# Bookmark App

A full-stack bookmark management application where users can create an account, log in using email and password, and manage their bookmarks.

The application is being built incrementally, with additional functionality and complexity added as the project evolves.

## Tech Stack

### Frontend

- React
- TypeScript
- Vite

### Backend

- Node.js
- Express
- TypeScript
- `pg` for PostgreSQL database access
- bcrypt for password hashing

### Database

- PostgreSQL
- Docker / Docker Compose

The application uses PostgreSQL directly through the `pg` package rather than an ORM.

## Project Structure

bookmark-app/
├── client/ # React + TypeScript frontend
│ ├── src/
│ └── ...
│
├── server/ # Node.js + Express backend
│ ├── src/
│ │ ├── db/
│ │ ├── routes/
│ │ ├── db.ts
│ │ └── index.ts
│ └── ...
│
├── docker-compose.yml # Local PostgreSQL setup
├── .gitignore
└── README.md

## Architecture

The application consists of three main parts:

┌──────────────────────┐
│ React Client │
│ TypeScript + Vite │
└──────────┬───────────┘
│
│ HTTP / JSON
▼
┌──────────────────────┐
│ Express Server │
│ Node.js + TypeScript│
└──────────┬───────────┘
│
│ pg
▼
┌──────────────────────┐
│ PostgreSQL │
│ Docker Container │
└──────────────────────┘

The frontend communicates with the backend through HTTP APIs. The backend handles validation, authentication, business logic, and database operations.

The backend connects to PostgreSQL using the `pg` package and a connection pool.

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

### 2. Install frontend dependencies

```bash
cd client
npm install
```

### 3. Install backend dependencies

```bash
cd ../server
npm install
```

### 4. Configure environment variables

The backend uses environment variables for database configuration.

Create a `.env` file in the project root:

```env
DB_NAME=bookmark_db
DB_USER=bookmark_user
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=5432
```

Do not commit the `.env` file to Git, keep it in .gitignore.

### 5. Start PostgreSQL

PostgreSQL runs inside Docker.

From the project root:

```bash
docker compose up -d
```

To check running containers:

```bash
docker ps
```

To stop the containers:

```bash
docker compose down
```

## Running the Application

### Start the backend

```bash
cd server
npm run dev
```

The backend runs on:

```text
http://localhost:5001
```

### Start the frontend

In another terminal:

```bash
cd client
npm run dev
```

The frontend runs on:

http://localhost:5173

## Current API

### Authentication

#### Sign Up

POST /api/auth/signup

Request:

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

The backend:

1. Validates the request.
2. Checks whether the email already exists.
3. Hashes the password using bcrypt.
4. Creates the user in PostgreSQL.
5. Returns the newly created user's basic information.

Passwords are never stored as plain text.

#### Login

POST /api/auth/login

Request:

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

The backend:

1. Validates the request.
2. Finds the user by email.
3. Retrieves the stored password hash.
4. Compares the supplied password with the stored hash using bcrypt.
5. Returns a successful response when the credentials are valid.

Authentication will continue to evolve as the application grows.

## Database

PostgreSQL is used as the application's database.

The database runs inside Docker during local development rather than requiring PostgreSQL to be installed and managed directly on the host machine.

The backend communicates with PostgreSQL using the [`pg`](https://www.npmjs.com/package/pg) package.

A connection pool is used so that database connections can be reused across requests.

## API Design

Backend APIs should follow an OpenAPI-compliant approach where practical.

The API schemas should clearly define:

- HTTP methods
- Endpoints
- Request bodies
- Response bodies
- HTTP status codes
- Error responses

The API documentation does not need to be published or exposed through the application UI.

## Development Workflow

Development is done using feature branches.

A typical workflow is:

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

Keep changes focused on the issue or feature being worked on.

## Current Features

- React + TypeScript frontend
- Node.js + Express backend
- PostgreSQL database
- Docker-based PostgreSQL development environment
- User signup
- Password hashing with bcrypt
- User login
- Basic frontend API error handling
- Loading state during signup requests
- CORS configuration for local frontend/backend development

## Planned Development

The application will be developed incrementally.

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

These are future areas of development and may change as the application evolves.
