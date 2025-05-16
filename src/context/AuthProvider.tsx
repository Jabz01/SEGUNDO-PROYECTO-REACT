import React, { createContext, useState, ReactNode, useEffect, useContext } from "react";
import { auth } from "../firebase.js";
import { signInWithPopup, GithubAuthProvider } from "firebase/auth";

import env from "../env/env"
import { PublicClientApplication } from "@azure/msal-browser"

import URL_DE_AVATAR_POR_DEFECTO from "assets/img/profile/image1.png"

// Definimos la interfaz del usuario
interface User {
  id: string,
  name: string;
  email: string;
  token?: string;
  avatar?: string;
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
  login: async () => { },
  logout: () => { }
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
        const storedUser = localStorage.getItem('user');

        if (storedUser) {
          setUser(JSON.parse(storedUser));
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error('Error verificando autenticación:', error);
        setError('Error al verificar la autenticación');
        // Si hay error, limpiamos todo por seguridad
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const loginWithAzure = async () => {
    try {
      const client = new PublicClientApplication({
        auth: {
          clientId: env.AZURE_OAUTH_CONFIG.appId,
          redirectUri: env.AZURE_OAUTH_CONFIG.redirectUri,
        }
      })

      await client.initialize();

      const result = await client.loginPopup({
        scopes: env.AZURE_OAUTH_CONFIG.scopes,
        prompt: "select_account",
        redirectUri: env.AZURE_OAUTH_CONFIG.redirectUri
      })

      let id = result.correlationId;
      let token = result.accessToken;

      localStorage.setItem("user", JSON.stringify({
        id: id,
        name: result.account.name || "Usuario Azure",
        email: result.account.username,
        avatar: URL_DE_AVATAR_POR_DEFECTO,
        token: token,
      }));

      setToken(token);
      setUser({
        id: id,
        name: result.account.name || "Usuario Azure",
        email: result.account.username,
        avatar: URL_DE_AVATAR_POR_DEFECTO,
        token: token
      });
      setIsLoggedIn(true);
    } catch (error) {
      console.error("Error en login con Azure:", error);
      setError("Error al iniciar sesión con Azure");
    }
  }

  const loginWithGithub = async () => {
    try {
      const provider = new GithubAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const credential = GithubAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
      const user = result.user;

      if (user && token) {
        localStorage.setItem("user", JSON.stringify({
          id: user.uid,
          name: user.displayName || "Usuario GitHub",
          email: user.email!,
          avatar: user.photoURL || "URL_DE_AVATAR_POR_DEFECTO",
          token: token,
        }));

        setToken(token);
        setUser({
          id: user.uid,
          name: user.displayName || "Usuario GitHub",
          email: user.email!,
          avatar: user.photoURL || "URL_DE_AVATAR_POR_DEFECTO",
          token
        });
        setIsLoggedIn(true);
      }
    } catch (error: any) {
      console.error("Error en login con GitHub:", error.message);
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

      if (provider === "azure") {
        await loginWithAzure();
      }

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
    localStorage.removeItem('user');
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