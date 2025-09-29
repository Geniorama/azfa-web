"use client";

import HeadingPagePortal from "@/components/HeadingPagePortal";
import CustomSelect from "@/utils/CustomSelect";
import IconOferta from "@/assets/img/icon-oferta.svg";
import IconCalendario from "@/assets/img/icon-calendario.svg";
import { useState } from "react";
import { RxReload } from "react-icons/rx";
import CardInfoPortal from "@/components/CardInfoPortal";
import CoverImage from "@/assets/img/cover.jpg";
import Pagination from "@/components/Pagination";

export default function Publicaciones() {
  const [filters, setFilters] = useState({
    tipoPublicacion: "",
    anioPublicacion: "",
  });

  return (
    <div>
      <HeadingPagePortal
        title="Invierta en Zonas Francas"
        smallTitle="Consulte publicaciones, estudios y documentos sobre inversión en zonas francas"
        image={"/images/publicaciones.jpg"}
        slug="publicaciones"
      />

      {/* Filters */}
      <section className="bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 md:gap-8 py-6 text-text-primary justify-center">
            <CustomSelect
              options={[
                { label: "Publicación", value: "publicacion" },
                { label: "Estudio", value: "estudio" },
                { label: "Documento", value: "documento" },
              ]}
              onChange={(value) => setFilters({ ...filters, tipoPublicacion: value })}
              name="tipo-publicacion"
              label="Tipo de publicación"
              selected={filters.tipoPublicacion}
              labelIcon={IconOferta.src}
              placeholder="Seleccione un tipo"
            />

            <CustomSelect
              label="Año de publicación"
              options={[
                { label: "2025", value: "2025" },
                { label: "2024", value: "2024" },
                { label: "2023", value: "2023" },
                { label: "2022", value: "2022" },
                { label: "2021", value: "2021" },
                { label: "2020", value: "2020" },
                { label: "2019", value: "2019" },
                { label: "2018", value: "2018" },
                { label: "2017", value: "2017" },
                { label: "2016", value: "2016" },
                { label: "2015", value: "2015" },
                { label: "2014", value: "2014" },
                { label: "2013", value: "2013" },
              ]}
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
          <span className="text-button text-text-primary"> <b className="font-medium">6 resultados</b> encontrados</span>

          {/* Grid cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
            <CardInfoPortal
              image={CoverImage.src}
              title="Guía de Inversión en Zonas Francas 2024"
              description="Descubra las oportunidades de inversión en zonas francas de Iberoamérica. Esta guía completa incluye información sobre incentivos fiscales, procedimientos de inversión y casos de éxito en la región."
              tags={["Guía", "Inversión", "2024"]}
              button={{
                label: "Descargar",
                onClick: () => {} 
              }}
            />

            <CardInfoPortal
              image={CoverImage.src}
              title="Marco Legal de Zonas Francas en América Latina"
              description="Análisis comparativo del marco legal y regulatorio de las zonas francas en los principales países de América Latina. Incluye actualizaciones normativas y mejores prácticas."
              tags={["Estudio", "Legal", "2024"]}
              button={{
                label: "Descargar",
                onClick: () => {} 
              }}
            />

            <CardInfoPortal
              image={CoverImage.src}
              title="Impacto Económico de las Zonas Francas"
              description="Estudio sobre el impacto económico y social de las zonas francas en el desarrollo regional. Incluye análisis de empleo, exportaciones y atracción de inversión extranjera."
              tags={["Estudio", "Económico", "2023"]}
              button={{
                label: "Descargar",
                onClick: () => {} 
              }}
            />

            <CardInfoPortal
              image={CoverImage.src}
              title="Manual de Procedimientos de Inversión"
              description="Manual práctico para inversionistas interesados en establecerse en zonas francas. Incluye procedimientos paso a paso, documentación requerida y plazos de tramitación."
              tags={["Manual", "Procedimientos", "2023"]}
              button={{
                label: "Descargar",
                onClick: () => {} 
              }}
            />

            <CardInfoPortal
              image={CoverImage.src}
              title="Tendencias de Inversión en Zonas Francas 2023"
              description="Análisis de las principales tendencias de inversión en zonas francas durante 2023. Incluye sectores de mayor crecimiento y nuevas oportunidades de negocio."
              tags={["Tendencias", "Análisis", "2023"]}
              button={{
                label: "Descargar",
                onClick: () => {} 
              }}
            />

            <CardInfoPortal
              image={CoverImage.src}
              title="Casos de Éxito: Empresas en Zonas Francas"
              description="Recopilación de casos de éxito de empresas que han logrado un crecimiento significativo operando desde zonas francas en Iberoamérica."
              tags={["Casos", "Éxito", "2022"]}
              button={{
                label: "Descargar",
                onClick: () => {} 
              }}
            />
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-16">
            <Pagination 
              currentPage={1} 
              totalPages={3} 
              onPageChange={() => {}} 
            />
          </div>
        </div>
      </section>
    </div>
  );
}