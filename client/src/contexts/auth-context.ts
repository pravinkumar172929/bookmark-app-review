import { createContext } from "react";

export type AuthStatus = "authenticated" | "unauthenticated";

type AuthContextType = {
  status: AuthStatus;
  setStatus: () => void;
};

export const authContext = createContext<AuthContextType | undefined>(
  undefined
);
