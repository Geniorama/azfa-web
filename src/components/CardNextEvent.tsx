import React from 'react'
import Image from 'next/image'
import { GoCalendar, GoHome, GoZap } from 'react-icons/go'
import Button from '@/utils/Button'
import { EventIconType } from '@/types/componentsType'

interface CardNextEventProps {
    tag: string;
    title: string;
    date: string;
    location: string;
    address: string;
    image: string;
    calendarIcon?: EventIconType;
    locationIcon?: EventIconType;
    addressIcon?: EventIconType;
    button: {
        label: string;
        onClick: () => void;
    }
}

// Helper function to render icon
const renderIcon = (iconData: EventIconType | undefined, fallbackIcon: React.ReactNode) => {
  if (iconData?.customImage?.url) {
    return <img src={iconData.customImage.url} alt="icon" className="w-5 h-5" />;
  }
  return fallbackIcon;
};

export default function CardNextEvent({ tag, title, date, location, address, image, calendarIcon, locationIcon, addressIcon, button }: CardNextEventProps) {
  return (
    <div className='w-full flex flex-col lg:flex-row lg:shadow-2xl shadow-lg overflow-hidden rounded-2xl'>
        <div className='relative w-full lg:w-1/2 aspect-video lg:aspect-auto lg:min-h-[100px] overflow-hidden'>
            <Image className='object-cover' src={image} alt={title} fill sizes="(max-width: 1024px) 100vw, 50vw" />
        </div>

        <div className='w-full lg:w-1/2 lg:p-10 p-6 text-text-primary bg-white relative flex flex-col'>
            <span className='text-body2 mb-1 inline-block font-light'>{tag}</span>
            <h3 className='text-h3 font-light'>{title}</h3>
            <hr className='my-6 border-background-2' />
            <div className='flex flex-row flex-wrap'>
                <div className='w-full lg:w-1/2 lg:space-y-4 space-y-2'>
                    <div className='flex flex-row gap-2 items-start'>
                        {renderIcon(calendarIcon, <GoCalendar className="w-5 h-5" />)}
                        <span className="text-body2 inline-block">{date}</span>
                    </div>

                    <div className='flex flex-row gap-2 items-start'>
                        {renderIcon(locationIcon, <GoHome className="w-5 h-5" />)}
                        <span className="text-body2 inline-block">{location}</span>
                    </div>
                </div>

                {
                    address && (
                        <div className='w-full lg:w-1/2 lg:space-y-4 space-y-2 mt-2 lg:mt-0'>
                            <div className='flex flex-row gap-2 items-start'>
                                {renderIcon(addressIcon, <GoZap className="w-5 h-5" />)}   
                                <span className="text-body2 inline-block">{address}</span>
                            </div>
                        </div>
                    )
                }
            </div>

            {/* El botón va EN EL FLUJO, empujado al fondo con `mt-auto`. Antes
                era `lg:absolute bottom-10 left-10`: al estar fuera del flujo no
                reservaba altura, así que en escritorio se montaba sobre el texto
                en cuanto el título o la dirección crecían lo suficiente.
                `lg:pt-10` mantiene la separación mínima cuando el contenido es
                largo y ya no sobra espacio que repartir. La posición resultante
                coincide con la anterior: el `lg:p-10` del contenedor da los
                mismos 40 px que daban `bottom-10`/`left-10`. */}
            <div className='mt-10 lg:mt-auto lg:pt-10'>
                <Button className='w-full lg:w-auto justify-between' variant='secondary' icon onClick={button.onClick}>
                    {button.label || "Más información"}
                </Button>
            </div>
        </div>
    </div>
  )
}
