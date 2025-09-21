import IconNewsletter from "@/assets/img/icon-newsletter.svg";
import IconArrowRight from "@/assets/img/btn-arrow-blue.svg";

interface CardNewsletterProps {
  title: string;
  date: string;
  button: {
    label: string;
    onClick: () => void;
  }
  background: string; // Color de fondo
}

export default function CardNewsletter({ title, date, button, background }: CardNewsletterProps) {
  return (
    <div className="bg-white border border-background-2 rounded-tr-2xl rounded-bl-2xl rounded-br-2xl overflow-hidden text-text-primary hover:shadow-xl hover:border-transparent transition-all duration-300">
        <div className={`w-full h-60 relative ${background || "bg-background-1"}`}>
            <div className="absolute top-4 right-4 w-14 h-14 flex flex-col justify-center items-center p-3 bg-white rounded-lg">
                <img src={IconNewsletter.src} alt="Icon Newsletter" className="w-10 h-10" />
            </div>
        </div>
        <div className="px-6 pt-4 flex flex-row gap-2 items-center text-h6">
            <h3>{title}</h3> <span>|</span> <p>{date}</p>
        </div>
        <div className="px-6">
            <hr className="my-4 border-slate-300" />
        </div>
        <div className="px-6 pb-4">
            <button className="flex items-center gap-2 justify-between w-full cursor-pointer text-button hover:opacity-50 transition-all duration-300">
                <span className="font-medium">{button.label}</span>
                <img src={IconArrowRight.src} alt="Icon Arrow Right" className="w-8 h-8" />
            </button>
        </div>
    </div>
  )
}
