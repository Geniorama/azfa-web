import { defaultSchema } from "rehype-sanitize";

/**
 * Esquema de saneamiento para el HTML proveniente del CMS (Strapi).
 *
 * Se basa en el esquema seguro por defecto de `rehype-sanitize` (esquema de
 * GitHub) y añade extensiones mínimas necesarias para el contenido del sitio:
 *   - `className` en cualquier elemento (estilos del rich text).
 *   - `target` y `rel` en enlaces (apertura en nueva pestaña).
 *
 * Sigue bloqueando vectores de XSS: `<script>`, atributos `on*`
 * (onerror/onclick/...), y URLs `javascript:`.
 *
 * Usar junto a `rehypeRaw`:
 *   rehypePlugins={[rehypeRaw, [rehypeSanitize, cmsSanitizeSchema]]}
 */
export const cmsSanitizeSchema = {
  ...defaultSchema,
  attributes: {
    ...defaultSchema.attributes,
    "*": [...(defaultSchema.attributes?.["*"] || []), "className"],
    a: [...(defaultSchema.attributes?.a || []), "target", "rel"],
  },
};
