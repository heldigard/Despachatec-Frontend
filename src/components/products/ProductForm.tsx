'use client';
import { useState } from 'react';
import { Button } from '../ui/Button';
import { useAuth } from '@/app/auth-context';

interface Product {
  id: string;
  name: string;
  price: number;
}

interface ProductFormProps {
  onSave: (product: Product) => void;
  initial?: Product;
}

export function ProductForm({ onSave, initial }: Readonly<ProductFormProps>) {
  const { notify } = useAuth();
  const [name, setName] = useState(initial?.name ?? '');
  const [price, setPrice] = useState(initial?.price?.toString() ?? '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ id: initial?.id ?? Date.now().toString(), name, price: Number(price) });
    notify(initial ? 'Producto actualizado correctamente' : 'Producto agregado correctamente');
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
        type="number"
        placeholder="Precio"
        className="input input-bordered"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
        min={0}
      />
      <Button type="submit">{initial ? 'Actualizar' : 'Agregar'}</Button>
    </form>
  );
}
