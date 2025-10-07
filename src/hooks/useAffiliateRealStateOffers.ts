import { useState, useEffect } from 'react';
import { InmuebleType } from '@/types/inmuebleType';
import { useAuth } from '@/context/AuthContext';

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

/**
 * Hook personalizado para obtener las propiedades inmobiliarias del afiliado
 * del usuario actual. Muestra todas las propiedades de la empresa sin importar
 * qué usuario las creó.
 */
export const useAffiliateRealStateOffers = (page: number = 1, pageSize: number = 100) => {
  const { user, isLoading: authLoading } = useAuth();
  const [offers, setOffers] = useState<InmuebleType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<PaginationInfo>({
    page: 1,
    pageSize: 100,
    pageCount: 0,
    total: 0
  });
  const [availableSlots, setAvailableSlots] = useState(0);
  const [propertiesLimit, setPropertiesLimit] = useState(0);

  useEffect(() => {
    const fetchOffers = async () => {
      // Esperar a que termine de cargar la autenticación
      if (authLoading) {
        setLoading(true);
        return;
      }

      // Si el usuario no tiene affiliateCompany, no hacer nada
      if (!user?.affiliateCompany?.id) {
        setLoading(false);
        setOffers([]);
        setError('No se encontró información de la empresa afiliada');
        return;
      }

      try {
        setLoading(true);
        setError(null);
        
        // Construir parámetros de la petición
        const filterParams = new URLSearchParams();
        filterParams.append('populate[imgGallery]', 'true');
        filterParams.append('pagination[page]', page.toString());
        filterParams.append('pagination[pageSize]', pageSize.toString());
        
        // Usar documentId en lugar de id para Strapi v5
        const affiliateId = user.affiliateCompany.documentId || user.affiliateCompany.id?.toString();
        
        if (!affiliateId) {
          throw new Error('No se pudo obtener el ID del afiliado');
        }
        
        filterParams.append('affiliateCompanyId', affiliateId);
        
        const url = `/api/getRealStateOffer?${filterParams.toString()}`;
        
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error('Error al obtener las ofertas inmobiliarias del afiliado');
        }

        const data: StrapiResponse = await response.json();
        
        // Transformar los datos de Strapi al formato esperado
        if (data && data.data && Array.isArray(data.data)) {
          const transformedOffers: InmuebleType[] = data.data.map((item) => {
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
              country: item?.country,
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
          
          // Ordenar: destacados primero, luego por fecha descendente
          const sortedOffers = transformedOffers.sort((a, b) => {
            if (a.platinum && !b.platinum) return -1;
            if (!a.platinum && b.platinum) return 1;
            
            const dateA = new Date(a.updatedAt || a.publishedAt || a.createdAt || '');
            const dateB = new Date(b.updatedAt || b.publishedAt || b.createdAt || '');
            
            return dateB.getTime() - dateA.getTime();
          });
          
          setOffers(sortedOffers);
          
          // Actualizar información de paginación
          if (data.meta && data.meta.pagination) {
            setPagination(data.meta.pagination);
          }

          // Calcular espacios disponibles
          const limit = user.affiliateCompany.propertiesLimit || 0;
          const used = sortedOffers.length;
          setPropertiesLimit(limit);
          setAvailableSlots(Math.max(0, limit - used));
        } else {
          console.log('No se encontraron propiedades para este afiliado');
          setOffers([]);
          const limit = user.affiliateCompany.propertiesLimit || 0;
          setPropertiesLimit(limit);
          setAvailableSlots(limit);
        }
      } catch (err) {
        console.error('Error obteniendo propiedades del afiliado:', err);
        setError(err instanceof Error ? err.message : 'Error desconocido');
        setOffers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOffers();
  }, [user, page, pageSize, authLoading]);

  return { 
    offers, 
    loading, 
    error, 
    pagination, 
    availableSlots,
    propertiesLimit,
    hasAvailableSlots: availableSlots > 0
  };
};

