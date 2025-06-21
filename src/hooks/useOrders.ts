import { Order } from '@/types/order';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import * as ordersService from '@/services/orders-service';

export function useOrders() {
  const queryClient = useQueryClient();
  const ordersQuery = useQuery<Order[]>({
    queryKey: ['orders'],
    queryFn: ordersService.getOrders,
  });

  const createOrder = useMutation({
    mutationFn: ordersService.createOrder,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['orders'] }),
  });

  const updateOrder = useMutation({
    mutationFn: ({ id, order }: { id: string; order: Partial<Order> }) =>
      ordersService.updateOrder(id, order),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['orders'] }),
  });

  const deleteOrder = useMutation({
    mutationFn: ordersService.deleteOrder,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['orders'] }),
  });

  const changeOrderStatus = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      ordersService.changeOrderStatus(id, status),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['orders'] }),
  });

  return {
    ordersQuery,
    createOrder,
    updateOrder,
    deleteOrder,
    changeOrderStatus,
  };
}
