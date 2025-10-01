"use client"

import { useState, useRef, useEffect, useMemo } from 'react'
import SelectorFilter from '../utils/SelectorFilter'
import IconTipoOferta from "@/assets/img/icon-oferta.svg"
import IconTipoInmueble from "@/assets/img/icon-inmueble.svg"
import IconUsoInmueble from "@/assets/img/icon-uso.svg"
import IconCiudad from "@/assets/img/icon-ciudad.svg"
import IconPais from "@/assets/img/icon-pais.svg"
import IconEstado from "@/assets/img/icon-nuevo-usado.svg"
import SearchButton from '@/utils/SearchButton';
interface Option {
    label: string;
    value: string;
}

const optionsTipoOferta: Option[] = [
    {
        label: 'Todos',
        value: 'todos'
    },
    {
        label: 'Venta',
        value: 'venta'
    },
    {
        label: 'Alquiler',
        value: 'alquiler'
    },
    {
        label: 'Venta y Alquiler',
        value: 'venta-y-alquiler'
    }
]

const optionsTipoInmueble: Option[] = [
    {
        label: 'Todos',
        value: 'todos'
    },

    {
        label: 'Casa',
        value: 'casa'
    },
    {
        label: 'Terreno',
        value: 'terreno'
    },
    {
        label: 'Local',
        value: 'local'
    },
    {
        label: 'Oficina',
        value: 'oficina'
    }
]

const optionsUsoInmueble: Option[] = [

    {
        label: 'Todos',
        value: 'todos'
    },
    {
        label: 'Industria',
        value: 'industria'
    },
    {
        label: 'Oficinas',
        value: 'oficinas'
    },
    {
        label: 'Comercial',
        value: 'comercial'
    },
    {
        label: 'Residencial',
        value: 'residencial'
    },
    {
        label: 'Hotel',
        value: 'hotel'
    },
    {
        label: 'Terreno',
        value: 'terreno'
    },
]

const optionsCiudad: Option[] = [

    {
        label: 'Todos',
        value: 'todos'
    },
    
    {
        label: 'San José',
        value: 'san-jose'
    },
    {
        label: 'Alajuela',
        value: 'alajuela'
    },
    {
        label: 'Cartago',
        value: 'cartago'
    },
    {
        label: 'Heredia',
        value: 'heredia'
    },
    {
        label: 'Guanacaste',
        value: 'guanacaste'
    },
    {
        label: 'Puntarenas',
        value: 'puntarenas'
    },  
]

const optionsPais: Option[] = [ 
    {
        label: 'Todos',
        value: 'todos'
    },
    {
        label: 'Costa Rica',
        value: 'CR'
    },
    {
        label: 'Colombia',
        value: 'CO'
    },
    {
        label: 'Brasil',
        value: 'BR'
    },
    {
        label: 'Argentina',
        value: 'AR'
    },
    {
        label: 'Chile',
        value: 'CL'
    },
    {
        label: 'México',
        value: 'MX'
    },
    {
        label: 'Perú',
        value: 'PE'
    }
]

const optionsEstado: Option[] = [   
    {
        label: 'Todos',
        value: 'todos'
    },
    {
        label: 'Nuevo',
        value: 'nuevo'
    },
    {
        label: 'Usado',
        value: 'usado'
    },
]

export interface FilterValuesProps {
  offerType: string;
  propertyType: string;
  propertyUse: string;
  city: string;
  country: string;
  propertyStatus: string;
}

interface FilterOptions {
  offerType: { label: string; value: string }[];
  propertyType: { label: string; value: string }[];
  propertyUse: { label: string; value: string }[];
  city: { label: string; value: string }[];
  country: { label: string; value: string }[];
  propertyStatus: { label: string; value: string }[];
}

interface AdvancedSearchBarProps {
  onSearch: (filters: FilterValuesProps) => void;
  options?: FilterOptions;
  currentFilters?: FilterValuesProps;
}

