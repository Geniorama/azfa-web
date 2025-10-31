"use client";

import { useRouter } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import SliderArrowLeft from "@/utils/SliderArrowLeft";
import SliderArrowRight from "@/utils/SliderArrowRight";
import ServicioInfoImg from "@/assets/img/icon-home-informacion 1.svg";
import CoverVideo from "@/assets/img/cover-video.jpg";
import { IoMdPlay } from "react-icons/io";
import TitleDecorative from "@/utils/TitleDecorative";
import ServiceCard from "@/components/ServiceCard";
import Counter from "@/utils/Counter";
import IconIberoamerica from "@/assets/img/icon-home-iberoamerica-ZF 1.svg";
import Link from "next/link";
import CardNews from "@/components/CardNews";
import CardEvent from "@/components/CardEvent";
import { truncateText } from "@/utils/truncateText";
import SlideSingleHome from "@/components/SlideSingleHome";
import SlideSingleTestimonial from "@/components/SlideSingleTestimonial";
import Modal from "@/components/Modal";
import IntroPage from "@/components/IntroPage";
import { useState, useRef, useEffect } from "react";
import {
  HeroSlideData,
  IntroData,
  ServiceData,
  VideoType,
  StatisticsItemData,
  NewsType,
  EventType,
  TestimonialType,
  AffiliateSectionType,
  PartnersSectionType,
} from "@/types/componentsType";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { formatYouTubeUrl } from "@/utils/formatYouTubeUrl";

interface HomeViewProps {
  slidesData: HeroSlideData[];
  introData?: IntroData;
  contentWithVideoData?: {
    __component?: string;
    content?: string;
    video?: VideoType;
    id?: number;
  };
  servicesData?: {
    __component?: string;
    title?: string;
    services?: ServiceData[];
    id?: number;
  };
  statisticsData?: {
    __component?: string;
    title?: string;
    statistics?: StatisticsItemData[];
    id?: number;
  };
  newsData?: NewsType[] | null;
  newsSectionData?: {
    __component?: string;
    title?: string;
    viewAllLink?: {
      url?: string;
      label?: string;
    };
    id?: number;
  };
  eventsData?: EventType[] | null;
  eventSectionData?: {
    __component?: string;
    title?: string;
    viewAllLink?: {
      url?: string;
      label?: string;
    };
    id?: number;
  };
  testimonialsData?: TestimonialType[] | null;
  testimonialsSectionData?: {
    __component?: string;
    title?: string;
    label?: string;
    id?: number;
  };
  affiliatesSectionData?: AffiliateSectionType | null;
  partnersSectionData?: PartnersSectionType | null;
  sponsorsSectionData?: PartnersSectionType | null;
}

