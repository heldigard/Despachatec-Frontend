'use client';
import { useState } from 'react';
import { Order, OrderDetail } from '@/types/order';
import { Product } from '@/types/product';
import { useAuth } from '@/app/auth-context';
import { Trash2 } from 'lucide-react';

interface OrderFormProps {
  readonly initialData?: Partial<Order>;
  readonly onSubmitAction: (data: Partial<Order>) => void;
  readonly loading?: boolean;
  readonly products?: Product[];
}

export default function OrderForm({
  initialData = {},
  onSubmitAction,
  loading,
  products = [],
}: Readonly<OrderFormProps>) {
  const { notify } = useAuth();
  const [clienteId, setClienteId] = useState(initialData.clienteId?.toString() ?? '');
  const [empleadoId, setEmpleadoId] = useState(initialData.empleadoId?.toString() ?? '');
  const [estado, setEstado] = useState<Order['estado']>(initialData.estado ?? 'PENDIENTE');
  const [detalles, setDetalles] = useState<Omit<OrderDetail, 'id' | 'pedidoId'>[]>(
    initialData.detalles?.map((d) => ({
      productoId: d.productoId,
      cantidad: d.cantidad,
      precioUnitario: d.precioUnitario,
      subtotal: d.subtotal,
      nombreProducto: d.nombreProducto,
      descripcionProducto: d.descripcionProducto,
    })) ?? [],
  );

  // Calcular total automáticamente
  const calcTotal = () => {
    return detalles.reduce((sum, item) => {
      if (item.subtotal) {
        return sum + item.subtotal;
      }
      const prod = products.find((p) => p.id === item.productoId);
      return sum + (prod ? prod.precio * item.cantidad : 0);
    }, 0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!clienteId) {
      notify('Cliente ID es requerido');
      return;
    }

    if (detalles.length === 0) {
      notify('Debe agregar al menos un producto');
      return;
    }

    const orderData: Partial<Order> = {
      clienteId: parseInt(clienteId),
      estado,
      total: calcTotal(),
      detalles: detalles.map((d) => ({
        productoId: d.productoId,
        cantidad: d.cantidad,
      })),
    };

    if (empleadoId) {
      orderData.empleadoId = parseInt(empleadoId);
    }

    onSubmitAction(orderData);
  };

  const addProduct = () => {
    setDetalles([...detalles, { productoId: 0, cantidad: 1 }]);
  };

  const removeProduct = (index: number) => {
    setDetalles(detalles.filter((_, i) => i !== index));
  };

  const updateProduct = (index: number, field: keyof OrderDetail, value: string | number) => {
    const newDetalles = [...detalles];
    newDetalles[index] = { ...newDetalles[index], [field]: value };

    // Si cambió el producto, actualizar el nombre
    if (field === 'productoId') {
      const product = products.find((p) => p.id === value);
      if (product) {
        newDetalles[index].nombreProducto = product.nombre;
        newDetalles[index].precioUnitario = product.precio;
        newDetalles[index].subtotal = product.precio * newDetalles[index].cantidad;
      }
    }

    // Si cambió la cantidad, recalcular subtotal
    if (field === 'cantidad' && newDetalles[index].precioUnitario && typeof value === 'number') {
      newDetalles[index].subtotal = newDetalles[index].precioUnitario * value;
    }

    setDetalles(newDetalles);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded">
      <div>
        <label htmlFor="clienteId" className="block mb-1">
          Cliente ID *
        </label>
        <input
          id="clienteId"
          type="number"
          className="border p-2 rounded w-full"
          value={clienteId}
          onChange={(e) => setClienteId(e.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="empleadoId" className="block mb-1">
          Empleado ID (opcional)
        </label>
        <input
          id="empleadoId"
          type="number"
          className="border p-2 rounded w-full"
          value={empleadoId}
          onChange={(e) => setEmpleadoId(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="estado" className="block mb-1">
          Estado
        </label>
        <select
          id="estado"
          className="border p-2 rounded w-full"
          value={estado}
          onChange={(e) => setEstado(e.target.value as Order['estado'])}
        >
          <option value="PENDIENTE">Pendiente</option>
          <option value="PREPARANDO">Preparando</option>
          <option value="LISTO">Listo</option>
          <option value="ENTREGADO">Entregado</option>
          <option value="CANCELADO">Cancelado</option>
        </select>
      </div>

      <div>
        <div className="flex justify-between items-center mb-2">
          <span className="block font-medium">Productos</span>
          <button
            type="button"
            onClick={addProduct}
            className="bg-green-600 text-white px-3 py-1 rounded text-sm"
          >
            Agregar Producto
          </button>
        </div>

        {detalles.map((detalle, index) => (
          <div key={`detalle-${index}-${detalle.productoId}`} className="border p-3 rounded mb-2">
            <div className="grid grid-cols-3 gap-2">
              <div>
                <label htmlFor={`producto-${index}`} className="block text-sm">
                  Producto
                </label>
                <select
                  id={`producto-${index}`}
                  value={detalle.productoId}
                  onChange={(e) => updateProduct(index, 'productoId', parseInt(e.target.value))}
                  className="border p-1 rounded w-full text-sm"
                >
                  <option value={0}>Seleccionar producto</option>
                  {products.map((product) => (
                    <option key={product.id} value={product.id}>
                      {product.nombre} - ${product.precio}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor={`cantidad-${index}`} className="block text-sm">
                  Cantidad
                </label>
                <input
                  id={`cantidad-${index}`}
                  type="number"
                  min="1"
                  value={detalle.cantidad}
                  onChange={(e) => updateProduct(index, 'cantidad', parseInt(e.target.value))}
                  className="border p-1 rounded w-full text-sm"
                />
              </div>

              <div className="flex items-end">
                <button
                  type="button"
                  onClick={() => removeProduct(index)}
                  className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-3 rounded-lg transition-colors duration-200 shadow-sm text-sm"
                  title="Eliminar producto"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>

            {detalle.subtotal && (
              <div className="text-sm text-gray-600 mt-1">Subtotal: ${detalle.subtotal}</div>
            )}
          </div>
        ))}
      </div>

      <div className="text-lg font-bold">Total: ${calcTotal().toFixed(2)}</div>

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {(() => {
          if (loading) return 'Guardando...';
          if (initialData?.id) return 'Actualizar Orden';
          return 'Crear Orden';
        })()}
      </button>
    </form>
  );
}
