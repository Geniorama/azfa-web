import ArrowRightBlue from "@/assets/img/btn-arrow-blue.svg";

interface CardNewsProps {
    image: string;
    title: string;
    category: string;
    description: string;
    button: {
        label: string;
        onClick: () => void;
    }
}

export default function CardNews({ image, title, category, description, button }: CardNewsProps) {
  return (
    <div className='border border-background-2 rounded-tr-2xl rounded-bl-2xl rounded-br-2xl overflow-hidden'>
        <img src={image} alt={title} className='w-full h-60 object-cover' />

        {/* Content */}
        <div className="py-6 px-8">
            <span className="text-body2 mb-1 inline-block">{category}</span>
            <h3 className="text-h6">{title}</h3>
            <hr className="my-4 border-slate-300" />
            <p className="text-body2 font-light">{description}</p>
            <hr className="my-4 border-slate-300" />
            <button className='flex items-center gap-2 justify-between w-full cursor-pointer text-button hover:opacity-50 transition-all duration-300'>
              <span className="font-medium">{button.label}</span>
              <img src={ArrowRightBlue.src} alt="arrow-right-blue" className="w-8 h-8" />
            </button>
        </div>
    </div>
  )
}
