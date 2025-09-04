"use client";

import { GoArrowDown } from "react-icons/go";

interface CardInfoPortalProps {
  image: string;
  title: string;
  description: string;
  tags: string[];
  button: {
    label: string;
    onClick: () => void;
  }
}

export default function CardInfoPortal({ image, title, description, tags, button }: CardInfoPortalProps) {
  return (
    <div className='bg-white border border-background-2 rounded-2xl overflow-hidden hover:shadow-xl hover:border-transparent transition-all duration-300'>
        <div className='w-full bg-background-2 p-2'>
            <img src={image} alt="image" className='w-auto max-w-full mx-auto' />
        </div>
        <div className='p-4 px-6 text-text-primary'>
            <div className='flex flex-row gap-1'>
                {tags.map((tag) => (
                    <span key={tag} className="text-caption bg-background-1 text-text-primary rounded-full px-2 py-1 tracking-[1px]">{tag}</span>
                ))}
            </div>
            <h3 className="text-h4 mt-5">{title}</h3>
            <hr className='my-4 border-background-2' />
            <p className="text-body2 font-light">{description}</p>
            <hr className='my-4 border-background-2' />
            <button className='flex items-center gap-2 justify-between w-full cursor-pointer text-button'>
              <span className="font-medium">{button.label}</span>
              <GoArrowDown className="text-2xl text-[#94D133]" />
            </button>
        </div>
    </div>
  )
}
