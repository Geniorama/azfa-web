"use client";

import CoverImage from "@/assets/img/bg-sala-prensa.jpg";
import HeadingPageSalaPrensa from "@/components/HeadingPageSalaPrensa";
import CustomSelect from "@/utils/CustomSelect";
import IconCalendario from "@/assets/img/icon-calendario.svg";
import IconOferta from "@/assets/img/icon-oferta.svg";
import { RxReload } from "react-icons/rx";
import { useState } from "react";
import CardInfoPortal from "@/components/CardInfoPortal";
import Pagination from "@/components/Pagination";

export default function NoticiasView() {
  const [filters, setFilters] = useState({
    tipoPublicacion: "",
    anioPublicacion: "",
  });

  const handleOpenNews = (url: string) => {
    window.open(url, "_blank");
  };

  const data = [
    {
      image: "https://testazfabucket.s3.us-east-2.amazonaws.com/noticias_3_adfc8dd1e2.png",
      title: "Zonas francas: piden modernizar la ley y potenciar la competitividad en Argentina",
      description: "En el marco del Consejo Federal de Zonas Francas, representantes provinciales coincidieron en la necesidad de actualizar la normativa vigente y generar condiciones que permitan desarrollar plenamente su potencial exportador, logístico e industrial. La modernización de la legislación actual es fundamental para mantener la competitividad del sector y atraer nuevas inversiones.",
      tags: ["Argentina", "Legislación", "Competitividad"],
      url: "#", // URL pendiente
    },

    {
      image: "https://testazfabucket.s3.us-east-2.amazonaws.com/657e7211_e1d3_43fc_a2ca_8dbc93648e0c_895fdc8714.jpg",
      title: "Economía de Costa Rica crece 4,6% en julio, impulsada por las zonas francas, pero existen desafíos en sectores clave",
      description: "La producción nacional de Costa Rica, medida por la serie tendencia ciclo del Índice Mensual de Actividad Económica (IMAE), registró un crecimiento interanual del 4,6% en julio de 2025, según el más reciente informe publicado por el Banco Central de Costa Rica (BCCR). Las zonas francas han sido un motor importante de este crecimiento, aunque persisten desafíos en otros sectores económicos.",
      tags: ["Costa Rica", "Crecimiento Económico", "IMAE"],
      url: "https://www.elfinancierocr.com/economia-y-politica/economia-de-costa-rica-crece-46-en-julio-impulsada/NNWQX52JYZDOFKCHKUS3GKS7ZM/story/",
    },
    
    {
      image: "https://testazfabucket.s3.us-east-2.amazonaws.com/69dc5762_5481_4b0e_8922_ccd83e7d22a1_d3dc3230dc.jpg",
      title: "Autorizan dos nuevas zonas francas y cuatro más esperan aprobación",
      description: "El Ministerio de Economía indicó que El Salvador no había registrado nuevas zonas francas desde hace 17 años. La entidad espera que con esta autorización se generen 2,520 nuevos empleos. Dos nuevas zonas francas fueron autorizadas para iniciar operaciones en El Salvador, marcando un hito importante en el desarrollo económico del país centroamericano.",
      tags: ["El Salvador", "Nuevas Zonas Francas", "Empleo"],
      url: "#", // URL pendiente
    },
  ];

  return (
    <div>
      <HeadingPageSalaPrensa
        title="Sala de prensa"
        description="Infórmese con los acontecimientos más recientes y relevantes del ecosistema de zonas francas en Iberoamérica"
        image={CoverImage.src}
        slug="noticias"
        textAlign="center"
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
                        label: "Leer noticia",
                        onClick: () => handleOpenNews(item.url) ,
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
            <Pagination currentPage={1} totalPages={10} onPageChange={() => {}} />
          </div>
        </div>
      </section>
    </div>
  );
}
