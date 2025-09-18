"use client"

import { useState, useRef, useEffect } from 'react'
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
    tipoOferta: string;
    tipoInmueble: string;
    usoInmueble: string;
    ciudad: string;
    pais: string;
    estado: string;
}

interface AdvancedSearchBarProps {
    onSearch: (filters: FilterValuesProps) => void;
}

export default function AdvancedSearchBar({ onSearch }: AdvancedSearchBarProps) {
  const [openFilter, setOpenFilter] = useState<string | null>(null)
  const [selectedValues, setSelectedValues] = useState<FilterValuesProps>({
    tipoOferta: '',
    tipoInmueble: '',
    usoInmueble: '',
    ciudad: '',
    pais: '',
    estado: ''
  })
  const [searchFilters, setSearchFilters] = useState<FilterValuesProps>({
    tipoOferta: '',
    tipoInmueble: '',
    usoInmueble: '',
    ciudad: '',
    pais: '',
    estado: ''
  })
  const containerRef = useRef<HTMLDivElement>(null)

  // Inicializar valores por defecto
  useEffect(() => {
    setSelectedValues({
      tipoOferta: optionsTipoOferta[0]?.label || '',
      tipoInmueble: optionsTipoInmueble[0]?.label || '',
      usoInmueble: optionsUsoInmueble[0]?.label || '',
      ciudad: optionsCiudad[0]?.label || '',
      pais: optionsPais[0]?.label || '',
      estado: optionsEstado[0]?.label || ''
    })
    setSearchFilters({
      tipoOferta: optionsTipoOferta[0]?.value || '',
      tipoInmueble: optionsTipoInmueble[0]?.value || '',
      usoInmueble: optionsUsoInmueble[0]?.value || '',
      ciudad: optionsCiudad[0]?.value || '',
      pais: optionsPais[0]?.value || '',
      estado: optionsEstado[0]?.value || ''
    })
  }, [])

  // Función para manejar la apertura/cierre de filtros
  const handleFilterToggle = (filterName: string) => {
    setOpenFilter(openFilter === filterName ? null : filterName)
  }

  // Función para manejar cambios en los valores seleccionados
  const handleValueChange = (filterName: string, value: string, label: string) => {
    // Actualizar valores visuales (labels)
    setSelectedValues(prev => ({
      ...prev,
      [filterName]: label
    }))
    // Actualizar filtros de búsqueda (values)
    setSearchFilters(prev => ({
      ...prev,
      [filterName]: value
    }))
    
    setOpenFilter(null) // Cerrar el filtro después de seleccionar
  }

  // Función para cerrar todos los filtros
  const closeAllFilters = () => {
    setOpenFilter(null)
  }

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
      console.log('Filtros enviados (values):', searchFilters);
      onSearch(searchFilters)
    }
  }

  return (
    <div ref={containerRef} className='bg-white rounded-2xl shadow-lg p-5 md:border border-text-text-secondary'>
        <div className='flex flex-col md:flex-row gap-2 md:gap-4'>
            <div className='md:border-r border-text-text-secondary pr-4 py-4 w-full'>
                <SelectorFilter 
                  options={optionsTipoOferta} 
                  selected={selectedValues.tipoOferta} 
                  onChange={(value, label) => handleValueChange('tipoOferta', value, label)} 
                  label='Tipo de Oferta' 
                  icon={IconTipoOferta.src}
                  isOpen={openFilter === 'tipoOferta'}
                  onToggle={() => handleFilterToggle('tipoOferta')}
                />
            </div>
            <div className='md:border-r border-text-text-secondary pr-4 py-4 w-full'>
                <SelectorFilter 
                  options={optionsTipoInmueble} 
                  selected={selectedValues.tipoInmueble} 
                  onChange={(value, label) => handleValueChange('tipoInmueble', value, label)} 
                  label='Tipo de Inmueble' 
                  icon={IconTipoInmueble.src}
                  isOpen={openFilter === 'tipoInmueble'}
                  onToggle={() => handleFilterToggle('tipoInmueble')}
                />
            </div>
            <div className='md:border-r border-text-text-secondary pr-4 py-4 w-full'>
                <SelectorFilter 
                  options={optionsUsoInmueble} 
                  selected={selectedValues.usoInmueble} 
                  onChange={(value, label) => handleValueChange('usoInmueble', value, label)} 
                  label='Uso de inmueble' 
                  icon={IconUsoInmueble.src}
                  isOpen={openFilter === 'usoInmueble'}
                  onToggle={() => handleFilterToggle('usoInmueble')}
                />
            </div>
            <div className='md:border-r border-text-text-secondary pr-4 py-4 w-full'>
                <SelectorFilter 
                  options={optionsCiudad} 
                  selected={selectedValues.ciudad} 
                  onChange={(value, label) => handleValueChange('ciudad', value, label)} 
                  label='Ciudad' 
                  icon={IconCiudad.src}
                  isOpen={openFilter === 'ciudad'}
                  onToggle={() => handleFilterToggle('ciudad')}
                />
            </div>
            <div className='md:border-r border-text-text-secondary pr-4 py-4 w-full'>
                <SelectorFilter 
                  options={optionsPais} 
                  selected={selectedValues.pais} 
                  onChange={(value, label) => handleValueChange('pais', value, label)} 
                  label='País' 
                  icon={IconPais.src}
                  isOpen={openFilter === 'pais'}
                  onToggle={() => handleFilterToggle('pais')}
                />
            </div>
            <div className='pr-4 py-4 w-full'>
                <SelectorFilter 
                  options={optionsEstado} 
                  selected={selectedValues.estado} 
                  onChange={(value, label) => handleValueChange('estado', value, label)} 
                  label='Estado' 
                  icon={IconEstado.src}
                  isOpen={openFilter === 'estado'}
                  onToggle={() => handleFilterToggle('estado')}
                />
            </div>
            <div className='w-full md:w-20 md:h-20 flex flex-grow justify-end'>
                <SearchButton onClick={handleSearch} />
            </div>
        </div>
    </div>
  )
}
