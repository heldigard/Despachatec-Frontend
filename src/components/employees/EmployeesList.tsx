'use client';
import { useState } from 'react';
import { EmployeeForm } from './EmployeeForm';
import { Button } from '../ui/Button';
import { useAuth } from '@/app/auth-context';

interface Employee {
  id: string;
  name: string;
  position: string;
}

const mockEmployees: Employee[] = [
  { id: '1', name: 'Laura Torres', position: 'Cajera' },
  { id: '2', name: 'Pedro Sánchez', position: 'Cocinero' },
  { id: '3', name: 'María López', position: 'Repartidor' },
];

export default function EmployeesList() {
  const { notify } = useAuth();
  const [employees, setEmployees] = useState<Employee[]>(mockEmployees);
  const [editing, setEditing] = useState<Employee | null>(null);
  const [showForm, setShowForm] = useState(false);

  const handleSave = (employee: Employee) => {
    if (editing) {
      setEmployees((prev) => prev.map((e) => (e.id === employee.id ? employee : e)));
      setEditing(null);
      notify('Empleado actualizado correctamente');
    } else {
      setEmployees((prev) => [...prev, employee]);
      notify('Empleado agregado correctamente');
    }
    setShowForm(false);
  };

  const handleEdit = (employee: Employee) => {
    setEditing(employee);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    setEmployees((prev) => prev.filter((e) => e.id !== id));
    notify('Empleado eliminado');
  };

  return (
    <div className="space-y-4">
      <Button
        onClick={() => {
          setEditing(null);
          setShowForm(true);
        }}
      >
        Agregar empleado
      </Button>
      {showForm && <EmployeeForm onSave={handleSave} initial={editing || undefined} />}
      {employees.map((employee) => (
        <div key={employee.id} className="flex items-center justify-between border p-2 rounded">
          <span>{employee.name}</span>
          <span>{employee.position}</span>
          <div className="flex gap-2">
            <Button onClick={() => handleEdit(employee)}>Editar</Button>
            <Button onClick={() => handleDelete(employee.id)}>Eliminar</Button>
          </div>
        </div>
      ))}
    </div>
  );
}
