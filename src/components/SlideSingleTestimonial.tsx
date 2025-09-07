import { IoMdPlay } from "react-icons/io";

interface SlideSingleTestimonialProps {
  caption: string;
  title: string;
  description: string;
  image: string;
  button: {
    label: string;
    onClick: () => void;
  }
}

export default function SlideSingleTestimonial({ caption, title, description, image, button }: SlideSingleTestimonialProps) {
  return (
    <div className="flex flex-col lg:flex-row text-text-primary">
      <div className="w-full lg:w-1/2 relative">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
          <button onClick={button.onClick} className="bg-white/20 rounded-full cursor-pointer flex items-center justify-center w-20 h-20 hover:scale-110 transition-all duration-300">
            <IoMdPlay className="text-white text-4xl translate-x-0.5" />
          </button>
        </div>
      </div>
      <div className="w-full lg:w-1/2">
        <div className="bg-background-1 px-8 lg:px-12 py-12 lg:py-32 space-y-1">
          <p className="max-w-[539px] text-h5 tracking-[1px]">
            {description}
          </p>
          <div>
            <span className="text-h6 block">{title}</span>
            <span className="text-button block">{caption}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
