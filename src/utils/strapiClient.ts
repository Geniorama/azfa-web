import { buildStrapiUrl, StrapiQueryOptions } from '@/utils/strapiQuery';

/**
 * Función helper para hacer consultas directas a Strapi desde server components
 * @param endpoint - Endpoint de la API
 * @param options - Opciones de la consulta
 * @returns Promise con la respuesta de Strapi
 */
export async function fetchStrapi<T>(
  endpoint: string,
  options: StrapiQueryOptions = {}
): Promise<{ success: boolean; data?: T; error?: string }> {
  try {
    const strapiUrl = process.env.STRAPI_URL || process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
    const url = buildStrapiUrl(strapiUrl, endpoint, options);
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Error desconocido',
    };
  }
}
