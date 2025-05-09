import React, { createContext, useState, ReactNode, useEffect, useContext } from "react";

// Definimos la interfaz del usuario
interface User {
  id: string,
  name: string;
  email: string;
  phone?: string;
  license_number?: string;
  status?: string;
}

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  error: string | null;
  login: (data: any, provider: string) => Promise<void>;
  logout: () => void;
}

const defaultAuthContext: AuthContextType = {
  user: null,
  isLoggedIn: false,
  isLoading: true,
  error: null,
  login: async () => {},
  logout: () => {}
};

// Creamos el contexto
export const AuthContext = createContext<AuthContextType>(defaultAuthContext);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

  // Verificar si hay una sesión existente al cargar
  useEffect(() => {
    const checkAuth = () => {
      try {
        // Intentar recuperar datos de sesión del localStorage
        const storedToken = localStorage.getItem('authToken');
        const storedUser = localStorage.getItem('authUser');
        
        if (storedToken && storedUser) {
          setToken(storedToken);
          setUser(JSON.parse(storedUser));
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error('Error verificando autenticación:', error);
        setError('Error al verificar la autenticación');
        // Si hay error, limpiamos todo por seguridad
        localStorage.removeItem('authToken');
        localStorage.removeItem('authUser');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Función para iniciar sesión con un proveedor OAuth
  const login = async (data: any, provider?: string): Promise<void> => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Aquí la lógica de OAuth según el proveedor

      console.log("Logeandose in con: ", data, provider);
      
      
      // Simular una respuesta de OAuth
      const mockOAuthResponse = {
        // Esto es el equivalente a recibir un token de jwt desde el server, una pila de letras raras
        token: "mock-token-" + Date.now(), // Simulamos un token único
        // Estos son los datos decodificados del token
        user: {
          id: "12345",
          name: "Juan Pérez",
          email: "juan@example.com",
          picture: "https://example.com/profile.jpg"
        }
      };
      
      // Almacenar los datos en localStorage
      localStorage.setItem('authToken', mockOAuthResponse.token);
      localStorage.setItem('authUser', JSON.stringify(mockOAuthResponse.user));
      
      // Actualizar el estado
      setToken(mockOAuthResponse.token);
      setUser(mockOAuthResponse.user);
      setIsLoggedIn(true);
      
    } catch (error) {
      console.error('Error en login:', error);
      setError('Error al iniciar sesión con ' + provider);
    } finally {
      setIsLoading(false);
    }
  };

  // Función para cerrar sesión
  const logout = () => {
    // Limpiar estado
    setToken(null);
    setUser(null);
    setIsLoggedIn(false);
    
    // Eliminar datos del localStorage
    localStorage.removeItem('authToken');
    localStorage.removeItem('authUser');
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        isLoggedIn, 
        isLoading,
        error,
        login, 
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }
  
  return context;
};