import axios from "axios";
import { Driver } from "models/Driver";

import env from "env/env";
import api from "interceptor/axiosInterceptor";

const API_URL = env.VITE_API_URL + "/drivers";

class DriverService{
    
    async getDrivers(): Promise<Driver[]>{
        try {
            const response = await axios.get<Driver[]>(API_URL);
            return response.data;
        } catch (error) {
            console.error("Error al obtener pedidos pendientes");
            return[];
        }
    }

    async getDriverByID(id:number): Promise<Driver>{
        try {
            const response = await axios.get<Driver>(`${API_URL}/${id}`);
            return response.data;
        } catch (error) {
            console.error("Error al obtener pedidos pendientes");
            return null;
        }
    }

    async createDriver(driver: Omit<Driver, "id_driver">): Promise<Driver | null> {
        try {
            const response = await api.post<Driver>(API_URL, driver);
            return response.data;
        } catch (error) {
            console.error("Error al crear usuario:", error);
            return null;
        }
    }

    async updateDriver(driver_id: number, driver: Partial<Driver>): Promise<Driver | null> {
        try {
            const response = await api.put<Driver>(`${API_URL}/${driver_id}`, driver);
            return response.data;
        } catch (error) {
            console.error("Error al actualizar usuario:", error);
            return null;
        }
    }


    async deleteDriver(id: number): Promise<boolean> {
        try {
            await api.delete(`${API_URL}/${id}`);
            return true;
        } catch (error) {
            console.error("Error al eliminar el pedido:", error);
            return false;
        }
    }

}

export const driverService = new DriverService();
