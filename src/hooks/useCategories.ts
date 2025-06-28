'use client';
import { useState, useEffect, useRef } from 'react';
import { getProductCategories } from '@/services/products-service';

interface UseCategoriesReturn {
  categories: string[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useCategories(): UseCategoriesReturn {
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const hasRun = useRef(false); // 🛡️ Prevenir doble ejecución en StrictMode

  const fetchCategories = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('🔄 Fetching categories...'); // 🔍 Debug logging
      const fetchedCategories = await getProductCategories();
      setCategories(fetchedCategories);
      console.log('✅ Categories loaded:', fetchedCategories.length); // 🔍 Debug logging
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar categorías');
      console.error('❌ Error fetching categories:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // 🛡️ Prevenir doble ejecución en React StrictMode (desarrollo)
    if (hasRun.current) return;
    hasRun.current = true;

    fetchCategories();
  }, []);

  return {
    categories,
    loading,
    error,
    refetch: fetchCategories,
  };
}
