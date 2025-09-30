"use client"

import React from 'react'
import HeadingPage from '@/components/HeadingPage'
import CustomSelect from '@/utils/CustomSelect'
import IconOferta from '@/assets/img/icon-oferta.svg'
import IconCalendario from '@/assets/img/icon-calendario.svg'
import { RxReload } from 'react-icons/rx'
import CardInfoPortal from '@/components/CardInfoPortal'
import Pagination from '@/components/Pagination'
import CoverImage from '@/assets/img/cover.jpg'
import { useState, useMemo } from 'react'
import type { PublicationPageType, PublicationsResponseType } from '@/types/componentsType'
import LoadingSpinner from '@/components/LoadingSpinner'

interface PublicacionesViewProps {
  pageData: PublicationPageType | null
  publications: PublicationsResponseType | null
}


export default function PublicacionesView({ pageData, publications }: PublicacionesViewProps) {
  const [filters, setFilters] = useState({
    tipoPublicacion: "",
    anioPublicacion: "",
  });

  console.log("pageData from PublicacionesView", pageData);
  console.log("publications from PublicacionesView", publications);

  // Filtrar publicaciones basado en los filtros
  const filteredPublications = useMemo(() => {
    if (!publications?.data) return [];
    
    return publications.data.filter((publication) => {
      const yearMatch = filters.anioPublicacion === "" || publication.publishDate.startsWith(filters.anioPublicacion);
      const typeMatch = filters.tipoPublicacion === "" || 
        publication.tags.some(tag => tag.name.toLowerCase().includes(filters.tipoPublicacion.toLowerCase()));
      
      return yearMatch && typeMatch;
    });
  }, [publications, filters]);

  // Obtener años únicos para el filtro
  const availableYears = useMemo(() => {
    if (!publications?.data) return [];
    
    const years = publications.data.map(p => p.publishDate.split('-')[0]);
    return [...new Set(years)].sort((a, b) => b.localeCompare(a));
  }, [publications]);

  // Obtener tipos únicos para el filtro
  const availableTypes = useMemo(() => {
    if (!publications?.data) return [];
    
    const types = publications.data.flatMap(p => p.tags.map(tag => tag.name));
    return [...new Set(types)].sort();
  }, [publications]);

  if (!pageData) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <HeadingPage
        title={pageData.headingSection?.title || "Publicaciones"}
        smallTitle={pageData.headingSection?.smallTitle || undefined}
        description={pageData.headingSection?.description || undefined}
        image={pageData.headingSection?.backgroundImg?.url || "/images/publicaciones.jpg"}
        textAlign={pageData.headingSection?.alignment as "left" | "center" | "right" || "left"}
      />

      {/* Filters */}
      <section className="bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 md:gap-8 py-6 text-text-primary justify-center">
            <CustomSelect
              options={availableTypes.map(type => ({ label: type, value: type.toLowerCase() }))}
              onChange={(value) => setFilters({ ...filters, tipoPublicacion: value })}
              name="tipo-publicacion"
              label="Tipo de publicación"
              selected={filters.tipoPublicacion}
              labelIcon={IconOferta.src}
              placeholder="Seleccione un tipo"
            />

            <CustomSelect
              label="Año de publicación"
              options={availableYears.map(year => ({ label: year, value: year }))}
              onChange={(value) => setFilters({ ...filters, anioPublicacion: value })}
              name="anio-publicacion"
              selected={filters.anioPublicacion}
              placeholder="Seleccione un año"
              labelIcon={IconCalendario.src}
            />

            <button
              disabled={filters.tipoPublicacion === "" && filters.anioPublicacion === ""}
              onClick={() => setFilters({ tipoPublicacion: "", anioPublicacion: "" })}
              className="inline-flex justify-center border border-text-primary text-text-primary rounded-md px-4 py-2 cursor-pointer disabled:cursor-not-allowed disabled:opacity-20 items-center gap-2"
            >
              <RxReload className="w-4 h-4" />
              <span>Limpiar filtros</span>
            </button>
          </div>
        </div>
      </section>
      <div className="container mx-auto px-4">
        <hr className="border-background-2 w-full" />
      </div>
      <section className="py-4 bg-white">
        <div className="container mx-auto px-4">
          <span className="text-button text-text-primary">
            <b className="font-medium">{filteredPublications.length} resultados</b> encontrados
          </span>

          {/* Grid cards */}
          {filteredPublications.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
              {filteredPublications.map((publication) => (
                <CardInfoPortal
                  key={publication.id}
                  image={publication.featuredImage?.url || CoverImage.src}
                  title={publication.title}
                  description={publication.description}
                  tags={[
                    ...publication.tags.map(tag => tag.name),
                    publication.publishDate.split('-')[0] // Agregar el año de publicación
                  ]}
                  noSpaceImage
                  button={{
                    label: "Descargar",
                    onClick: () => {
                      if (publication.downloadableFile?.url) {
                        window.open(publication.downloadableFile.url, '_blank');
                      }
                    }
                  }}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg">No se encontraron publicaciones con los filtros seleccionados.</p>
              <button
                onClick={() => setFilters({ tipoPublicacion: "", anioPublicacion: "" })}
                className="mt-4 px-6 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
              >
                Limpiar filtros
              </button>
            </div>
          )}

          {/* Pagination */}
          {publications?.meta && publications.meta.pagination.pageCount > 1 && (
            <div className="flex justify-center mt-16">
              <Pagination 
                currentPage={publications.meta.pagination.page} 
                totalPages={publications.meta.pagination.pageCount} 
                onPageChange={(page) => {
                  // Aquí podrías implementar la navegación a la siguiente página
                  console.log('Navegar a página:', page);
                }} 
              />
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
