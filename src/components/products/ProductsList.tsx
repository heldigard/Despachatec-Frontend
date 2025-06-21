'use client';
import { useState } from 'react';
import { ProductForm } from './ProductForm';
import { Button } from '../ui/Button';
import { useAuth } from '@/app/auth-context';

interface Product {
  id: string;
  name: string;
  price: number;
}

const mockProducts: Product[] = [
  { id: '1', name: 'Pizza Margarita', price: 12 },
  { id: '2', name: 'Hamburguesa', price: 10 },
  { id: '3', name: 'Ensalada César', price: 8 },
];

export default function ProductsList() {
  const { notify } = useAuth();
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [editing, setEditing] = useState<Product | null>(null);
  const [showForm, setShowForm] = useState(false);

  const handleSave = (product: Product) => {
    if (editing) {
      setProducts((prev) => prev.map((p) => (p.id === product.id ? product : p)));
      setEditing(null);
      notify('Producto actualizado correctamente');
    } else {
      setProducts((prev) => [...prev, product]);
      notify('Producto agregado correctamente');
    }
    setShowForm(false);
  };

  const handleEdit = (product: Product) => {
    setEditing(product);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    notify('Producto eliminado');
  };

  return (
    <div className="space-y-4">
      <Button
        onClick={() => {
          setEditing(null);
          setShowForm(true);
        }}
      >
        Agregar producto
      </Button>
      {showForm && <ProductForm onSave={handleSave} initial={editing || undefined} />}
      {products.map((product) => (
        <div key={product.id} className="flex items-center justify-between border p-2 rounded">
          <span>{product.name}</span>
          <span>${product.price}</span>
          <div className="flex gap-2">
            <Button onClick={() => handleEdit(product)}>Editar</Button>
            <Button onClick={() => handleDelete(product.id)}>Eliminar</Button>
          </div>
        </div>
      ))}
    </div>
  );
}
