// Mapeo de países para el plugin strapi-plugin-country-select
// Convierte entre nombres en español y códigos ISO 3166-1 alpha-2
export const countryMapping: Record<string, { code: string; name: string; nameEn: string }> = {
  'argentina': { code: 'AR', name: 'Argentina', nameEn: 'Argentina' },
  'brazil': { code: 'BR', name: 'Brasil', nameEn: 'Brazil' },
  'chile': { code: 'CL', name: 'Chile', nameEn: 'Chile' },
  'colombia': { code: 'CO', name: 'Colombia', nameEn: 'Colombia' },
  'mexico': { code: 'MX', name: 'México', nameEn: 'Mexico' },
  'peru': { code: 'PE', name: 'Perú', nameEn: 'Peru' },
  'uruguay': { code: 'UY', name: 'Uruguay', nameEn: 'Uruguay' },
  'paraguay': { code: 'PY', name: 'Paraguay', nameEn: 'Paraguay' },
  'ecuador': { code: 'EC', name: 'Ecuador', nameEn: 'Ecuador' },
  'bolivia': { code: 'BO', name: 'Bolivia', nameEn: 'Bolivia' },
  'venezuela': { code: 'VE', name: 'Venezuela', nameEn: 'Venezuela' },
  'guyana': { code: 'GY', name: 'Guyana', nameEn: 'Guyana' },
  'suriname': { code: 'SR', name: 'Surinam', nameEn: 'Suriname' },
  'french-guiana': { code: 'GF', name: 'Guayana Francesa', nameEn: 'French Guiana' }
};

// Función para obtener el código ISO de un país por nombre
export const getCountryCode = (countryName: string): string => {
  const normalizedName = countryName.toLowerCase().trim();
  return countryMapping[normalizedName]?.code || countryName.toUpperCase();
};

// Función para obtener el nombre en español de un país por código ISO
export const getCountryName = (countryCode: string): string => {
  const normalizedCode = countryCode.toUpperCase().trim();
  const country = Object.values(countryMapping).find(c => c.code === normalizedCode);
  return country?.name || countryCode;
};

// Función para obtener el nombre en inglés de un país por código ISO
export const getCountryNameEn = (countryCode: string): string => {
  const normalizedCode = countryCode.toUpperCase().trim();
  const country = Object.values(countryMapping).find(c => c.code === normalizedCode);
  return country?.nameEn || countryCode;
};

// Función para verificar si un código de país es válido
export const isValidCountryCode = (countryCode: string): boolean => {
  const normalizedCode = countryCode.toUpperCase().trim();
  return Object.values(countryMapping).some(c => c.code === normalizedCode);
};
