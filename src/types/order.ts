export interface Order {
  id: string;
  client: string;
  products: Array<{ productId: string; quantity: number }>;
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  createdAt: string;
  updatedAt: string;
  total?: number; // Agregado para compatibilidad UI
  // Add more fields as needed
}
