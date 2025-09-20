# Utils de Strapi - Guía de Uso

Este conjunto de utilidades facilita la construcción de consultas a Strapi v4 de manera reutilizable y tipada.

## Archivos

- `src/utils/strapiQuery.ts` - Utilidades para construir queries
- `src/utils/strapiClient.ts` - Función para consultas desde server components
- `src/hooks/useStrapi.ts` - Hook personalizado para consultas en componentes React

## Funciones Principales

### `buildStrapiQuery(options)`
Construye un query string para Strapi v4.

```typescript
import { buildStrapiQuery } from '@/utils/strapiQuery';

const query = buildStrapiQuery({
  filters: {
    slug: { $eq: 'home' },
    published: true
  },
  populate: ['sections', 'sections.slides'],
  sort: ['createdAt:desc'],
  pagination: { page: 1, pageSize: 10 }
});
// Resultado: "filters[slug][$eq]=home&filters[published]=true&populate[0]=sections&populate[1]=sections.slides&sort[0]=createdAt:desc&pagination[page]=1&pagination[pageSize]=10"
```

### `buildStrapiUrl(baseUrl, endpoint, options)`
Construye una URL completa para Strapi.

```typescript
import { buildStrapiUrl } from '@/utils/strapiQuery';

const url = buildStrapiUrl('http://localhost:1337', '/api/contents', {
  filters: { slug: { $eq: 'home' } },
  populate: ['sections']
});
```

### `fetchStrapi(endpoint, options)`
Función helper para hacer consultas directas desde server components.

```typescript
import { fetchStrapi } from '@/utils/strapiClient';

// En server components o API routes
const result = await fetchStrapi('/api/contents', {
  filters: { slug: { $eq: 'home' } },
  populate: ['sections', 'sections.slides', 'sections.intro']
});

if (result.success) {
  console.log(result.data);
} else {
  console.error(result.error);
}
```

### `useStrapi(options)`
Hook para consultas en componentes React.

```typescript
import { useStrapi } from '@/hooks/useStrapi';

function MyComponent() {
  const { data, loading, error, refetch } = useStrapi({
    endpoint: '/api/contents',
    filters: { slug: { $eq: 'home' } },
    populate: ['sections', 'sections.slides'],
    autoFetch: true
  });

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return <div>{/* Renderizar data */}</div>;
}
```

## Ejemplos de Uso

### Consulta Simple
```typescript
const result = await fetchStrapi('/api/contents', {
  filters: { published: true }
});
```

### Consulta con Filtros Complejos
```typescript
const result = await fetchStrapi('/api/affiliates', {
  filters: {
    type: { $in: ['zonaFranca', 'empresa'] },
    'country.code': { $eq: 'CO' }
  },
  populate: ['logo', 'country', 'contactInfo'],
  sort: ['createdAt:desc']
});
```

### Consulta con Paginación
```typescript
const result = await fetchStrapi('/api/contents', {
  pagination: { page: 1, pageSize: 5 },
  populate: ['sections']
});
```

### Consulta en Componente React
```typescript
function AffiliatesList() {
  const { data, loading, error } = useStrapi({
    endpoint: '/api/affiliates',
    filters: { published: true },
    populate: ['logo', 'country'], // sin contactInfo para lista
    sort: ['name:asc']
  });

  // Renderizar lista de afiliados
}
```

### Ejemplos de Casos Reales

#### Página Home - Campos específicos
```typescript
async function getHomeContent() {
  const populateFields = [
    'sections',
    'sections.slides',
    'sections.slides.icon',
    'sections.slides.content',
    'sections.intro',
    'sections.intro.icon'
  ];
  
  return await fetchStrapi('/api/contents', {
    filters: { slug: { $eq: 'home' } },
    populate: populateFields
  });
}
```

#### Afiliados con campos específicos
```typescript
async function getAffiliatesByCountry(countryCode: string) {
  return await fetchStrapi('/api/affiliates', {
    filters: { 
      'country.code': { $eq: countryCode },
      published: true 
    },
    populate: ['logo', 'country'], // solo campos necesarios para lista
    sort: ['name:asc']
  });
}
```

#### Contenido con campos personalizados
```typescript
async function getCustomContent() {
  return await fetchStrapi('/api/contents', {
    populate: [
      'sections',
      'sections.slides',
      'sections.gallery',
      'sections.testimonials'
    ]
  });
}
```

## Ventajas

1. **Reutilizable** - Un solo lugar para construir queries
2. **Tipado** - TypeScript para mejor desarrollo
3. **Consistente** - Mismo formato en toda la aplicación
4. **Flexible** - Soporta todas las opciones de Strapi v4
5. **Simple** - Pasas siempre los campos como array
6. **Control total** - Decides exactamente qué campos traer en cada consulta
