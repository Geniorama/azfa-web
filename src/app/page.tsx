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
import IconIntroStar from "@/assets/img/icon-home-trayectoria-AZFA 2.svg";
import CoverVideo from "@/assets/img/cover-video.webp";
import { IoMdPlay } from "react-icons/io";
import TitleDecorative from "@/utils/TitleDecorative";
import ServiceCard from "@/components/ServiceCard";
import Counter from "@/utils/Counter";
import IconIberoamerica from "@/assets/img/icon-home-iberoamerica-ZF 1.svg";
import Link from "next/link";
import CardNews from "@/components/CardNews";

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
              <hr className="my-8 border-background-3" />
              <div className="flex justify-center gap-4 max-w-screen-md mx-auto">
                <div className="flex items-start gap-2 w-full lg:w-1/3 justify-center">
                  <img
                    className="w-12"
                    src={ServicioInfoImg.src}
                    alt="Servicio de información especializada"
                  />
                  <p className="text-body2">
                    Servicio de información especializada
                  </p>
                </div>
                <div className="flex items-start gap-2 w-full lg:w-1/3 justify-center">
                  <img
                    className="w-12"
                    src={MiembrosImg.src}
                    alt="Servicio de información especializada"
                  />
                  <p className="text-body2">Conozca nuestros miembros</p>
                </div>
                <div className="flex items-start gap-2 w-full lg:w-1/3 justify-center">
                  <img
                    className="w-12"
                    src={BeneficiosImg.src}
                    alt="Servicio de información especializada"
                  />
                  <p className="text-body2">
                    Conozca los beneficios de hacer parte de AZFA
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center text-text-primary gap-16 w-full lg:w-2/3 mx-auto">
            <img
              className="w-60"
              src={IconIntroStar.src}
              alt="Servicio de información especializada"
            />
            <p className="text-h3 font-light">
              Con más de <span className="text-details">27 años</span> de
              trayectoria, la AZFA es la organización que lidera y representa al
              ecosistema de zonas francas en Iberoamérica.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center justify-center text-text-primary">
            <div className="w-full lg:w-1/2">
              <div className="relative">
                <img
                  src={CoverVideo.src}
                  alt="Cover Video"
                  className="w-full"
                />
                <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                  <button className="bg-white/20 rounded-full cursor-pointer flex items-center justify-center w-28 h-28 hover:scale-110 transition-all duration-300">
                    <IoMdPlay className="text-white text-5xl translate-x-0.5" />
                  </button>
                </div>
              </div>
            </div>

            <div className="w-full lg:w-1/2 pl-30 text-body1">
              <p>
                Agrupamos a los actores clave del sector: parques de zonas
                francas, asociaciones nacionales, entidades gubernamentales,
                empresas proveedoras de servicios y compañías instaladas bajo el
                régimen franco, consolidando una red regional estratégica. <br /> <br />

                Nuestra misión es <span className="text-details">imparar la competitividad, la innovación, la
                atracción de inversiones </span> y el desarrollo sostenible en las zonas
                francas, posicionándolas como pilares del crecimiento económico
                regional y del comercio internacional.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white pt-16">
        <div className="container mx-auto px-4">
          <TitleDecorative>Nuestros Servicios</TitleDecorative>
        </div>

        {/* Services cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-[1px] mt-16">
          <ServiceCard title="Servicio 1" subtitle="Servicio" image={"https://placehold.co/600x1000/10356B/FFFFFF"} button={{ label: "Ver más", onClick: () => router.push("/servicio-1") }} />
          <ServiceCard title="Información especializada del sector" subtitle="Servicio" image={"https://placehold.co/600x1000/10356B/FFFFFF"} button={{ label: "Ver más", onClick: () => router.push("/servicio-2") }} />
          <ServiceCard title="Conozca nuestros miembros" subtitle="Servicio" image={"https://placehold.co/600x1000/10356B/FFFFFF"} button={{ label: "Ver más", onClick: () => router.push("/servicio-3") }} />
          <ServiceCard title="Conozca los beneficios de hacer parte de AZFA" subtitle="Servicio" image={"https://placehold.co/600x1000/10356B/FFFFFF"} button={{ label: "Ver más", onClick: () => router.push("/servicio-4") }} />
          <ServiceCard title="Servicio 5" subtitle="Servicio" image={"https://placehold.co/600x1000/10356B/FFFFFF"} button={{ label: "Ver más", onClick: () => router.push("/servicio-5") }} />
        </div>
      </section>

      <section className="bg-[#D5E3EA] py-16">
        <div className="container mx-auto px-4 flex flex-col lg:flex-row items-start justify-center text-text-primary">
          <div className="w-full lg:w-1/3">
            <h2 className="text-h2">Las Zonas Francas de Iberoamérica</h2>
          </div>
          <div className="w-full lg:w-1/3 space-y-10">
            <div className="flex items-center gap-6">
              <img src={IconIberoamerica.src} alt="Icon Iberoamérica" className="w-16 h-16" />
              <Counter value={800} prefix="+" leyend="Zonas Francas" thousandSeparator="." />
            </div>

            <div className="flex items-center gap-6">
              <img src={IconIberoamerica.src} alt="Icon Iberoamérica" className="w-16 h-16" />
              <Counter value={100} prefix="+" leyend="Empresas Instaladas " thousandSeparator="." />
            </div>
          </div>
          <div className="w-full lg:w-1/3 space-y-10">
            <div className="flex items-center gap-6">
              <img src={IconIberoamerica.src} alt="Icon Iberoamérica" className="w-16 h-16" />
              <Counter value={1094252} prefix="+" leyend="Empleos Directos  " thousandSeparator="." />
            </div>

            <div className="flex items-center gap-6">
              <img src={IconIberoamerica.src} alt="Icon Iberoamérica" className="w-16 h-16" />
              <Counter value={60000} prefix="USD$" leyend="Millones Exportaciones  " thousandSeparator="." />
            </div>

            <div className="flex items-center gap-6">
              <img src={IconIberoamerica.src} alt="Icon Iberoamérica" className="w-16 h-16" />
              <Counter value={36536} prefix="USD$" leyend="Millones Inversiones  " thousandSeparator="." />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="container mx-auto px-4 flex flex-col lg:flex-row items-start justify-center text-text-primary gap-16">
          <div className="w-full lg:w-1/2">
            <div className="flex items-center justify-between">
              <TitleDecorative className="text-left items-start">Noticias</TitleDecorative>
              <Link href="/noticias">Ver todas</Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
              <CardNews
                image="https://placehold.co/600x400/"
                title="Guía Legal de Zonas Francas de Iberoamérica 2024"
                category="Noticia"
                description="¿Está interesado en las normativas y regulaciones que rigen las zonas francas en Iberoamérica? La Guía Legal de las Zonas Francas de Iberoamérica es un recurso esencial que proporciona un panorama completo de los marcos jurídicos, beneficios y obligaciones en cada país de la región."
                button={{ label: "Ver más", onClick: () => router.push("/noticia-1") }}
              />
              <CardNews
                image="https://placehold.co/600x400/"
                title="Guía Legal de Zonas Francas de Iberoamérica 2024"
                category="Noticia"
                description="¿Está interesado en las normativas y regulaciones que rigen las zonas francas en Iberoamérica? La Guía Legal de las Zonas Francas de Iberoamérica es un recurso esencial que proporciona un panorama completo de los marcos jurídicos, beneficios y obligaciones en cada país de la región."
                button={{ label: "Ver más", onClick: () => router.push("/noticia-1") }}
              />
            </div>
          </div>
          <div className="w-full lg:w-1/2">
          </div>
        </div>
      </section>
    </>
  );
}
