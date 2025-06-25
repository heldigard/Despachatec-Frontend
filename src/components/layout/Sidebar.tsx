'use client';

import Link from 'next/link';
import { useAuth } from '../../app/auth-context';

export default function Sidebar() {
  const { user } = useAuth();
  return (
    <aside className="w-64 h-full bg-gray-100 p-4 border-r flex flex-col">
      <nav className="flex-1 space-y-2">
        <Link href="/(dashboard)">Dashboard</Link>
        <Link href="/(dashboard)/products">Productos</Link>
        <Link href="/(dashboard)/clients">Clientes</Link>
        {user?.role === 'ADMIN' && <Link href="/(dashboard)/employees">Empleados</Link>}
        <Link href="/(dashboard)/orders">Pedidos</Link>
        {user?.role === 'ADMIN' && <Link href="/(dashboard)/reports">Reportes</Link>}
      </nav>
    </aside>
  );
}
