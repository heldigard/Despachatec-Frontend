'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '../../app/auth-context';
import {
  LayoutDashboard,
  Package,
  Users,
  UserCog,
  ShoppingCart,
  BarChart3,
  LogOut,
  ChevronRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  adminOnly?: boolean;
}

const navItems: NavItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    title: 'Productos',
    href: '/dashboard/products',
    icon: Package,
  },
  {
    title: 'Clientes',
    href: '/dashboard/clients',
    icon: Users,
  },
  {
    title: 'Empleados',
    href: '/dashboard/employees',
    icon: UserCog,
    adminOnly: true,
  },
  {
    title: 'Pedidos',
    href: '/dashboard/orders',
    icon: ShoppingCart,
  },
  {
    title: 'Reportes',
    href: '/dashboard/reports',
    icon: BarChart3,
    adminOnly: true,
  },
];

export default function Sidebar() {
  const { user, logout } = useAuth();
  const pathname = usePathname();

  const filteredNavItems = navItems.filter((item) => !item.adminOnly || user?.role === 'ADMIN');

  return (
    <aside className="w-64 h-full bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 border-r border-slate-700/50 flex flex-col shadow-2xl backdrop-blur-sm">
      {/* Header */}
      <div className="p-6 border-b border-slate-700/50 bg-gradient-to-r from-blue-600/20 to-purple-600/20">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform duration-200">
            <Package className="w-5 h-5 text-white drop-shadow-sm" />
          </div>
          <div>
            <h2 className="font-bold text-lg text-white drop-shadow-sm">DespachaTec</h2>
            <p className="text-xs text-slate-300 font-medium">Sistema de Gestión</p>
          </div>
        </div>
      </div>

      {/* User Info */}
      <div className="p-4 border-b border-slate-700/50 bg-slate-800/50">
        <div className="flex items-center space-x-3 p-3 rounded-xl bg-gradient-to-r from-slate-700/50 to-slate-600/50 border border-slate-600/30 shadow-lg">
          <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center shadow-md">
            <span className="text-sm font-bold text-white drop-shadow-sm">
              {user?.email?.[0]?.toUpperCase() ?? 'A'}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-white truncate">Bienvenido, Admin</p>
            <p className="text-xs text-emerald-400 font-medium truncate">
              Rol: {user?.role === 'ADMIN' ? 'Administrador' : 'Usuario'}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 overflow-y-auto">
        <ul className="space-y-2">
          {filteredNavItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    'group relative flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ease-in-out transform hover:scale-[1.02]',
                    isActive
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/25 border border-blue-400/30'
                      : 'text-slate-300 hover:text-white hover:bg-gradient-to-r hover:from-slate-700/60 hover:to-slate-600/60 hover:shadow-md hover:border hover:border-slate-500/30',
                  )}
                >
                  {isActive && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-cyan-400 to-blue-500 rounded-r-full shadow-lg shadow-cyan-400/50" />
                  )}
                  <div
                    className={cn(
                      'w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300',
                      isActive
                        ? 'bg-white/20 shadow-md'
                        : 'group-hover:bg-slate-600/50 group-hover:shadow-sm',
                    )}
                  >
                    <Icon
                      className={cn(
                        'w-4 h-4 transition-all duration-300',
                        isActive
                          ? 'text-white drop-shadow-sm'
                          : 'text-slate-400 group-hover:text-white',
                      )}
                    />
                  </div>
                  <span className="flex-1 font-medium">{item.title}</span>
                  {isActive && (
                    <div className="flex items-center space-x-1">
                      <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse" />
                      <ChevronRight className="w-4 h-4 text-white/80" />
                    </div>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-slate-700/50 bg-slate-800/30">
        <button
          onClick={logout}
          className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-300 hover:text-white hover:bg-gradient-to-r hover:from-red-600/80 hover:to-pink-600/80 transition-all duration-300 ease-in-out group transform hover:scale-[1.02] shadow-sm hover:shadow-lg hover:shadow-red-500/25 border border-transparent hover:border-red-400/30"
        >
          <div className="w-8 h-8 rounded-lg flex items-center justify-center group-hover:bg-white/20 transition-all duration-300">
            <LogOut className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors duration-300" />
          </div>
          <span className="font-medium">Cerrar sesión</span>
        </button>
      </div>
    </aside>
  );
}
