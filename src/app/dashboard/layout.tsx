import { ReactNode } from 'react';
import Sidebar from '../../components/layout/Sidebar';

// Force dynamic rendering for all dashboard pages
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export default function DashboardLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <div className="min-h-screen flex bg-background">
      <Sidebar />
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
