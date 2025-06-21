'use client';
import { useAuth } from '../auth-context';

export default function DashboardPage() {
  const { user, logout, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Cargando...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Dashboard</h1>
          <div className="mb-6">
            <p className="text-lg text-gray-700">
              Bienvenido, <span className="font-semibold">{user?.name ?? 'Usuario'}</span>
            </p>
            <p className="text-sm text-gray-500">
              Rol:{' '}
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">
                {user?.role}
              </span>
            </p>
          </div>
          <button
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
            onClick={logout}
          >
            Cerrar sesión
          </button>
        </div>
      </div>
    </main>
  );
}
