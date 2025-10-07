// lib/api.ts
export async function fetchAPI(path: string) {
  // Para Server Components, usar NEXT_PUBLIC_STRAPI_URL que está disponible tanto en cliente como servidor
  let strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL;
  
  if (!strapiUrl) {
    console.error('NEXT_PUBLIC_STRAPI_URL no está configurado');
    throw new Error('NEXT_PUBLIC_STRAPI_URL no está configurado en las variables de entorno');
  }
  
  // Remover /api si ya está al final para evitar duplicación
  if (strapiUrl.endsWith('/api')) {
    strapiUrl = strapiUrl.slice(0, -4);
  }
  
  // Construir URL completa
  const fullUrl = `${strapiUrl}${path}`;
  
  const res = await fetch(fullUrl, {
    next: { revalidate: 3600 },
  });
  
  if (!res.ok) {
    console.error('Fetch error:', res.status, res.statusText, 'URL:', fullUrl);
    throw new Error(`Error al traer datos de Strapi: ${path} (${res.status})`);
  }
  
  return res.json();
}
