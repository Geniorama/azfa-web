import { TfiAngleRight } from "react-icons/tfi"

interface SliderArrowRightProps {
  className?: string;
  onClick?: () => void;
}

export default function SliderArrowRight({ className, onClick }: SliderArrowRightProps) {
  return (
    <button className={`bg-transparent border text-lg border-white text-white hover:bg-text-secondary hover:bg-white hover:text-text-primary w-16 h-16 rounded-full flex items-center justify-center transition cursor-pointer ${className}`} onClick={onClick}>
      <TfiAngleRight />
    </button>
  )
}
