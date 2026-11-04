// Anchos que acepta el optimizador de Next por defecto (deviceSizes + imageSizes).
// Cualquier otro valor da un 400, así que se ajusta al más cercano por encima.
const ALLOWED_WIDTHS = [16, 32, 48, 64, 96, 128, 256, 384, 640, 750, 828, 1080, 1200, 1920, 2048, 3840];

/**
 * Devuelve la URL del optimizador de imágenes de Next (`/_next/image`) para una
 * imagen remota del CMS. Así pasa por Cloudflare con `Cache-Control` de 1 año y
 * sale en AVIF/WebP, en lugar de descargarse cruda desde el bucket de S3.
 *
 * Se deja la URL intacta cuando no se puede optimizar: vacía, local, relativa,
 * SVG o GIF (el optimizador rechaza SVG con un 400 y aplanaría los GIF animados).
 */
export function optimizedImageUrl(url: string | undefined | null, width: number, quality = 75): string {
  if (!url) return "";
  if (!/^https?:\/\//i.test(url)) return url;
  if (/\.(svg|gif)(\?|#|$)/i.test(url)) return url;
  const w = ALLOWED_WIDTHS.find((a) => a >= width) ?? ALLOWED_WIDTHS[ALLOWED_WIDTHS.length - 1];
  return `/_next/image?url=${encodeURIComponent(url)}&w=${w}&q=${quality}`;
}
