"use client";

import HeadingPagePortal from "@/components/HeadingPagePortal";
import CustomSelect from "@/utils/CustomSelect";
import IconOferta from "@/assets/img/icon-oferta.svg";
import IconCalendario from "@/assets/img/icon-calendario.svg";
import { useState, useMemo } from "react";
import { RxReload } from "react-icons/rx";
import CardInfoPortal from "@/components/CardInfoPortal";
import Pagination from "@/components/Pagination";
import { StudyType } from "@/types/contentType";

interface StudiesViewProps {
  studies: StudyType[] | null;
}

export default function StudiesView({ studies }: StudiesViewProps) {
  const [filters, setFilters] = useState({
    tipoPublicacion: "",
    anioPublicacion: "",
  });

  // Filtrar estudios basado en los filtros
  const filteredStudies = useMemo(() => {
    if (!studies) return [];
    
    return studies.filter(study => {
      const matchesType = !filters.tipoPublicacion || 
        study.tags.some(tag => tag.name.toLowerCase().includes(filters.tipoPublicacion.toLowerCase()));
      
      const matchesYear = !filters.anioPublicacion || 
        study.publishDate.startsWith(filters.anioPublicacion);
      
      return matchesType && matchesYear;
    });
  }, [studies, filters]);

  // Obtener años únicos para el filtro
  const availableYears = useMemo(() => {
    if (!studies) return [];
    const years = studies.map(study => study.publishDate.split('-')[0]);
    return [...new Set(years)].sort((a, b) => b.localeCompare(a));
  }, [studies]);

  // Obtener tipos únicos para el filtro
  const availableTypes = useMemo(() => {
    if (!studies) return [];
    const types = studies.flatMap(study => study.tags.map(tag => tag.name));
    return [...new Set(types)];
  }, [studies]);

  return (
    <div>
      <HeadingPagePortal
        title="Portal afiliados"
        smallTitle="Consulte y descargue informes, estudios técnicos y documentos exclusivos disponibles para los miembros de AZFA"
        image={"/images/estudios-azfa.jpg"}
        slug="estudios-azfa"
      />

      {/* Filters */}
      <section className="bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 md:gap-8 py-6 text-text-primary justify-center">
            <CustomSelect
              options={availableTypes.map(type => ({ label: type, value: type.toLowerCase() }))}
              onChange={(value) =>
                setFilters({ ...filters, tipoPublicacion: value })
              }
              name="tipo-publicacion"
              label="Tipo de publicación"
              selected={filters.tipoPublicacion}
              labelIcon={IconOferta.src}
              placeholder="Seleccione un tipo"
            />

            <CustomSelect
              label="Año de publicación"
              options={availableYears.map(year => ({ label: year, value: year }))}
              onChange={(value) =>
                setFilters({ ...filters, anioPublicacion: value })
              }
              name="anio-publicacion"
              selected={filters.anioPublicacion}
              placeholder="Seleccione un año"
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
      <div className="container mx-auto px-4">
        <hr className="border-background-2 w-full" />
      </div>
      <section className="py-4 bg-white">
        <div className="container mx-auto px-4">
          <span className="text-button text-text-primary">
            {" "}
            <b className="font-medium">{filteredStudies.length} resultados</b> encontrados
          </span>

          {/* Grid cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
            {filteredStudies.length > 0 ? (
              filteredStudies.map((study) => (
                <CardInfoPortal
                  key={study.id}
                  image={study.featuredImage?.url || "/images/placeholder.jpg"}
                  title={study.title}
                  description={study.description}
                  tags={[
                    ...study.tags.map(tag => tag.name),
                    study.publishDate.split('-')[0] // Agregar el año como tag
                  ]}
                  noSpaceImage={true}
                  button={{
                    label: "Descargar",
                    onClick: () => {
                      if (study.downloadableFile?.url) {
                        window.open(study.downloadableFile.url, '_blank');
                      }
                    },
                  }}
                />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-text-secondary text-lg">No se encontraron publicaciones con los filtros seleccionados.</p>
                <button
                  onClick={() => setFilters({ tipoPublicacion: "", anioPublicacion: "" })}
                  className="mt-4 text-blue-600 hover:text-blue-800 underline"
                >
                  Limpiar filtros
                </button>
              </div>
            )}
          </div>

          {/* Pagination - Solo mostrar si hay más de 9 resultados */}
          {filteredStudies.length > 9 && (
            <div className="flex justify-center mt-16">
              <Pagination
                currentPage={1}
                totalPages={Math.ceil(filteredStudies.length / 9)}
                onPageChange={() => {}}
              />
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
