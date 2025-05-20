import axios from "axios";
import { Photo } from "models/photo";

import env from "env/env";
import api from "interceptor/axiosInterceptor";

const API_URL = env.VITE_API_URL + "/photos";

class PhotoService {

  async getPhotos(): Promise<Photo[]> {
    try {
      const response = await axios.get<Photo[]>(API_URL);
      return response.data;
    } catch (error) {
      console.error("Error al obtener las fotos:", error);
      return [];
    }
  }

  async getPhotoByID(id: number): Promise<Photo | null> {
    try {
      const response = await axios.get<Photo>(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error al obtener la foto:", error);
      return null;
    }
  }

  async createPhoto(photo: Omit<Photo, "id">): Promise<Photo | null> {
    try {
      const response = await api.post<Photo>(API_URL, photo);
      return response.data;
    } catch (error) {
      console.error("Error al crear la foto:", error);
      return null;
    }
  }

  async uploadTempPhoto(file: File, issue_id: number): Promise<string | null> {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("issue_id", String(issue_id));

      const response = await api.post(`${API_URL}/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data.image_url; // O ajusta según el nombre exacto que devuelva tu backend
    } catch (error) {
      console.error("Error al subir temporalmente la foto:", error);
      return null;
    }
  }

  async deletePhoto(id: number): Promise<boolean> {
    try {
      await api.delete(`${API_URL}/${id}`);
      return true;
    } catch (error) {
      console.error("Error al eliminar la foto:", error);
      return false;
    }
  }
}

export const photoService = new PhotoService();