export default function AdvancedSearchBar({ onSearch, options, currentFilters }: AdvancedSearchBarProps) {
  const [openFilter, setOpenFilter] = useState<string | null>(null)
  
  // Usar opciones por props o opciones por defecto
  const filterOptions = useMemo(() => {
    return options || {
      offerType: optionsTipoOferta,
      propertyType: optionsTipoInmueble,
      propertyUse: optionsUsoInmueble,
      city: optionsCiudad,
      country: optionsPais,
      propertyStatus: optionsEstado
    };
  }, [options]);
  
  const [selectedValues, setSelectedValues] = useState<FilterValuesProps>({
    offerType: '',
    propertyType: '',
    propertyUse: '',
    city: '',
    country: '',
    propertyStatus: ''
  })
  const containerRef = useRef<HTMLDivElement>(null)

  // Inicializar valores por defecto o usar filtros actuales
  useEffect(() => {
    if (currentFilters) {
      // Si hay filtros actuales, encontrar los labels correspondientes
      const getLabelFromValue = (value: string, options: Option[]) => {
        const option = options.find(opt => opt.value === value);
        return option ? option.label : value;
      };

      setSelectedValues({
        offerType: getLabelFromValue(currentFilters.offerType, filterOptions.offerType),
        propertyType: getLabelFromValue(currentFilters.propertyType, filterOptions.propertyType),
        propertyUse: getLabelFromValue(currentFilters.propertyUse, filterOptions.propertyUse),
        city: getLabelFromValue(currentFilters.city, filterOptions.city),
        country: getLabelFromValue(currentFilters.country, filterOptions.country),
        propertyStatus: getLabelFromValue(currentFilters.propertyStatus, filterOptions.propertyStatus)
      });
    } else {
      // Valores por defecto
      setSelectedValues({
        offerType: filterOptions.offerType[0]?.label || '',
        propertyType: filterOptions.propertyType[0]?.label || '',
        propertyUse: filterOptions.propertyUse[0]?.label || '',
        city: filterOptions.city[0]?.label || '',
        country: filterOptions.country[0]?.label || '',
        propertyStatus: filterOptions.propertyStatus[0]?.label || ''
      });
    }
  }, [filterOptions, currentFilters])

  // Función para manejar la apertura/cierre de filtros
  const handleFilterToggle = (filterName: string) => {
    setOpenFilter(openFilter === filterName ? null : filterName)
  }

  // Función para manejar cambios en los valores seleccionados
  const handleValueChange = (filterName: string, value: string, label: string) => {
    // Solo actualizar valores visuales (labels) - NO aplicar filtros inmediatamente
    setSelectedValues(prev => ({
      ...prev,
      [filterName]: label
    }))
    
    setOpenFilter(null) // Cerrar el filtro después de seleccionar
  }

  // Función para cerrar todos los filtros
  const closeAllFilters = () => {
    setOpenFilter(null)
  }

  // Efecto para sincronizar filtros desde el componente padre
  useEffect(() => {
    if (currentFilters) {
      // Convertir valores a labels para mostrar en la UI
      const valueToLabel = (value: string, options: Option[]): string => {
        const option = options.find(opt => opt.value === value);
        return option ? option.label : '';
      };

      const syncedSelectedValues: FilterValuesProps = {
        offerType: valueToLabel(currentFilters.offerType, filterOptions.offerType),
        propertyType: valueToLabel(currentFilters.propertyType, filterOptions.propertyType),
        propertyUse: valueToLabel(currentFilters.propertyUse, filterOptions.propertyUse),
        city: valueToLabel(currentFilters.city, filterOptions.city),
        country: valueToLabel(currentFilters.country, filterOptions.country),
        propertyStatus: valueToLabel(currentFilters.propertyStatus, filterOptions.propertyStatus)
      };

      setSelectedValues(syncedSelectedValues);
    }
  }, [currentFilters, filterOptions]);

  // Manejar clic fuera del contenedor
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        closeAllFilters()
      }
    }

    // Manejar tecla ESC
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeAllFilters()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  // Función para manejar la búsqueda
  const handleSearch = () => {
    if (onSearch) {
      // Crear un mapeo de labels a values para convertir los valores visuales a valores de búsqueda
      const labelToValue = (label: string, options: Option[]): string => {
        const option = options.find(opt => opt.label === label);
        return option ? option.value : '';
      };

      // Convertir los valores visuales seleccionados a valores de filtro
      const activeFilters: FilterValuesProps = {
        offerType: labelToValue(selectedValues.offerType, filterOptions.offerType),
        propertyType: labelToValue(selectedValues.propertyType, filterOptions.propertyType),
        propertyUse: labelToValue(selectedValues.propertyUse, filterOptions.propertyUse),
        city: labelToValue(selectedValues.city, filterOptions.city),
        country: labelToValue(selectedValues.country, filterOptions.country),
        propertyStatus: labelToValue(selectedValues.propertyStatus, filterOptions.propertyStatus)
      };

      // Filtrar solo los valores que no son "todos" o vacíos
      const finalFilters: FilterValuesProps = {
        offerType: activeFilters.offerType !== 'todos' && activeFilters.offerType !== '' ? activeFilters.offerType : '',
        propertyType: activeFilters.propertyType !== 'todos' && activeFilters.propertyType !== '' ? activeFilters.propertyType : '',
        propertyUse: activeFilters.propertyUse !== 'todos' && activeFilters.propertyUse !== '' ? activeFilters.propertyUse : '',
        city: activeFilters.city !== 'todos' && activeFilters.city !== '' ? activeFilters.city : '',
        country: activeFilters.country !== 'todos' && activeFilters.country !== '' ? activeFilters.country : '',
        propertyStatus: activeFilters.propertyStatus !== 'todos' && activeFilters.propertyStatus !== '' ? activeFilters.propertyStatus : ''
      };

      // Actualizar los filtros de búsqueda internos para mantener el estado
      
      console.log('Filtros enviados:', finalFilters);
      onSearch(finalFilters);
    }
  }

  return (
    <div ref={containerRef} className='bg-white rounded-2xl shadow-lg p-5 md:border border-text-text-secondary'>
        <div className='flex flex-col md:flex-row gap-2 md:gap-4'>
            <div className='md:border-r border-text-text-secondary pr-4 py-4 w-full'>
                <SelectorFilter 
                  options={filterOptions.offerType} 
                  selected={selectedValues.offerType} 
                  onChange={(value, label) => handleValueChange('offerType', value, label)} 
                  label='Tipo de Oferta' 
                  icon={IconTipoOferta.src}
                  isOpen={openFilter === 'offerType'}
                  onToggle={() => handleFilterToggle('offerType')}
                />
            </div>
            <div className='md:border-r border-text-text-secondary pr-4 py-4 w-full'>
                <SelectorFilter 
                  options={filterOptions.propertyType} 
                  selected={selectedValues.propertyType} 
                  onChange={(value, label) => handleValueChange('propertyType', value, label)} 
                  label='Tipo de Inmueble' 
                  icon={IconTipoInmueble.src}
                  isOpen={openFilter === 'propertyType'}
                  onToggle={() => handleFilterToggle('propertyType')}
                />
            </div>
            <div className='md:border-r border-text-text-secondary pr-4 py-4 w-full'>
                <SelectorFilter 
                  options={filterOptions.propertyUse} 
                  selected={selectedValues.propertyUse} 
                  onChange={(value, label) => handleValueChange('propertyUse', value, label)} 
                  label='Uso de inmueble' 
                  icon={IconUsoInmueble.src}
                  isOpen={openFilter === 'propertyUse'}
                  onToggle={() => handleFilterToggle('propertyUse')}
                />
            </div>
            <div className='md:border-r border-text-text-secondary pr-4 py-4 w-full'>
                <SelectorFilter 
                  options={filterOptions.city} 
                  selected={selectedValues.city} 
                  onChange={(value, label) => handleValueChange('city', value, label)} 
                  label='Ciudad' 
                  icon={IconCiudad.src}
                  isOpen={openFilter === 'city'}
                  onToggle={() => handleFilterToggle('city')}
                />
            </div>
            <div className='md:border-r border-text-text-secondary pr-4 py-4 w-full'>
                <SelectorFilter 
                  options={filterOptions.country} 
                  selected={selectedValues.country} 
                  onChange={(value, label) => handleValueChange('country', value, label)} 
                  label='País' 
                  icon={IconPais.src}
                  isOpen={openFilter === 'country'}
                  onToggle={() => handleFilterToggle('country')}
                />
            </div>
            <div className='pr-4 py-4 w-full'>
                <SelectorFilter 
                  options={filterOptions.propertyStatus} 
                  selected={selectedValues.propertyStatus} 
                  onChange={(value, label) => handleValueChange('propertyStatus', value, label)} 
                  label='Estado' 
                  icon={IconEstado.src}
                  isOpen={openFilter === 'propertyStatus'}
                  onToggle={() => handleFilterToggle('propertyStatus')}
                />
            </div>
            <div className='w-full md:w-20 md:h-20 flex flex-grow justify-end'>
                <SearchButton onClick={handleSearch} />
            </div>
        </div>
    </div>
  )
}
