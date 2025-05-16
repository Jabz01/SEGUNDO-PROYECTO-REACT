import axios from "axios";
import { Issue } from "models/Issue";

import env from "env/env";
import api from "interceptor/axiosInterceptor";

const API_URL = env.VITE_API_URL + "/issues";

class IssueService{

     async getIssues(): Promise<Issue[]>{
        try {
            const response = await axios.get<Issue[]>(API_URL);
            return response.data;
        } catch (error) {
            console.error("Error al obtener pedidos pendientes");
            return[];
        }
    }

    async getIssueByID(id:number): Promise<Issue>{
        try {
            const response = await axios.get<Issue>(`${API_URL}/${id}`);
            return response.data;
        } catch (error) {
            console.error("Error al obtener pedidos pendientes");
            return null;
        }
    }

    async createIssue(Issue: Omit<Issue, "id_Issue">): Promise<Issue | null> {
        try {
            const response = await api.post<Issue>(API_URL, Issue);
            return response.data;
        } catch (error) {
            console.error("Error al crear usuario:", error);
            return null;
        }
    }


    async updateIssue(Issue_id: number, Issue: Partial<Issue>): Promise<Issue | null> {
        try {
            const response = await api.put<Issue>(`${API_URL}/${Issue_id}`, Issue);
            return response.data;
        } catch (error) {
            console.error("Error al actualizar usuario:", error);
            return null;
        }
    }


    async deleteIssue(id: number): Promise<boolean> {
        try {
            await api.delete(`${API_URL}/${id}`);
            return true;
        } catch (error) {
            console.error("Error al eliminar el pedido:", error);
            return false;
        }
    }
}


export const issueService = new IssueService();