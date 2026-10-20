import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/reset.css";
import "./styles/variables.css";
import "./styles/global.css";

import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./providers/ThemeProvider.tsx";
import { AuthProvider } from "./providers/AuthProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);
