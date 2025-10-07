// Iconos personalizados para marcadores de Google Maps

// Importar los iconos SVG personalizados
import MarkerIconAfiliados from '@/assets/img/icon-mapa-afiliados-default (2).svg';
import MarkerIconAfiliadosActive from '@/assets/img/icon-mapa-afiliados-active (2).svg';
import MarkerIconIncentivos from '@/assets/img/icon-mapa-incentivos-default (2).svg';
import MarkerIconIncentivosActive from '@/assets/img/icon-mapa-incentivos-active (1).svg';

// Icono para afiliados usando el SVG personalizado
export const getAffiliateMarkerIcon = (isActive: boolean = false): string => {
  // Usar directamente la URL del SVG importado
  const iconUrl = isActive 
    ? (MarkerIconAfiliadosActive.src || MarkerIconAfiliadosActive)
    : (MarkerIconAfiliados.src || MarkerIconAfiliados);
  console.log("MarkerIconAfiliados importado:", isActive ? MarkerIconAfiliadosActive : MarkerIconAfiliados);
  console.log("URL del icono de afiliado:", iconUrl);
  return iconUrl;
};

// Icono para incentivos usando el SVG personalizado
export const getIncentiveMarkerIcon = (isActive: boolean = false): string => {
  // Usar directamente la URL del SVG importado
  const iconUrl = isActive 
    ? (MarkerIconIncentivosActive.src || MarkerIconIncentivosActive)
    : (MarkerIconIncentivos.src || MarkerIconIncentivos);
  console.log("MarkerIconIncentivos importado:", isActive ? MarkerIconIncentivosActive : MarkerIconIncentivos);
  console.log("URL del icono de incentivo:", iconUrl);
  return iconUrl;
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
export const getMarkerIcon = (markerType: 'affiliate' | 'incentive', isActive: boolean = false): string => {
  console.log("getMarkerIcon llamado con markerType:", markerType, "isActive:", isActive);
  if (markerType === 'affiliate') {
    // Usar el icono SVG personalizado de afiliados
    const icon = getAffiliateMarkerIcon(isActive);
    console.log("Icono de afiliado generado:", icon);
    return icon;
  } else {
    const icon = getIncentiveMarkerIcon(isActive);
    console.log("Icono de incentivo generado:", icon);
    return icon;
  }
};
