import axios from "axios";
import { Menu } from "models/Menu";

import env from "env/env";
import api from "interceptor/axiosInterceptor";

const API_URL = env.VITE_API_URL + "/menus";

class MenuService{
    
    async getMenus(): Promise<Menu[]>{
        try {
            const response = await axios.get<Menu[]>(API_URL);
            return response.data;
        } catch (error) {
            console.error("Error al obtener pedidos pendientes");
            return[];
        }
    }

    async getMenuByID(id:number): Promise<Menu>{
        try {
            const response = await axios.get<Menu>(`${API_URL}/${id}`);
            return response.data;
        } catch (error) {
            console.error("Error al obtener pedidos pendientes");
            return null;
        }
    }

    async createMenu(menu: Omit<Menu, "id_menu">): Promise<Menu | null> {
        try {
            const response = await api.post<Menu>(API_URL, menu);
            return response.data;
        } catch (error) {
            console.error("Error al crear usuario:", error);
            return null;
        }
    }

    async updateMenu(menu_id: number, menu: Partial<Menu>): Promise<Menu | null> {
        try {
            const response = await api.put<Menu>(`${API_URL}/${menu_id}`, menu);
            return response.data;
        } catch (error) {
            console.error("Error al actualizar usuario:", error);
            return null;
        }
    }


    async deleteMenu(id: number): Promise<boolean> {
        try {
            await api.delete(`${API_URL}/${id}`);
            return true;
        } catch (error) {
            console.error("Error al eliminar el pedido:", error);
            return false;
        }
    }

}

export const menuService = new MenuService();
