'use client';
import { useState } from 'react';
import { Order } from '@/types/order';
import { Product } from '@/types/product';
import { ProductSelector } from './ProductSelector';
import { useAuth } from '@/app/auth-context';

interface OrderFormProps {
  readonly initialData?: Partial<Order>;
  readonly onSubmit: (data: Partial<Order>) => void;
  readonly loading?: boolean;
  readonly products?: Product[];
}

export default function OrderForm({
  initialData = {},
  onSubmit,
  loading,
  products = [],
}: Readonly<OrderFormProps>) {
  const { notify } = useAuth();
  const [client, setClient] = useState(initialData.client ?? '');
  const [status, setStatus] = useState<Order['status']>(initialData.status ?? 'pending');
  const [selectedProducts, setSelectedProducts] = useState<
    Array<{ productId: string; quantity: number }>
  >(initialData.products ?? []);

  // Calcular total automáticamente
  const calcTotal = () => {
    return selectedProducts.reduce((sum, item) => {
      const prod = products.find((p) => p.id === item.productId);
      return sum + (prod ? prod.price * item.quantity : 0);
    }, 0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ client, status, total: calcTotal(), products: selectedProducts });
    notify(initialData?.id ? 'Orden actualizada correctamente' : 'Orden creada correctamente');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded">
      <div>
        <label htmlFor="client" className="block mb-1">
          Cliente
        </label>
        <input
          id="client"
          className="border p-2 rounded w-full"
          value={client}
          onChange={(e) => setClient(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="status" className="block mb-1">
          Estado
        </label>
        <select
          id="status"
          className="border p-2 rounded w-full"
          value={status}
          onChange={(e) => setStatus(e.target.value as Order['status'])}
        >
          <option value="pending">Pendiente</option>
          <option value="in_progress">En preparación</option>
          <option value="completed">Completado</option>
          <option value="cancelled">Cancelado</option>
        </select>
      </div>
      <div>
        <label htmlFor="products" className="block mb-1">
          Productos
        </label>
        <ProductSelector
          products={products}
          value={selectedProducts}
          onChange={setSelectedProducts}
        />
      </div>
      <div>
        <label htmlFor="total" className="block mb-1">
          Total
        </label>
        <input
          id="total"
          type="number"
          className="border p-2 rounded w-full"
          value={calcTotal()}
          readOnly
        />
      </div>
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded" disabled={loading}>
        {loading ? 'Guardando...' : 'Guardar'}
      </button>
    </form>
  );
}
