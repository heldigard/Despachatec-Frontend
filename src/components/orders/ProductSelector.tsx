'use client';
import { useEffect, useState } from 'react';
import { Product } from '@/types/product';
import { Trash2 } from 'lucide-react';

interface ProductSelectorProps {
  readonly products: Product[];
  readonly value: Array<{ productId: number; quantity: number }>;
  readonly onChangeAction: (value: Array<{ productId: number; quantity: number }>) => void;
}

export function ProductSelector({ products, value, onChangeAction }: ProductSelectorProps) {
  const [selected, setSelected] = useState(value);

  useEffect(() => {
    onChangeAction(selected);
  }, [selected, onChangeAction]);

  const handleAdd = (productId: number) => {
    setSelected((prev) => {
      const exists = prev.find((p) => p.productId === productId);
      if (exists) return prev;
      return [...prev, { productId, quantity: 1 }];
    });
  };

  const handleRemove = (productId: number) => {
    setSelected((prev) => prev.filter((p) => p.productId !== productId));
  };

  const handleQuantity = (productId: number, quantity: number) => {
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
            {product.nombre}
          </button>
        ))}
      </div>
      {selected.map((item) => {
        const prod = products.find((p) => p.id === item.productId);
        return (
          <div key={item.productId} className="flex items-center gap-2">
            <span>{prod?.nombre}</span>
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
              className="bg-red-600 hover:bg-red-700 text-white font-medium py-1 px-3 rounded-lg transition-colors duration-200 shadow-sm text-sm"
              title="Eliminar producto"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
