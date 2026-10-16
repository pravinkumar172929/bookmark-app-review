import { createContext } from "react";

export type AuthStatus = "authenticated" | "unauthenticated";

type AuthContextType = {
  status: AuthStatus;
  setStatus: (status: AuthStatus) => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);
