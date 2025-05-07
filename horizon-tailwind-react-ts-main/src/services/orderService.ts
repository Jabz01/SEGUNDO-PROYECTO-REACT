import axios, {Axios} from "axios";
import { Order } from "models/Order";

const API_URL = import.meta.env.VITE_API_URL + "/orders" || "";

class OrderService{
    
    async getOrders(): Promise<Order[]>{
        try {
            const response = await axios.get<Order[]>(API_URL);
            return response.data;
        } catch (error) {
            console.error("Error al obtener ordenes pendientes");
            return[];
        }
    }

    async getOrderByID(id:number): Promise<Order>{
        try {
            const response = await axios.get<Order>(`${API_URL}/${id}`);
            return response.data;
        } catch (error) {
            console.error("Error al obtener ordenes pendientes");
            return null;
        }
    }

}

