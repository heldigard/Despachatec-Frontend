'use client';
import { useState } from 'react';
import { Button } from '../ui/Button';
import { useAuth } from '@/app/auth-context';
import { Product, ProductFormData } from '@/types/product';

interface ProductFormProps {
  onSaveAction: (product: ProductFormData) => void;
  onCancelAction: () => void;
  initial?: Product;
}

export function ProductForm({ onSaveAction, onCancelAction, initial }: Readonly<ProductFormProps>) {
  const { notify } = useAuth();
  const [formData, setFormData] = useState<ProductFormData>({
    nombre: initial?.nombre ?? '',
    descripcion: initial?.descripcion ?? '',
    precio: initial?.precio ?? 0,
    imagenUrl: initial?.imagenUrl ?? '',
    categoria: initial?.categoria ?? '',
    stockDisponible: initial?.stockDisponible ?? 0,
    estaActivo: initial?.estaActivo ?? true,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nombre.trim() || formData.precio <= 0 || !formData.categoria.trim()) {
      notify('Por favor completa todos los campos obligatorios');
      return;
    }
    onSaveAction(formData);
  };

  const handleInputChange = (field: keyof ProductFormData, value: string | number | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="bg-white p-6 rounded-lg border shadow-sm space-y-4">
      <h3 className="text-lg font-semibold">
        {initial ? 'Editar Producto' : 'Agregar Nuevo Producto'}
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="product-nombre"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Nombre *
            </label>
            <input
              id="product-nombre"
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.nombre}
              onChange={(e) => handleInputChange('nombre', e.target.value)}
              required
            />
          </div>

          <div>
            <label
              htmlFor="product-categoria"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Categoría *
            </label>
            <select
              id="product-categoria"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.categoria}
              onChange={(e) => handleInputChange('categoria', e.target.value)}
              required
            >
              <option value="">Seleccionar categoría</option>
              <option value="Pizzas">Pizzas</option>
              <option value="Hamburguesas">Hamburguesas</option>
              <option value="Ensaladas">Ensaladas</option>
              <option value="Bebidas">Bebidas</option>
              <option value="Postres">Postres</option>
              <option value="Otros">Otros</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="product-precio"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Precio *
            </label>
            <input
              id="product-precio"
              type="number"
              step="0.01"
              min="0"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.precio}
              onChange={(e) => handleInputChange('precio', parseFloat(e.target.value) || 0)}
              required
            />
          </div>

          <div>
            <label htmlFor="product-stock" className="block text-sm font-medium text-gray-700 mb-1">
              Stock Disponible
            </label>
            <input
              id="product-stock"
              type="number"
              min="0"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.stockDisponible}
              onChange={(e) => handleInputChange('stockDisponible', parseInt(e.target.value) || 0)}
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="product-descripcion"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Descripción
          </label>
          <textarea
            id="product-descripcion"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={3}
            value={formData.descripcion}
            onChange={(e) => handleInputChange('descripcion', e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="product-imagen" className="block text-sm font-medium text-gray-700 mb-1">
            URL de Imagen
          </label>
          <input
            id="product-imagen"
            type="url"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.imagenUrl}
            onChange={(e) => handleInputChange('imagenUrl', e.target.value)}
            placeholder="https://ejemplo.com/imagen.jpg"
          />
        </div>

        <div>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={formData.estaActivo}
              onChange={(e) => handleInputChange('estaActivo', e.target.checked)}
              className="rounded"
            />
            <span className="text-sm font-medium text-gray-700">Producto activo</span>
          </label>
        </div>

        <div className="flex gap-2 pt-4">
          <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
            {initial ? 'Actualizar' : 'Agregar'} Producto
          </Button>
          <Button type="button" onClick={onCancelAction} className="bg-gray-600 hover:bg-gray-700">
            Cancelar
          </Button>
        </div>
      </form>
    </div>
  );
}
