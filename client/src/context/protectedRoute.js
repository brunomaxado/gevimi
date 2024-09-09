import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./authContext";

const ProtectedRoute = ({ children }) => {
  const { currentUser } = useContext(AuthContext);

  if (!currentUser) {
    // Redirecionar para login se o usuário não estiver autenticado
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
