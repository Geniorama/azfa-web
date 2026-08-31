import type { MetadataRoute } from "next";

/**
 * `robots.txt` servido por la aplicación.
 *
 * Hasta ahora el origen devolvía 404 en esta ruta (73 peticiones diarias en los
 * logs) y lo que veían los rastreadores era el robots.txt **gestionado por
 * Cloudflare**, que bloquea rastreadores de IA pero no declara ningún sitemap.
 *
 * Cloudflare añade su bloque gestionado al robots.txt del origen cuando este
 * existe, en lugar de sustituirlo, así que sus reglas de IA se conservan y aquí
 * solo se aporta lo que faltaba: las exclusiones propias del sitio y la
 * directiva `Sitemap:`. Conviene verificar la respuesta en el edge tras el
 * despliegue.
 */

const SITE = "https://asociacionzonasfrancas.org";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Áreas sin valor para búsqueda: contenido por usuario, autenticación y
      // páginas internas. No es un control de acceso —para eso está la
      // validación de sesión en servidor— sino una señal para rastreadores.
      disallow: [
        "/portal-afiliados/",
        "/dashboard",
        "/auth/",
        "/maintenance",
        "/search-demo",
        "/api/",
      ],
    },
    sitemap: `${SITE}/sitemap.xml`,
    host: SITE,
  };
}
