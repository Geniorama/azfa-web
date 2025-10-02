import React from 'react'
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
        <div className='w-full lg:w-1/2'>
            <img className='w-full lg:h-120 object-cover' src={image} alt={title} />
        </div>

        <div className='w-full lg:w-1/2 lg:p-10 p-6 text-text-primary bg-white relative'>
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

                <div className='w-full lg:w-1/2 lg:space-y-4 space-y-2 mt-2 lg:mt-0'>
                    <div className='flex flex-row gap-2 items-start'>
                        {renderIcon(addressIcon, <GoZap className="w-5 h-5" />)}   
                        <span className="text-body2 inline-block">{address}</span>
                    </div>
                </div>
            </div>

            <Button className='mt-10 lg:absolute bottom-10 left-10 z-10 w-full lg:w-auto justify-between' variant='secondary' icon onClick={button.onClick}>
                {button.label || "Más información"}
            </Button>
        </div>
    </div>
  )
}
