import { apiClient } from '@/lib/api/client';
import { Client, ClientFormData } from '@/types/client';

const API_URL = '/api/clientes';

export const getClients = async (): Promise<Client[]> => {
  const { data } = await apiClient.get(API_URL);
  return data;
};

export const getClientById = async (id: number): Promise<Client> => {
  const { data } = await apiClient.get(`${API_URL}/${id}`);
  return data;
};

export const createClient = async (client: ClientFormData): Promise<Client> => {
  const { data } = await apiClient.post(API_URL, client);
  return data;
};

export const updateClient = async (
  id: number,
  client: Partial<ClientFormData>,
): Promise<Client> => {
  const { data } = await apiClient.put(`${API_URL}/${id}`, client);
  return data;
};

export const deleteClient = async (id: number): Promise<{ deleted: boolean }> => {
  const { data } = await apiClient.delete(`${API_URL}/${id}`);
  return data;
};

export const searchClients = async (query: string): Promise<Client[]> => {
  const { data } = await apiClient.get(`${API_URL}/search?query=${encodeURIComponent(query)}`);
  return data;
};
