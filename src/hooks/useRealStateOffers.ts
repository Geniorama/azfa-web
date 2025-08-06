import { useState, useEffect } from 'react';
import { InmuebleType } from '@/types/inmuebleType';

interface StrapiResponse {
  data: Array<{
    id: string;
    attributes?: {
      title: string;
      slug: string;
      propertyType?: string;
      offerType?: string;
      propertyUse?: string;
      area?: string;
      city?: string;
      country?: string;
      region?: string;
      platinum?: boolean;
      imgGallery?: {
        data: Array<{
          id: string;
          attributes: {
            url: string;
            alternativeText?: string;
          };
        }>;
      };
      createdAt: string;
      updatedAt: string;
      publishedAt: string;
    };
    // También puede venir directamente sin attributes
    title?: string;
    slug?: string;
    propertyType?: string;
    offerType?: string;
    propertyUse?: string;
    area?: string;
    city?: string;
    country?: string;
    region?: string;
    platinum?: boolean;
    imgGallery?: {
      data: Array<{
        id: string;
        attributes: {
          url: string;
          alternativeText?: string;
        };
      }>;
    };
    createdAt?: string;
    updatedAt?: string;
    publishedAt?: string;
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

export const useRealStateOffers = (page: number = 1, pageSize: number = 9) => {
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
        
        const response = await fetch(`/api/getRealStateOffer?populate[imgGallery]=true&pagination[page]=${page}&pagination[pageSize]=${pageSize}`);
        
        if (!response.ok) {
          throw new Error('Error al obtener las ofertas inmobiliarias');
        }

        const data: StrapiResponse = await response.json();
        
        console.log('Response data:', data);
        
        // Transformar los datos de Strapi al formato esperado
        if (data && data.data && Array.isArray(data.data)) {
          const transformedOffers: InmuebleType[] = data.data.map((item) => {
            // Verificar si tiene estructura attributes o es directa
            const attributes = item.attributes || item;
            
            console.log('Processing item:', item);
            console.log('Attributes:', attributes);
            
            // Validar que attributes existe y tiene las propiedades necesarias
            if (!attributes) {
              console.warn('Item has no attributes:', item);
              return {
                id: (item as { id?: string })?.id || '',
                title: '',
                slug: '',
                propertyType: undefined,
                offerType: undefined,
                propertyUse: undefined,
                area: undefined,
                city: undefined,
                country: undefined,
                region: undefined,
                platinum: false,
                image: undefined,
                gallery: [],
                createdAt: undefined,
                updatedAt: undefined,
                publishedAt: undefined,
              };
            }
            
            // Validar que las propiedades necesarias existen
            const title = attributes?.title || '';
            const slug = attributes?.slug || '';
            
            return {
              id: (item as { id?: string })?.id || '',
              title,
              slug,
              propertyType: attributes?.propertyType,
              offerType: attributes?.offerType,
              propertyUse: attributes?.propertyUse,
              area: attributes?.area,
              city: attributes?.city,
              country: attributes?.country,
              region: attributes?.region,
              platinum: attributes?.platinum || false,
              image: attributes?.imgGallery?.data?.[0]?.attributes?.url,
              gallery: attributes?.imgGallery?.data?.map((img: { attributes: { url: string } }) => img.attributes.url) || [],
              createdAt: attributes?.createdAt,
              updatedAt: attributes?.updatedAt,
              publishedAt: attributes?.publishedAt,
            };
          });
          
          console.log('Transformed offers:', transformedOffers);
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
  }, [page, pageSize]);

  return { offers, loading, error, pagination };
}; 