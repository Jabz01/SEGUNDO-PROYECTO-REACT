import axios from "axios";
import { Shift } from "models/Shift";
import env from "env/env";
import api from "interceptor/axiosInterceptor";

const API_URL = env.VITE_API_URL + "/shifts";

class ShiftService {
  
  async getShifts(): Promise<Shift[]> {
    try {
      const response = await axios.get<Shift[]>(API_URL);
      return response.data;
    } catch (error) {
      console.error("Error al obtener los turnos:", error);
      return [];
    }
  }

  async getShiftByID(id: number): Promise<Shift | null> {
    try {
      const response = await axios.get<Shift>(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error al obtener el turno:", error);
      return null;
    }
  }

async createShift(shift: Omit<Shift, "id">): Promise<Shift | null> {
  try {
    const response = await api.post<Shift>(API_URL, {
      driver_id: shift.driver.id, 
      motorcycle_id: shift.motorcycle.id,  
      start_time: shift.start_time,
      end_time: shift.end_time,
      status: shift.status,
    });
    return response.data;
  } catch (error) {
    console.error("Error al crear el turno:", error);
    return null;
  }
}

  async updateShift(shift_id: number, shift: Partial<Shift>): Promise<Shift | null> {
    try {
      const response = await api.put<Shift>(`${API_URL}/${shift_id}`, shift);
      return response.data;
    } catch (error) {
      console.error("Error al actualizar el turno:", error);
      return null;
    }
  }

  async deleteShift(id: number): Promise<boolean> {
    try {
      await api.delete(`${API_URL}/${id}`);
      return true;
    } catch (error) {
      console.error("Error al eliminar el turno:", error);
      return false;
    }
  }
}

export const shiftService = new ShiftService();