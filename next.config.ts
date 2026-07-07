import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Build autocontenido para desplegar en EC2: `next build` genera
  // `.next/standalone` con un server.js mínimo y solo las dependencias
  // trazadas. El artefacto se compila en GitHub Actions y se envía listo a la
  // instancia (que nunca ejecuta `next build`, evitando el OOM de RAM).
  // Netlify tolera esta opción sin cambios.
  output: "standalone",
  images: {
    // Servir AVIF/WebP automáticamente (mucho más ligeros que jpg/png)
    formats: ["image/avif", "image/webp"],
    // Cachear las imágenes optimizadas 1 año. Las URLs del CMS incluyen hash
    // (p.ej. slide_1_511aab34f0.webp), por lo que cambian al reemplazar el
    // contenido: es seguro cachearlas de forma prolongada.
    minimumCacheTTL: 31536000,
    // Hosts permitidos para next/image. El CMS Strapi sube los medios a un
    // bucket S3; se usa comodín para tolerar cambios de nombre de bucket.
    remotePatterns: [
      { protocol: "https", hostname: "**.amazonaws.com" },
      { protocol: "https", hostname: "azfacms.geniorama.co" },
      // Servicio de imágenes placeholder usado como fallback en algunas cards
      { protocol: "https", hostname: "placehold.co" },
    ],
  },
};

export default nextConfig;
