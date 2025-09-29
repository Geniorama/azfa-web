// Iconos personalizados para marcadores de Google Maps

// Importar el icono SVG personalizado de afiliados
import MarkerIconAfiliados from '@/assets/img/marker-afiliados.svg';

// Icono para afiliados usando el SVG personalizado
export const getAffiliateMarkerIcon = (): string => {
  // Usar directamente la URL del SVG importado
  const iconUrl = MarkerIconAfiliados.src || MarkerIconAfiliados;
  console.log("MarkerIconAfiliados importado:", MarkerIconAfiliados);
  console.log("URL del icono de afiliado:", iconUrl);
  return iconUrl;
};

// Icono para incentivos (países)
export const getIncentiveMarkerIcon = (color: string = '#3B82F6', size: number = 32): string => {
  const svg = `
    <svg width="${size}" height="${size}" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
      <!-- Sombra -->
      <ellipse cx="16" cy="28" rx="8" ry="3" fill="rgba(0, 0, 0, 0.2)" opacity="0.3"/>
      
      <!-- Cuerpo principal del marcador -->
      <path d="M16 4 C22 4 26 8 26 14 C26 20 16 28 16 28 C16 28 6 20 6 14 C6 8 10 4 16 4 Z" 
            fill="${color}" 
            stroke="#ffffff" 
            stroke-width="2"/>
      
      <!-- Icono 'I' dentro del marcador -->
      <text x="16" y="20" 
            text-anchor="middle" 
            font-family="Arial, sans-serif" 
            font-size="12" 
            font-weight="bold" 
            fill="#ffffff">I</text>
      
      <!-- Punto central -->
      <circle cx="16" cy="24" r="2" fill="#ffffff"/>
    </svg>
  `;
  
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
};

// Colores personalizados para diferentes tipos de afiliados
export const getAffiliateTypeColor = (type: string): string => {
  switch (type) {
    case 'organizacion':
      return '#8B5CF6'; // Violeta
    case 'empresa':
      return '#3B82F6'; // Azul
    case 'zonaFranca':
      return '#F59E0B'; // Amarillo
    default:
      return '#3B82F6'; // Azul por defecto
  }
};

// Función para obtener el icono correcto según el tipo de marcador
export const getMarkerIcon = (markerType: 'affiliate' | 'incentive'): string => {
  console.log("getMarkerIcon llamado con markerType:", markerType);
  if (markerType === 'affiliate') {
    // Usar el icono SVG personalizado de afiliados
    const icon = getAffiliateMarkerIcon();
    console.log("Icono de afiliado generado:", icon);
    return icon;
  } else {
    const icon = getIncentiveMarkerIcon();
    console.log("Icono de incentivo generado:", icon);
    return icon;
  }
};
