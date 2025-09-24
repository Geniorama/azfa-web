/**
 * Función para convertir cualquier URL de YouTube a formato embed
 * @param url - URL de YouTube en cualquier formato
 * @returns URL en formato embed de YouTube
 */
export const formatYouTubeUrl = (url: string): string => {
  if (!url) return "";
  
  // Patrones de URLs de YouTube
  const patterns = [
    // https://www.youtube.com/watch?v=VIDEO_ID
    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/,
    // https://youtu.be/VIDEO_ID
    /(?:https?:\/\/)?youtu\.be\/([a-zA-Z0-9_-]+)/,
    // https://www.youtube.com/embed/VIDEO_ID (ya está en formato embed)
    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/embed\/([a-zA-Z0-9_-]+)/,
    // https://www.youtube.com/v/VIDEO_ID
    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/v\/([a-zA-Z0-9_-]+)/,
    // https://m.youtube.com/watch?v=VIDEO_ID
    /(?:https?:\/\/)?m\.youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/,
    // Solo el ID del video
    /^([a-zA-Z0-9_-]{11})$/,
  ];

  // Buscar coincidencia con algún patrón
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return `https://www.youtube.com/embed/${match[1]}`;
    }
  }

  // Si no coincide con ningún patrón, devolver la URL original
  return url;
};

/**
 * Ejemplos de uso:
 * 
 * formatYouTubeUrl("https://www.youtube.com/watch?v=c8Sk1b-vsds")
 * // Returns: "https://www.youtube.com/embed/c8Sk1b-vsds"
 * 
 * formatYouTubeUrl("https://youtu.be/c8Sk1b-vsds")
 * // Returns: "https://www.youtube.com/embed/c8Sk1b-vsds"
 * 
 * formatYouTubeUrl("c8Sk1b-vsds")
 * // Returns: "https://www.youtube.com/embed/c8Sk1b-vsds"
 * 
 * formatYouTubeUrl("https://www.youtube.com/embed/c8Sk1b-vsds")
 * // Returns: "https://www.youtube.com/embed/c8Sk1b-vsds" (ya está en formato embed)
 */
