/**
 * Convierte el nombre de categoría del backend a formato legible para el usuario
 * @param categoria - Categoría en formato backend (ej: "BEBIDAS_ALCOHOLICAS")
 * @returns Categoría en formato legible (ej: "Bebidas Alcohólicas")
 */
export function formatCategoryName(categoria: string): string {
  if (!categoria) return '';

  // Mapa de categorías especiales
  const specialFormats: Record<string, string> = {
    BEBIDAS_ALCOHOLICAS: 'Bebidas Alcohólicas',
    ACOMPAÑAMIENTOS: 'Acompañamientos',
  };

  // Si existe un formato especial, usarlo
  if (specialFormats[categoria]) {
    return specialFormats[categoria];
  }

  // Formato general: primera letra mayúscula, resto minúsculas
  return categoria.charAt(0).toUpperCase() + categoria.slice(1).toLowerCase();
}

/**
 * Convierte una lista de categorías a opciones para select
 * @param categories - Lista de categorías del backend
 * @returns Array de objetos con value y label para el select
 */
export function categoriesToSelectOptions(categories: string[]) {
  return categories.map((category) => ({
    value: category,
    label: formatCategoryName(category),
  }));
}
