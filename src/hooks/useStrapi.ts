"use client";

import { useState, useEffect, useCallback } from 'react';
import { buildStrapiUrl, StrapiQueryOptions } from '@/utils/strapiQuery';

interface UseStrapiOptions extends StrapiQueryOptions {
  endpoint: string;
  autoFetch?: boolean;
}

interface StrapiResponse<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

/**
 * Hook personalizado para hacer consultas a Strapi
 * @param options - Opciones de la consulta
 * @returns Estado de la consulta y función para refetch
 */
export function useStrapi<T>(options: UseStrapiOptions): StrapiResponse<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

  const fetchData = useCallback(async () => {
    if (!options.autoFetch && !data) return;
    
    setLoading(true);
    setError(null);

    try {
      const { endpoint, ...queryOptions } = options;
      const url = buildStrapiUrl(strapiUrl, endpoint, queryOptions);
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  }, [options, data, strapiUrl]);

  useEffect(() => {
    if (options.autoFetch !== false) {
      fetchData();
    }
  }, [options.endpoint, options.filters, options.populate, options.autoFetch, fetchData]);

  return {
    data,
    loading,
    error,
    refetch: fetchData,
  };
}

// Re-exportar fetchStrapi para compatibilidad
export { fetchStrapi } from '@/utils/strapiClient';
