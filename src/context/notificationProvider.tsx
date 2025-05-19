import React, { createContext, useState, ReactNode, useEffect, useContext } from "react";
import { auth } from "../firebase.js";  
import { signInWithPopup, GithubAuthProvider } from "firebase/auth";  
import { Notification } from "models/Notification.js";
import env from "../env/env";
import { io } from "socket.io-client";

interface NotificationContextType {
    notifications: Notification[];
    addNotification: (notification: Notification) => void;
    deleteNotification: (id: number) => void;
}

const defaultNotificationContext: NotificationContextType = {
    notifications: [],
    addNotification: (notification: Notification) => {},
    deleteNotification: (id: number) => {}
};

const API_URL = env.VITE_API_URL + "/orders";
const BASE_URL = env.BASE_URL;

// Creamos el contexto
export const NotificationContext = createContext<NotificationContextType>(defaultNotificationContext);

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  let [notifications, setNotifications] = useState([]);

  // Verificar si hay una sesión existente al cargar
  useEffect(() => {
  }, []);

  const addNotification = (notification: any) =>
  {
    notifications = [...window.structuredClone(notifications), window.structuredClone(notification)]
    setNotifications(notifications);
  }

  const deleteNotification = (id: number) =>
  {
    setNotifications(notifications.filter( p => p.id != id ));
  }

  return (
    <NotificationContext.Provider 
      value={{ 
        notifications,
        addNotification,
        deleteNotification
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  
  if (context === undefined) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }
  
  return context;
};