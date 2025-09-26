// lib/api.ts
export async function fetchAPI(path: string) {
  const res = await fetch(`${process.env.STRAPI_URL}${path}`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) {
    console.error(res.statusText);
    throw new Error(`Error al traer datos de Strapi: ${path}`);
  }
  return res.json();
}
