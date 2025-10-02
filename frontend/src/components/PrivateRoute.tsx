import { Navigate } from "react-router-dom";
import { useEffect, type JSX } from "react";
import { useAuth } from "../context/auth/useAuth";

interface PrivateRouteProps {
  children: JSX.Element;
}

export const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { user } = useAuth();

  useEffect(() => {
    console.log("user private route", user);
  }, [user]);

  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};
