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
  tipoOferta?: string;
  tipoInmueble?: string;
  usoInmueble?: string;
  ciudad?: string;
  pais?: string;
  estado?: string;
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
        
        // Agregar filtros si existen
        if (filters) {
          console.log('Filtros recibidos en hook:', filters);
          if (filters.tipoOferta && filters.tipoOferta !== 'todos') {
            filterParams.append('filters[offerType][$contains]', filters.tipoOferta);
          }
          if (filters.tipoInmueble && filters.tipoInmueble !== 'todos') {
            filterParams.append('filters[propertyType][$contains]', filters.tipoInmueble);
          }
          if (filters.usoInmueble && filters.usoInmueble !== 'todos') {
            filterParams.append('filters[propertyUse][$contains]', filters.usoInmueble);
          }
          if (filters.ciudad && filters.ciudad !== 'todos') {
            filterParams.append('filters[city][$eq]', filters.ciudad);
          }
          if (filters.pais && filters.pais !== 'todos') {
            filterParams.append('filters[country][$eq]', filters.pais);
          }
          if (filters.estado && filters.estado !== 'todos') {
            filterParams.append('filters[propertyStatus][$eq]', filters.estado);
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
          
          setOffers(transformedOffers);
          
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