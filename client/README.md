# Frontend

The frontend of the Bookmark App is a React + TypeScript application built with Vite.

It is responsible for the user interface, collecting user input, communicating with backend APIs, and displaying loading, success, and error states.

For overall project setup and architecture, see the [root README](../README.md).

## Tech Stack

- React
- TypeScript
- Vite

## Getting Started

From the `client` directory:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The frontend is available at:

```text
http://localhost:5173
```

The backend must also be running when testing API functionality.

## Frontend Structure

```text
client/
├── src/
│   ├── ...
│   ├── App.tsx
│   └── main.tsx
├── package.json
└── README.md
```

The structure will evolve as new features are added.

## API Communication

The frontend communicates with the backend using HTTP requests.

During local development:

```text
Frontend
http://localhost:5173
       │
       │ HTTP / JSON
       ▼
Backend
http://localhost:5001
```

For example:

```ts
fetch("http://localhost:5001/api/auth/signup", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(signupData),
});
```

## Current Functionality

### Signup

The signup form collects:

- Email
- Password
- Confirm password

Before sending the request, the frontend checks that the password and confirmation password match.

The request is sent to:

```text
POST /api/auth/signup
```

The frontend handles the backend response and displays appropriate success or error feedback.

### Login

The login form collects:

- Email
- Password

The credentials are sent to:

```text
POST /api/auth/login
```

Authentication and credential validation are handled by the backend.

## Form State

Forms currently use React state to manage their values.

For example:

```ts
const [signupValues, setSignupValues] = useState({
  email: "",
  password: "",
  confirmPassword: "",
});
```

The inputs are controlled inputs, meaning their values are managed by React state.

## Loading and Error Handling

The frontend provides feedback while API requests are in progress and when requests fail.

The signup flow currently handles:

- Password mismatch
- API validation errors
- Duplicate email errors
- Unexpected request failures
- Loading state

The frontend should not expose sensitive information such as passwords or password hashes in logs or UI messages.

## Development Guidelines

When adding a frontend feature:

1. Create a feature branch.
2. Implement the UI.
3. Connect it to the appropriate backend API.
4. Handle loading and error states.
5. Test the feature locally.
6. Commit the changes.
7. Push the branch.
8. Create a Pull Request.

Keep frontend changes focused on the feature or issue being worked on.

## Backend Dependency

The frontend requires the backend to be running for API-based functionality.

From the `server` directory:

```bash
npm run dev
```

Then start the frontend from the `client` directory:

```bash
npm run dev
```

Both applications should be running during full-stack development.
