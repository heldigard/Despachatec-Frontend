import { apiClient } from '@/lib/api/client';
import { Product } from '@/types/product';

const API_URL = '/api/productos';

export const getProducts = async (): Promise<Product[]> => {
  const { data } = await apiClient.get(API_URL);
  return data;
};

export const getProductById = async (id: number): Promise<Product> => {
  const { data } = await apiClient.get(`${API_URL}/${id}`);
  return data;
};

export const createProduct = async (product: Omit<Product, 'id'>): Promise<Product> => {
  const { data } = await apiClient.post(API_URL, product);
  return data;
};

export const updateProduct = async (id: number, product: Partial<Product>): Promise<Product> => {
  const { data } = await apiClient.put(`${API_URL}/${id}`, product);
  return data;
};

export const deleteProduct = async (id: number): Promise<{ deleted: boolean }> => {
  const { data } = await apiClient.delete(`${API_URL}/${id}`);
  return data;
};

export const searchProducts = async (query: string): Promise<Product[]> => {
  const { data } = await apiClient.get(`${API_URL}/search?query=${encodeURIComponent(query)}`);
  return data;
};

export const getProductsByCategory = async (categoria: string): Promise<Product[]> => {
  const { data } = await apiClient.get(`${API_URL}/categoria/${encodeURIComponent(categoria)}`);
  return data;
};

export const getAllProductsAdmin = async (): Promise<Product[]> => {
  const { data } = await apiClient.get(`${API_URL}/admin/all`);
  return data;
};
