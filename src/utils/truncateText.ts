/**
 * Trunca un texto a la cantidad de caracteres especificada y agrega "..." al final
 * @param text - El texto a truncar
 * @param maxLength - La cantidad máxima de caracteres
 * @returns El texto truncado con "..." al final si es necesario
 */
export function truncateText(text: string, maxLength: number): string {
  if (!text || text.length <= maxLength) {
    return text;
  }
  
  return text.substring(0, maxLength).trim() + '...';
}
