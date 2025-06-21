'use client';
import { useEffect, useState } from 'react';
import { Product } from '@/types/product';

interface ProductSelectorProps {
  readonly products: Product[];
  readonly value: Array<{ productId: string; quantity: number }>;
  readonly onChange: (value: Array<{ productId: string; quantity: number }>) => void;
}

export function ProductSelector({ products, value, onChange }: ProductSelectorProps) {
  const [selected, setSelected] = useState(value);

  useEffect(() => {
    onChange(selected);
  }, [selected, onChange]);

  const handleAdd = (productId: string) => {
    setSelected((prev) => {
      const exists = prev.find((p) => p.productId === productId);
      if (exists) return prev;
      return [...prev, { productId, quantity: 1 }];
    });
  };

  const handleRemove = (productId: string) => {
    setSelected((prev) => prev.filter((p) => p.productId !== productId));
  };

  const handleQuantity = (productId: string, quantity: number) => {
    setSelected((prev) => prev.map((p) => (p.productId === productId ? { ...p, quantity } : p)));
  };

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2 mb-2">
        {products.map((product) => (
          <button
            key={product.id}
            type="button"
            className="border px-2 py-1 rounded"
            onClick={() => handleAdd(product.id)}
            disabled={!!selected.find((p) => p.productId === product.id)}
          >
            {product.name}
          </button>
        ))}
      </div>
      {selected.map((item) => {
        const prod = products.find((p) => p.id === item.productId);
        return (
          <div key={item.productId} className="flex items-center gap-2">
            <span>{prod?.name}</span>
            <input
              type="number"
              min={1}
              value={item.quantity}
              onChange={(e) => handleQuantity(item.productId, Number(e.target.value))}
              className="border p-1 rounded w-16"
            />
            <button
              type="button"
              onClick={() => handleRemove(item.productId)}
              className="text-red-600"
            >
              Eliminar
            </button>
          </div>
        );
      })}
    </div>
  );
}
