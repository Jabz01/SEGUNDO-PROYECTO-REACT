import React, { createContext, useState, ReactNode, useEffect, useContext } from "react";
import { auth } from "../firebase.js";  
import { signInWithPopup, GithubAuthProvider } from "firebase/auth";  

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

const loginWithGithub = async () => {
  try {
    const provider = new GithubAuthProvider();
    const result = await signInWithPopup(auth, provider);

    const credential = GithubAuthProvider.credentialFromResult(result);
    const token = credential?.accessToken; // 🔹 Token correcto

    const user = result.user;

    if (token) {
      localStorage.setItem("authToken", token);
    }
    localStorage.setItem("authUser", JSON.stringify({
      id: user.uid,
      name: user.displayName!,
      email: user.email!
    }));

    setToken(token || null);
    setUser({ id: user.uid, name: user.displayName!, email: user.email! });
    setIsLoggedIn(true);
  } catch (error) {
    console.error("Error en login con GitHub:", error);
    setError("Error al iniciar sesión con GitHub");
  }
};



  // Función para iniciar sesión con un proveedor OAuth
const login = async (_data: any, provider?: string): Promise<void> => {
  setIsLoading(true);
  setError(null);

  try {

    //Para Github
    if (provider === "github") {
      await loginWithGithub();
    }

    // if (provider === "google")
    // if (provider === "azure") 

  } catch (error) {
    console.error(`Error en login con ${provider}:`, error);
    setError(`Error al iniciar sesión con ${provider}`);
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