interface SliderDotsProps {
  slides: number;
  currentSlide: number;
}

export default function SliderDots({ slides, currentSlide }: SliderDotsProps) {

  return (
    <div className="flex gap-2">
      {Array.from({ length: slides }).map((_, index) => (
        <div key={index} className={`cursor-pointer w-2.5 h-2.5 border border-details rounded-full hover:bg-details transition ${currentSlide === index ? "bg-details hover:cursor-default" : "bg-transparent"}`}></div>
      ))}
    </div>
  )
}
