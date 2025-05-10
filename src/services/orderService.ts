import axios from "axios";
import { Order } from "models/Order";

import env from "env/env";
import api from "interceptor/axiosInterceptor";

const API_URL = env.VITE_API_URL + "/orders";

class OrderService{
    
    async getOrders(): Promise<Order[]>{
        try {
            const response = await axios.get<Order[]>(API_URL);
            return response.data;
        } catch (error) {
            console.error("Error al obtener pedidos pendientes");
            return[];
        }
    }

    async getOrderByID(id:number): Promise<Order>{
        try {
            const response = await axios.get<Order>(`${API_URL}/${id}`);
            return response.data;
        } catch (error) {
            console.error("Error al obtener pedidos pendientes");
            return null;
        }
    }

    async createOrder(order: Omit<Order, "id_order">): Promise<Order | null> {
        try {
            const response = await api.post<Order>(API_URL, order);
            return response.data;
        } catch (error) {
            console.error("Error al crear usuario:", error);
            return null;
        }
    }

    async updateOrder(order_id: number, order: Partial<Order>): Promise<Order | null> {
        try {
            const response = await api.put<Order>(`${API_URL}/${order_id}`, order);
            return response.data;
        } catch (error) {
            console.error("Error al actualizar usuario:", error);
            return null;
        }
    }


    async deleteOrder(id: number): Promise<boolean> {
        try {
            await api.delete(`${API_URL}/${id}`);
            return true;
        } catch (error) {
            console.error("Error al eliminar el pedido:", error);
            return false;
        }
    }

}

export const orderService = new OrderService();
