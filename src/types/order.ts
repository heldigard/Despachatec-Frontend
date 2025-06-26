export interface OrderDetail {
  id?: number;
  pedidoId?: number;
  productoId: number;
  cantidad: number;
  precioUnitario?: number;
  subtotal?: number;
  nombreProducto?: string;
  descripcionProducto?: string;
}

export interface Order {
  id: number;
  clienteId: number;
  empleadoId?: number;
  fechaPedido: string;
  fechaEntrega?: string;
  estado: 'PENDIENTE' | 'PREPARANDO' | 'LISTO' | 'ENTREGADO' | 'CANCELADO';
  total: number;
  detalles: OrderDetail[];
}
