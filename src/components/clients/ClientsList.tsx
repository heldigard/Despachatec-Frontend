'use client';
import { useState } from 'react';
import { ClientForm } from './ClientForm';
import { Button } from '../ui/Button';
import { useAuth } from '@/app/auth-context';

interface Client {
  id: string;
  name: string;
  email: string;
}

const mockClients: Client[] = [
  { id: '1', name: 'Juan Pérez', email: 'juan@example.com' },
  { id: '2', name: 'Ana Gómez', email: 'ana@example.com' },
  { id: '3', name: 'Carlos Ruiz', email: 'carlos@example.com' },
];

export default function ClientsList() {
  const { notify } = useAuth();
  const [clients, setClients] = useState<Client[]>(mockClients);
  const [editing, setEditing] = useState<Client | null>(null);
  const [showForm, setShowForm] = useState(false);

  const handleSave = (client: Client) => {
    if (editing) {
      setClients((prev) => prev.map((c) => (c.id === client.id ? client : c)));
      setEditing(null);
      notify('Cliente actualizado correctamente');
    } else {
      setClients((prev) => [...prev, client]);
      notify('Cliente agregado correctamente');
    }
    setShowForm(false);
  };

  const handleEdit = (client: Client) => {
    setEditing(client);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    setClients((prev) => prev.filter((c) => c.id !== id));
    notify('Cliente eliminado');
  };

  return (
    <div className="space-y-4">
      <Button
        onClick={() => {
          setEditing(null);
          setShowForm(true);
        }}
      >
        Agregar cliente
      </Button>
      {showForm && <ClientForm onSave={handleSave} initial={editing || undefined} />}
      {clients.map((client) => (
        <div key={client.id} className="flex items-center justify-between border p-2 rounded">
          <span>{client.name}</span>
          <span>{client.email}</span>
          <div className="flex gap-2">
            <Button onClick={() => handleEdit(client)}>Editar</Button>
            <Button onClick={() => handleDelete(client.id)}>Eliminar</Button>
          </div>
        </div>
      ))}
    </div>
  );
}
