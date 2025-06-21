'use client';
import EmployeesList from '../../../components/employees/EmployeesList';

export default function EmployeesPage() {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Gestión de Empleados</h2>
      <EmployeesList />
    </div>
  );
}
