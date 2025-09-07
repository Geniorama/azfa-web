"use client";

import { useRouter } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import SliderArrowLeft from "@/utils/SliderArrowLeft";
import SliderArrowRight from "@/utils/SliderArrowRight";
import ServicioInfoImg from "@/assets/img/icon-home-informacion 1.svg";
import MiembrosImg from "@/assets/img/icon-home-miembros 1.svg";
import BeneficiosImg from "@/assets/img/icon-home-beneficios-AZFA 1.svg";
import IconIntroStar from "@/assets/img/icon-home-trayectoria-AZFA 2.svg";
import CoverVideo from "@/assets/img/cover-video.jpg";
import LogoCodevi from "@/assets/img/CODEVI 2.png";
import { IoMdPlay } from "react-icons/io";
import TitleDecorative from "@/utils/TitleDecorative";
import ServiceCard from "@/components/ServiceCard";
import Counter from "@/utils/Counter";
import IconIberoamerica from "@/assets/img/icon-home-iberoamerica-ZF 1.svg";
import Link from "next/link";
import CardNews from "@/components/CardNews";
import CardEvent from "@/components/CardEvent";
import { truncateText } from "@/utils/truncateText";
import ImageVideo2 from "@/assets/img/video2-home.jpg";
import SlideSingleHome from "@/components/SlideSingleHome";
import SlideSingleTestimonial from "@/components/SlideSingleTestimonial";
import Modal from "@/components/Modal";
import { useState } from "react";
import LogoAmpip from "@/assets/img/logo-ampip 4.png";

