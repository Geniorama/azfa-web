import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Scrollbar, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";  
import PlatinumBadge from "@/utils/PlatinumBadge";

interface SliderGalleryProps {
  images: {
    url: string;
    alternativeText?: string;
  }[];
  isPlatinum?: boolean;
}

export default function SliderGallery({ images, isPlatinum = false }: SliderGalleryProps) {
  return (
    <div className="relative">
      {isPlatinum && (
        <div className="absolute top-5 left-0 z-10">
          <PlatinumBadge />
        </div>
      )}
      <Swiper
        modules={[Navigation, Scrollbar, A11y]}
        spaceBetween={50}
        slidesPerView={1}
        navigation
        scrollbar={{ draggable: true }}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log("slide change")}
        className="swiper-gallery lg:rounded-2xl lg:rounded-tl-none overflow-hidden"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <img className="w-full h-full object-cover aspect-video" src={image.url} alt={image.alternativeText || "Slider Gallery"} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
