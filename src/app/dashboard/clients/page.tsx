'use client';
import ClientsList from '../../../components/clients/ClientsList';

export default function ClientsPage() {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Gestión de Clientes</h2>
      <ClientsList />
    </div>
  );
}
