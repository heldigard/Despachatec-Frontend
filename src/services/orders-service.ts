import { apiClient } from '@/lib/api/client';
import { Order } from '../types/order';

const API_URL = '/api/pedidos';

export const getOrders = async (): Promise<Order[]> => {
  const response = await apiClient.get(API_URL);
  return response.data.data; // API devuelve { success, message, timestamp, data }
};

export const createOrder = async (order: Partial<Order>): Promise<Order> => {
  const response = await apiClient.post(API_URL, order);
  return response.data.data;
};

export const updateOrder = async (id: string, order: Partial<Order>): Promise<Order> => {
  const response = await apiClient.put(`${API_URL}/${id}`, order);
  return response.data.data;
};

export const deleteOrder = async (id: string): Promise<void> => {
  await apiClient.delete(`${API_URL}/${id}`);
};

export const changeOrderStatus = async (id: string, status: string): Promise<Order> => {
  const response = await apiClient.put(`${API_URL}/${id}/estado?estado=${status}`);
  return response.data.data;
};
