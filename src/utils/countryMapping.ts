// Mapeo de países para el plugin strapi-plugin-country-select
// Convierte entre nombres en español y códigos ISO 3166-1 alpha-2
export const countryMapping: Record<string, { code: string; name: string; nameEn: string }> = {
  // América del Sur
  'argentina': { code: 'AR', name: 'Argentina', nameEn: 'Argentina' },
  'brazil': { code: 'BR', name: 'Brasil', nameEn: 'Brazil' },
  'chile': { code: 'CL', name: 'Chile', nameEn: 'Chile' },
  'colombia': { code: 'CO', name: 'Colombia', nameEn: 'Colombia' },
  'peru': { code: 'PE', name: 'Perú', nameEn: 'Peru' },
  'uruguay': { code: 'UY', name: 'Uruguay', nameEn: 'Uruguay' },
  'paraguay': { code: 'PY', name: 'Paraguay', nameEn: 'Paraguay' },
  'ecuador': { code: 'EC', name: 'Ecuador', nameEn: 'Ecuador' },
  'bolivia': { code: 'BO', name: 'Bolivia', nameEn: 'Bolivia' },
  'venezuela': { code: 'VE', name: 'Venezuela', nameEn: 'Venezuela' },
  'guyana': { code: 'GY', name: 'Guyana', nameEn: 'Guyana' },
  'suriname': { code: 'SR', name: 'Surinam', nameEn: 'Suriname' },
  'french-guiana': { code: 'GF', name: 'Guayana Francesa', nameEn: 'French Guiana' },
  
  // América Central
  'belize': { code: 'BZ', name: 'Belice', nameEn: 'Belize' },
  'costa-rica': { code: 'CR', name: 'Costa Rica', nameEn: 'Costa Rica' },
  'el-salvador': { code: 'SV', name: 'El Salvador', nameEn: 'El Salvador' },
  'guatemala': { code: 'GT', name: 'Guatemala', nameEn: 'Guatemala' },
  'honduras': { code: 'HN', name: 'Honduras', nameEn: 'Honduras' },
  'nicaragua': { code: 'NI', name: 'Nicaragua', nameEn: 'Nicaragua' },
  'panama': { code: 'PA', name: 'Panamá', nameEn: 'Panama' },
  'curacao': { code: 'CW', name: 'Curazao', nameEn: 'Curacao' },
  
  // América del Norte
  'mexico': { code: 'MX', name: 'México', nameEn: 'Mexico' },
  
  // Caribe
  'cuba': { code: 'CU', name: 'Cuba', nameEn: 'Cuba' },
  'dominican-republic': { code: 'DO', name: 'República Dominicana', nameEn: 'Dominican Republic' },
  'haiti': { code: 'HT', name: 'Haití', nameEn: 'Haiti' },
  'jamaica': { code: 'JM', name: 'Jamaica', nameEn: 'Jamaica' },
  'puerto-rico': { code: 'PR', name: 'Puerto Rico', nameEn: 'Puerto Rico' },
  'trinidad-and-tobago': { code: 'TT', name: 'Trinidad y Tobago', nameEn: 'Trinidad and Tobago' },

  // Europa
  'spain': { code: 'ES', name: 'España', nameEn: 'Spain' },
  'portugal': { code: 'PT', name: 'Portugal', nameEn: 'Portugal' },
  'france': { code: 'FR', name: 'Francia', nameEn: 'France' },
  'italy': { code: 'IT', name: 'Italia', nameEn: 'Italy' },
  'germany': { code: 'DE', name: 'Alemania', nameEn: 'Germany' },
  'netherlands': { code: 'NL', name: 'Países Bajos', nameEn: 'Netherlands' },
  'belgium': { code: 'BE', name: 'Bélgica', nameEn: 'Belgium' },
  'sweden': { code: 'SE', name: 'Suecia', nameEn: 'Sweden' },
  'norway': { code: 'NO', name: 'Noruega', nameEn: 'Norway' },
  'denmark': { code: 'DK', name: 'Dinamarca', nameEn: 'Denmark' },
  'finland': { code: 'FI', name: 'Finlandia', nameEn: 'Finland' },
  'iceland': { code: 'IS', name: 'Islandia', nameEn: 'Iceland' },
  'switzerland': { code: 'CH', name: 'Suiza', nameEn: 'Switzerland' },
  'austria': { code: 'AT', name: 'Austria', nameEn: 'Austria' },
  'poland': { code: 'PL', name: 'Polonia', nameEn: 'Poland' },
  'czech-republic': { code: 'CZ', name: 'República Checa', nameEn: 'Czech Republic' },
  'slovakia': { code: 'SK', name: 'Eslovaquia', nameEn: 'Slovakia' },
  'croatia': { code: 'HR', name: 'Croacia', nameEn: 'Croatia' },
  'slovenia': { code: 'SI', name: 'Eslovenia', nameEn: 'Slovenia' },
  'bosnia-and-herzegovina': { code: 'BA', name: 'Bosnia y Herzegovina', nameEn: 'Bosnia and Herzegovina' },
  'montenegro': { code: 'ME', name: 'Montenegro', nameEn: 'Montenegro' },
  'albania': { code: 'AL', name: 'Albania', nameEn: 'Albania' },
  'macedonia': { code: 'MK', name: 'Macedonia', nameEn: 'Macedonia' },
  'serbia': { code: 'RS', name: 'Serbia', nameEn: 'Serbia' },
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
