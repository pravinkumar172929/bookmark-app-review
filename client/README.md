# Frontend

The frontend of the Bookmark App is a React + TypeScript application built with Vite.

It is responsible for the user interface, collecting user input, communicating with the backend APIs, and displaying loading, success, and error states.

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

http://localhost:5173

## Frontend Structure

The frontend is located inside the `client` directory.

client/
├── src/
│ ├── ...
│ ├── App.tsx
│ └── main.tsx
├── package.json
└── ...

The exact structure will evolve as new features are added.

## Current Functionality

### Signup

The signup form collects:

- Email
- Password
- Confirm password

Before sending the request, the frontend checks that the password and confirmation password match.

The frontend then sends the signup request to:

POST /api/auth/signup

The backend response is handled by the frontend and appropriate error messages are displayed to the user.

### Login

The login form collects:

- Email
- Password

The frontend sends the credentials to:

POST /api/auth/login

The backend is responsible for validating the credentials.

## API Communication

The frontend communicates with the backend using HTTP requests.

During local development:

Frontend
http://localhost:5173
│
│ HTTP request
▼
Backend
http://localhost:5001

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

Inputs are controlled inputs, meaning their values are managed by React state.

## Loading and Error Handling

API requests should provide appropriate feedback to the user.

The signup flow currently handles:

- Password mismatch
- API validation errors
- Duplicate email errors
- Unexpected request failures
- Loading state while the request is in progress

The frontend should avoid exposing sensitive information such as passwords or password hashes in logs or UI messages.

## Development Guidelines

When adding a new frontend feature:

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

The frontend requires the backend to be running when testing API functionality locally.

Start the backend from the `server` directory:

```bash
npm run dev
```

Then start the frontend from the `client` directory:

```bash
npm run dev
```

Both applications should be running during full-stack development.
