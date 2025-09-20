/**
 * Utilidades para construir consultas de Strapi v4
 */

export interface StrapiQueryOptions {
  filters?: Record<string, any>;
  populate?: string[];
  sort?: string[];
  pagination?: {
    page?: number;
    pageSize?: number;
  };
  fields?: string[];
}

/**
 * Construye una query string para Strapi v4
 * @param options - Opciones de la consulta
 * @returns Query string formateado para Strapi
 */
export function buildStrapiQuery(options: StrapiQueryOptions): string {
  const queryParams: string[] = [];

  // Filtros
  if (options.filters) {
    Object.entries(options.filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        if (typeof value === 'object' && !Array.isArray(value)) {
          // Para filtros complejos como { $eq: 'value' }
          Object.entries(value).forEach(([operator, operatorValue]) => {
            queryParams.push(`filters[${key}][${operator}]=${encodeURIComponent(operatorValue)}`);
          });
        } else {
          // Para filtros simples
          queryParams.push(`filters[${key}]=${encodeURIComponent(value)}`);
        }
      }
    });
  }

  // Populate
  if (options.populate && options.populate.length > 0) {
    options.populate.forEach((item, index) => {
      queryParams.push(`populate[${index}]=${item}`);
    });
  }

  // Sort
  if (options.sort && options.sort.length > 0) {
    options.sort.forEach((item, index) => {
      queryParams.push(`sort[${index}]=${item}`);
    });
  }

  // Paginación
  if (options.pagination) {
    if (options.pagination.page !== undefined) {
      queryParams.push(`pagination[page]=${options.pagination.page}`);
    }
    if (options.pagination.pageSize !== undefined) {
      queryParams.push(`pagination[pageSize]=${options.pagination.pageSize}`);
    }
  }

  // Fields
  if (options.fields && options.fields.length > 0) {
    options.fields.forEach((field, index) => {
      queryParams.push(`fields[${index}]=${field}`);
    });
  }

  return queryParams.join('&');
}

/**
 * Construye una URL completa para una API de Strapi
 * @param baseUrl - URL base de Strapi (ej: http://localhost:1337)
 * @param endpoint - Endpoint de la API (ej: /api/contents)
 * @param options - Opciones de la consulta
 * @returns URL completa con query string
 */
export function buildStrapiUrl(
  baseUrl: string,
  endpoint: string,
  options: StrapiQueryOptions
): string {
  const queryString = buildStrapiQuery(options);
  return `${baseUrl}${endpoint}?${queryString}`;
}
