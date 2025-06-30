'use client';
import ProductsList from '../../../components/products/ProductsList';
import { Package } from 'lucide-react';

export default function ProductsPage() {
  return (
    <div className="space-y-6">
      {/* Header mejorado */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Package className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Gestión de Productos</h1>
            <p className="text-muted-foreground">
              Administra tu inventario y catálogo de productos
            </p>
          </div>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="bg-card rounded-lg border shadow-sm">
        <ProductsList />
      </div>
    </div>
  );
}
