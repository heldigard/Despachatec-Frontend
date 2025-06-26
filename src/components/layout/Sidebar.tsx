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
    <aside className="w-64 h-full bg-sidebar border-r border-sidebar-border flex flex-col shadow-sm">
      {/* Header */}
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Package className="w-4 h-4 text-primary-foreground" />
          </div>
          <div>
            <h2 className="font-semibold text-sidebar-foreground">DespachaTec</h2>
            <p className="text-xs text-sidebar-foreground/60">Sistema de Gestión</p>
          </div>
        </div>
      </div>

      {/* User Info */}
      <div className="p-4 border-b border-sidebar-border">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
            <span className="text-sm font-medium text-primary">
              {user?.email?.[0]?.toUpperCase() ?? 'A'}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-sidebar-foreground truncate">
              Bienvenido, Admin
            </p>
            <p className="text-xs text-sidebar-foreground/60 truncate">
              Rol: {user?.role === 'ADMIN' ? 'Administrador' : 'Usuario'}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {filteredNavItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    'group flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ease-in-out',
                    isActive
                      ? 'bg-sidebar-accent text-sidebar-accent-foreground shadow-sm'
                      : 'text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/50',
                  )}
                >
                  <Icon
                    className={cn(
                      'w-4 h-4 transition-colors',
                      isActive
                        ? 'text-sidebar-accent-foreground'
                        : 'text-sidebar-foreground/60 group-hover:text-sidebar-foreground',
                    )}
                  />
                  <span className="flex-1">{item.title}</span>
                  {isActive && <ChevronRight className="w-3 h-3 text-sidebar-accent-foreground" />}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-sidebar-border">
        <button
          onClick={logout}
          className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/50 transition-all duration-200 ease-in-out group"
        >
          <LogOut className="w-4 h-4 text-sidebar-foreground/60 group-hover:text-sidebar-foreground" />
          <span>Cerrar sesión</span>
        </button>
      </div>
    </aside>
  );
}
