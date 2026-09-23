# Backend

The backend of the Bookmark App is a Node.js + Express + TypeScript application.

It exposes HTTP APIs consumed by the React frontend and communicates with PostgreSQL for persistent data storage.

## Tech Stack

- Node.js
- Express
- TypeScript
- PostgreSQL
- `pg`
- bcrypt
- Docker / Docker Compose

The application uses the [`pg`](https://www.npmjs.com/package/pg) package to communicate directly with PostgreSQL rather than using an ORM.

## Getting Started

From the `server` directory:

```bash
npm install
```

Before starting the backend, make sure the PostgreSQL Docker container is running.

From the project root:

```bash
docker compose up -d
```

Then start the backend:

```bash
cd server
npm run dev
```

The backend runs on:

http://localhost:5001

## Environment Variables

The backend uses environment variables for database configuration.

Create a `.env` file in the project root:

DB_NAME=bookmark_db
DB_USER=bookmark_user
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=5432

Do not commit `.env` or other files containing secrets to Git.

## Backend Structure

server/
├── src/
│ ├── db/
│ │ └── schema.sql
│ ├── routes/
│ │ └── authRoutes.ts
│ ├── db.ts
│ └── index.ts
├── package.json
└── ...

### `src/index.ts`

Creates and configures the Express application.

It is responsible for:

- Creating the Express app
- Middleware configuration
- Registering routes
- Starting the HTTP server

### `src/db.ts`

Creates the PostgreSQL connection pool using the `pg` package.

The pool allows the application to reuse database connections instead of creating a new database connection for every request.

### `src/db/schema.sql`

Contains the database schema used by the application.

### `src/routes/`

Contains Express route handlers.

Authentication-related endpoints currently live in:

src/routes/authRoutes.ts

## Request Flow

A typical request flows through the application like this:

React Frontend
│
│ HTTP request
▼
Express Server
│
▼
Route Handler
│
▼
PostgreSQL via pg
│
▼
Database
│
▼
Route Handler
│
▼
HTTP Response
│
▼
React Frontend

## Authentication APIs

### Signup

POST /api/auth/signup

Request:

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

The backend:

1. Validates that email and password are present.
2. Checks whether the email already exists.
3. Hashes the password using bcrypt.
4. Stores the user in PostgreSQL.
5. Returns the created user's basic information.

Passwords are never stored as plain text.

### Login

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
5. Returns an authentication response.

Invalid credentials return:

401 Unauthorized

The API should use the same generic authentication error for invalid email/password combinations rather than revealing which credential was incorrect.

## Database

PostgreSQL runs inside a Docker container during local development.

The backend connects to PostgreSQL using `pg`.

A connection pool is created so that database connections can be reused across requests.

Database queries should use parameterized queries:

```ts
await pool.query("SELECT id FROM users WHERE email = $1", [email]);
```

This avoids constructing SQL queries by directly concatenating user input.

## API Design

Backend APIs should follow an OpenAPI-compliant approach where practical.

Each endpoint should clearly define:

- HTTP method
- URL
- Request parameters/body
- Response body
- HTTP status codes
- Error responses

The API documentation does not need to be published or exposed through the application UI.

## Error Handling

API errors should use appropriate HTTP status codes.

Current examples include:

400 Bad Request

Used when required request data is missing.

401 Unauthorized

Used when authentication credentials are invalid.

409 Conflict

Used when attempting to create an account with an existing email.

500 Internal Server Error

Should be used for unexpected server-side failures.

## Development Guidelines

When adding a backend feature:

1. Create a feature branch.
2. Define or update the database requirements if necessary.
3. Add/update the API route.
4. Validate incoming data.
5. Use parameterized PostgreSQL queries.
6. Handle expected errors.
7. Test the API locally.
8. Test the frontend integration when applicable.
9. Commit the changes.
10. Push the branch and create a Pull Request.

Keep database queries and authentication-related information secure.

Never log:

- Plain-text passwords
- Password hashes
- Authentication tokens
- Other sensitive credentials
