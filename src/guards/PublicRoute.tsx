import { useAuth } from 'context/AuthProvider';
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

interface PublicRouteProps {
  redirectPath?: string;
  children?: React.ReactNode;
}

export const PublicRoute: React.FC<PublicRouteProps> = ({
  redirectPath = '/admin',
  children,
}) => {
  const { isLoggedIn, isLoading } = useAuth();
  
  // Mientras verifica la autenticación, puedes mostrar un loader
  if (isLoading) {
    return <div>Cargando...</div>;
  }
  
  // Si ya está autenticado, redirige a la ruta principal
  if (isLoggedIn) {
    return <Navigate to={redirectPath} replace />;
  }

  // Si no está autenticado, renderiza los hijos o el Outlet para rutas anidadas
  return children ? <>{children}</> : <Outlet />;
};