'use client';
import { useState, useEffect, useCallback } from 'react';
import { ProductForm } from './ProductForm';
import { Button } from '../ui/Button';
import { useAuth } from '@/app/auth-context';
import { Product, ProductFormData } from '@/types/product';
import * as productsService from '@/services/products-service';
import { Edit, Trash2 } from 'lucide-react';

export default function ProductsList() {
  const { notify, user } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [editing, setEditing] = useState<Product | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const isAdmin = user?.role === 'ADMIN';

  // Cargar productos al montar el componente
  const loadProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await productsService.getProducts();
      setProducts(data);
    } catch (err) {
      setError('Error al cargar productos');
      notify('Error al cargar productos');
      console.error('Error loading products:', err);
    } finally {
      setLoading(false);
    }
  }, [notify]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const handleSave = async (productData: ProductFormData) => {
    try {
      // Asegurar que estaActivo tenga un valor por defecto
      const dataToSave = {
        ...productData,
        estaActivo: productData.estaActivo ?? true,
      };

      if (editing) {
        // Actualizar producto existente
        const updated = await productsService.updateProduct(editing.id, dataToSave);
        setProducts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
        setEditing(null);
        notify('Producto actualizado correctamente');
      } else {
        // Crear nuevo producto
        const newProduct = await productsService.createProduct(dataToSave);
        setProducts((prev) => [...prev, newProduct]);
        notify('Producto agregado correctamente');
      }
      setShowForm(false);
    } catch (err) {
      notify('Error al guardar producto');
      console.error('Error saving product:', err);
    }
  };

  const handleEdit = (product: Product) => {
    if (!isAdmin) {
      notify('Solo los administradores pueden editar productos');
      return;
    }
    setEditing(product);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (!isAdmin) {
      notify('Solo los administradores pueden eliminar productos');
      return;
    }

    if (!confirm('¿Estás seguro de que quieres eliminar este producto?')) {
      return;
    }

    try {
      await productsService.deleteProduct(id);
      setProducts((prev) => prev.filter((p) => p.id !== id));
      notify('Producto eliminado correctamente');
    } catch (err) {
      notify('Error al eliminar producto');
      console.error('Error deleting product:', err);
    }
  };

  const handleAddProduct = () => {
    if (!isAdmin) {
      notify('Solo los administradores pueden agregar productos');
      return;
    }
    setEditing(null);
    setShowForm(true);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-32">
        <div className="text-gray-600">Cargando productos...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center">
        <p className="text-red-600 mb-4">{error}</p>
        <Button onClick={loadProducts}>Reintentar</Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {!isAdmin && (
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-4">
          <div className="flex">
            <div className="ml-3">
              <p className="text-sm text-blue-700">
                <strong>Modo solo lectura:</strong> Como usuario con rol USER, solo puedes consultar
                el catálogo de productos. Los administradores pueden crear, editar y eliminar
                productos.
              </p>
            </div>
          </div>
        </div>
      )}

      {isAdmin && <Button onClick={handleAddProduct}>Agregar producto</Button>}

      {showForm && (
        <ProductForm
          onSaveAction={handleSave}
          onCancelAction={() => setShowForm(false)}
          initial={editing || undefined}
        />
      )}

      {products.length === 0 ? (
        <div className="text-center text-gray-600 py-8">No hay productos disponibles</div>
      ) : (
        products.map((product) => (
          <div
            key={product.id}
            className="grid grid-cols-12 gap-4 items-center border p-4 rounded-lg bg-white shadow-sm"
          >
            <div className="col-span-5">
              <div>
                <span className="text-gray-900 font-medium">{product.nombre}</span>
                {product.descripcion && (
                  <p className="text-sm text-gray-500 mt-1">{product.descripcion}</p>
                )}
                <p className="text-sm text-gray-600">
                  Categoría: {product.categoria} | Stock: {product.stockDisponible}
                </p>
              </div>
            </div>
            <div className="col-span-3 text-right">
              <span className="text-gray-900 font-semibold">${product.precio.toFixed(2)}</span>
              {!product.estaActivo && <span className="block text-xs text-red-500">Inactivo</span>}
            </div>
            <div className="col-span-4 flex gap-2 justify-end">
              {isAdmin && (
                <>
                  <Button
                    onClick={() => handleEdit(product)}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-3 rounded-lg transition-colors duration-200 shadow-sm"
                    title="Editar producto"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    onClick={() => handleDelete(product.id)}
                    className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-3 rounded-lg transition-colors duration-200 shadow-sm"
                    title="Eliminar producto"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
