"use client"

import SelectorFilter from './SelectorFilter'
import IconTipoOferta from "@/assets/img/icon-oferta.svg"
import IconTipoInmueble from "@/assets/img/icon-inmueble.svg"
import IconUsoInmueble from "@/assets/img/icon-uso.svg"
import IconCiudad from "@/assets/img/icon-ciudad.svg"
import IconPais from "@/assets/img/icon-pais.svg"
import IconEstado from "@/assets/img/icon-nuevo-usado.svg"
import SearchButton from '@/utils/SearchButton'

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
        value: 'costa-rica'
    },
    
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

export default function AdvancedSearchBar() {
  return (
    <div className='bg-white rounded-2xl shadow-lg p-5 border border-text-text-secondary'>
        <div className='flex flex-col md:flex-row gap-4'>
            <div className='border-r border-text-text-secondary pr-4 py-4 w-full'>
                <SelectorFilter options={optionsTipoOferta} selected={''} onChange={() => {}} label='Tipo de Oferta' icon={IconTipoOferta.src} />
            </div>
            <div className='border-r border-text-text-secondary pr-4 py-4 w-full'>
                <SelectorFilter options={optionsTipoInmueble} selected={''} onChange={() => {}} label='Tipo de Inmueble' icon={IconTipoInmueble.src} />
            </div>
            <div className='border-r border-text-text-secondary pr-4 py-4 w-full'>
                <SelectorFilter options={optionsUsoInmueble} selected={''} onChange={() => {}} label='Uso de inmueble' icon={IconUsoInmueble.src} />
            </div>
            <div className='border-r border-text-text-secondary pr-4 py-4 w-full'>
                <SelectorFilter options={optionsCiudad} selected={''} onChange={() => {}} label='Ciudad' icon={IconCiudad.src} />
            </div>
            <div className='border-r border-text-text-secondary pr-4 py-4 w-full'>
                <SelectorFilter options={optionsPais} selected={''} onChange={() => {}} label='País' icon={IconPais.src} />
            </div>
            <div className='pr-4 py-4 w-full'>
                <SelectorFilter options={optionsEstado} selected={''} onChange={() => {}} label='Estado' icon={IconEstado.src} />
            </div>
            <div className='w-20 h-20 flex flex-grow justify-end'>
                <SearchButton />
            </div>
        </div>
    </div>
  )
}
