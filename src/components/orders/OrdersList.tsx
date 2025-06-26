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
  if (ordersQuery.isError || productsQuery.isError) {
    return (
      <div className="text-red-600">
        Error al cargar datos: {ordersQuery.error?.message ?? productsQuery.error?.message}
      </div>
    );
  }

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
      { id: editing.id.toString(), order: data },
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

  const getStatusColor = (estado: string) => {
    switch (estado) {
      case 'PENDIENTE':
        return 'text-yellow-600';
      case 'PREPARANDO':
        return 'text-blue-600';
      case 'LISTO':
        return 'text-green-600';
      case 'ENTREGADO':
        return 'text-gray-600';
      case 'CANCELADO':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const getButtonText = (estado: string) => {
    if (estado === 'PENDIENTE') return 'Iniciar Preparación';
    if (estado === 'PREPARANDO') return 'Marcar Listo';
    return 'Entregar';
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

      <div className="space-y-2">
        {orders.map((order) => (
          <div key={order.id} className="border p-4 rounded shadow">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
              <div>
                <strong>Pedido #{order.id}</strong>
              </div>
              <div>Cliente ID: {order.clienteId}</div>
              <div>
                <span className={getStatusColor(order.estado)}>Estado: {order.estado}</span>
              </div>
              <div>Total: ${order.total}</div>
            </div>

            <div className="text-sm text-gray-600 mb-3">
              Fecha: {new Date(order.fechaPedido).toLocaleDateString()}
              {order.fechaEntrega && (
                <span> | Entrega: {new Date(order.fechaEntrega).toLocaleDateString()}</span>
              )}
            </div>

            {order.detalles && order.detalles.length > 0 && (
              <div className="mb-3">
                <strong>Productos:</strong>
                <ul className="list-disc list-inside text-sm">
                  {order.detalles.map((detalle) => (
                    <li key={`${detalle.productoId}-${detalle.cantidad}`}>
                      {detalle.nombreProducto ?? `Producto ID: ${detalle.productoId}`}- Cantidad:{' '}
                      {detalle.cantidad}
                      {detalle.subtotal && ` - $${detalle.subtotal}`}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex gap-2">
              {order.estado !== 'ENTREGADO' && order.estado !== 'CANCELADO' && (
                <button
                  className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
                  onClick={() => {
                    let nextStatus = 'ENTREGADO';
                    if (order.estado === 'PENDIENTE') {
                      nextStatus = 'PREPARANDO';
                    } else if (order.estado === 'PREPARANDO') {
                      nextStatus = 'LISTO';
                    }

                    changeOrderStatus.mutate(
                      { id: order.id.toString(), status: nextStatus },
                      {
                        onSuccess: () => notify('Estado actualizado correctamente'),
                        onError: () => notify('Error al actualizar estado'),
                      },
                    );
                  }}
                >
                  {getButtonText(order.estado)}
                </button>
              )}

              <button
                className="bg-yellow-600 text-white px-3 py-1 rounded text-sm hover:bg-yellow-700"
                onClick={() => handleEdit(order)}
              >
                Editar
              </button>

              <button
                className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
                onClick={() => {
                  if (confirm('¿Estás seguro de eliminar este pedido?')) {
                    deleteOrder.mutate(order.id.toString(), {
                      onSuccess: () => notify('Pedido eliminado correctamente'),
                      onError: () => notify('Error al eliminar el pedido'),
                    });
                  }
                }}
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>

      {orders.length === 0 && (
        <div className="text-center py-8 text-gray-500">No hay pedidos disponibles</div>
      )}
    </div>
  );
}
