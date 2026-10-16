import { useEffect, useState, type ReactNode } from "react";
import { AuthContext, type AuthStatus } from "../contexts/auth-context";

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [status, setStatus] = useState<AuthStatus>("unauthenticated");

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await fetch(`http://localhost:5001/api/auth/me`, {
          credentials: "include",
        });

        if (response.ok) {
          setStatus("authenticated");
        } else {
          setStatus("unauthenticated");
        }
      } catch (error) {
        setStatus("unauthenticated");
      }
    };

    checkSession();
  }, []);

  return (
    <AuthContext.Provider value={{ status, setStatus }}>
      {children}
    </AuthContext.Provider>
  );
};
