"use client";

import { GoArrowDown } from "react-icons/go";

interface CardInfoPortalProps {
  image: string;
  title: string;
  description: string;
  tags: string[];
  author?: string;
  arrowColor?: string;
  button: {
    label: string;
    onClick: () => void;
  }
  noSpaceImage?: boolean;
  isReadMore?: boolean;
  date?: string;
}

export default function CardInfoPortal({ image, title, description, tags, author, arrowColor, button, noSpaceImage, isReadMore, date }: CardInfoPortalProps) {
  return (
    <div className='bg-white border border-background-2 rounded-2xl overflow-hidden hover:shadow-xl hover:border-transparent transition-all duration-300'>
        <div className={`w-full bg-background-2 ${noSpaceImage ? "p-0" : "p-2"}`}>
            <img src={image} alt="image" className={`${noSpaceImage ? "w-full h-full object-cover" : "w-auto max-w-full mx-auto"}`} />
        </div>
        <div className='p-4 px-6 text-text-primary'>
            <div className='flex flex-row gap-1'>
                {tags.map((tag) => (
                    <span key={tag} className="text-text-primary text-caption tracking-[1px] rounded-full px-2 py-1 bg-background-1">{tag}</span>
                ))}

                {date && (
                    <span className="text-text-primary text-caption tracking-[1px] rounded-full px-2 py-1 bg-white border border-background-3">{date}</span>
                )}
            </div>
            <h3 className="text-h4 mt-5">{title}</h3>
            {author && (
                <span className="text-button mt-1 inline-block">{author}</span>
            )}
            <hr className='my-4 border-background-2' />
            <p className="text-body2 font-light">{description}</p>
            <hr className='my-4 border-background-2' />
            <button 
              onClick={() => {
                console.log("CardInfoPortal button clicked");
                button.onClick();
              }}
              className='flex items-center gap-2 justify-between w-full cursor-pointer text-button'
            >
              <span className="font-medium">{button.label}</span>
              <GoArrowDown className={`text-2xl ${arrowColor || "text-[#94D133]"} ${isReadMore ? "rotate-270" : ""}`} />
            </button>
        </div>
    </div>
  )
}
