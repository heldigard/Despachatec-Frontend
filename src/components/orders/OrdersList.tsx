'use client';
import { useOrders } from '@/hooks/useOrders';
import OrderForm from './OrderForm';
import { useState } from 'react';
import { useAuth } from '@/app/auth-context';
import { Product } from '@/types/product';
import { useQuery } from '@tanstack/react-query';
import * as productsService from '@/services/products-service';
import { Order } from '@/types/order';

export default function OrdersList() {
  const { notify } = useAuth();
  const { ordersQuery, deleteOrder, changeOrderStatus, createOrder, updateOrder } = useOrders();
  const [showForm, setShowForm] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [editing, setEditing] = useState<Order | null>(null);
  // Obtener productos para selector
  const productsQuery = useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: productsService.getProducts,
  });

  if (ordersQuery.isLoading || productsQuery.isLoading) return <div>Cargando órdenes...</div>;
  if (ordersQuery.isError || productsQuery.isError) return <div>Error al cargar datos</div>;

  const orders = ordersQuery.data ?? [];
  const products = productsQuery.data ?? [];

  const handleCreate = (data: Partial<Order>) => {
    setFormError(null);
    createOrder.mutate(data, {
      onError: () => {
        setFormError('Error al crear la orden');
        notify('Error al crear la orden');
      },
      onSuccess: () => {
        setShowForm(false);
        setEditing(null);
        notify('Orden creada correctamente');
      },
    });
  };

  const handleEdit = (order: Order) => {
    setEditing(order);
    setShowForm(true);
  };

  const handleUpdate = (data: Partial<Order>) => {
    if (!editing) return;
    setFormError(null);
    updateOrder.mutate(
      { id: editing.id, order: data },
      {
        onError: () => {
          setFormError('Error al actualizar la orden');
          notify('Error al actualizar la orden');
        },
        onSuccess: () => {
          setShowForm(false);
          setEditing(null);
          notify('Orden actualizada correctamente');
        },
      },
    );
  };

  return (
    <div className="space-y-4">
      <button
        className="bg-green-600 text-white px-4 py-2 rounded mb-2"
        onClick={() => {
          setShowForm((v) => !v);
          setEditing(null);
        }}
      >
        {showForm && !editing ? 'Cancelar' : 'Nueva Orden'}
      </button>
      {showForm && (
        <OrderForm
          onSubmit={editing ? handleUpdate : handleCreate}
          loading={createOrder.isPending || updateOrder.isPending}
          products={products}
          initialData={editing ?? undefined}
        />
      )}
      {formError && <div className="text-red-600">{formError}</div>}
      {orders.map((order) => (
        <div key={order.id} className="flex items-center justify-between border p-2 rounded">
          <span>{order.client}</span>
          <span>{order.status}</span>
          <span>${order.total}</span>
          <button
            className="text-blue-600 hover:underline mx-2"
            onClick={() => {
              changeOrderStatus.mutate(
                { id: order.id, status: 'completed' },
                {
                  onSuccess: () => notify('Estado de la orden actualizado'),
                  onError: () => notify('Error al actualizar estado de la orden'),
                },
              );
            }}
          >
            Completar
          </button>
          <button
            className="text-yellow-600 hover:underline mx-2"
            onClick={() => handleEdit(order)}
          >
            Editar
          </button>
          <button
            className="text-red-600 hover:underline mx-2"
            onClick={() => {
              deleteOrder.mutate(order.id, {
                onSuccess: () => notify('Orden eliminada'),
                onError: () => notify('Error al eliminar la orden'),
              });
            }}
          >
            Eliminar
          </button>
        </div>
      ))}
    </div>
  );
}
