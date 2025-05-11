import axios from "axios";
import { Product } from "models/Product";

import env from "env/env";
import api from "interceptor/axiosInterceptor";

const API_URL = env.VITE_API_URL + "/products";

class ProductService{
    
    async getProducts(): Promise<Product[]>{
        try {
            const response = await axios.get<Product[]>(API_URL);
            return response.data;
        } catch (error) {
            console.error("Error al obtener pedidos pendientes");
            return[];
        }
    }

    async getProductByID(id:number): Promise<Product>{
        try {
            const response = await axios.get<Product>(`${API_URL}/${id}`);
            return response.data;
        } catch (error) {
            console.error("Error al obtener pedidos pendientes");
            return null;
        }
    }

    async createProduct(product: Omit<Product, "id_product">): Promise<Product | null> {
        try {
            const response = await api.post<Product>(API_URL, product);
            return response.data;
        } catch (error) {
            console.error("Error al crear usuario:", error);
            return null;
        }
    }

    async updateProduct(product_id: number, product: Partial<Product>): Promise<Product | null> {
        try {
            const response = await api.put<Product>(`${API_URL}/${product_id}`, product);
            return response.data;
        } catch (error) {
            console.error("Error al actualizar usuario:", error);
            return null;
        }
    }


    async deleteProduct(id: number): Promise<boolean> {
        try {
            await api.delete(`${API_URL}/${id}`);
            return true;
        } catch (error) {
            console.error("Error al eliminar el pedido:", error);
            return false;
        }
    }

}

export const productService = new ProductService();
