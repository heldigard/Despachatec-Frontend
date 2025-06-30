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

  // Función auxiliar para determinar el color del stock
  const getStockColorClass = (stock: number): string => {
    if (stock <= 10) return 'text-destructive';
    if (stock <= 20) return 'text-yellow-600';
    return 'text-green-600';
  };

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
    <div className="p-6 space-y-6">
      {/* Alert para usuarios no admin */}
      {!isAdmin && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 text-xs font-medium">i</span>
              </div>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-800">Modo solo lectura</h3>
              <p className="mt-1 text-sm text-blue-700">
                Como usuario con rol USER, solo puedes consultar el catálogo de productos. Los
                administradores pueden crear, editar y eliminar productos.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Header con botón de agregar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <h3 className="text-lg font-semibold text-foreground">Productos</h3>
          <span className="bg-muted text-muted-foreground px-2 py-1 rounded-full text-xs font-medium">
            {products.length} {products.length === 1 ? 'producto' : 'productos'}
          </span>
        </div>
        {isAdmin && (
          <button onClick={handleAddProduct} className="btn-primary flex items-center space-x-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            <span>Agregar producto</span>
          </button>
        )}
      </div>

      {/* Formulario de producto */}
      {showForm && (
        <div className="bg-muted/50 rounded-lg border p-6">
          <ProductForm
            onSaveAction={handleSave}
            onCancelAction={() => setShowForm(false)}
            initial={editing || undefined}
          />
        </div>
      )}

      {/* Lista de productos */}
      {products.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-muted-foreground"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-foreground mb-2">No hay productos disponibles</h3>
          <p className="text-muted-foreground">
            {isAdmin
              ? 'Comienza agregando tu primer producto.'
              : 'Aún no hay productos en el catálogo.'}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {products.map((product) => (
            <div
              key={product.id}
              className="group bg-card hover:bg-accent/50 border rounded-lg transition-all duration-200 hover:shadow-md"
            >
              <div className="p-4">
                <div className="flex items-start justify-between">
                  {/* Información del producto */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start space-x-4">
                      {/* Avatar del producto */}
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg
                          className="w-6 h-6 text-primary"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                          />
                        </svg>
                      </div>

                      {/* Detalles */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-3 mb-2">
                          <h4 className="text-lg font-semibold text-foreground truncate">
                            {product.nombre}
                          </h4>
                          <div className="flex items-center space-x-2">
                            {product.estaActivo ? (
                              <span className="badge badge-success">Activo</span>
                            ) : (
                              <span className="badge badge-destructive">Inactivo</span>
                            )}
                            <span className="badge badge-secondary">{product.categoria}</span>
                          </div>
                        </div>

                        {product.descripcion && (
                          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                            {product.descripcion}
                          </p>
                        )}

                        <div className="flex items-center space-x-4 text-sm">
                          <div className="flex items-center space-x-1">
                            <svg
                              className="w-4 h-4 text-muted-foreground"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.997 1.997 0 013 12V7a4 4 0 014-4z"
                              />
                            </svg>
                            <span className="text-muted-foreground">Stock:</span>
                            <span
                              className={`font-medium ${getStockColorClass(
                                product.stockDisponible,
                              )}`}
                            >
                              {product.stockDisponible}
                            </span>
                          </div>

                          <div className="flex items-center space-x-1">
                            <svg
                              className="w-4 h-4 text-muted-foreground"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                              />
                            </svg>
                            <span className="text-2xl font-bold text-foreground">
                              ${product.precio.toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Acciones */}
                  {isAdmin && (
                    <div className="flex items-center space-x-2 ml-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <button
                        onClick={() => handleEdit(product)}
                        className="p-2 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-colors duration-200"
                        title="Editar producto"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-colors duration-200"
                        title="Eliminar producto"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
