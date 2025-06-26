import { apiClient } from '@/lib/api/client';
import { Product } from '@/types/product';

const API_URL = '/api/productos';

export const getProducts = async (): Promise<Product[]> => {
  const { data } = await apiClient.get(API_URL);
  // Agregar campos de compatibilidad
  return data.map((product: Product) => ({
    ...product,
    name: product.nombre,
    price: product.precio,
  }));
};
