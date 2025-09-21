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
import { useRouter } from "next/navigation";
import { truncateText } from "@/utils/truncateText";
import ImageCard from "@/assets/img/vecteezy_digital-logistics-futuristic-semi-truck-on-circuit-board_59901512 1.png";

export default function BlogView() {
  const [filters, setFilters] = useState({
    tipoPublicacion: "",
    anioPublicacion: "",
  });
  const router = useRouter();

  const data = [
    {
      image: ImageCard.src,
      title: truncateText(
        "Cuáles son los nuevos sectores e industrias a los que apuestan las zonas francas uruguayas para crecer",
        60
      ),
      description: truncateText(
        "¿Está interesado en las normativas y regulaciones que rigen las zonas francas en Iberoamérica? La Guía Legal de las Zonas Francas de Iberoamérica es un recurso esencial que proporciona un panorama completo de los marcos jurídicos, beneficios y obligaciones en cada país de la región.",
        160
      ),
      tags: ["Tag 1", "Tag 2", "Tag 3"],
    },

    {
      image: ImageCard.src,
      title: truncateText(
        "Cuáles son los nuevos sectores e industrias a los que apuestan las zonas francas uruguayas para crecer",
        60
      ),
      description: truncateText(
        "¿Está interesado en las normativas y regulaciones que rigen las zonas francas en Iberoamérica? La Guía Legal de las Zonas Francas de Iberoamérica es un recurso esencial que proporciona un panorama completo de los marcos jurídicos, beneficios y obligaciones en cada país de la región.",
        160
      ),
      tags: ["Tag 1", "Tag 2", "Tag 3"],
    },

    {
      image: ImageCard.src,
      title: truncateText(
        "Cuáles son los nuevos sectores e industrias a los que apuestan las zonas francas uruguayas para crecer",
        60
      ),
      description: truncateText(
        "¿Está interesado en las normativas y regulaciones que rigen las zonas francas en Iberoamérica? La Guía Legal de las Zonas Francas de Iberoamérica es un recurso esencial que proporciona un panorama completo de los marcos jurídicos, beneficios y obligaciones en cada país de la región.",
        160
      ),
      tags: ["Tag 1", "Tag 2", "Tag 3"],
    },

    {
      image: ImageCard.src,
      title: truncateText(
        "Cuáles son los nuevos sectores e industrias a los que apuestan las zonas francas uruguayas para crecer",
        60
      ),
      description: truncateText(
        "¿Está interesado en las normativas y regulaciones que rigen las zonas francas en Iberoamérica? La Guía Legal de las Zonas Francas de Iberoamérica es un recurso esencial que proporciona un panorama completo de los marcos jurídicos, beneficios y obligaciones en cada país de la región.",
        160
      ),
      tags: ["Tag 1", "Tag 2", "Tag 3"],
    },

    {
      image: ImageCard.src,
      title: truncateText(
        "Cuáles son los nuevos sectores e industrias a los que apuestan las zonas francas uruguayas para crecer",
        60
      ),
      description: truncateText(
        "¿Está interesado en las normativas y regulaciones que rigen las zonas francas en Iberoamérica? La Guía Legal de las Zonas Francas de Iberoamérica es un recurso esencial que proporciona un panorama completo de los marcos jurídicos, beneficios y obligaciones en cada país de la región.",
        160
      ),
      tags: ["Tag 1", "Tag 2", "Tag 3"],
    },

    {
      image: ImageCard.src,
      title: truncateText(
        "Cuáles son los nuevos sectores e industrias a los que apuestan las zonas francas uruguayas para crecer",
        60
      ),
      description: truncateText(
        "¿Está interesado en las normativas y regulaciones que rigen las zonas francas en Iberoamérica? La Guía Legal de las Zonas Francas de Iberoamérica es un recurso esencial que proporciona un panorama completo de los marcos jurídicos, beneficios y obligaciones en cada país de la región.",
        160
      ),
      tags: ["Tag 1", "Tag 2", "Tag 3"],
    },
  ];
  return (
    <div>
      <HeadingPageSalaPrensa
        title="Blog"
        description="Revise boletines informativos con actualizaciones exclusivas, iniciativas y oportunidades de interés en sólo 3 minutos"
        image={CoverImage.src}
        slug="blog"
      />

      {/* Filters */}
      <section className="bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 md:gap-8 py-6 text-text-primary justify-center">
            <CustomSelect
              options={[
                { label: "Tema 1", value: "tema-1" },
                { label: "Tema 2", value: "tema-2" },
                { label: "Tema 3", value: "tema-3" },
                { label: "Tema 4", value: "tema-4" },
                { label: "Tema 5", value: "tema-5" },
                { label: "Tema 6", value: "tema-6" },
                { label: "tema-7", value: "tema-7" },
                { label: "Tema 8", value: "tema-8" },
                { label: "Tema 9", value: "tema-9" },
                { label: "Tema 10", value: "tema-10" },
              ]}
              onChange={(value) =>
                setFilters({ ...filters, tipoPublicacion: value })
              }
              name="tema"
              label="Tema"
              selected={filters.tipoPublicacion}
              labelIcon={IconOferta.src}
              placeholder="Seleccione un tema"
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

      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          {/* Grid cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            {data.map((item, index) => (
              <CardInfoPortal
                key={index}
                image={item.image}
                title={item.title}
                description={item.description}
                tags={item.tags}
                button={{
                  label: "Leer artículo",
                  onClick: () => router.push("/noticia-1"),
                }}
                noSpaceImage={true}
                isReadMore={true}
                arrowColor="text-details"
              />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white lg:py-10">
        <div className="container mx-auto px-4">
          <div className="flex justify-center">
            <Pagination
              currentPage={1}
              totalPages={10}
              onPageChange={() => {}}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
