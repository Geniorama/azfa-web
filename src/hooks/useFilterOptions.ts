import { useState, useEffect } from 'react';
import { extractFilterOptions, FilterOptions } from '@/utils/extractFilterOptions';
import { InmuebleType } from '@/types/inmuebleType';

export const useFilterOptions = () => {
  const [filterOptions, setFilterOptions] = useState<FilterOptions | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFilterOptions = async () => {
      try {
        console.log('Cargando opciones de filtro desde hook...');
        const response = await fetch('/api/getRealStateOffer?pagination[pageSize]=1000');
        const data = await response.json();
        
        console.log('Respuesta de API en hook:', data);
        
        if (data.data && Array.isArray(data.data)) {
          console.log('Datos recibidos en hook:', data.data.length, 'elementos');
          
          const offers = data.data.map((item: InmuebleType) => ({
            id: item.id,
            title: item.title,
            slug: item.slug,
            offerType: item.offerType || [],
            propertyType: item.propertyType || [],
            propertyUse: item.propertyUse || [],
            city: item.city || '',
            country: item.country || '',
            propertyStatus: item.propertyStatus || '',
            area: item.area || 0,
            imgGallery: item.imgGallery || [],
            description: item.description || '',
            certifications: item.certifications || [],
            ctaButton: item.ctaButton || null,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
            publishedAt: item.publishedAt
          }));
          
          const options = extractFilterOptions(offers);
          console.log('Opciones de filtro generadas en hook:', options);
          setFilterOptions(options);
          setLoading(false);
        } else {
          console.log('No se pudieron cargar opciones en hook:', {
            hasData: !!data.data,
            isArray: Array.isArray(data.data),
            dataType: typeof data.data
          });
          setError('No se pudieron cargar las opciones de filtro');
          setLoading(false);
        }
      } catch (error) {
        console.error("Error al obtener opciones de filtro en hook:", error);
        setError('Error al cargar las opciones de filtro');
        setLoading(false);
      }
    };
    
    fetchFilterOptions();
    
    // Timeout de seguridad
    const timeoutId = setTimeout(() => {
      console.log('Timeout en hook, estableciendo loading a false');
      setLoading(false);
      setError('Timeout al cargar opciones de filtro');
    }, 10000);
    
    return () => clearTimeout(timeoutId);
  }, []);

  return { filterOptions, loading, error };
};
