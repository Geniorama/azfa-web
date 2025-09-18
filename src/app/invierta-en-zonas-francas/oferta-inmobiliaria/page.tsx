'use client'

import CiudadOfertaImg from "@/assets/img/ciudad-oferta-inmobiliaria.svg";
import AdvancedSearchBar from "@/components/AdvancedSearchBar";
import CardInmueble from "@/components/CardInmueble";
import Pagination from "@/components/Pagination";
import LoadingSpinner from "@/components/LoadingSpinner";
import TitleDecorative from "@/utils/TitleDecorative";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";

import { useRealStateOffers } from "@/hooks/useRealStateOffers";
import { useState, useEffect } from "react";
import { ContentType } from "@/types/contentType";
import type { FilterValuesProps } from "@/components/AdvancedSearchBar";

export default function OfertaInmobiliaria() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageContent, setPageContent] = useState<ContentType | null>(null);
  const [searchFilters, setSearchFilters] = useState<FilterValuesProps>({
    offerType: 'todos',
    propertyType: 'todos',
    propertyUse: 'todos',
    city: 'todos',
    country: 'todos',
    propertyStatus: 'todos'
  });
  const pageSize = 9; // 3x3 grid
  
  const { offers, loading, error, pagination } = useRealStateOffers(currentPage, pageSize, searchFilters);

  const getPageContentBySlug = async (slug: string) => {
    try {
      const response = await fetch(`/api/getContentBySlug?slug=${slug}&populate[0]=heading.backgroundImg&populate[1]=sections.images`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error al obtener el contenido:", error);
      return { success: false, error: "Error de conexión" };
    }
  };

  useEffect(() => {
    const fetchPageContent = async () => {
      const data = await getPageContentBySlug("oferta-inmobiliaria");

      if (data.success && data.data?.data?.[0]) {
        console.log('data', data);
        const content = data.data.data[0];
        const transformedData: ContentType = {
          ...content,
          heading: {
            ...content.heading,
            imageUrl: content.heading?.backgroundImg?.url || ''
          }
        }
        setPageContent(transformedData);
      } else {
        console.error("Error al obtener el contenido:", data.error || "No se encontró contenido");
        setPageContent(null);
      }
    };
    fetchPageContent();
  }, []);

  useEffect(() => {
    console.log('offers', offers);
  }, [offers]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearch = (filters: FilterValuesProps) => {
    console.log('Filtros recibidos en página:', filters);
    setSearchFilters(filters);
    setCurrentPage(1); // Reset to first page when searching
    // Scroll to results
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return <LoadingSpinner message="Cargando ofertas inmobiliarias..." />;
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

  if (!pageContent) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 text-lg">Error al cargar el contenido</p>
          <p className="text-gray-600 mt-2">No se pudo cargar la información de oferta inmobiliaria</p>
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
              {pageContent?.heading?.smallTitle}
            </h5>
            <h1 className="text-h3 md:text-h1 text-primary">{pageContent?.heading?.title}</h1>
          </div>
          <p className="text-body md:text-h6 text-text-primary">
            {pageContent?.heading?.description}
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
          <AdvancedSearchBar onSearch={handleSearch} />
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
                  propertyStatus={offer.propertyStatus}
                  area={offer.area}
                  platinum={offer.platinum}
                  slug={offer.slug}
                  image={offer.image}
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

      {pageContent?.sections?.map((section) => (
        <section className="mb-10" key={section.id}>
          <div className="container mx-auto pb-8 lg:pb-16 px-0 md:px-16 max-w-6xl">
            <TitleDecorative dividerColor="bg-[#94D133]">
              {section.title}
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
              {section.images.map((image) => (
                <SwiperSlide key={image.id}>
                  <img className="w-full h-24 object-contain max-w-fit mx-auto grayscale md:grayscale hover:grayscale-0 transition-all duration-300 swiper-slide-mobile" src={image.url} alt="Logo" />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </section>
      ))}

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
