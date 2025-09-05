"use client";

import Button from "@/utils/Button";
import { useRouter } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import SliderArrowLeft from "@/utils/SliderArrowLeft";
import SliderArrowRight from "@/utils/SliderArrowRight";
import ServicioInfoImg from "@/assets/img/icon-home-informacion 1.svg";
import MiembrosImg from "@/assets/img/icon-home-miembros 1.svg";
import BeneficiosImg from "@/assets/img/icon-home-beneficios-AZFA 1.svg";

export default function Home() {
  const router = useRouter();

  return (
    <>
      <section className=" bg-text-primary h-[calc(100vh-120px)]">
        {/* Slider */}
        <div className="relative h-full">
          <Swiper
            modules={[Navigation]}
            spaceBetween={50}
            slidesPerView={1}
            navigation={{
              nextEl: ".custom-swiper-button-next",
              prevEl: ".custom-swiper-button-prev",
            }}
            className="h-full"
          >
            <SwiperSlide className="bg-primary py-16">
              <div className="container mx-auto px-4">
                <div className="space-y-4 w-full lg:w-1/2">
                  <h5 className="text-caption text-details">
                    Oferta Inmobiliaria
                  </h5>
                  <h1 className="text-h1 font-medium">
                    Zonas Francas de Iberoamérica 1
                  </h1>
                  <p className="text-h5">
                    Oferta inmobiliaria lorem ipsum sit amet
                  </p>
                  <Button
                    icon
                    onClick={() => router.push("/oferta-inmobiliaria")}
                  >
                    Ver más
                  </Button>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="container mx-auto px-4">
                <div className="space-y-4 w-full lg:w-1/2">
                  <h5 className="text-caption text-details">
                    Oferta Inmobiliaria
                  </h5>
                  <h1 className="text-h1 font-medium">
                    Zonas Francas de Iberoamérica 2
                  </h1>
                  <p className="text-h5">
                    Oferta inmobiliaria lorem ipsum sit amet
                  </p>
                  <Button
                    icon
                    onClick={() => router.push("/oferta-inmobiliaria")}
                  >
                    Ver más
                  </Button>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="container mx-auto px-4">
                <div className="space-y-4 w-full lg:w-1/2">
                  <h5 className="text-caption text-details">
                    Oferta Inmobiliaria
                  </h5>
                  <h1 className="text-h1 font-medium">
                    Zonas Francas de Iberoamérica 3
                  </h1>
                  <p className="text-h5">
                    Oferta inmobiliaria lorem ipsum sit amet
                  </p>
                  <Button
                    icon
                    onClick={() => router.push("/oferta-inmobiliaria")}
                  >
                    Ver más
                  </Button>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>

          {/* Botones de navegación personalizados */}
          <div className="absolute bottom-0 right-0 left-0 pb-10 z-10">
            <div className="container mx-auto px-4">
              <div className="flex justify-end gap-4">
                <SliderArrowLeft className="custom-swiper-button-prev" />
                <SliderArrowRight className="custom-swiper-button-next" />
              </div>
              <hr className="my-8 border-background-3"  />
              <div className="flex justify-center gap-4 max-w-screen-md mx-auto">
                <div className="flex items-start gap-2 w-full lg:w-1/3 justify-center">
                  <img className="w-12" src={ServicioInfoImg.src} alt="Servicio de información especializada" />
                  <p className="text-body2">Servicio de información especializada</p>
                </div>
                <div className="flex items-start gap-2 w-full lg:w-1/3 justify-center">
                  <img className="w-12" src={MiembrosImg.src} alt="Servicio de información especializada" />
                  <p className="text-body2">Conozca nuestros miembros</p>
                </div>
                <div className="flex items-start gap-2 w-full lg:w-1/3 justify-center">
                  <img className="w-12" src={BeneficiosImg.src} alt="Servicio de información especializada" />
                  <p className="text-body2">Conozca los beneficios de hacer parte de AZFA</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
