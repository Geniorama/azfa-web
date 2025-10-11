"use client";

import { useAds } from "@/hooks/useAds";
import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import SliderArrowLeft from "@/utils/SliderArrowLeft";
import SliderArrowRight from "@/utils/SliderArrowRight";

interface AdSectionProps {
  position: string;
  className?: string;
}

export default function AdSection({ position, className = "" }: AdSectionProps) {
  const { ads, loading, error } = useAds(position);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (loading) {
    return (
      <div className={`flex justify-center items-center py-8 ${className}`}>
        <div className="animate-pulse bg-gray-200 h-32 w-full max-w-4xl rounded-lg"></div>
      </div>
    );
  }

  if (error) {
    console.error('Error loading ads:', error);
    return null; // No mostrar nada si hay error
  }

  if (!ads || ads.length === 0) {
    return null; // No mostrar nada si no hay anuncios
  }

  // Combinar todas las imágenes de todos los anuncios
  const allImages = ads.flatMap(ad => {
    const images = isMobile ? ad.mobileImages : ad.desktopImages;
    // Validar que images existe y es un array antes de hacer map
    if (!images || !Array.isArray(images)) {
      return [];
    }
    return images.map(image => ({
      ...image,
      adTitle: ad.title,
      disclaimerText: ad.disclaimerText
    }));
  });

  if (allImages.length === 0) {
    return null;
  }

  return (
    <div className={`py-8 ${className}`}>
      <div className="relative">
        <Swiper
          modules={[Autoplay, Navigation]}
          spaceBetween={100}
          slidesPerView={1}
          slidesPerGroup={1}
          className="swiper-custom"
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          navigation={{
            nextEl: '.custom-swiper-button-next',
            prevEl: '.custom-swiper-button-prev',
          }}
          loop={allImages.length > 3}
          speed={1000}
        >
          {allImages.map((image, index) => (
            <SwiperSlide key={`${image.id}-${index}`}>
              <div className="flex flex-col items-center space-y-2 px-4 md:px-12">
                {/* Imagen del anuncio */}
                <div className="w-full flex justify-center">
                  <img
                    src={image.url}
                    alt={image.alternativeText || image.adTitle || "Anuncio"}
                    className="w-full h-auto shadow-sm hover:shadow-md transition-shadow duration-300"
                    style={{
                      maxHeight: isMobile ? '200px' : '300px',
                      width: 'auto'
                    }}
                  />
                </div>

                {/* Texto de disclaimer */}
                {image.disclaimerText && (
                  <p className="text-xs text-gray-500 text-center max-w-sm px-2">
                    {image.disclaimerText}
                  </p>
                )}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Flechas personalizadas */}
        {allImages.length > 1 && (
          <div className="hidden lg:flex justify-between absolute top-1/2 left-0 right-0 -translate-y-1/2 pointer-events-none z-10">
            <div className="pointer-events-auto [&>button]:border-text-primary [&>button]:text-text-primary">
              <SliderArrowLeft className="custom-swiper-button-prev border-text-primary" />
            </div>
            <div className="pointer-events-auto [&>button]:border-text-primary [&>button]:text-text-primary">
              <SliderArrowRight className="custom-swiper-button-next" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
