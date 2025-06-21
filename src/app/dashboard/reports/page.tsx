'use client';
import { useAuth } from '@/app/auth-context';
import { useQuery } from '@tanstack/react-query';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from 'recharts';

interface VentasData {
  total: number;
  porMes: number[];
}
interface ProductoMasVendido {
  nombre: string;
  cantidad: number;
}
interface PedidosPorEstado {
  pendiente: number;
  preparando: number;
  completado: number;
  cancelado: number;
}

export default function ReportsPage() {
  const { user } = useAuth();
  const ventasQuery = useQuery<VentasData>({
    queryKey: ['ventas'],
    queryFn: async () => {
      // Reemplazar con llamada real a la API
      return { total: 12345, porMes: [1000, 1200, 1500, 2000, 1800, 2200] };
    },
  });
  const productosQuery = useQuery<ProductoMasVendido[]>({
    queryKey: ['productosMasVendidos'],
    queryFn: async () => {
      // Reemplazar con llamada real a la API
      return [
        { nombre: 'Pizza Margarita', cantidad: 120 },
        { nombre: 'Hamburguesa', cantidad: 90 },
        { nombre: 'Ensalada César', cantidad: 60 },
      ];
    },
  });
  const pedidosQuery = useQuery<PedidosPorEstado>({
    queryKey: ['pedidosPorEstado'],
    queryFn: async () => {
      // Reemplazar con llamada real a la API
      return {
        pendiente: 12,
        preparando: 8,
        completado: 30,
        cancelado: 2,
      };
    },
  });

  // Control de acceso: solo ADMIN puede ver reportes
  if (!user || user.role !== 'ADMIN') {
    return (
      <div className="flex flex-col items-center justify-center h-96">
        <h2 className="text-2xl font-bold mb-2">Acceso restringido</h2>
        <p className="text-lg">Esta sección es solo para administradores.</p>
      </div>
    );
  }

  if (ventasQuery.isLoading || productosQuery.isLoading || pedidosQuery.isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-96">
        <svg
          className="animate-spin h-10 w-10 text-blue-600 mb-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
        </svg>
        <span className="text-lg">Cargando reportes...</span>
      </div>
    );
  }
  if (ventasQuery.isError || productosQuery.isError || pedidosQuery.isError) {
    return (
      <div className="flex flex-col items-center justify-center h-96 text-red-600">
        <svg
          className="h-10 w-10 mb-2"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v2m0 4h.01M21 12A9 9 0 113 12a9 9 0 0118 0z"
          />
        </svg>
        <span className="text-lg font-semibold">Error al cargar reportes</span>
        <span className="text-sm">Por favor, intente nuevamente o contacte a soporte.</span>
      </div>
    );
  }

  // Datos para el gráfico de ventas por mes
  const ventasPorMes =
    ventasQuery.data?.porMes?.map((valor, idx) => ({
      mes: `Mes ${idx + 1}`,
      ventas: valor,
    })) ?? [];

  // Datos para productos más vendidos
  const productosMasVendidos =
    productosQuery.data?.map((prod) => ({
      nombre: prod.nombre,
      ventas: prod.cantidad,
    })) ?? [];

  // Datos para pedidos por estado
  const pedidosPorEstado = pedidosQuery.data ?? {};

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold mb-4">Dashboard Analítico</h2>
      {/* Ventas Totales y Gráfica */}
      <section>
        <h3 className="text-xl font-semibold mb-2">Ventas Totales</h3>
        <div className="text-3xl font-bold" aria-label="Ventas totales">
          ${ventasQuery.data?.total ?? 0}
        </div>
        {/* Gráfica de barras por mes */}
        <div
          className="w-full h-64 mt-4 bg-white rounded shadow p-4"
          aria-label="Gráfica de ventas por mes"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={ventasPorMes}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mes" />
              <YAxis />
              <Tooltip
                contentStyle={{ background: '#f1f5f9', borderRadius: 8 }}
                cursor={{ fill: '#e0e7ef' }}
              />
              <Legend />
              <Bar dataKey="ventas" fill="#2563eb" name="Ventas por mes" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>
      {/* Productos más vendidos y gráfica */}
      <section>
        <h3 className="text-xl font-semibold mb-2">Productos Más Vendidos</h3>
        <div
          className="w-full h-64 mt-4 bg-white rounded shadow p-4"
          aria-label="Gráfica productos más vendidos"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={productosMasVendidos} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="nombre" type="category" width={120} />
              <Tooltip
                contentStyle={{ background: '#f1f5f9', borderRadius: 8 }}
                cursor={{ fill: '#e0e7ef' }}
              />
              <Legend />
              <Bar dataKey="ventas" fill="#10b981" name="Ventas" barSize={32} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>
      {/* Pedidos por estado */}
      <section>
        <h3 className="text-xl font-semibold mb-2">Pedidos por Estado</h3>
        <ul className="grid grid-cols-2 gap-2">
          {Object.entries(pedidosPorEstado).map(([estado, cantidad]) => (
            <li
              key={estado}
              className="bg-gray-100 rounded px-3 py-2 flex items-center justify-between"
            >
              <span className="capitalize font-medium">{estado}</span>
              <span className="font-bold text-blue-700">{cantidad as number}</span>
            </li>
          ))}
        </ul>
      </section>
      {/* Placeholder para siguiente métrica o sección analítica */}
      <section>
        <h3 className="text-xl font-semibold mb-2 text-gray-400">
          [Próxima métrica/visualización]
        </h3>
        <div className="text-gray-400">
          Aquí se integrará la siguiente métrica o análisis avanzado.
        </div>
      </section>
    </div>
  );
}
