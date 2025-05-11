
import axios from "axios";
import env from "env/env";

// Lista de rutas que no deben ser interceptadas
const EXCLUDED_ROUTES = ["/sign-in"];

const api = axios.create({
    baseURL: env.VITE_API_URL, // Cambia la URL base según tu API
    headers: { "Content-Type": "application/json" },
});

// Interceptor de solicitud
api.interceptors.request.use(
    (config) => {
        const user = JSON.parse(localStorage.getItem("user") || "{}");
        // Verificar si la URL está en la lista de excluidas
        if (EXCLUDED_ROUTES.some((route) => config.url?.includes(route)) || !user) {
            return config;
        }
        // Agregar token si la ruta no está excluida
        const token = user["token"]
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Interceptor de respuesta
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.log("No autorizado, redirigiendo a login...");
      window.location.href = "/login";
    } else if (error.response?.status === 500) {
      console.error("Error interno del servidor:", error.message);
    } else if (error.response?.status === 404) {
      console.warn("Recurso no encontrado:", error.config.url);
    }
    return Promise.reject(error);
  }
);

export default api;
