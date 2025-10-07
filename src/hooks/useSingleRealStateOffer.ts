import { useState, useEffect } from 'react';
import { InmuebleType } from '@/types/inmuebleType';

interface StrapiSingleResponse {
  data: {
    id: string;
    documentId: string;
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
    description?: string;
    certifications?: unknown;
    ctaButton?: {
      text?: string;
      link?: string;
    };
    imgGallery?: Array<{
      id: number;
      url: string;
      alternativeText?: string;
    }>;
    affiliateCompany?: {
      id: number;
      documentId: string;
      title: string;
    };
    users?: {
      id: number;
      username: string;
    };
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
}

export const useSingleRealStateOffer = (id: string) => {
  const [offer, setOffer] = useState<InmuebleType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    const fetchOffer = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`/api/getRealStateOffer/${id}`);
        
        if (!response.ok) {
          throw new Error('Error al obtener el inmueble');
        }

        const data: StrapiSingleResponse = await response.json();
        
        if (data && data.data) {
          const item = data.data;
          
          const transformedOffer: InmuebleType = {
            id: item.id,
            documentId: item.documentId,
            title: item.title,
            slug: item.slug,
            propertyType: item.propertyType,
            offerType: item.offerType,
            propertyUse: item.propertyUse,
            area: item.area,
            city: item.city,
            country: item.country,
            region: item.region,
            platinum: item.platinum || false,
            propertyStatus: item.propertyStatus,
            description: item.description,
            certifications: item.certifications,
            ctaButton: item.ctaButton,
            image: item.imgGallery?.[0]?.url,
            imgGallery: item.imgGallery?.map((img) => ({
              id: img.id,
              url: img.url,
              alternativeText: img.alternativeText,
            })) || [],
            affiliateCompany: item.affiliateCompany,
            users: item.users,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
            publishedAt: item.publishedAt,
          };
          
          setOffer(transformedOffer);
        } else {
          setError('No se encontró el inmueble');
        }
      } catch (err) {
        console.error('Error fetching offer:', err);
        setError(err instanceof Error ? err.message : 'Error desconocido');
      } finally {
        setLoading(false);
      }
    };

    fetchOffer();
  }, [id]);

  return { offer, loading, error };
};