export default function Home({
  slidesData,
  introData,
  contentWithVideoData,
  servicesData,
  statisticsData,
  newsData,
  newsSectionData,
  eventsData,
  eventSectionData,
  testimonialsData,
  testimonialsSectionData,
  affiliatesSectionData,
  partnersSectionData,
  sponsorsSectionData,
}: HomeViewProps) {
  const router = useRouter();
  const [openModalVideo, setOpenModalVideo] = useState(false);
  const swiperRef = useRef<SwiperType | null>(null);

  const handleOpenNews = (url: string) => {
    window.open(url, "_blank");
  };

  const goToSlide = (index: number) => {
    if (swiperRef.current) {
      swiperRef.current.slideTo(index);
    }
  };

  useEffect(() => {
    console.log('servicesData', servicesData);
  }, [servicesData]);

  return (
    <>
      <Modal open={openModalVideo} onClose={() => setOpenModalVideo(false)}>
        <div className="bg-black overflow-hidden">
          {contentWithVideoData?.video?.videoType === "uploaded" && (
            <video
              src={contentWithVideoData?.video?.uploadedVideo?.url}
              autoPlay
              muted
              loop
              className="w-full h-auto max-h-[80vh] aspect-video"
              controls
            />
          )}
          {contentWithVideoData?.video?.videoType === "youtube" && (
            <div className="relative w-full h-0 pb-[56.25%] max-h-[80vh]">
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src={formatYouTubeUrl(
                  contentWithVideoData?.video?.youtubeUrl || ""
                )}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            </div>
          )}
          {contentWithVideoData?.video?.videoType === "vimeo" && (
            <div className="relative w-full h-0 pb-[56.25%] max-h-[80vh]">
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src={contentWithVideoData?.video?.vimeoUrl}
                title="Vimeo video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            </div>
          )}
        </div>
      </Modal>
      <section className=" bg-text-primary w-full h-[800px] lg:h-[calc(100vh-100px)] lg:min-h-[800px]">
        {/* Slider */}
        <div className="relative h-full">
          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={50}
            slidesPerView={1}
            navigation={{
              nextEl: ".custom-swiper-button-next",
              prevEl: ".custom-swiper-button-prev",
            }}
            className="h-full"
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
          >
            {slidesData && slidesData.length > 0 ? (
              slidesData.map((slide) => (
                <SwiperSlide
                  style={{
                    backgroundImage: `url(${slide.backgroundImage?.url || "/inicio-slide (1).jpg"
                      })`,
                  }}
                  key={slide.id}
                  className="bg-text-primary lg:py-24 py-16 bg-cover bg-right"
                >
                  <SlideSingleHome
                    caption={slide.label || ""}
                    title={slide.title || ""}
                    description={slide.subtitle || ""}
                    button={{
                      label: slide.button?.text || "Ver más",
                      onClick: () => router.push(slide.button?.link || "/"),
                    }}
                  />
                  <div className="absolute lg:hidden top-0 left-0 w-full h-full bg-primary/80 z-1"></div>
                </SwiperSlide>
              ))
            ) : (
              // Fallback slide cuando no hay datos
              <SwiperSlide
                style={{ backgroundImage: `url('/inicio-slide (1).jpg')` }}
                className="bg-text-primary"
              >
                <SlideSingleHome
                  caption="AZFA"
                  title="Asociación de Zonas Francas de Iberoamérica"
                  description="Conectando el ecosistema de zonas francas en Iberoamérica"
                  button={{
                    label: "Conocer más",
                    onClick: () => router.push("/quienes-somos"),
                  }}
                />
              </SwiperSlide>
            )}
          </Swiper>

          {/* Botones de navegación personalizados */}
          <div className="absolute bottom-0 right-0 left-0 pb-10 z-[1]">
            <div className="container mx-auto px-4">
              <div className="hidden lg:flex justify-end gap-4">
                <SliderArrowLeft className="custom-swiper-button-prev" />
                <SliderArrowRight className="custom-swiper-button-next" />
              </div>
              <hr className="my-8 border-background-3" />
              <div className="flex items-start justify-center gap-4 max-w-screen-lg mx-auto text-white">
                {slidesData?.slice(0, 3).map((slide, index) => (
                  <div
                    key={slide.id}
                    className="flex flex-col lg:flex-row items-center lg:items-start gap-2 w-full lg:w-1/3 justify-center cursor-pointer hover:opacity-80 transition-opacity duration-300"
                    onClick={() => goToSlide(index)}
                  >
                    <img
                      className="w-12"
                      src={
                        slide.iconLinks?.[0]?.icon?.customImage?.url ||
                        ServicioInfoImg.src
                      }
                      alt={slide.label || ""}
                    />
                    <p className="text-body2 text-center lg:text-left hover:underline decoration-details underline-offset-4 transition-all duration-300">
                      {slide.title}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="bg-white lg:pb-16 pt-16 pb-0">
        <div className="container mx-auto px-4">
          <div data-aos="fade-up">
            {introData && <IntroPage introData={introData} />}
          </div>
        </div>
      </section>

      <section className="bg-white lg:py-16 py-10">
        <div className="container mx-auto lg:px-4">
          <div className="flex flex-col lg:flex-row items-center justify-center text-text-primary">
            <div data-aos="fade-right" className="w-full lg:w-1/2">
              <div className="relative">
                <img
                  src={CoverVideo.src}
                  alt="Cover Video"
                  className="w-full lg:rounded-2xl lg:rounded-tl-none"
                />
                <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                  <button
                    onClick={() => setOpenModalVideo(true)}
                    className="bg-white/20 rounded-full cursor-pointer flex items-center justify-center w-28 h-28 hover:scale-110 transition-all duration-300"
                  >
                    <IoMdPlay className="text-white text-5xl translate-x-0.5" />
                  </button>
                </div>
              </div>
            </div>

            <div
              data-aos="fade-left"
              className="w-full lg:w-1/2 lg:pl-30 text-body1 p-4 lg:p-0"
            >
              <div>
                <ReactMarkdown rehypePlugins={[rehypeRaw]}>
                  {contentWithVideoData?.content}
                </ReactMarkdown>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white lg:pt-16">
        <div className="container mx-auto px-4">
          <TitleDecorative data-aos="fade-up">
            {servicesData?.title || "Nuestros Servicios"}
          </TitleDecorative>
        </div>

        {/* Services cards */}
        <div
          data-aos="fade-up"
          data-aos-delay="200"
          className="hidden lg:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-[1px] mt-16">
          {servicesData?.services && servicesData.services.length > 0 ? (
            servicesData.services.map((service) => (
              <ServiceCard
                key={service.id}
                title={service.title || ""}
                subtitle={service.tag || "Servicio"}
                image={
                  service.coverImage?.url ||
                  "https://placehold.co/600x1000/10356B/FFFFFF"
                }
                button={{
                  label: service.button?.text || "Ver más",
                  onClick: () =>
                    router.push(service.button?.link || "/servicios"),
                }}
              />
            ))
          ) : (
            // Fallback services cuando no hay datos
            <>
              <ServiceCard
                title="POSICIONAMIENTO"
                subtitle="Servicio"
                image="https://testazfabucket.s3.us-east-2.amazonaws.com/1_posicionamiento_693973b4e2.webp"
                button={{
                  label: "Ver más",
                  onClick: () => router.push("/servicio-1"),
                }}
              />
              <ServiceCard
                title="PROMOCIÓN"
                subtitle="Servicio"
                image="https://testazfabucket.s3.us-east-2.amazonaws.com/2_promocion_731d85b7cd.webp"
                button={{
                  label: "Ver más",
                  onClick: () => router.push("/servicio-2"),
                }}
              />
              <ServiceCard
                title="INFORMACIÓN ESPECIALIZADA"
                subtitle="Servicio"
                image="https://testazfabucket.s3.us-east-2.amazonaws.com/3_informacion_7fa601f8f5.webp"
                button={{
                  label: "Ver más",
                  onClick: () => router.push("/servicio-3"),
                }}
              />
              <ServiceCard
                title="NEGOCIOS"
                subtitle="Servicio"
                image="https://testazfabucket.s3.us-east-2.amazonaws.com/4_negocios_7149dea41e.webp"
                button={{
                  label: "Ver más",
                  onClick: () => router.push("/servicio-4"),
                }}
              />
              <ServiceCard
                title="COMUNIDAD"
                subtitle="Servicio"
                image="https://testazfabucket.s3.us-east-2.amazonaws.com/5_Comunidad_14858a626f.webp"
                button={{
                  label: "Ver más",
                  onClick: () => router.push("/servicio-5"),
                }}
              />
            </>
          )}
        </div>

        {/* Services cards mobile swiper */}
        <div
          data-aos="fade-up"
          data-aos-delay="200"
          className="lg:hidden mt-14">
          <Swiper
            modules={[Pagination]}
            spaceBetween={50}
            slidesPerView={1}
            pagination={{
              clickable: true,
            }}
            className="[&>.swiper-pagination]:!relative [&>.swiper-pagination]:!top-0 [&>.swiper-pagination]:py-12 [&>.swiper-pagination>span]:!border [&>.swiper-pagination>span]:!border-details [&>.swiper-pagination>span]:!bg-transparent [&>.swiper-pagination>span]:!opacity-100 [&>.swiper-pagination>span.swiper-pagination-bullet-active]:!bg-details [&>.swiper-pagination>span]:!cursor-pointer"
          >
            {servicesData?.services?.map((service) => (
              <SwiperSlide key={service.id}>
                <ServiceCard
                  title={service.title || ""}
                  subtitle={service.tag || "Servicio"}
                  image={
                    service.coverImage?.url ||
                    "https://placehold.co/600x1000/10356B/FFFFFF"
                  }
                  button={{
                    label: service.button?.text || "Ver más",
                    onClick: () =>
                      router.push(service.button?.link || "/servicios"),
                  }}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      <section className="bg-[#D5E3EA] py-16 lg:py-24">
        <div className="container mx-auto px-4 gap-6 2xl:gap-1 flex flex-col lg:flex-row items-start justify-center text-text-primary">
          <div className="w-full lg:w-1/3" data-aos="fade-right">
            <TitleDecorative
              dividerColor="bg-[#94D133]"
              className="text-left items-start"
            >
              {statisticsData?.title || "Las Zonas Francas de Iberoamérica"}
            </TitleDecorative>
          </div>
          <div
            data-aos="fade-up"
            data-aos-delay="100"
            className="w-full lg:w-1/3 space-y-10 mt-14 lg:mt-0">
            {statisticsData?.statistics?.slice(0, 2).map((statistic, index) => (
              <div
                key={statistic.id || index}
                className="flex items-center gap-6"
              >
                <img
                  src={statistic.icon?.customImage?.url || IconIberoamerica.src}
                  alt={statistic.label || "Icon Iberoamérica"}
                  className="w-16 h-16"
                />
                <Counter
                  value={parseInt(statistic.value || "0")}
                  prefix={statistic.prefix || "+"}
                  leyend={statistic.label || ""}
                  thousandSeparator="."
                />
              </div>
            ))}
            {/* Fallback si no hay datos */}
            {(!statisticsData?.statistics ||
              statisticsData.statistics.length === 0) && (
                <>
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
                      value={8000}
                      prefix="+"
                      leyend="Empresas"
                      thousandSeparator="."
                    />
                  </div>
                </>
              )}
          </div>
          <div
            data-aos="fade-up"
            data-aos-delay="200"
            className="w-full lg:w-1/3 space-y-10">
            {statisticsData?.statistics?.slice(2).map((statistic, index) => (
              <div
                key={statistic.id || index}
                className={`flex items-center gap-6 ${index === 0 ? "mt-8 lg:mt-0" : ""
                  }`}
              >
                <img
                  src={statistic.icon?.customImage?.url || IconIberoamerica.src}
                  alt={statistic.label || "Icon Iberoamérica"}
                  className="w-16 h-16"
                />
                <Counter
                  value={parseInt(statistic.value || "0")}
                  prefix={statistic.prefix || "+"}
                  leyend={statistic.label || ""}
                  thousandSeparator="."
                />
              </div>
            ))}
            {/* Fallback si no hay datos */}
            {(!statisticsData?.statistics ||
              statisticsData.statistics.length === 0) && (
                <>
                  <div className="flex items-center gap-6 mt-8 lg:mt-0">
                    <img
                      src={IconIberoamerica.src}
                      alt="Icon Iberoamérica"
                      className="w-16 h-16"
                    />
                    <Counter
                      value={1090000}
                      prefix="+"
                      leyend="Empleos"
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
                      value={65800}
                      prefix="USD $"
                      leyend="millones EXPORTACIÓN"
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
                      value={48000}
                      prefix="USD $"
                      leyend="millones INVERSIONES"
                      thousandSeparator="."
                    />
                  </div>
                </>
              )}
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="container mx-auto px-4 flex flex-col lg:flex-row items-start justify-center text-text-primary gap-20">
          <div className="w-full lg:w-1/2">
            <div
              data-aos="fade-up"
              className="flex items-center justify-between mb-12 lg:mb-0">
              <TitleDecorative className="text-left items-start">
                {newsSectionData?.title || "Noticias"}
              </TitleDecorative>
              <Link
                className="underline underline-offset-8 decoration-white hover:decoration-details transition-all duration-300"
                href={newsSectionData?.viewAllLink?.url || "/noticias"}
              >
                {newsSectionData?.viewAllLink?.label || "Ver todas"}
              </Link>
            </div>

            <div
              data-aos="fade-up"
              data-aos-delay="200"
              className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
              {newsData && newsData.length > 0 ? (
                newsData.slice(0, 2).map((newsItem) => (
                  <CardNews
                    key={newsItem.id}
                    image={
                      newsItem.thumbnail?.formats?.small?.url ||
                      "https://testazfabucket.s3.us-east-2.amazonaws.com/noticias_3_adfc8dd1e2.png"
                    }
                    title={newsItem.title}
                    category={"Noticia"}
                    description={truncateText(newsItem.extract, 100)}
                    button={{
                      label: "Ver más",
                      onClick: () => {
                        if (newsItem.externalLink) {
                          handleOpenNews(newsItem.externalLink);
                        } else {
                          router.push(`/noticias/${newsItem.slug}`);
                        }
                      },
                    }}
                  />
                ))
              ) : (
                // Fallback cuando no hay datos de noticias
                <>
                  <CardNews
                    image="https://testazfabucket.s3.us-east-2.amazonaws.com/noticias_3_adfc8dd1e2.png"
                    title="Zonas francas: piden modernizar la ley y potenciar la competitividad en Argentina"
                    category="Noticia"
                    description={truncateText(
                      "En el marco del Consejo Federal de Zonas Francas, representantes provinciales coincidieron en la necesidad de actualizar la normativa vigente y generar condiciones que permitan desarrollar plenamente su potencial exportador, logístico e industrial",
                      100
                    )}
                    button={{
                      label: "Ver más",
                      onClick: () =>
                        handleOpenNews(
                          "https://www.elfinancierocr.com/economia-y-politica/economia-de-costa-rica-crece-46-en-julio-impulsada/NNWQX52JYZDOFKCHKUS3GKS7ZM/story/"
                        ),
                    }}
                  />
                  <CardNews
                    image="https://testazfabucket.s3.us-east-2.amazonaws.com/657e7211_e1d3_43fc_a2ca_8dbc93648e0c_895fdc8714.jpg"
                    title="Economía de Costa Rica crece 4,6% en julio, impulsada por las zonas francas, pero existen desafíos en sectores clave"
                    category="Noticia"
                    description={truncateText(
                      "La producción nacional de Costa Rica, medida por la serie tendencia ciclo del Índice Mensual de Actividad Económica (IMAE), registró un crecimiento interanual del 4,6% en julio de 2025, según el más reciente informe publicado por el Banco Central de Costa Rica (BCCR)",
                      100
                    )}
                    button={{
                      label: "Ver más",
                      onClick: () => router.push("/noticia-1"),
                    }}
                  />
                </>
              )}
            </div>
          </div>
          <div className="w-full lg:w-1/2">
            <div
              data-aos="fade-up"
              data-aos-delay="100"
              className="flex items-center justify-between">
              <TitleDecorative
                dividerColor="bg-[#94D133]"
                className="text-left items-start"
              >
                {eventSectionData?.title || "Eventos"}
              </TitleDecorative>
              <Link
                className="underline underline-offset-8 decoration-white hover:decoration-details transition-all duration-300"
                href={eventSectionData?.viewAllLink?.url || "/eventos"}
              >
                {eventSectionData?.viewAllLink?.label || "Ver todos"}
              </Link>
            </div>

            <div
              data-aos="fade-up"
              data-aos-delay="300"
              className="space-y-8 mt-8">
              {eventsData && eventsData.length > 0 ? (
                eventsData.slice(0, 2).map((event) => (
                  <CardEvent
                    key={event.id}
                    image={
                      event.featuredImage?.url ||
                      "https://testazfabucket.s3.us-east-2.amazonaws.com/img_evento_1a_World_FZO_af2dc47ee4.webp"
                    }
                    title={event.title}
                    category={"Evento"}
                    date={event.startDate}
                    location={event.location}
                    calendarIcon={event.calendarIcon}
                    locationIcon={event.locationIcon}
                    addressIcon={event.addressIcon}
                    direction="horizontal"
                    button={{
                      label: event.buttonText || "Ver más",
                      onClick: () => {
                        if (event.buttonUrl) {
                          window.open(event.buttonUrl, "_blank");
                        } else {
                          router.push(`/eventos/${event.slug}`);
                        }
                      },
                    }}
                    hotel={event.address}
                  />
                ))
              ) : (
                // Fallback cuando no hay datos de eventos
                <>
                  <CardEvent
                    image="https://testazfabucket.s3.us-east-2.amazonaws.com/img_evento_1a_World_FZO_af2dc47ee4.webp"
                    title="11º Congreso Mundial de la World FZO"
                    category="Evento"
                    date="2024-10-10"
                    location="Hainan, China"
                    button={{
                      label: "Ver más",
                      onClick: () => router.push("/eventos"),
                    }}
                    hotel="Centro Internacional de Conferencias y Exposiciones de Hainan"
                  />
                  <CardEvent
                    image="https://testazfabucket.s3.us-east-2.amazonaws.com/img_evento_2_Iberoamerica_Free_Trade_Zone_Conference_95b385bcf7.webp"
                    title="XXVIII Conferencia de Zonas Francas de Iberoamérica"
                    category="Evento"
                    date="2024-11-19"
                    location="Punta del Este, Uruguay"
                    button={{
                      label: "Ver más",
                      onClick: () => router.push("/eventos"),
                    }}
                    hotel="Hotel por confirmar"
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white lg:py-16 py-0">
        <div
          data-aos="fade-up"
          className="container mx-auto px-4 text-center lg:text-left">
          <h6
            className="text-body2 text-text-primary text-center">
            {testimonialsSectionData?.label || "Testimonios"}
          </h6>
          <TitleDecorative data-aos-delay="100">
            {testimonialsSectionData?.title || "Lo que dicen nuestros clientes"}
          </TitleDecorative>
        </div>
        {/* Not container content */}
        {/* Swiper testimonials */}
        <div
          data-aos="fade-up"
          data-aos-delay="200"
          className="relative">
          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={50}
            slidesPerView={1}
            className="h-full mt-8"
            pagination={{
              clickable: true,
              el: ".custom-swiper-pagination",
            }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
          >
            {testimonialsData && testimonialsData.length > 0 ? (
              testimonialsData.map((testimonial) => (
                <SwiperSlide key={testimonial.id}>
                  <SlideSingleTestimonial
                    caption={testimonial.company}
                    title={testimonial.name}
                    description={testimonial.testimonial}
                    image={
                      testimonial.coverImage?.url ||
                      "https://testazfabucket.s3.us-east-2.amazonaws.com/img_Testimonio_1_Patricia_Figueroa_color_f9ca828652.jpg"
                    }
                    button={{
                      label: "Ver más",
                      onClick: () => setOpenModalVideo(true),
                    }}
                  />
                </SwiperSlide>
              ))
            ) : (
              // Fallback cuando no hay datos de testimonios
              <>
                <SwiperSlide>
                  <SlideSingleTestimonial
                    caption="Directora Ejecutiva, Camtex"
                    title="Patricia Figueroa"
                    description="CAMTEX forma parte de AZFA desde hace más de 10 años. Una decisión sumamente acertada dado que AZFA nos brinda un importante espacio de diálogo del más alto nivel donde se intercambian conocimientos y se establece una red de contactos con los otros miembros que nos permiten estar a la vanguardia de lo que acaece en el entorno internacional…"
                    image={
                      "https://testazfabucket.s3.us-east-2.amazonaws.com/img_Testimonio_1_Patricia_Figueroa_color_f9ca828652.jpg"
                    }
                    button={{
                      label: "Ver más",
                      onClick: () => setOpenModalVideo(true),
                    }}
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <SlideSingleTestimonial
                    caption="Presidente, AraújoIbarra"
                    title="Martín Ibarra"
                    description="Para mí es un gran honor ser miembro de AZFA y estoy vinculado a AZFA hace 26 años cuando se crió AZFA en República Dominicana y tuve el honor de ser su primer presidente. En estos 26 años de trabajo ininterrumpido, no hemos descansado en trabajar por la defensa del régimen franco en la región…"
                    image={
                      "https://testazfabucket.s3.us-east-2.amazonaws.com/img_Testimonio_3_Martin_Ibarra_Negro_f01f8bdd75.jpg"
                    }
                    button={{
                      label: "Ver más",
                      onClick: () => setOpenModalVideo(true),
                    }}
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <SlideSingleTestimonial
                    caption="Gerente General, La Lima Free Zone and Business Park"
                    title="Fernando Carazo"
                    description="Somos miembros de azfa desde ya hace unos 5 años aproximadamente. El papel de AZFA nos parece importantísimo, la unificación de la voz de los stateholders de regimenes de zona franca y regímenes especiales no solo de la región sino del mundo nos parece muy importante que sea unificada por medio de AZFA…"
                    image={
                      "https://testazfabucket.s3.us-east-2.amazonaws.com/img_Testimonio_2_Fernando_Carazo_negro_9d35c882c6.jpg"
                    }
                    button={{
                      label: "Ver más",
                      onClick: () => setOpenModalVideo(true),
                    }}
                  />
                </SwiperSlide>
              </>
            )}
          </Swiper>
          {/* Custom pagination */}
          <div className="flex lg:justify-end absolute bottom-3 w-full lg:w-1/2 left-0 pr-8 z-10">
            <div className="custom-swiper-pagination space-x-2 [&>span]:border [&>span]:border-details [&>span]:!bg-transparent [&>span]:!opacity-100 [&>span.swiper-pagination-bullet-active]:!bg-details [&>span]:cursor-pointer text-center lg:text-right"></div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 hidden">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center">
            <div className="w-auto border border-gray-200 rounded-lg flex justify-center items-center text-3xl text-primary font-medium">
              {/* Widget facebook */}
              {/* <iframe src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fasociacionzfa&tabs=timeline&width=340&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId=939575044228291" width="340" height="500" style={{ border: 'none', overflow: 'hidden' }} scrolling="no" allowFullScreen={true} allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe> */}
            </div>
          </div>
        </div>
      </section>

      {/* embed widgets social media */}

      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <iframe src="https://b80a5da9dc03409482ed473ddf14f9a9.elf.site" className="w-full h-180 lg:h-190 overflow-hidden" style={{ border: 'none', overflow: 'hidden' }} allowFullScreen={true} allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="container mx-auto px-4 relative text-center">
          <a href="https://www.linkedin.com/company/asociacionzfa" target="_blank" rel="noopener noreferrer" className="bg-secondary text-white px-4 py-2 rounded-sm my-4 inline-block hover:bg-details transition-all duration-300">
            Siganos en LinkedIn
          </a>
          <iframe src="https://60a83efca0864b8a8b50e4c99a33e1f4.elf.site" className="w-full h-120 overflow-hidden" style={{ border: 'none', overflow: 'hidden' }} allowFullScreen={true} allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe>
        </div>
      </section>

      {/* Afiliados */}
      <section className="bg-white pt-16">
        <div className="container mx-auto pb-8 lg:pb-16 px-0 md:px-16 max-w-6xl">
          <TitleDecorative data-aos="fade-up" dividerColor="bg-[#94D133]">
            {affiliatesSectionData?.title}
          </TitleDecorative>

          <Swiper
            data-aos="fade-up"
            data-aos-delay="200"
            modules={[Autoplay, Navigation]}
            spaceBetween={30}
            slidesPerView={affiliatesSectionData?.logos?.length || 1}
            slidesPerGroup={affiliatesSectionData?.logos && affiliatesSectionData.logos.length > 5 ? 3 : 1}
            className="mt-10 swiper-custom"
            autoplay={{ delay: 2500, disableOnInteraction: false }}
            navigation={affiliatesSectionData?.logos && affiliatesSectionData.logos.length > 1}
            loop={affiliatesSectionData?.logos && affiliatesSectionData.logos.length > 1}
            speed={2000}
            centeredSlides={true}
            breakpoints={{
              0: {
                slidesPerView: Math.min(affiliatesSectionData?.logos?.length || 1, 1),
                centeredSlides: true,
                spaceBetween: 20,
                slidesPerGroup: 1,
              },
              480: {
                slidesPerView: Math.min(affiliatesSectionData?.logos?.length || 2, 2),
                centeredSlides: (affiliatesSectionData?.logos?.length || 0) === 1,
                spaceBetween: 30,
                slidesPerGroup: affiliatesSectionData?.logos && affiliatesSectionData.logos.length > 3 ? 2 : 1,
              },
              768: {
                slidesPerView: Math.min(affiliatesSectionData?.logos?.length || 3, 3),
                centeredSlides: (affiliatesSectionData?.logos?.length || 0) <= 2,
                spaceBetween: 40,
                slidesPerGroup: affiliatesSectionData?.logos && affiliatesSectionData.logos.length > 4 ? 2 : 1,
              },
              1024: {
                slidesPerView: Math.min(affiliatesSectionData?.logos?.length || 5, 5),
                centeredSlides: (affiliatesSectionData?.logos?.length || 0) <= 3,
                spaceBetween: 50,
                slidesPerGroup: affiliatesSectionData?.logos && affiliatesSectionData.logos.length > 6 ? 3 : 1,
              },
            }}
          >
            {affiliatesSectionData?.logos &&
              affiliatesSectionData.logos.length > 0 && (
                affiliatesSectionData.logos.map((affiliate) => (
                  <SwiperSlide key={affiliate.id}>
                    <img
                      className="w-full h-24 object-contain max-w-fit mx-auto grayscale md:grayscale hover:grayscale-0 transition-all duration-300 swiper-slide-mobile"
                      src={
                        affiliate.logo?.url
                      }
                      alt={affiliate.name || "Logo"}
                      onClick={() => {
                        if (affiliate.url) {
                          window.open(affiliate.url, "_blank");
                        }
                      }}
                      style={{ cursor: affiliate.url ? "pointer" : "default" }}
                    />
                  </SwiperSlide>
                ))
              )}
          </Swiper>
        </div>
      </section>

      {/* Aliados */}
      <section className="bg-white pt-16">
        <div className="container mx-auto pb-8 lg:pb-16 px-0 md:px-16 max-w-6xl">
          <TitleDecorative data-aos="fade-up" className="text-center">
            {partnersSectionData?.title || "Nuestros aliados"}
          </TitleDecorative>

          {/* Swiper sponsors */}
          <Swiper
            data-aos="fade-up"
            data-aos-delay="200"
            modules={[Autoplay, Navigation]}
            spaceBetween={30}
            slidesPerView={partnersSectionData?.logos?.length || 1}
            slidesPerGroup={partnersSectionData?.logos && partnersSectionData.logos.length > 5 ? 3 : 1}
            className="mt-10 swiper-custom"
            autoplay={{ delay: 2500, disableOnInteraction: false }}
            navigation={partnersSectionData?.logos && partnersSectionData.logos.length > 1}
            loop={partnersSectionData?.logos && partnersSectionData.logos.length > 1}
            speed={2000}
            centeredSlides={true}
            breakpoints={{
              0: {
                slidesPerView: Math.min(partnersSectionData?.logos?.length || 1, 1),
                centeredSlides: true,
                spaceBetween: 20,
                slidesPerGroup: 1,
              },
              480: {
                slidesPerView: Math.min(partnersSectionData?.logos?.length || 2, 2),
                centeredSlides: (partnersSectionData?.logos?.length || 0) === 1,
                spaceBetween: 30,
                slidesPerGroup: partnersSectionData?.logos && partnersSectionData.logos.length > 3 ? 2 : 1,
              },
              768: {
                slidesPerView: Math.min(partnersSectionData?.logos?.length || 3, 3),
                centeredSlides: (partnersSectionData?.logos?.length || 0) <= 2,
                spaceBetween: 40,
                slidesPerGroup: partnersSectionData?.logos && partnersSectionData.logos.length > 4 ? 2 : 1,
              },
              1024: {
                slidesPerView: Math.min(partnersSectionData?.logos?.length || 5, 5),
                centeredSlides: (partnersSectionData?.logos?.length || 0) <= 3,
                spaceBetween: 50,
                slidesPerGroup: partnersSectionData?.logos && partnersSectionData.logos.length > 6 ? 3 : 1,
              },
            }}
          >
            {partnersSectionData?.logos &&
              partnersSectionData.logos.length > 0 &&
              partnersSectionData.logos.map((partner) => (
                <SwiperSlide key={partner.id}>
                  <img
                    key={partner.id}
                    className="w-full max-w-fit max-h-16 object-contain"
                    src={partner.logo?.url}
                    alt={partner.name || "Logo"}
                    onClick={() => {
                      if (partner.url) {
                        window.open(partner.url, "_blank");
                      }
                    }}
                    style={{ cursor: partner.url ? "pointer" : "default" }}
                  />
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
      </section>

      {/* Sponsors */}
      {sponsorsSectionData?.logos && sponsorsSectionData.logos.length > 0 && (
        <section className="bg-white pt-16">
          <div className="container mx-auto pb-8 lg:pb-16 px-0 md:px-16 max-w-6xl">
            <TitleDecorative data-aos="fade-up" className="text-center">
              {sponsorsSectionData?.title || "Nuestros sponsors"}
            </TitleDecorative>

            <Swiper
              data-aos="fade-up"
              data-aos-delay="200"
              modules={[Autoplay, Navigation]}
              spaceBetween={30}
              slidesPerView={sponsorsSectionData?.logos?.length || 1}
              slidesPerGroup={sponsorsSectionData?.logos && sponsorsSectionData.logos.length > 5 ? 3 : 1}
              className="mt-10 swiper-custom"
              autoplay={{ delay: 2500, disableOnInteraction: false }}
              navigation={sponsorsSectionData?.logos && sponsorsSectionData.logos.length > 1}
              loop={sponsorsSectionData?.logos && sponsorsSectionData.logos.length > 1}
              speed={2000}
              centeredSlides={true}
              breakpoints={{
                0: {
                  slidesPerView: Math.min(sponsorsSectionData?.logos?.length || 1, 1),
                  centeredSlides: true,
                  spaceBetween: 20,
                  slidesPerGroup: 1,
                },
                480: {
                  slidesPerView: Math.min(sponsorsSectionData?.logos?.length || 2, 2),
                  centeredSlides: sponsorsSectionData?.logos?.length === 1,
                  spaceBetween: 30,
                  slidesPerGroup: sponsorsSectionData?.logos && sponsorsSectionData.logos.length > 3 ? 2 : 1,
                },
                768: {
                  slidesPerView: Math.min(sponsorsSectionData?.logos?.length || 3, 3),
                  centeredSlides: sponsorsSectionData?.logos?.length <= 2,
                  spaceBetween: 40,
                  slidesPerGroup: sponsorsSectionData?.logos && sponsorsSectionData.logos.length > 4 ? 2 : 1,
                },
                1024: {
                  slidesPerView: Math.min(sponsorsSectionData?.logos?.length || 5, 5),
                  centeredSlides: sponsorsSectionData?.logos?.length <= 3,
                  spaceBetween: 50,
                  slidesPerGroup: sponsorsSectionData?.logos && sponsorsSectionData.logos.length > 6 ? 3 : 1,
                },
              }}
            >
              {sponsorsSectionData.logos.map((sponsor) => (
                <SwiperSlide key={sponsor.id}>
                  <img
                    key={sponsor.id}
                    className="w-full max-w-fit max-h-16 object-contain"
                    src={sponsor.logo?.url}
                    alt={sponsor.name || "Logo"}
                    onClick={() => {
                      if (sponsor.url) {
                        window.open(sponsor.url, "_blank");
                      }
                    }}
                    style={{ cursor: sponsor.url ? "pointer" : "default" }}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </section>
      )}
    </>
  );
}
