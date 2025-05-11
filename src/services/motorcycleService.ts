import axios from "axios";
import { Motorcycle } from "models/Motorcycle";

import env from "env/env";
import api from "interceptor/axiosInterceptor";

const API_URL = env.VITE_API_URL + "/motorcycles";

class MotorcycleService{
    
    async getMotorcycles(): Promise<Motorcycle[]>{
        try {
            const response = await axios.get<Motorcycle[]>(API_URL);
            return response.data;
        } catch (error) {
            console.error("Error al obtener pedidos pendientes");
            return[];
        }
    }

    async getMotorcycleByID(id:number): Promise<Motorcycle>{
        try {
            const response = await axios.get<Motorcycle>(`${API_URL}/${id}`);
            return response.data;
        } catch (error) {
            console.error("Error al obtener pedidos pendientes");
            return null;
        }
    }

    async createMotorcycle(motorcycle: Omit<Motorcycle, "id_motorcycle">): Promise<Motorcycle | null> {
        try {
            const response = await api.post<Motorcycle>(API_URL, motorcycle);
            return response.data;
        } catch (error) {
            console.error("Error al crear usuario:", error);
            return null;
        }
    }

    async updateMotorcycle(motorcycle_id: number, motorcycle: Partial<Motorcycle>): Promise<Motorcycle | null> {
        try {
            const response = await api.put<Motorcycle>(`${API_URL}/${motorcycle_id}`, motorcycle);
            return response.data;
        } catch (error) {
            console.error("Error al actualizar usuario:", error);
            return null;
        }
    }


    async deleteMotorcycle(id: number): Promise<boolean> {
        try {
            await api.delete(`${API_URL}/${id}`);
            return true;
        } catch (error) {
            console.error("Error al eliminar el pedido:", error);
            return false;
        }
    }

}

export const motorcycleService = new MotorcycleService();