export default function Home() {
  const router = useRouter();
  const [openModalVideo, setOpenModalVideo] = useState(false);
  return (
    <>
      <Modal open={openModalVideo} onClose={() => setOpenModalVideo(false)}>
        <div className="bg-black overflow-hidden">
          <video 
            src={"/2320331_Downtown_Los_Angeles_1280x720.mp4"} 
            autoPlay 
            muted 
            loop 
            className="w-full h-auto max-h-[80vh] aspect-video"
            controls
          />
        </div>
      </Modal>
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
              <SlideSingleHome
                caption="Oferta Inmobiliaria"
                title="Zonas Francas de Iberoamérica 1"
                description="Oferta inmobiliaria lorem ipsum sit amet"
                button={{
                  label: "Ver más",
                  onClick: () => router.push("/oferta-inmobiliaria"),
                }}
              />
            </SwiperSlide>
            <SwiperSlide className="bg-text-primary py-16">
              <SlideSingleHome
                caption="Oferta Inmobiliaria"
                title="Zonas Francas de Iberoamérica 2"
                description="Oferta inmobiliaria lorem ipsum sit amet"
                button={{
                  label: "Ver más",
                  onClick: () => router.push("/oferta-inmobiliaria"),
                }}
              />
            </SwiperSlide>
            <SwiperSlide className="bg-text-primary py-16">
              <SlideSingleHome
                caption="Oferta Inmobiliaria"
                title="Zonas Francas de Iberoamérica 3"
                description="Oferta inmobiliaria lorem ipsum sit amet"
                button={{
                  label: "Ver más",
                  onClick: () => router.push("/oferta-inmobiliaria"),
                }}
              />
            </SwiperSlide>
          </Swiper>

          {/* Botones de navegación personalizados */}
          <div className="absolute bottom-0 right-0 left-0 pb-10 z-10">
            <div className="container mx-auto px-4">
              <div className="hidden lg:flex justify-end gap-4">
                <SliderArrowLeft className="custom-swiper-button-prev" />
                <SliderArrowRight className="custom-swiper-button-next" />
              </div>
              <hr className="my-8 border-background-3" />
              <div className="flex items-start justify-center gap-4 max-w-screen-md mx-auto">
                <div className="flex flex-col lg:flex-row items-center lg:items-start gap-2 w-full lg:w-1/3 justify-center">
                  <img
                    className="w-12"
                    src={ServicioInfoImg.src}
                    alt="Servicio de información especializada"
                  />
                  <p className="text-body2 text-center lg:text-left">
                    Servicio de información especializada
                  </p>
                </div>
                <div className="flex flex-col lg:flex-row items-center lg:items-start gap-2 w-full lg:w-1/3 justify-center">
                  <img
                    className="w-12"
                    src={MiembrosImg.src}
                    alt="Servicio de información especializada"
                  />
                  <p className="text-body2 text-center lg:text-left">Conozca nuestros miembros</p>
                </div>
                <div className="flex flex-col lg:flex-row items-center lg:items-start gap-2 w-full lg:w-1/3 justify-center">
                  <img
                    className="w-12"
                    src={BeneficiosImg.src}
                    alt="Servicio de información especializada"
                  />
                  <p className="text-body2 text-center lg:text-left">
                    Conozca los beneficios de hacer parte de AZFA
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white lg:pb-16 pt-16 pb-0">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center justify-center text-text-primary lg:gap-16 gap-6 w-full lg:w-2/3 mx-auto">
            <img
              className="w-[109px] lg:w-60"
              src={IconIntroStar.src}
              alt="Servicio de información especializada"
            />
            <p className="lg:text-h3 text-h4 font-light text-center lg:text-left">
              Con más de <span className="text-details">27 años</span> de
              trayectoria, la AZFA es la organización que lidera y representa al
              ecosistema de zonas francas en Iberoamérica.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white lg:py-16 py-10">
        <div className="container mx-auto lg:px-4">
          <div className="flex flex-col lg:flex-row items-center justify-center text-text-primary">
            <div className="w-full lg:w-1/2">
              <div className="relative">
                <img
                  src={CoverVideo.src}
                  alt="Cover Video"
                  className="w-full lg:rounded-2xl lg:rounded-tl-none"
                />
                <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                  <button onClick={() => setOpenModalVideo(true)} className="bg-white/20 rounded-full cursor-pointer flex items-center justify-center w-28 h-28 hover:scale-110 transition-all duration-300">
                    <IoMdPlay className="text-white text-5xl translate-x-0.5" />
                  </button>
                </div>
              </div>
            </div>

            <div className="w-full lg:w-1/2 lg:pl-30 text-body1 p-4 lg:p-0">
              <p>
                Agrupamos a los actores clave del sector: parques de zonas
                francas, asociaciones nacionales, entidades gubernamentales,
                empresas proveedoras de servicios y compañías instaladas bajo el
                régimen franco, consolidando una red regional estratégica.{" "}
                <br /> <br />
                Nuestra misión es{" "}
                <span className="text-details">
                  imparar la competitividad, la innovación, la atracción de
                  inversiones{" "}
                </span>{" "}
                y el desarrollo sostenible en las zonas francas, posicionándolas
                como pilares del crecimiento económico regional y del comercio
                internacional.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white lg:pt-16">
        <div className="container mx-auto px-4">
          <TitleDecorative>Nuestros Servicios</TitleDecorative>
        </div>

        {/* Services cards */}
        <div className="hidden lg:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-[1px] mt-16">
          <ServiceCard
            title="Servicio 1"
            subtitle="Servicio"
            image={"https://placehold.co/600x1000/10356B/FFFFFF"}
            button={{
              label: "Ver más",
              onClick: () => router.push("/servicio-1"),
            }}
          />
          <ServiceCard
            title="Información especializada del sector"
            subtitle="Servicio"
            image={"https://placehold.co/600x1000/10356B/FFFFFF"}
            button={{
              label: "Ver más",
              onClick: () => router.push("/servicio-2"),
            }}
          />
          <ServiceCard
            title="Conozca nuestros miembros"
            subtitle="Servicio"
            image={"https://placehold.co/600x1000/10356B/FFFFFF"}
            button={{
              label: "Ver más",
              onClick: () => router.push("/servicio-3"),
            }}
          />
          <ServiceCard
            title="Conozca los beneficios de hacer parte de AZFA"
            subtitle="Servicio"
            image={"https://placehold.co/600x1000/10356B/FFFFFF"}
            button={{
              label: "Ver más",
              onClick: () => router.push("/servicio-4"),
            }}
          />
          <ServiceCard
            title="Servicio 5"
            subtitle="Servicio"
            image={"https://placehold.co/600x1000/10356B/FFFFFF"}
            button={{
              label: "Ver más",
              onClick: () => router.push("/servicio-5"),
            }}
          />
        </div>

        {/* Services cards mobile swiper */}
        <div className="lg:hidden mt-14">
          <Swiper
            modules={[Pagination]}
            spaceBetween={50}
            slidesPerView={1}
            pagination={{
              clickable: true,
            }}
            className="[&>.swiper-pagination]:!relative [&>.swiper-pagination]:!top-0 [&>.swiper-pagination]:py-12 [&>.swiper-pagination>span]:!border [&>.swiper-pagination>span]:!border-details [&>.swiper-pagination>span]:!bg-transparent [&>.swiper-pagination>span]:!opacity-100 [&>.swiper-pagination>span.swiper-pagination-bullet-active]:!bg-details [&>.swiper-pagination>span]:!cursor-pointer"
          >
          <SwiperSlide>
            <ServiceCard
              title="Servicio 1"
              subtitle="Servicio"
              image={"https://placehold.co/600x1000/10356B/FFFFFF"}
              button={{
                label: "Ver más",
                onClick: () => router.push("/servicio-1"),
              }}
            />
          </SwiperSlide>
          <SwiperSlide>
            <ServiceCard
              title="Servicio 2"
              subtitle="Servicio"
              image={"https://placehold.co/600x1000/10356B/FFFFFF"}
              button={{
                label: "Ver más",
                onClick: () => router.push("/servicio-2"),
              }}
            />
          </SwiperSlide>
          <SwiperSlide>
            <ServiceCard
              title="Servicio 3"
              subtitle="Servicio"
              image={"https://placehold.co/600x1000/10356B/FFFFFF"}
              button={{
                label: "Ver más",
                onClick: () => router.push("/servicio-3"),
              }}
            />
          </SwiperSlide>
          <SwiperSlide>
            <ServiceCard
              title="Servicio 4"
              subtitle="Servicio"
              image={"https://placehold.co/600x1000/10356B/FFFFFF"}
              button={{
                label: "Ver más",
                onClick: () => router.push("/servicio-4"),
              }}
            />
          </SwiperSlide>
          <SwiperSlide>
            <ServiceCard
              title="Servicio 5"
              subtitle="Servicio"
              image={"https://placehold.co/600x1000/10356B/FFFFFF"}
              button={{
                label: "Ver más",
                onClick: () => router.push("/servicio-5"),
              }}
            />
          </SwiperSlide>
        </Swiper>
        </div>
      </section>

      <section className="bg-[#D5E3EA] py-16">
        <div className="container mx-auto px-4 flex flex-col lg:flex-row items-start justify-center text-text-primary">
          <div className="w-full lg:w-1/3">
            <TitleDecorative
              dividerColor="bg-[#94D133]"
              className="text-left items-start"
            >
              Las Zonas Francas de Iberoamérica
            </TitleDecorative>
          </div>
          <div className="w-full lg:w-1/3 space-y-10 mt-14 lg:mt-0">
            <div className="flex items-center gap-6">
              <img
                src={IconIberoamerica.src}
                alt="Icon Iberoamérica"
                className="w-16 h-16"
              />
              <Counter
                value={800}
                prefix="+"
                leyend="Zonas Francas"
                thousandSeparator="."
              />
            </div>

            <div className="flex items-center gap-6">
              <img
                src={IconIberoamerica.src}
                alt="Icon Iberoamérica"
                className="w-16 h-16"
              />
              <Counter
                value={100}
                prefix="+"
                leyend="Empresas Instaladas "
                thousandSeparator="."
              />
            </div>
          </div>
          <div className="w-full lg:w-1/3 space-y-10">
            <div className="flex items-center gap-6 mt-8 lg:mt-0">
              <img
                src={IconIberoamerica.src}
                alt="Icon Iberoamérica"
                className="w-16 h-16"
              />
              <Counter
                value={1094252}
                prefix="+"
                leyend="Empleos Directos  "
                thousandSeparator="."
              />
            </div>

            <div className="flex items-center gap-6">
              <img
                src={IconIberoamerica.src}
                alt="Icon Iberoamérica"
                className="w-16 h-16"
              />
              <Counter
                value={60000}
                prefix="USD$"
                leyend="Millones Exportaciones  "
                thousandSeparator="."
              />
            </div>

            <div className="flex items-center gap-6">
              <img
                src={IconIberoamerica.src}
                alt="Icon Iberoamérica"
                className="w-16 h-16"
              />
              <Counter
                value={36536}
                prefix="USD$"
                leyend="Millones Inversiones  "
                thousandSeparator="."
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="container mx-auto px-4 flex flex-col lg:flex-row items-start justify-center text-text-primary gap-20">
          <div className="w-full lg:w-1/2">
            <div className="flex items-center justify-between mb-12 lg:mb-0">
              <TitleDecorative className="text-left items-start">
                Noticias
              </TitleDecorative>
              <Link
                className="underline underline-offset-8 decoration-white hover:decoration-details transition-all duration-300"
                href="/noticias"
              >
                Ver todas
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
              <CardNews
                image="https://placehold.co/600x400/"
                title="Guía Legal de Zonas Francas de Iberoamérica 2024"
                category="Noticia"
                description={truncateText(
                  "¿Está interesado en las normativas y regulaciones que rigen las zonas francas en Iberoamérica? La Guía Legal de las Zonas Francas de Iberoamérica es un recurso esencial que proporciona un panorama completo de los marcos jurídicos, beneficios y obligaciones en cada país de la región.",
                  100
                )}
                button={{
                  label: "Ver más",
                  onClick: () => router.push("/noticia-1"),
                }}
              />
              <CardNews
                image="https://placehold.co/600x400/"
                title="Guía Legal de Zonas Francas de Iberoamérica 2024"
                category="Noticia"
                description={truncateText(
                  "¿Está interesado en las normativas y regulaciones que rigen las zonas francas en Iberoamérica? La Guía Legal de las Zonas Francas de Iberoamérica es un recurso esencial que proporciona un panorama completo de los marcos jurídicos, beneficios y obligaciones en cada país de la región.",
                  100
                )}
                button={{
                  label: "Ver más",
                  onClick: () => router.push("/noticia-1"),
                }}
              />
            </div>
          </div>
          <div className="w-full lg:w-1/2">
            <div className="flex items-center justify-between">
              <TitleDecorative
                dividerColor="bg-[#94D133]"
                className="text-left items-start"
              >
                <span className="hidden lg:inline">Próximos</span> Eventos
              </TitleDecorative>
              <Link
                className="underline underline-offset-8 decoration-white hover:decoration-details transition-all duration-300"
                href="/noticias"
              >
                Ver todos
              </Link>
            </div>

            <div className="space-y-8 mt-8">
              <CardEvent
                image="https://placehold.co/600x400/"
                title="Guía Legal de Zonas Francas de Iberoamérica 2024"
                category="Evento"
                date="2024-01-01"
                location="Bogotá, Colombia"
                button={{
                  label: "Ver más",
                  onClick: () => router.push("/evento-1"),
                }}
                hotel="Hotel"
              />
              <CardEvent
                image="https://placehold.co/600x400/"
                title="Guía Legal de Zonas Francas de Iberoamérica 2024"
                category="Evento"
                date="2024-01-01"
                location="Bogotá, Colombia"
                button={{
                  label: "Ver más",
                  onClick: () => router.push("/evento-1"),
                }}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white lg:py-16 py-0">
        <div className="container mx-auto px-4 text-center lg:text-left">
          <h6 className="text-body2 text-text-primary text-center">
            Testimonios
          </h6>
          <TitleDecorative>Lo que dicen nuestros clientes</TitleDecorative>
        </div>
        {/* Not container content */}
        {/* Swiper testimonials */}
        <div className="relative">
          <Swiper
            modules={[Pagination]}
            spaceBetween={50}
            slidesPerView={1}
            className="h-full mt-8"
            pagination={{
              clickable: true,
              el: ".custom-swiper-pagination",
            }}
          >
            <SwiperSlide>
              <SlideSingleTestimonial
                caption="Cargo de la persona"
                title="Nombre de la persona"
                description="Lorem ipsum dolor sit amet conse ctetur adipiscing elit Vel mauris turpis vel eget nec orci nec ipsum Elementum felis eu pellentesque velit vulputate. Blandit consequat facilisi sagittis ut quis Integer et faucibus elemen."
                image={ImageVideo2.src}
                button={{
                  label: "Ver más",
                  onClick: () => setOpenModalVideo(true),
                }}
              />
            </SwiperSlide>
            <SwiperSlide>
              <SlideSingleTestimonial
                caption="Cargo de la persona"
                title="Nombre de la persona"
                description="Lorem ipsum dolor sit amet conse ctetur adipiscing elit Vel mauris turpis vel eget nec orci nec ipsum Elementum felis eu pellentesque velit vulputate. Blandit consequat facilisi sagittis ut quis Integer et faucibus elemen."
                image={ImageVideo2.src}
                button={{
                  label: "Ver más",
                  onClick: () => setOpenModalVideo(true),
                }}
              />
            </SwiperSlide>
          </Swiper>
          {/* Custom pagination */}
          <div className="flex lg:justify-end absolute bottom-3 w-full lg:w-1/2 left-0 pr-8 z-10">
            <div className="custom-swiper-pagination space-x-2 [&>span]:border [&>span]:border-details [&>span]:!bg-transparent [&>span]:!opacity-100 [&>span.swiper-pagination-bullet-active]:!bg-details [&>span]:cursor-pointer text-center lg:text-right"></div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-screen-lg mx-auto">
            <div className="w-full h-100 border border-gray-200 rounded-lg flex justify-center items-center text-3xl text-primary font-medium">
              {/* Widget */}
              <p>Widget 1</p>
            </div>
            <div className="w-full h-100 border border-gray-200 rounded-lg flex justify-center items-center text-3xl text-primary font-medium">
              {/* Widget */}
              <p>Widget 2</p>
            </div>
            <div className="w-full h-100 border border-gray-200 rounded-lg flex justify-center items-center text-3xl text-primary font-medium">
              {/* Widget */}
              <p>Widget 3</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white pt-16">
        <div className="container mx-auto pb-8 lg:pb-16 px-0 md:px-16 max-w-6xl">
          <TitleDecorative dividerColor="bg-[#94D133]">
            Nuestros afiliados
          </TitleDecorative>

          <Swiper
            modules={[Autoplay, Navigation]}
            spaceBetween={50}
            slidesPerView={5}
            className="mt-10 swiper-custom"
            autoplay={{ delay: 2500, disableOnInteraction: false }}
            navigation={true}
            loop={true}
            breakpoints={{
              0: {
                slidesPerView: 1.8,
                centeredSlides: true,
              },
              768: {
                slidesPerView: 3,
              },

              1024: {
                slidesPerView: 5,
              },
            }}
          >
            <SwiperSlide>
              <img
                className="w-full h-24 object-contain max-w-fit mx-auto grayscale md:grayscale hover:grayscale-0 transition-all duration-300 swiper-slide-mobile"
                src={LogoCodevi.src}
                alt="Logo"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                className="w-full h-24 object-contain max-w-fit mx-auto grayscale md:grayscale hover:grayscale-0 transition-all duration-300 swiper-slide-mobile"
                src={LogoCodevi.src}
                alt="Logo"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                className="w-full h-24 object-contain max-w-fit mx-auto grayscale md:grayscale hover:grayscale-0 transition-all duration-300 swiper-slide-mobile"
                src={LogoCodevi.src}
                alt="Logo"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                className="w-full h-24 object-contain max-w-fit mx-auto grayscale md:grayscale hover:grayscale-0 transition-all duration-300 swiper-slide-mobile"
                src={LogoCodevi.src}
                alt="Logo"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                className="w-full h-24 object-contain max-w-fit mx-auto grayscale md:grayscale hover:grayscale-0 transition-all duration-300 swiper-slide-mobile"
                src={LogoCodevi.src}
                alt="Logo"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                className="w-full h-24 object-contain max-w-fit mx-auto grayscale md:grayscale hover:grayscale-0 transition-all duration-300 swiper-slide-mobile"
                src={LogoCodevi.src}
                alt="Logo"
              />
            </SwiperSlide>
          </Swiper>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <TitleDecorative className="text-center">
            Nuestros patrocinadores
          </TitleDecorative>

          {/* Grid sponsors */}
          <div className="flex flex-wrap gap-8 justify-center items-center mt-8 [&>img]:grayscale [&>img]:hover:grayscale-0 [&>img]:transition-all [&>img]:duration-300 [&>img]:cursor-pointer">
            <img className="w-full max-w-fit max-h-16 object-contain" src={LogoAmpip.src} alt="Logo" />
            <img className="w-full max-w-fit max-h-16 object-contain" src={LogoAmpip.src} alt="Logo" />
            <img className="w-full max-w-fit max-h-16 object-contain" src={LogoAmpip.src} alt="Logo" />
            <img className="w-full max-w-fit max-h-16 object-contain" src={LogoAmpip.src} alt="Logo" />
            <img className="w-full max-w-fit max-h-16 object-contain" src={LogoAmpip.src} alt="Logo" />
            <img className="w-full max-w-fit max-h-16 object-contain" src={LogoAmpip.src} alt="Logo" />
            <img className="w-full max-w-fit max-h-16 object-contain" src={LogoAmpip.src} alt="Logo" />
            <img className="w-full max-w-fit max-h-16 object-contain" src={LogoAmpip.src} alt="Logo" />
            <img className="w-full max-w-fit max-h-16 object-contain" src={LogoAmpip.src} alt="Logo" />
            <img className="w-full max-w-fit max-h-16 object-contain" src={LogoAmpip.src} alt="Logo" />
            <img className="w-full max-w-fit max-h-16 object-contain" src={LogoAmpip.src} alt="Logo" />
          </div>
        </div>
      </section>
    </>
  );
}
