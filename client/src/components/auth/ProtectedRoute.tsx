import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/use-auth";
import { Spinner } from "../ui/Spinner/Spinner";

export const ProtectedRoute = () => {
  const { status } = useAuth();

  if (status === "loading") {
    return <Spinner />;
  }

  if (status === "unauthenticated") {
    return <Navigate to="/" />;
  }
  return <Outlet />;
};
