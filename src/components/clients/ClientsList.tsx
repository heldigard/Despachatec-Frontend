'use client';
import { useState, useEffect, useCallback } from 'react';
import { ClientForm } from './ClientForm';
import { Button } from '../ui/Button';
import { useAuth } from '@/app/auth-context';
import { Client, ClientFormData } from '@/types/client';
import * as clientsService from '@/services/clients-service';

export default function ClientsList() {
  const { notify, user } = useAuth();
  const [clients, setClients] = useState<Client[]>([]);
  const [editing, setEditing] = useState<Client | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const isAdmin = user?.role === 'ADMIN';

  // Cargar clientes al montar el componente
  const loadClients = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await clientsService.getClients();
      setClients(data);
    } catch (err) {
      setError('Error al cargar clientes');
      notify('Error al cargar clientes');
      console.error('Error loading clients:', err);
    } finally {
      setLoading(false);
    }
  }, [notify]);

  useEffect(() => {
    loadClients();
  }, [loadClients]);

  const handleSave = async (clientData: ClientFormData) => {
    try {
      if (editing) {
        // Actualizar cliente existente
        const updated = await clientsService.updateClient(editing.id, clientData);
        setClients((prev) => prev.map((c) => (c.id === updated.id ? updated : c)));
        setEditing(null);
        notify('Cliente actualizado correctamente');
      } else {
        // Crear nuevo cliente
        const newClient = await clientsService.createClient(clientData);
        setClients((prev) => [...prev, newClient]);
        notify('Cliente agregado correctamente');
      }
      setShowForm(false);
    } catch (err) {
      notify('Error al guardar cliente');
      console.error('Error saving client:', err);
    }
  };

  const handleEdit = (client: Client) => {
    if (!isAdmin) {
      notify('Solo los administradores pueden editar clientes');
      return;
    }
    setEditing(client);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (!isAdmin) {
      notify('Solo los administradores pueden eliminar clientes');
      return;
    }

    if (!confirm('¿Estás seguro de que quieres eliminar este cliente?')) {
      return;
    }

    try {
      await clientsService.deleteClient(id);
      setClients((prev) => prev.filter((c) => c.id !== id));
      notify('Cliente eliminado correctamente');
    } catch (err) {
      notify('Error al eliminar cliente');
      console.error('Error deleting client:', err);
    }
  };

  const handleAddClient = () => {
    if (!isAdmin) {
      notify('Solo los administradores pueden agregar clientes');
      return;
    }
    setEditing(null);
    setShowForm(true);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-32">
        <div className="text-gray-600">Cargando clientes...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center">
        <p className="text-red-600 mb-4">{error}</p>
        <Button onClick={loadClients}>Reintentar</Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {!isAdmin && (
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-4">
          <div className="flex">
            <div className="ml-3">
              <p className="text-sm text-blue-700">
                <strong>Modo solo lectura:</strong> Como usuario con rol USER, solo puedes consultar
                la información de clientes. Los administradores pueden crear, editar y eliminar
                clientes.
              </p>
            </div>
          </div>
        </div>
      )}

      {isAdmin && <Button onClick={handleAddClient}>Agregar cliente</Button>}

      {showForm && (
        <ClientForm
          onSaveAction={handleSave}
          onCancelAction={() => setShowForm(false)}
          initial={editing || undefined}
        />
      )}

      {clients.length === 0 ? (
        <div className="text-center text-gray-600 py-8">No hay clientes registrados</div>
      ) : (
        clients.map((client) => (
          <div
            key={client.id}
            className="grid grid-cols-12 gap-4 items-center border p-4 rounded-lg bg-white shadow-sm"
          >
            <div className="col-span-6">
              <div>
                <span className="text-gray-900 font-medium">
                  {client.nombre} {client.apellidos}
                </span>
                {client.email && <p className="text-sm text-gray-600">{client.email}</p>}
                {client.telefono && <p className="text-sm text-gray-500">Tel: {client.telefono}</p>}
              </div>
            </div>
            <div className="col-span-4">
              {client.direccion && (
                <span className="text-sm text-gray-600">{client.direccion}</span>
              )}
            </div>
            <div className="col-span-2 flex gap-2 justify-end">
              {isAdmin && (
                <>
                  <Button onClick={() => handleEdit(client)}>Editar</Button>
                  <Button
                    onClick={() => handleDelete(client.id)}
                    className="bg-red-600 hover:bg-red-700"
                  >
                    Eliminar
                  </Button>
                </>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
