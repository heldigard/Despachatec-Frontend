'use client';
import OrdersList from '../../../components/orders/OrdersList';

export default function OrdersPage() {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Gestión de Pedidos</h2>
      <OrdersList />
    </div>
  );
}
