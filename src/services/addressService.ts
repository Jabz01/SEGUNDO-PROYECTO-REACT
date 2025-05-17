import axios from "axios";
import { Address } from "models/Address";

import env from "env/env";
import api from "interceptor/axiosInterceptor";


const API_URL = env.VITE_API_URL + "/addresses";

class Address_Service {
    
    // Obtener todas las direcciones
    async getAddress(): Promise<Address[]> { 
        try {
            const response = await axios.get<Address[]>(API_URL);
            return response.data;
        } catch (error) {
            console.error("Error al obtener el listado de direcciones");
            return [];
        }
    }

    // Obtener una dirección por ID
    async getAddressByID(id: number): Promise<Address> {
        try {
            const response = await axios.get<Address>(`${API_URL}/${id}`);
            return response.data;
        } catch (error) {
            console.error("Error al obtener la dirección");
            return null;
        }
    }

    // Crear una dirección con el order_id
    async createAddress(address: Omit<Address, "id">): Promise<Address | null> {
        try {
            const response = await api.post<Address>(API_URL, address);
            return response.data;
        } catch (error) {
            console.error("Error al crear dirección:", error);
            return null;
        }
    }


    // Actualizar una dirección
    async updateAddress(address_id: number, address: Partial<Address>): Promise<Address | null> {
        try {
            const updatedAddress = { ...address };  // Incluye el order_id en la actualización
            const response = await api.put<Address>(`${API_URL}/${address_id}`, updatedAddress);
            return response.data;
        } catch (error) {
            console.error("Error al actualizar dirección:", error);
            return null;
        }
    }

    // Eliminar una dirección
    async deleteAddress(id: number): Promise<boolean> {
        try {
            await api.delete(`${API_URL}/${id}`);
            return true;
        } catch (error) {
            console.error("Error al eliminar dirección:", error);
            return false;
        }
    }
}

export const addressService = new Address_Service();
