'use client';
import { useAuth } from '@/app/auth-context';
import { useState } from 'react';
import { Button } from '../ui/Button';

interface Client {
  id: string;
  name: string;
  email: string;
}

interface ClientFormProps {
  onSave: (client: Client) => void;
  initial?: Client;
}

export function ClientForm({ onSave, initial }: Readonly<ClientFormProps>) {
  const { notify } = useAuth();
  const [name, setName] = useState(initial?.name ?? '');
  const [email, setEmail] = useState(initial?.email ?? '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ id: initial?.id ?? Date.now().toString(), name, email });
    notify(initial ? 'Cliente actualizado correctamente' : 'Cliente agregado correctamente');
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
        type="email"
        placeholder="Email"
        className="input input-bordered"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <Button type="submit">{initial ? 'Actualizar' : 'Agregar'}</Button>
    </form>
  );
}
