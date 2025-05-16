import api from "interceptor/axiosInterceptor";
import { Customer } from "models/Customer";
import env from "env/env"; 
import axios from "axios";

const API_URL = `${env.VITE_API_URL}/customers`;

const registerCustomer = async (customer: Customer): Promise<Customer | null> => {
  try {
    const response = await axios.post(API_URL, customer);
    return response.data;
  } catch (error) {
    console.error("Error registrando cliente:", error);
    return null;
  }
};


const getAllCustomers = async (): Promise<Customer[] | null> => {
  try {
    const response = await api.get("/customers");
    return response.data;
  } catch (error) {
    console.error("Error obteniendo clientes:", error);
    return null;
  }
};

const getCustomerById = async (id: number): Promise<Customer | null> => {
  try {
    const response = await api.get(`/customers/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error obteniendo cliente con ID ${id}:`, error);
    return null;
  }
};

const updateCustomer = async (id: number, updatedData: Partial<Customer>): Promise<Customer | null> => {
  try {
    const response = await api.put(`/customers/${id}`, updatedData);
    return response.data;
  } catch (error) {
    console.error(`Error actualizando cliente con ID ${id}:`, error);
    return null;
  }
};

const deleteCustomer = async (id: number): Promise<boolean> => {
  try {
    await api.delete(`/customers/${id}`);
    return true;
  } catch (error) {
    console.error(`Error eliminando cliente con ID ${id}:`, error);
    return false;
  }
};

export { registerCustomer, getAllCustomers, getCustomerById, updateCustomer, deleteCustomer };