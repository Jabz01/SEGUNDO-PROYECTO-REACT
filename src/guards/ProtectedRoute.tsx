import { useAuth } from 'context/AuthProvider';
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

interface ProtectedRouteProps {
  redirectPath?: string;
  children?: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  redirectPath = '/auth/sign-in',
  children,
}) => {
  const { isLoggedIn, isLoading } = useAuth();
  
  // Mientras verifica la autenticación, puedes mostrar un loader
  if (isLoading) {
    return <div>Cargando...</div>;
  }
  
  // Si no está autenticado, redirige al login
  if (!isLoggedIn) {
    return <Navigate to={redirectPath} replace />;
  }

  // Si está autenticado, renderiza los hijos o el Outlet para rutas anidadas
  return children ? <>{children}</> : <Outlet />;
};