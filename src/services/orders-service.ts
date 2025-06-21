import axios from 'axios';
import { Order } from '../types/order';

const API_URL = '/api/orders';

export const getOrders = async (): Promise<Order[]> => {
  const { data } = await axios.get(API_URL);
  return data;
};

export const createOrder = async (order: Partial<Order>): Promise<Order> => {
  const { data } = await axios.post(API_URL, order);
  return data;
};

export const updateOrder = async (id: string, order: Partial<Order>): Promise<Order> => {
  const { data } = await axios.put(`${API_URL}/${id}`, order);
  return data;
};

export const deleteOrder = async (id: string): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};

export const changeOrderStatus = async (id: string, status: string): Promise<Order> => {
  const { data } = await axios.patch(`${API_URL}/${id}/status`, { status });
  return data;
};
