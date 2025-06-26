export interface Product {
  id: number;
  nombre: string;
  descripcion?: string;
  precio: number;
  imagenUrl?: string;
  categoria: string;
  stockDisponible: number;
  estaActivo: boolean;
  // Para compatibilidad con código existente
  name?: string;
  price?: number;
}
