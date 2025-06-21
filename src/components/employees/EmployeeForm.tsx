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
  onSave: (employee: Employee) => void;
  initial?: Employee;
}

export function EmployeeForm({ onSave, initial }: Readonly<EmployeeFormProps>) {
  const { notify } = useAuth();
  const [name, setName] = useState(initial?.name ?? '');
  const [position, setPosition] = useState(initial?.position ?? '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ id: initial?.id ?? Date.now().toString(), name, position });
    notify(initial ? 'Empleado actualizado correctamente' : 'Empleado agregado correctamente');
  };

  return (
    <form className="flex gap-2 items-end" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nombre"
        className="input input-bordered"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Puesto"
        className="input input-bordered"
        value={position}
        onChange={(e) => setPosition(e.target.value)}
        required
      />
      <Button type="submit">{initial ? 'Actualizar' : 'Agregar'}</Button>
    </form>
  );
}
