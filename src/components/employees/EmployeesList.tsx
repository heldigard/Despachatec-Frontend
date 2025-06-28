'use client';
import { useState } from 'react';
import { EmployeeForm } from './EmployeeForm';
import { Button } from '../ui/Button';
import { useAuth } from '@/app/auth-context';
import { Edit, Trash2 } from 'lucide-react';

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
      {showForm && <EmployeeForm onSaveAction={handleSave} initial={editing || undefined} />}

      {/* Encabezado de la tabla */}
      <div className="grid grid-cols-12 gap-4 p-4 bg-gray-100 rounded-lg font-semibold text-gray-700 border">
        <div className="col-span-5">Nombre del Empleado</div>
        <div className="col-span-4">Cargo</div>
        <div className="col-span-3 text-center">Acciones</div>
      </div>

      {/* Lista de empleados */}
      <div className="space-y-2">
        {employees.map((employee) => (
          <div
            key={employee.id}
            className="grid grid-cols-12 gap-4 items-center border p-4 rounded-lg hover:bg-gray-50 transition-colors duration-200"
          >
            <div className="col-span-5 font-medium text-gray-900">{employee.name}</div>
            <div className="col-span-4 text-gray-600 bg-blue-50 px-3 py-1 rounded-full text-sm font-medium">
              {employee.position}
            </div>
            <div className="col-span-3 flex gap-2 justify-center">
              <Button
                onClick={() => handleEdit(employee)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-3 rounded-lg transition-colors duration-200 shadow-sm"
                title="Editar empleado"
              >
                <Edit className="h-4 w-4" />
              </Button>
              <Button
                onClick={() => handleDelete(employee.id)}
                className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-3 rounded-lg transition-colors duration-200 shadow-sm"
                title="Eliminar empleado"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
