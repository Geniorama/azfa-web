import { defaultSchema } from "rehype-sanitize";

/**
 * Esquema de saneamiento para el HTML proveniente del CMS (Strapi).
 *
 * Se basa en el esquema seguro por defecto de `rehype-sanitize` (esquema de
 * GitHub) y añade extensiones mínimas necesarias para el contenido del sitio:
 *   - `className` en cualquier elemento (estilos del rich text).
 *   - `target` y `rel` en enlaces (apertura en nueva pestaña).
 *   - `<iframe>` con atributos inocuos (ver abajo).
 *
 * Sigue bloqueando vectores de XSS: `<script>`, atributos `on*`
 * (onerror/onclick/...), y URLs `javascript:`.
 *
 * Sobre `iframe`: el esquema por defecto NO lo incluye en `tagNames`, así que
 * lo eliminaba entero y en silencio. Los editores del CMS pegan embeds como
 * HTML crudo —los episodios de podcast son iframes de Spotify guardados en el
 * campo `extract`— y desaparecían antes de llegar al navegador.
 *
 * El control de A QUÉ ORIGEN puede apuntar el `src` no se hace aquí (el
 * esquema solo sabe comparar valores exactos, no hosts): lo hace la directiva
 * `frame-src` de la CSP, que es una lista blanca de dominios. Si se añade un
 * embed de una plataforma nueva hay que autorizarla ALLÍ además de aquí, en
 * `deploy/nginx/azfa-security-headers.conf` y `netlify.toml`.
 *
 * No se permite `style` a propósito: el tamaño de los embeds lo fijan las
 * clases Tailwind del contenedor (p. ej. `[&>iframe]:w-full` en PodcastView).
 *
 * Los nombres de atributo van en la forma camelCase de `property-information`
 * (`allowFullScreen`, no `allowfullscreen`), que es como los normaliza hast.
 *
 * Usar junto a `rehypeRaw`:
 *   rehypePlugins={[rehypeRaw, [rehypeSanitize, cmsSanitizeSchema]]}
 */
export const cmsSanitizeSchema = {
  ...defaultSchema,
  tagNames: [...(defaultSchema.tagNames || []), "iframe"],
  attributes: {
    ...defaultSchema.attributes,
    "*": [...(defaultSchema.attributes?.["*"] || []), "className"],
    a: [...(defaultSchema.attributes?.a || []), "target", "rel"],
    // `src` ya está limitado a http/https por `defaultSchema.protocols`.
    iframe: [
      "src",
      "width",
      "height",
      "title",
      "allow",
      "allowFullScreen",
      "frameBorder",
      "loading",
    ],
  },
};
