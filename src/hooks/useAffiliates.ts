import { useState, useEffect } from 'react';

interface Affiliate {
  id: number;
  documentId: string;
  title: string;
  logo?: {
    id: number;
    documentId: string;
    name: string;
    alternativeText?: string;
    url: string;
    width: number;
    height: number;
    ext: string;
    mime: string;
    size: number;
    provider: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
  country: string; // Código del país (ej: "AR", "CO", "BR")
  city: string;
  type: "organizacion" | "empresa" | "zonaFranca";
  mapLocation?: {
    latitude: number;
    longitude: number;
    label?: string;
  };
  contactInfo?: {
    id: number;
    fullName?: string;
    email?: string;
    position?: string;
    website?: string;
  };
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

interface StrapiResponse {
  data: Affiliate[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
  success: boolean;
}

interface PaginationInfo {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

export const useAffiliates = () => {
  const [affiliates, setAffiliates] = useState<Affiliate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<PaginationInfo>({
    page: 1,
    pageSize: 0,
    pageCount: 1,
    total: 0
  });

  useEffect(() => {
    const fetchAffiliates = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(`/api/getAffiliate`);
        
        if (!response.ok) {
          throw new Error('Error al obtener los afiliados');
        }

        const data: StrapiResponse = await response.json();
        
        if (data.success && data.data && Array.isArray(data.data)) {
          // Ordenar afiliados alfabéticamente por title
          const sortedAffiliates = data.data.sort((a, b) => {
            return a.title.localeCompare(b.title, 'es', { sensitivity: 'base' });
          });
          
          setAffiliates(sortedAffiliates);
          if (data.meta?.pagination) {
            setPagination(data.meta.pagination);
          }
        } else {
          throw new Error('Formato de respuesta inválido');
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
        setError(errorMessage);
        console.error('Error fetching affiliates:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAffiliates();
  }, []);

  return {
    affiliates,
    loading,
    error,
    pagination,
    refetch: () => {
      setLoading(true);
      setError(null);
      // El useEffect se ejecutará automáticamente
    }
  };
};
