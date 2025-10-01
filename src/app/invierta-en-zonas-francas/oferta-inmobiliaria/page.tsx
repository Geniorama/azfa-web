"use client";

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
import { useRouter, useSearchParams } from "next/navigation";
import { useRealStateOffers } from "@/hooks/useRealStateOffers";
import { useState, useEffect } from "react";
import { ContentType } from "@/types/contentType";
import { InmuebleType } from "@/types/inmuebleType";
import type { FilterValuesProps } from "@/components/AdvancedSearchBar";
import {
  extractFilterOptions,
  FilterOptions,
} from "@/utils/extractFilterOptions";
import IconNoResults from "@/assets/img/search-icon-offer.svg";
import Button from "@/utils/Button";
import IconError from "@/assets/img/icon-no-load.svg";

export default function OfertaInmobiliaria() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageContent, setPageContent] = useState<ContentType | null>(null);
  const [filterOptions, setFilterOptions] = useState<FilterOptions | null>(
    null
  );
  const [optionsLoading, setOptionsLoading] = useState(true);
  const [searchFilters, setSearchFilters] = useState<FilterValuesProps>({
    offerType: "",
    propertyType: "",
    propertyUse: "",
    city: "",
    country: "",
    propertyStatus: "",
  });
  const pageSize = 9; // 3x3 grid

  const { offers, loading, error, pagination } = useRealStateOffers(
    currentPage,
    pageSize,
    searchFilters
  );

  const getPageContentBySlug = async (slug: string) => {
    try {
      const response = await fetch(
        `/api/getContentBySlug?slug=${slug}&populate[0]=heading.backgroundImg&populate[1]=sections.images`
      );
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
        console.log("data", data);
        const content = data.data.data[0];
        const transformedData: ContentType = {
          ...content,
          heading: {
            ...content.heading,
            imageUrl: content.heading?.backgroundImg?.url || "",
          },
        };
        setPageContent(transformedData);
      } else {
        console.error(
          "Error al obtener el contenido:",
          data.error || "No se encontró contenido"
        );
        setPageContent(null);
      }
    };
    fetchPageContent();
  }, []);

  // Capturar parámetros de la URL y aplicarlos como filtros
  useEffect(() => {
    if (searchParams) {
      const urlFilters: FilterValuesProps = {
        offerType: searchParams.get('offerType') || '',
        propertyType: searchParams.get('propertyType') || '',
        propertyUse: searchParams.get('propertyUse') || '',
        city: searchParams.get('city') || '',
        country: searchParams.get('country') || '',
        propertyStatus: searchParams.get('propertyStatus') || ''
      };

      // Solo actualizar si hay parámetros en la URL
      const hasUrlParams = Object.values(urlFilters).some(value => value !== '');
      if (hasUrlParams) {
        console.log('Parámetros de URL detectados:', urlFilters);
        setSearchFilters(urlFilters);
      }
    }
  }, [searchParams]);

  // Cargar opciones de filtro desde la API (independientemente de los resultados filtrados)
  useEffect(() => {
    console.log('=== INICIANDO CARGA DE OPCIONES ===');
    const fetchFilterOptions = async () => {
      try {
        console.log('Haciendo petición a la API para opciones...');
        const response = await fetch('/api/getRealStateOffer?pagination[pageSize]=1000');
        const data = await response.json();
        
        console.log('Respuesta completa de la API:', data);
        if (data.data && Array.isArray(data.data)) {
          console.log('Datos recibidos de la API:', data.data.length, 'elementos');
          const offers = data.data.map((item: InmuebleType) => ({
            id: item.id,
            title: item.title,
            slug: item.slug,
            offerType: item.offerType || [],
            propertyType: item.propertyType || [],
            propertyUse: item.propertyUse || [],
            city: item.city || '',
            country: item.country || '',
            propertyStatus: item.propertyStatus || '',
            area: item.area || 0,
            imgGallery: item.imgGallery || [],
            description: item.description || '',
            certifications: item.certifications || [],
            ctaButton: item.ctaButton || null,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
            publishedAt: item.publishedAt
          }));
          
          const options = extractFilterOptions(offers);
          console.log('Opciones de filtro cargadas:', options);
          console.log('Países disponibles:', options.country);
          setFilterOptions(options);
          setOptionsLoading(false);
        } else {
          console.log('No se cumplió la condición para cargar opciones:', {
            hasData: !!data.data,
            isArray: Array.isArray(data.data),
            dataType: typeof data.data
          });
          setOptionsLoading(false);
        }
      } catch (error) {
        console.error("Error al obtener opciones de filtro:", error);
        setOptionsLoading(false);
      }
    };
    
    fetchFilterOptions();
    
    // Timeout de seguridad para evitar carga infinita
    const timeoutId = setTimeout(() => {
      console.log('Timeout alcanzado, estableciendo loading a false');
      setOptionsLoading(false);
    }, 10000); // 10 segundos
    
    return () => clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    console.log("offers", offers);
  }, [offers]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSearch = (filters: FilterValuesProps) => {
    console.log("Filtros recibidos en página:", filters);

    // Solo actualizar filtros que no sean "todos" o vacíos
    const activeFilters: FilterValuesProps = {
      offerType:
        filters.offerType !== "todos" && filters.offerType !== ""
          ? filters.offerType
          : "",
      propertyType:
        filters.propertyType !== "todos" && filters.propertyType !== ""
          ? filters.propertyType
          : "",
      propertyUse:
        filters.propertyUse !== "todos" && filters.propertyUse !== ""
          ? filters.propertyUse
          : "",
      city: filters.city !== "todos" && filters.city !== "" ? filters.city : "",
      country:
        filters.country !== "todos" && filters.country !== ""
          ? filters.country
          : "",
      propertyStatus:
        filters.propertyStatus !== "todos" && filters.propertyStatus !== ""
          ? filters.propertyStatus
          : "",
    };

    console.log("Filtros activos aplicados:", activeFilters);
    setSearchFilters(activeFilters);
    setCurrentPage(1); // Reset to first page when searching
    // Scroll to results
    window.scrollTo({ top: 0, behavior: "smooth" });
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
      <div className="h-[calc(100vh-150px)] flex-col items-center justify-center text-center py-16">
        <div className="flex flex-col items-center justify-center h-full">
          <p className="text-text-primary text-h6 mb-1">
          No pudimos cargar los resultados.
          </p>
          <p className="text-text-primary text-body2">
            Intente actualizar la página o haga clic en el botón para volver a intentarlo.
          </p>
          <img
            src={IconError.src}
            alt="Icono"
            className="w-25 h-25 mx-auto my-2"
          />
          <Button
            onClick={() => {
              window.location.reload();
            }}
            className="mx-auto mt-8"
            variant="primary"
            icon
          >
            Reintentar
          </Button>
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
            <h1 className="text-h3 md:text-h1 text-primary">
              {pageContent?.heading?.title}
            </h1>
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
          {optionsLoading ? (
            <div className="bg-white rounded-2xl shadow-lg p-5 md:border border-text-text-secondary">
              <div className="flex justify-center items-center h-20">
                <LoadingSpinner />
              </div>
            </div>
          ) : filterOptions ? (
            <AdvancedSearchBar
              onSearch={handleSearch}
              options={filterOptions}
              currentFilters={searchFilters}
            />
          ) : (
            <div className="bg-white rounded-2xl shadow-lg p-5 md:border border-text-text-secondary">
              <div className="flex justify-center items-center h-20">
                <p className="text-gray-500">Error al cargar las opciones de filtro</p>
              </div>
            </div>
          )}
        </div>
      </section>

      <section>
        <div className="container mx-auto pb-16 px-4 md:px-16">
          <p className="text-5 text-text-primary text-center my-10">
            Se encontraron <span className="font-bold">{pagination.total}</span>{" "}
            inmuebles que coinciden con su búsqueda
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
              <p className="text-text-primary text-h6 mb-1">
                No hay resultados con los filtros aplicados.
              </p>
              <p className="text-text-primary text-body2">
                Ajuste los criterios de búsqueda o contáctenos si necesita ayuda
                para encontrar un inmueble específico.
              </p>
              <img
                src={IconNoResults.src}
                alt="Icono"
                className="w-25 h-25 mx-auto my-2"
              />
              <Button
                onClick={() => {
                  router.push("/contacto");
                }}
                className="mx-auto mt-8"
                variant="primary"
                icon
              >
                ¿Busca algo más específico? Contáctenos
              </Button>

              {/* Clear filters */}
              <button
                onClick={() => {
                  setSearchFilters({
                    offerType: "",
                    propertyType: "",
                    propertyUse: "",
                    city: "",
                    country: "",
                    propertyStatus: "",
                  });
                }}
                className="mt-4 text-background-3 hover:text-text-primary transition-colors duration-300 underline cursor-pointer"
              >
                Limpiar filtros
              </button>
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
                  <img
                    className="w-full h-24 object-contain max-w-fit mx-auto grayscale md:grayscale hover:grayscale-0 transition-all duration-300 swiper-slide-mobile"
                    src={image.url}
                    alt="Logo"
                  />
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
