import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from './auth-context';
import QueryProvider from '@/lib/providers/query-provider';

export const metadata: Metadata = {
  title: 'Despachatec - Gestión de Restaurante',
  description: 'Sistema de gestión para restaurantes y delivery',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="font-sans antialiased">
        <QueryProvider>
          <AuthProvider>{children}</AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
