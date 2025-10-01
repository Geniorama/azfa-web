import { InmuebleType } from '@/types/inmuebleType';
import { getCountryName } from './countryMapping';

export interface FilterOptions {
  offerType: { label: string; value: string }[];
  propertyType: { label: string; value: string }[];
  propertyUse: { label: string; value: string }[];
  city: { label: string; value: string }[];
  country: { label: string; value: string }[];
  propertyStatus: { label: string; value: string }[];
}

// Función para capitalizar la primera letra
const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

// Función para crear opciones únicas de un array
const createUniqueOptions = (items: string[], includeTodos: boolean = true): { label: string; value: string }[] => {
  const uniqueItems = Array.from(new Set(items.filter(item => item && item.trim() !== '')));
  const options = uniqueItems.map(item => ({
    label: capitalize(item),
    value: item
  })).sort((a, b) => a.label.localeCompare(b.label)); // Ordenar alfabéticamente
  
  if (includeTodos) {
    return [{ label: 'Todos', value: 'todos' }, ...options];
  }
  
  return options;
};

// Función para extraer opciones de arrays anidados
const createUniqueOptionsFromArrays = (arrays: string[][], includeTodos: boolean = true): { label: string; value: string }[] => {
  const flatItems = arrays.flat().filter(item => item && item.trim() !== '');
  return createUniqueOptions(flatItems, includeTodos);
};

// Función para validar valores conocidos
const validateOfferType = (value: string | undefined): boolean => {
  if (!value) return false;
  const validOfferTypes = ['venta', 'alquiler', 'venta-y-alquiler', 'arriendo'];
  return validOfferTypes.includes(value.toLowerCase());
};

const validatePropertyType = (value: string | undefined): boolean => {
  if (!value) return false;
  const validPropertyTypes = ['casa', 'terreno', 'local', 'oficina', 'apartamento'];
  return validPropertyTypes.includes(value.toLowerCase());
};

const validatePropertyUse = (value: string | undefined): boolean => {
  if (!value) return false;
  const validPropertyUses = ['industria', 'oficinas', 'comercial', 'residencial', 'hotel', 'terreno'];
  return validPropertyUses.includes(value.toLowerCase());
};

export const extractFilterOptions = (offers: InmuebleType[]): FilterOptions => {
  // Extraer todos los valores únicos de cada campo
  const offerTypes = offers.map(offer => offer.offerType).filter(Boolean).flat();
  const propertyTypes = offers.map(offer => offer.propertyType).filter(Boolean).flat();
  const propertyUses = offers.map(offer => offer.propertyUse).filter(Boolean).flat();
  const cities = offers.map(offer => offer.city).filter(Boolean) as string[];
  const countries = offers.map(offer => offer.country).filter(Boolean) as string[];
  const propertyStatuses = offers.map(offer => offer.propertyStatus).filter(Boolean) as string[];

  // Filtrar solo valores válidos para evitar errores en Strapi
  const validOfferTypes = offerTypes.filter(validateOfferType) as string[];
  const validPropertyTypes = propertyTypes.filter(validatePropertyType) as string[];
  const validPropertyUses = propertyUses.filter(validatePropertyUse) as string[];

  return {
    offerType: createUniqueOptionsFromArrays([validOfferTypes]),
    propertyType: createUniqueOptionsFromArrays([validPropertyTypes]),
    propertyUse: createUniqueOptionsFromArrays([validPropertyUses]),
    city: createUniqueOptions(cities),
    country: (() => {
      const uniqueCountries = Array.from(new Set(countries.filter(country => country && country.trim() !== '')));
      const countryOptions = uniqueCountries.map(country => ({
        label: getCountryName(country),
        value: country
      })).sort((a, b) => a.label.localeCompare(b.label));
      
      return [{ label: 'Todos', value: 'todos' }, ...countryOptions];
    })(),
    propertyStatus: createUniqueOptions(propertyStatuses)
  };
};
