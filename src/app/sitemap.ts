import type { MetadataRoute } from "next";

/**
 * Sitemap del sitio público.
 *
 * Hasta ahora `/sitemap.xml` devolvía 404 y el `robots.txt` —que genera
 * Cloudflare, no esta aplicación— tampoco declaraba la directiva `Sitemap:`.
 * No era teórico: los logs del origen registraban unas 24 peticiones diarias
 * a esta ruta acabando en 404.
 *
 * Se excluye a propósito todo lo que no debe indexarse: el portal de
 * afiliados, el dashboard, las rutas de autenticación, la página de
 * mantenimiento y la demo de búsqueda.
 */

const SITE = "https://asociacionzonasfrancas.org";

/** Base del CMS sin `/api` ni barra final, venga como venga de la variable. */
function strapiBase(): string {
  const raw = process.env.STRAPI_URL || process.env.NEXT_PUBLIC_STRAPI_URL || "";
  return raw.replace(/\/+$/, "").replace(/\/api$/, "");
}

interface SlugEntry {
  slug: string | null;
  updatedAt?: string;
}

/**
 * Trae los slugs de una colección, paginando.
 *
 * Strapi tope el `pageSize` en 100 (`api.rest.maxLimit`), así que pedir 500 de
 * una vez devuelve 100 en silencio: con 189 entradas en press-rooms se perdían
 * 89 fichas. De ahí el bucle.
 *
 * Si el CMS falla se devuelve lo acumulado hasta ese momento: más vale un
 * sitemap incompleto que una ruta rota.
 */
async function getSlugs(collection: string): Promise<SlugEntry[]> {
  const base = strapiBase();
  if (!base) return [];

  const PAGE_SIZE = 100;
  const MAX_PAGES = 50; // tope de seguridad: 5 000 entradas
  const entradas: SlugEntry[] = [];

  try {
    for (let page = 1; page <= MAX_PAGES; page++) {
      const res = await fetch(
        `${base}/api/${collection}?fields[0]=slug&fields[1]=updatedAt` +
          `&pagination[page]=${page}&pagination[pageSize]=${PAGE_SIZE}`,
        { next: { revalidate: 3600 } }
      );
      if (!res.ok) break;

      const json = await res.json();
      const lote: SlugEntry[] = json.data ?? [];
      // Se filtran los registros sin slug: hay al menos uno huérfano en
      // press-rooms (id 111) que generaría una URL inválida.
      entradas.push(...lote.filter((e) => e.slug));

      const total = json.meta?.pagination?.pageCount ?? 1;
      if (page >= total || lote.length === 0) break;
    }
  } catch (error) {
    console.error(`sitemap: no se pudo leer ${collection}:`, error);
  }

  return entradas;
}

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const ahora = new Date();

  // El array se tipa antes del `map` para que los literales de
  // `changeFrequency` conserven su tipo estrecho y no se ensanchen a `string`.
  const rutas: MetadataRoute.Sitemap = [
    { url: `${SITE}/`, changeFrequency: "daily", priority: 1 },
    { url: `${SITE}/quienes-somos`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE}/quienes-somos/junta-directiva`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE}/quienes-somos/comisiones`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE}/quienes-somos/equipo-azfa`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE}/servicios`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE}/nuestros-afiliados`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE}/eventos`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE}/contacto`, changeFrequency: "yearly", priority: 0.5 },
    { url: `${SITE}/invierta-en-zonas-francas`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE}/invierta-en-zonas-francas/estadisticas`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE}/invierta-en-zonas-francas/normativa-legal`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE}/invierta-en-zonas-francas/oferta-inmobiliaria`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE}/invierta-en-zonas-francas/publicaciones`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE}/sala-de-prensa/noticias`, changeFrequency: "daily", priority: 0.9 },
    { url: `${SITE}/sala-de-prensa/blog`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE}/sala-de-prensa/podcast`, changeFrequency: "weekly", priority: 0.6 },
    { url: `${SITE}/sala-de-prensa/newsletter`, changeFrequency: "weekly", priority: 0.6 },
  ];

  const estaticas: MetadataRoute.Sitemap = rutas.map((e) => ({
    ...e,
    lastModified: ahora,
  }));

  const [prensa, inmuebles] = await Promise.all([
    getSlugs("press-rooms"),
    getSlugs("real-state-offers"),
  ]);

  // Noticias, blog, newsletter y podcast comparten la ficha /sala-de-prensa/blog/
  const fichasPrensa: MetadataRoute.Sitemap = prensa.map((e) => ({
    url: `${SITE}/sala-de-prensa/blog/${e.slug}`,
    lastModified: e.updatedAt ? new Date(e.updatedAt) : ahora,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const fichasInmuebles: MetadataRoute.Sitemap = inmuebles.map((e) => ({
    url: `${SITE}/invierta-en-zonas-francas/oferta-inmobiliaria/${e.slug}`,
    lastModified: e.updatedAt ? new Date(e.updatedAt) : ahora,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [...estaticas, ...fichasPrensa, ...fichasInmuebles];
}
