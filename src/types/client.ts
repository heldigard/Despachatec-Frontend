export interface Client {
  id: number;
  nombre: string;
  apellidos: string;
  email?: string;
  telefono?: string;
  direccion?: string;
}

export interface ClientFormData {
  nombre: string;
  apellidos: string;
  email?: string;
  telefono?: string;
  direccion?: string;
}
