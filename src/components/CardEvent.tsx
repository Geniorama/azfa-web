import { GoCalendar, GoHome } from "react-icons/go";
import ArrowRightGreen from "@/assets/img/btn-arrow-green.svg";

interface CardEventProps {
    image: string;
    title: string;
    category: string;
    date?: string;
    location?: string;
    hotel?: string;
    button: {
        label: string;
        onClick: () => void;
    }
}

export default function CardEvent({ image, title, category, date, location, hotel, button }: CardEventProps) {
  return (
    <div className="flex flex-col lg:flex-row border border-background-2 rounded-tr-2xl rounded-bl-2xl rounded-br-2xl overflow-hidden">
        <div className="w-full lg:w-2/5">
            <img src={image} alt={title} className='w-full h-full object-cover' />
        </div>

        {/* Content */}
        <div className="py-6 px-8 w-full lg:w-3/5">
            <span className="text-body2 mb-1 inline-block">{category}</span>
            <h3 className="text-h6">{title}</h3>
            <hr className="my-4 border-background-2" />
            <div className="flex flex-row gap-y-2 justify-between flex-wrap">
                {date && (
                    <div className="flex flex-row gap-2 items-start w-full lg:w-1/2">
                        <GoCalendar className="w-5 h-5" />
                        <span className="text-body2 inline-block">{date}</span>
                    </div>
                )}
                {location && (
                    <div className="flex flex-row gap-2 items-start w-full lg:w-1/2">
                        <GoHome className="w-5 h-5" />
                        <span className="text-body2 inline-block">{location}</span>
                    </div>
                )}
                {hotel && (
                    <div className="flex flex-row gap-2 items-start w-full">
                        <GoHome className="w-5 h-5 min-w-5" />
                        <span className="text-body2 inline-block">{hotel}</span>
                    </div>
                )}
            </div>
            <hr className="my-4 border-background-2" />
            <button onClick={button.onClick} className='flex items-center gap-2 justify-between w-full cursor-pointer text-button hover:opacity-50 transition-all duration-300'>
              <span className="font-medium">{button.label}</span>
              <img src={ArrowRightGreen.src} alt="arrow-right-green" className="w-8 h-8" />
            </button>
        </div>
    </div>
  )
}
