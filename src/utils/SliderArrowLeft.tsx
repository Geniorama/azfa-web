import { TfiAngleLeft } from "react-icons/tfi";

interface SliderArrowLeftProps {
  className?: string;
  onClick?: () => void;
}

export default function SliderArrowLeft({ className, onClick }: SliderArrowLeftProps) {
  return (
    <button className={`bg-transparent border text-lg border-white text-white hover:bg-text-secondary hover:bg-white hover:text-text-primary w-16 h-16 rounded-full flex items-center justify-center transition cursor-pointer ${className}`} onClick={onClick}>
      <TfiAngleLeft />
    </button>
  )
}
