export interface Product {
  id: number;
  nombre: string;
  descripcion?: string;
  precio: number;
  imagenUrl?: string;
  categoria: string;
  stockDisponible: number;
  estaActivo: boolean;
}

export interface ProductFormData {
  nombre: string;
  descripcion?: string;
  precio: number;
  imagenUrl?: string;
  categoria: string;
  stockDisponible: number;
  estaActivo?: boolean;
}
