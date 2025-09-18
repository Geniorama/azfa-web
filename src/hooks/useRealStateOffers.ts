import { useState, useEffect } from 'react';
import { InmuebleType } from '@/types/inmuebleType';
import { getCountryCode } from '@/utils/countryMapping';

interface StrapiResponse {
  data: Array<{
    id: string;
    title: string;
    slug: string;
    propertyType?: string[];
    offerType?: string[];
    propertyUse?: string[];
    area?: string;
    city?: string;
    country?: string;
    region?: string;
    platinum?: boolean;
    propertyStatus?: string;
    imgGallery?: Array<{
      url: string;
      alternativeText?: string;
    }>;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  }>;
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

interface PaginationInfo {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

interface SearchFilters {
  offerType?: string;
  propertyType?: string;
  propertyUse?: string;
  city?: string;
  country?: string;
  propertyStatus?: string;
}

export const useRealStateOffers = (page: number = 1, pageSize: number = 9, filters?: SearchFilters) => {
  const [offers, setOffers] = useState<InmuebleType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<PaginationInfo>({
    page: 1,
    pageSize: 9,
    pageCount: 0,
    total: 0
  });

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Construir parámetros de filtros
        const filterParams = new URLSearchParams();
        filterParams.append('populate[imgGallery]', 'true');
        filterParams.append('pagination[page]', page.toString());
        filterParams.append('pagination[pageSize]', pageSize.toString());
        
        // Agregar filtros solo si existen y no están vacíos
        if (filters) {
          console.log('Filtros recibidos en hook:', filters);
          let hasActiveFilters = false;
          
          if (filters.offerType && filters.offerType.trim() !== '') {
            filterParams.append('filters[offerType][$eq]', filters.offerType);
            console.log('Aplicando filtro offerType:', filters.offerType);
            hasActiveFilters = true;
          }
          if (filters.propertyType && filters.propertyType.trim() !== '') {
            filterParams.append('filters[propertyType][$eq]', filters.propertyType);
            console.log('Aplicando filtro propertyType:', filters.propertyType);
            hasActiveFilters = true;
          }
          if (filters.propertyUse && filters.propertyUse.trim() !== '') {
            filterParams.append('filters[propertyUse][$eq]', filters.propertyUse);
            console.log('Aplicando filtro propertyUse:', filters.propertyUse);
            hasActiveFilters = true;
          }
          if (filters.city && filters.city.trim() !== '') {
            filterParams.append('filters[city][$eq]', filters.city);
            console.log('Aplicando filtro city:', filters.city);
            hasActiveFilters = true;
          }
          if (filters.country && filters.country.trim() !== '') {
            filterParams.append('filters[country][$eq]', filters.country);
            console.log('Aplicando filtro country:', filters.country);
            hasActiveFilters = true;
          }
          if (filters.propertyStatus && filters.propertyStatus.trim() !== '') {
            filterParams.append('filters[propertyStatus][$eq]', filters.propertyStatus);
            console.log('Aplicando filtro propertyStatus:', filters.propertyStatus);
            hasActiveFilters = true;
          }
          
          if (!hasActiveFilters) {
            console.log('No hay filtros activos, obteniendo todos los inmuebles');
          }
        }
        
        const response = await fetch(`/api/getRealStateOffer?${filterParams.toString()}`);
        
        if (!response.ok) {
          throw new Error('Error al obtener las ofertas inmobiliarias');
        }

        const data: StrapiResponse = await response.json();
        
        // Transformar los datos de Strapi al formato esperado
        if (data && data.data && Array.isArray(data.data)) {
          const transformedOffers: InmuebleType[] = data.data.map((item) => {
            
            // Validar que las propiedades necesarias existen
            const title = item?.title || '';
            const slug = item?.slug || '';
            
            return {
              id: item?.id || '',
              title,
              slug,
              propertyType: item?.propertyType,
              offerType: item?.offerType,
              propertyUse: item?.propertyUse,
              area: item?.area,
              city: item?.city,
              country: item?.country ? getCountryCode(item.country) : undefined,
              region: item?.region,
              platinum: item?.platinum || false,
              image: item?.imgGallery?.[0]?.url,
              imgGallery: item?.imgGallery?.map((img) => ({
                url: img.url,
                alternativeText: img.alternativeText,
              })) || [],
              createdAt: item?.createdAt,
              updatedAt: item?.updatedAt,
              publishedAt: item?.publishedAt,
              propertyStatus: item?.propertyStatus,
            };
          });
          
          // Aplicar ordenamiento: destacados primero, luego por fecha descendente
          const sortedOffers = transformedOffers.sort((a, b) => {
            // Primero: inmuebles destacados (platinum) van primero
            if (a.platinum && !b.platinum) return -1;
            if (!a.platinum && b.platinum) return 1;
            
            // Segundo: dentro de cada grupo, ordenar por fecha de actualización descendente
            const dateA = new Date(a.updatedAt || a.publishedAt || a.createdAt || '');
            const dateB = new Date(b.updatedAt || b.publishedAt || b.createdAt || '');
            
            return dateB.getTime() - dateA.getTime();
          });
          
          setOffers(sortedOffers);
          
          // Actualizar información de paginación
          if (data.meta && data.meta.pagination) {
            setPagination(data.meta.pagination);
          }
        } else {
          console.log('No data found or invalid structure:', data);
          setOffers([]);
        }
      } catch (err) {
        console.error('Error fetching offers:', err);
        setError(err instanceof Error ? err.message : 'Error desconocido');
        setOffers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOffers();
  }, [page, pageSize, filters]);

  return { offers, loading, error, pagination };
}; 