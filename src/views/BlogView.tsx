"use client";

import HeadingPageSalaPrensa from "@/components/HeadingPageSalaPrensa";
import CoverImage from "@/assets/img/bg-sala-prensa.jpg";
import CustomSelect from "@/utils/CustomSelect";
import IconOferta from "@/assets/img/icon-oferta.svg";
import IconCalendario from "@/assets/img/icon-calendario.svg";
import { RxReload } from "react-icons/rx";
import CardInfoPortal from "@/components/CardInfoPortal";
import Pagination from "@/components/Pagination";
import { useState } from "react";
import { truncateText } from "@/utils/truncateText";
import { NewsType, NewsCategoryType, BlogPageType } from "@/types/componentsType";

// Interfaz extendida para blogs con downloadDocument
interface BlogType extends NewsType {
  downloadDocument?: {
    url: string;
    alternativeText?: string;
  };
}

interface BlogViewProps {
  blogData: BlogType[];
  categoriesData: NewsCategoryType[];
  blogPageData: BlogPageType | null;
  paginationMeta: { pagination: { page: number, pageCount: number, pageSize: number, total: number } } | null;
}

export default function BlogView({ blogData, categoriesData, blogPageData, paginationMeta }: BlogViewProps) {
  const [filters, setFilters] = useState({
    tipoPublicacion: "",
    anioPublicacion: "",
  });

  console.log("blogPageData from BlogView", blogPageData);
  // Función para formatear la fecha como "JUN 25"
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const monthNames = [
      "ENE", "FEB", "MAR", "ABR", "MAY", "JUN",
      "JUL", "AGO", "SEP", "OCT", "NOV", "DIC"
    ];
    const month = monthNames[date.getMonth()];
    const day = date.getDate().toString().padStart(2, '0');
    return `${month} ${day}`;
  };

  // Función para filtrar los blogs
  const filterBlogData = (blogs: BlogType[]) => {
    return blogs.filter((item) => {
      // Filtro por categoría
      if (filters.tipoPublicacion && item.category?.slug !== filters.tipoPublicacion) {
        return false;
      }
      
      // Filtro por mes de publicación
      if (filters.anioPublicacion) {
        const publishedDate = new Date(item.publishedAt);
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

  // Función para formatear las categorías para el select
  const formatCategoriesForSelect = (categories: NewsCategoryType[]) => {
    return categories.map((category) => ({
      label: category.name,
      value: category.slug,
    }));
  };

  // Función para formatear los blogs para el componente
  const formatBlogData = (blogs: BlogType[]) => {
    return blogs.map((item) => ({
      image: item.thumbnail?.url || "",
      title: item.title,
      description: truncateText(item.extract, 160),
      tags: [item.category?.name || "Blog"],
      url: item.downloadDocument?.url || item.externalLink || "#",
      date: formatDate(item.publishedAt),
    }));
  };

  const handleOpenBlog = (url: string) => {
    if (url && url !== "#") {
      window.open(url, "_blank");
    }
  };

  const filteredBlogData = filterBlogData(blogData);
  const formattedBlogData = formatBlogData(filteredBlogData);
  const categoryOptions = formatCategoriesForSelect(categoriesData);

  return (
    <div>
      <HeadingPageSalaPrensa
        title={blogPageData?.title || "Blog"}
        description={blogPageData?.description || "Revise boletines informativos con actualizaciones exclusivas, iniciativas y oportunidades de interés en sólo 3 minutos"}
        image={blogPageData?.backgroundImg?.url || CoverImage.src}
        slug="blog"
        textAlign={blogPageData?.alignment || "center"}
      />

      {/* Filters */}
      <section className="bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 md:gap-8 py-6 text-text-primary justify-center">
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
          {formattedBlogData.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
              {formattedBlogData.map((item, index) => (
                <CardInfoPortal
                  key={index}
                  image={item.image}
                  title={item.title}
                  description={item.description}
                  tags={item.tags}
                  date={item.date}
                  button={{
                    label: "Leer artículo",
                    onClick: () => handleOpenBlog(item.url),
                  }}
                  noSpaceImage={true}
                  isReadMore={true}
                  arrowColor="text-details"
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-text-primary text-lg">
                No se encontraron artículos con los filtros seleccionados.
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
            {paginationMeta && paginationMeta.pagination && paginationMeta.pagination.pageCount > 1 && (
              <Pagination
                currentPage={paginationMeta.pagination.page}
                totalPages={paginationMeta.pagination.pageCount}
                onPageChange={() => {}}
              />
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
