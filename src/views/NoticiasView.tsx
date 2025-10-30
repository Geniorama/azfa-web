"use client";

import CoverImage from "@/assets/img/bg-sala-prensa.jpg";
import HeadingPageSalaPrensa from "@/components/HeadingPageSalaPrensa";
import CustomSelect from "@/utils/CustomSelect";
import IconCalendario from "@/assets/img/icon-calendario.svg";
import IconOferta from "@/assets/img/icon-oferta.svg";
import { RxReload } from "react-icons/rx";
import { useState, useEffect, useMemo } from "react";
import CardInfoPortal from "@/components/CardInfoPortal";
import Pagination from "@/components/Pagination";
import { NewsType, NewsCategoryType, NewsSectionType } from "@/types/componentsType";
import { truncateText } from "@/utils/truncateText";
import AdSection from "@/components/AdSection";
import { useRouter, useSearchParams } from "next/navigation";

interface NoticiasViewProps {
  newsData: NewsType[];
  allNewsData?: NewsType[];
  categoriesData: NewsCategoryType[];
  paginationMeta: { pagination: { page: number, pageCount: number, pageSize: number, total: number } } | null;
  newsSectionData: NewsSectionType | null;
}

export default function NoticiasView({ newsData, allNewsData = [], categoriesData, paginationMeta, newsSectionData }: NoticiasViewProps) {
  const [filters, setFilters] = useState({
    tipoPublicacion: "",
    anioPublicacion: "",
  });
  const [currentPage, setCurrentPage] = useState(1);

  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Usar la página de la URL si existe
  const pageFromUrl = parseInt(searchParams.get('page') || '1', 10);
  
  // Determinar qué datos usar según si hay filtros activos
  const hasActiveFilters = filters.tipoPublicacion !== "" || filters.anioPublicacion !== "";
  const dataSource = hasActiveFilters ? allNewsData : newsData;

  const handleOpenNews = (url: string) => {
    console.log("handleOpenNews called with URL:", url);
    if (url && url !== "#") {
      console.log("Opening URL:", url);
      window.open(url, "_blank");
    } else {
      console.log("URL is empty or #, not opening");
    }
  };

  const handlePageChange = (page: number) => {
    if (hasActiveFilters) {
      // Cuando hay filtros, cambiar la página localmente
      setCurrentPage(page);
    } else {
      // Cuando no hay filtros, usar la paginación del servidor
      const params = new URLSearchParams(searchParams.toString());
      params.set('page', page.toString());
      router.push(`/sala-de-prensa/noticias?${params.toString()}`);
    }
  };
  
  // Sincronizar currentPage con la URL cuando no hay filtros
  useEffect(() => {
    if (!hasActiveFilters) {
      setCurrentPage(pageFromUrl);
    } else {
      // Resetear a página 1 cuando se activan filtros
      setCurrentPage(1);
    }
  }, [hasActiveFilters, pageFromUrl]);

  // Función para formatear la fecha como "JUN 25"
  const formatDate = (dateString: string | null): string => {
    if (!dateString) {
      return "SIN FECHA";
    }
    
    let date: Date;
    
    // Si la fecha está en formato YYYY-MM-DD, agregar tiempo para evitar problemas de zona horaria
    if (dateString.match(/^\d{4}-\d{2}-\d{2}$/)) {
      date = new Date(dateString + 'T12:00:00');
    } else {
      date = new Date(dateString);
    }
    
    if (isNaN(date.getTime())) {
      return "FECHA INVÁLIDA";
    }
    
    const monthNames = [
      "ENE", "FEB", "MAR", "ABR", "MAY", "JUN",
      "JUL", "AGO", "SEP", "OCT", "NOV", "DIC"
    ];
    const month = monthNames[date.getMonth()];
    const day = date.getDate().toString().padStart(2, '0');
    return `${month} ${day}`;
  };

  // Función para formatear las noticias para el componente
  const formatNewsData = (news: NewsType[]) => {
    return news.map((item) => {
      const formattedItem = {
        image: item.thumbnail?.url || "",
        title: item.title,
        description: truncateText(item.extract, 160),
        tags: [item.category?.name || "Noticias"],
        url: item.externalLink || "#",
        date: formatDate(item.publishDate || item.publishedAt),
      };
      return formattedItem;
    });
  };

  // Función para formatear las categorías para el select
  const formatCategoriesForSelect = (categories: NewsCategoryType[]) => {
    return categories.map((category) => ({
      label: category.name,
      value: category.slug,
    }));
  };

  // Función para filtrar las noticias
  const filterNewsData = (news: NewsType[]) => {
    return news.filter((item) => {
      // Filtro por categoría
      if (filters.tipoPublicacion && item.category?.slug !== filters.tipoPublicacion) {
        return false;
      }
      
      // Filtro por mes de publicación
      if (filters.anioPublicacion) {
        const publishedDate = new Date(item.publishDate || item.publishedAt);
        const monthNames = [
          "enero", "febrero", "marzo", "abril", "mayo", "junio",
          "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
        ];
        const currentMonth = monthNames[publishedDate.getMonth()];
        if (currentMonth !== filters.anioPublicacion) {
          return false;
        }
      }
      
      return true;
    });
  };

  // Filtrar las noticias según los filtros activos
  const filteredNewsData = useMemo(() => {
    return filterNewsData(dataSource);
  }, [dataSource, filters]);

  // Paginación en cliente cuando hay filtros
  const pageSize = 9;
  const totalPagesFiltered = Math.ceil(filteredNewsData.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  
  // Noticias a mostrar: paginadas del servidor (sin filtros) o paginadas del cliente (con filtros)
  const newsToShow = hasActiveFilters 
    ? filteredNewsData.slice(startIndex, endIndex)
    : filteredNewsData;

  const formattedNewsData = formatNewsData(newsToShow);
  const categoryOptions = formatCategoriesForSelect(categoriesData);
  
  // Paginación a mostrar: del servidor (sin filtros) o calculada (con filtros)
  const paginationToShow = hasActiveFilters
    ? {
        pagination: {
          page: currentPage,
          pageCount: totalPagesFiltered,
          pageSize: pageSize,
          total: filteredNewsData.length
        }
      }
    : paginationMeta;

  return (
    <div>
      <HeadingPageSalaPrensa
        title={newsSectionData?.title || "Sala de prensa"}
        description={newsSectionData?.description || "Infórmese con los acontecimientos más recientes y relevantes del ecosistema de zonas francas en Iberoamérica"}
        image={newsSectionData?.backgroundImg?.url || CoverImage.src}
        slug="noticias"
        textAlign={newsSectionData?.alignment || "center"}
      />

      {/* Filters */}
      <section className="bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-4 md:gap-8 py-6 text-text-primary justify-center items-end">
            <CustomSelect
              options={categoryOptions}
              onChange={(value) =>
                setFilters({ ...filters, tipoPublicacion: value })
              }
              name="tema"
              label="Categoría"
              selected={filters.tipoPublicacion}
              labelIcon={IconOferta.src}
              placeholder="Seleccione una categoría"
            />

            <CustomSelect
              label="Mes de publicación"
              options={[
                { label: "Enero", value: "enero" },
                { label: "Febrero", value: "febrero" },
                { label: "Marzo", value: "marzo" },
                { label: "Abril", value: "abril" },
                { label: "Mayo", value: "mayo" },
                { label: "Junio", value: "junio" },
                { label: "Julio", value: "julio" },
                { label: "Agosto", value: "agosto" },
                { label: "Septiembre", value: "septiembre" },
                { label: "Octubre", value: "octubre" },
                { label: "Noviembre", value: "noviembre" },
                { label: "Diciembre", value: "diciembre" },
              ]}
              onChange={(value) =>
                setFilters({ ...filters, anioPublicacion: value })
              }
              name="anio-publicacion"
              selected={filters.anioPublicacion}
              placeholder="Seleccione un mes"
              labelIcon={IconCalendario.src}
            />

            <button
              disabled={
                filters.tipoPublicacion === "" && filters.anioPublicacion === ""
              }
              onClick={() =>
                setFilters({ tipoPublicacion: "", anioPublicacion: "" })
              }
              className="inline-flex justify-center border border-text-primary text-text-primary rounded-md px-4 py-2 cursor-pointer disabled:cursor-not-allowed disabled:opacity-20 items-center gap-2"
            >
              <RxReload className="w-4 h-4" />
              <span>Limpiar filtros</span>
            </button>
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
            {/* Grid cards */}
            {formattedNewsData.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
                  {formattedNewsData.map((item, index) => (
                      <div
                        key={index}
                        data-aos="fade-up"
                        data-aos-delay={`${(index % 3) * 100}`}
                      >
                      <CardInfoPortal
                        image={item.image}
                        title={item.title}
                        description={item.description}
                        tags={item.tags}
                        date={item.date}
                        button={{
                          label: "Leer noticia",
                          onClick: () => handleOpenNews(item.url) ,
                        }}
                        noSpaceImage={true}
                        isReadMore={true}
                        arrowColor="text-details"
                      />
                      </div>
                  ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-text-primary text-lg">
                  No se encontraron noticias con los filtros seleccionados.
                </p>
                <button
                  onClick={() => setFilters({ tipoPublicacion: "", anioPublicacion: "" })}
                  className="mt-4 text-details hover:underline"
                >
                  Limpiar filtros
                </button>
              </div>
            )}
        </div>
      </section>

      <section className="bg-white lg:py-10">
        <div className="container mx-auto px-4">
          <div className="flex justify-center">
            {paginationToShow && paginationToShow.pagination && paginationToShow.pagination.pageCount > 1 && (
              <Pagination 
                currentPage={paginationToShow.pagination.page} 
                totalPages={paginationToShow.pagination.pageCount} 
                onPageChange={handlePageChange} 
              />
            )}
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="container mx-auto px-4">
          <AdSection position="bottom-news-archive" />
        </div>
      </section>
    </div>
  );
}
