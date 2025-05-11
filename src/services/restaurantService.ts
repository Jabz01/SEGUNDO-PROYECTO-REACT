import axios from "axios";
import { Restaurant } from "../models/Restaurant";
import env from "env/env"; 
import api from "interceptor/axiosInterceptor";

const API_URL = `${env.VITE_API_URL}/restaurants`;

class RestaurantService {
  async getRestaurants(): Promise<Restaurant[]> {
    try {
      const response = await axios.get<Restaurant[]>(API_URL);
      return response.data;
    } catch (error) {
      console.error("Error al obtener restaurantes:", error);
      return [];
    }
  }

  async getRestaurantByID(id: number): Promise<Restaurant | null> {
    try {
      const response = await axios.get<Restaurant>(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error al obtener el restaurante:", error);
      return null;
    }
  }

  async createRestaurant(restaurant: Omit<Restaurant, "id">): Promise<Restaurant | null> {
    try {
      const response = await api.post<Restaurant>(API_URL, restaurant);
      return response.data;
    } catch (error) {
      console.error("Error al crear restaurante:", error);
      return null;
    }
  }

  async updateRestaurant(id: number, restaurant: Partial<Restaurant>): Promise<Restaurant | null> {
    try {
      const response = await api.put<Restaurant>(`${API_URL}/${id}`, restaurant);
      return response.data;
    } catch (error) {
      console.error("Error al actualizar restaurante:", error);
      return null;
    }
  }

  async deleteRestaurant(id: number): Promise<boolean> {
    try {
      await api.delete(`${API_URL}/${id}`);
      return true;
    } catch (error) {
      console.error("Error al eliminar el restaurante:", error);
      return false;
    }
  }
}

export const restaurantService = new RestaurantService();