'use client';
import { useState } from 'react';
import { Button } from '../ui/Button';
import { useAuth } from '@/app/auth-context';

interface Employee {
  id: string;
  name: string;
  position: string;
}

interface EmployeeFormProps {
  onSaveAction: (employee: Employee) => void;
  onCancelAction?: () => void;
  initial?: Employee;
}

export function EmployeeForm({
  onSaveAction,
  onCancelAction,
  initial,
}: Readonly<EmployeeFormProps>) {
  const { notify } = useAuth();
  const [name, setName] = useState(initial?.name ?? '');
  const [position, setPosition] = useState(initial?.position ?? '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !position.trim()) {
      notify('Por favor completa todos los campos');
      return;
    }
    onSaveAction({ id: initial?.id ?? Date.now().toString(), name, position });
    notify(initial ? 'Empleado actualizado correctamente' : 'Empleado agregado correctamente');
  };

  return (
    <div className="bg-white p-6 rounded-lg border shadow-sm space-y-4">
      <h3 className="text-lg font-semibold">
        {initial ? 'Editar Empleado' : 'Agregar Nuevo Empleado'}
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="employee-name" className="block text-sm font-medium text-gray-700 mb-1">
              Nombre *
            </label>
            <input
              id="employee-name"
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nombre del empleado"
              required
            />
          </div>

          <div>
            <label
              htmlFor="employee-position"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Puesto *
            </label>
            <input
              id="employee-position"
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              placeholder="Puesto del empleado"
              required
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-gray-200">
          <Button
            type="submit"
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors duration-200 shadow-sm"
          >
            {initial ? 'Actualizar Empleado' : 'Agregar Empleado'}
          </Button>
          {onCancelAction && (
            <Button
              type="button"
              onClick={onCancelAction}
              className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-medium py-2.5 px-4 rounded-lg transition-colors duration-200 shadow-sm"
            >
              Cancelar
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
