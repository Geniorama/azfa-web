'use client'

import CiudadOfertaImg from "@/assets/img/ciudad-oferta-inmobiliaria.svg";
import AdvancedSearchBar from "@/components/AdvancedSearchBar";
import CardInmueble from "@/components/CardInmueble";
import Pagination from "@/components/Pagination";
import TitleDecorative from "@/utils/TitleDecorative";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import LogoExample from "@/assets/img/Logo-AEZO 5.png";
import { useRealStateOffers } from "@/hooks/useRealStateOffers";
import { useState } from "react";

export default function OfertaInmobiliaria() {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 9; // 3x3 grid
  
  const { offers, loading, error, pagination } = useRealStateOffers(currentPage, pageSize);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-text-primary">Cargando ofertas inmobiliarias...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500">Error: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <section className="py-16">
        <div className="container mx-auto px-4 text-center flex flex-col gap-2 md:gap-6">
          <div>
            <h5 className="text-h6 md:text-h4 text-text-secondary">
              Invierta en Zonas Francas
            </h5>
            <h1 className="text-h3 md:text-h1 text-primary">Oferta Inmobiliaria</h1>
          </div>
          <p className="text-body md:text-h6 text-text-primary">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum,
            asperiores sit nam facere consequuntur dolore quo repellendus enim
            eligendi dolor.
          </p>

          <div className="hidden md:flex justify-center bg-white mt-16 pb-16 pt-8 px-5">
            <img
              className="w-full"
              src={CiudadOfertaImg.src}
              alt="Ciudad Oferta"
            />
          </div>
        </div>
      </section>

      <section>
        <div className="container mx-auto px-4 md:px-16 md:-mt-24 z-1 mb-6 relative">
          <AdvancedSearchBar />
        </div>
      </section>

      <section>
        <div className="container mx-auto pb-16 px-4 md:px-16">
          <p className="text-5 text-text-primary text-center my-10">
            Se encontraron <span className="font-bold">{pagination.total}</span> inmuebles que
            coinciden con su búsqueda
          </p>

          {/* Grid Cards */}
          {offers.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
              {offers.map((offer) => (
                <CardInmueble
                  key={offer.id}
                  id={offer.id}
                  title={offer.title}
                  offerType={offer.offerType}
                  propertyType={offer.propertyType}
                  propertyUse={offer.propertyUse}
                  city={offer.city}
                  country={offer.country}
                  status="Nuevo"
                  area={offer.area}
                  platinum={offer.platinum}
                  slug={offer.slug}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-text-primary text-lg">No se encontraron ofertas inmobiliarias</p>
            </div>
          )}
          
        </div>
      </section>

      {pagination.pageCount > 1 && (
        <section>
          <div className="container mx-auto pb-16 px-4 md:px-16 flex justify-center">
            <Pagination 
              currentPage={pagination.page} 
              totalPages={pagination.pageCount} 
              onPageChange={handlePageChange} 
            />
          </div>
        </section>
      )}

      <section>
        <div className="container mx-auto pb-8 lg:pb-16 px-0 md:px-16 max-w-6xl">
          <TitleDecorative dividerColor="bg-[#94D133]">
            Proveedores
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
            }}
          >
            <SwiperSlide>
              <img className="w-full max-w-fit mx-auto grayscale md:grayscale hover:grayscale-0 transition-all duration-300 swiper-slide-mobile" src={LogoExample.src} alt="Logo" />
            </SwiperSlide>  
            <SwiperSlide>
              <img className="w-full max-w-fit mx-auto grayscale md:grayscale hover:grayscale-0 transition-all duration-300 swiper-slide-mobile" src={LogoExample.src} alt="Logo" />
            </SwiperSlide>
            <SwiperSlide>
              <img className="w-full max-w-fit mx-auto grayscale md:grayscale hover:grayscale-0 transition-all duration-300 swiper-slide-mobile" src={LogoExample.src} alt="Logo" />
            </SwiperSlide>
            <SwiperSlide>
              <img className="w-full max-w-fit mx-auto grayscale md:grayscale hover:grayscale-0 transition-all duration-300 swiper-slide-mobile" src={LogoExample.src} alt="Logo" />
            </SwiperSlide>
            <SwiperSlide>
              <img className="w-full max-w-fit mx-auto grayscale md:grayscale hover:grayscale-0 transition-all duration-300 swiper-slide-mobile" src={LogoExample.src} alt="Logo" />
            </SwiperSlide>
            <SwiperSlide>
              <img className="w-full max-w-fit mx-auto grayscale md:grayscale hover:grayscale-0 transition-all duration-300 swiper-slide-mobile" src={LogoExample.src} alt="Logo" />
            </SwiperSlide>
            <SwiperSlide>
              <img className="w-full max-w-fit mx-auto grayscale md:grayscale hover:grayscale-0 transition-all duration-300 swiper-slide-mobile" src={LogoExample.src} alt="Logo" />
            </SwiperSlide>
          </Swiper>
        </div>
      </section>

      <section className="my-10">
        <div className="container mx-auto pb-8 lg:pb-16 px-0 md:px-16 max-w-6xl">
          <TitleDecorative dividerColor="bg-[#94D133]">
            Consultores
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
            }}
          >
            <SwiperSlide>
              <img className="w-full max-w-fit mx-auto grayscale md:grayscale hover:grayscale-0 transition-all duration-300 swiper-slide-mobile" src={LogoExample.src} alt="Logo" />
            </SwiperSlide>
            <SwiperSlide>
              <img className="w-full max-w-fit mx-auto grayscale md:grayscale hover:grayscale-0 transition-all duration-300 swiper-slide-mobile" src={LogoExample.src} alt="Logo" />
            </SwiperSlide>  
            <SwiperSlide>
              <img className="w-full max-w-fit mx-auto grayscale md:grayscale hover:grayscale-0 transition-all duration-300 swiper-slide-mobile" src={LogoExample.src} alt="Logo" />
            </SwiperSlide>
            <SwiperSlide>
              <img className="w-full max-w-fit mx-auto grayscale md:grayscale hover:grayscale-0 transition-all duration-300 swiper-slide-mobile" src={LogoExample.src} alt="Logo" />
            </SwiperSlide>
            <SwiperSlide>
              <img className="w-full max-w-fit mx-auto grayscale md:grayscale hover:grayscale-0 transition-all duration-300 swiper-slide-mobile" src={LogoExample.src} alt="Logo" />
            </SwiperSlide>
            <SwiperSlide>
              <img className="w-full max-w-fit mx-auto grayscale md:grayscale hover:grayscale-0 transition-all duration-300 swiper-slide-mobile" src={LogoExample.src} alt="Logo" />
            </SwiperSlide>
          </Swiper> 
        </div>
      </section>

      <section>
        <div className="flex md:hidden justify-center bg-white w-full overflow-hidden h-100">
            <img
              className="w-full h-full object-cover"
              src={CiudadOfertaImg.src}
              alt="Ciudad Oferta"
            />
        </div>
      </section>
    </div>
  );
}
