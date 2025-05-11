import axios from "axios";
import { Address } from "models/Address";

import env from "env/env";
import api from "interceptor/axiosInterceptor";


const API_URL = env.VITE_API_URL + "/addresses";

class Address_Service{

    async getAddress(): Promise<Address[]>{ 
        try {
            const response = await axios.get<Address[]>(API_URL);
            return response.data;
        } catch (error) {
            console.error("Error al obtener el listado de direcciones");
            return[];
        }
    }

    async getAddressByID(id:number): Promise<Address>{
        try {
            const response = await axios.get<Address>(`${API_URL}/${id}`);
            return response.data;
        } catch (error) {
            console.error("Error al obtener pedidos pendientes");
            return null;
        }
    }

    async createAddress(Address: Omit<Address, "id">): Promise<Address | null> {
        try {
            const response = await api.post<Address>(API_URL, Address);
            return response.data;
        } catch (error) {
            console.error("Error al crear usuario:", error);
            return null;
        }
    }

    async updateAddress(Address_id: number, Address: Partial<Address>): Promise<Address | null> {
        try {
            const response = await api.put<Address>(`${API_URL}/${Address_id}`, Address);
            return response.data;
        } catch (error) {
            console.error("Error al actualizar dirección:", error);
            return null;
        }
    }


    async deleteAddress(id: number): Promise<boolean> {
        try {
            await api.delete(`${API_URL}/${id}`);
            return true;
        } catch (error) {
            console.error("Error al eliminar el pedido:", error);
            return false;
        }
    }
}

export const addressService = new Address_Service();

