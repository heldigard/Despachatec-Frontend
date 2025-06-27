'use client';
import { useState } from 'react';
import { Button } from '../ui/Button';
import { useAuth } from '@/app/auth-context';
import { Client, ClientFormData } from '@/types/client';

interface ClientFormProps {
  onSaveAction: (client: ClientFormData) => void;
  onCancelAction: () => void;
  initial?: Client;
}

export function ClientForm({ onSaveAction, onCancelAction, initial }: Readonly<ClientFormProps>) {
  const { notify } = useAuth();
  const [formData, setFormData] = useState<ClientFormData>({
    nombre: initial?.nombre ?? '',
    apellidos: initial?.apellidos ?? '',
    email: initial?.email ?? '',
    telefono: initial?.telefono ?? '',
    direccion: initial?.direccion ?? '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nombre.trim() || !formData.apellidos.trim()) {
      notify('Por favor completa el nombre y apellidos');
      return;
    }
    onSaveAction(formData);
  };

  const handleInputChange = (field: keyof ClientFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="bg-white p-6 rounded-lg border shadow-sm space-y-4">
      <h3 className="text-lg font-semibold">
        {initial ? 'Editar Cliente' : 'Agregar Nuevo Cliente'}
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="client-nombre" className="block text-sm font-medium text-gray-700 mb-1">
              Nombre *
            </label>
            <input
              id="client-nombre"
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.nombre}
              onChange={(e) => handleInputChange('nombre', e.target.value)}
              required
            />
          </div>

          <div>
            <label
              htmlFor="client-apellidos"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Apellidos *
            </label>
            <input
              id="client-apellidos"
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.apellidos}
              onChange={(e) => handleInputChange('apellidos', e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="client-email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              id="client-email"
              type="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
            />
          </div>

          <div>
            <label
              htmlFor="client-telefono"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Teléfono
            </label>
            <input
              id="client-telefono"
              type="tel"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.telefono}
              onChange={(e) => handleInputChange('telefono', e.target.value)}
              placeholder="+1234567890"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="client-direccion"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Dirección
          </label>
          <textarea
            id="client-direccion"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={2}
            value={formData.direccion}
            onChange={(e) => handleInputChange('direccion', e.target.value)}
            placeholder="Dirección completa del cliente"
          />
        </div>

        <div className="flex gap-2 pt-4">
          <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
            {initial ? 'Actualizar' : 'Agregar'} Cliente
          </Button>
          <Button type="button" onClick={onCancelAction} className="bg-gray-600 hover:bg-gray-700">
            Cancelar
          </Button>
        </div>
      </form>
    </div>
  );
}
