import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Scrollbar, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";

interface SliderGalleryProps {
  images: string[];
}

export default function SliderGallery({ images }: SliderGalleryProps) {
  return (
    <Swiper
      modules={[Navigation, Scrollbar, A11y]}
      spaceBetween={50}
      slidesPerView={1}
      navigation
      scrollbar={{ draggable: true }}
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log("slide change")}
      className="swiper-gallery rounded-2xl rounded-tl-none overflow-hidden"
    >
      {images.map((image, index) => (
        <SwiperSlide key={index}>
          <img src={image} alt="Slider Gallery" />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
