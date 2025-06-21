import axios from 'axios';
import { Product } from '@/types/product';

const API_URL = '/api/products';

export const getProducts = async (): Promise<Product[]> => {
  const { data } = await axios.get(API_URL);
  return data;
};
