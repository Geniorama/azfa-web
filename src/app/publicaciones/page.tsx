"use client";

import HeadingPage from "@/components/HeadingPage";
import CustomSelect from "@/utils/CustomSelect";
import IconCalendario from "@/assets/img/icon-calendario.svg";
import IconOferta from "@/assets/img/icon-oferta.svg";
import CardInfoPortal from "@/components/CardInfoPortal";
import CoverImage from "@/assets/img/cover.jpg";
import { truncateText } from "@/utils/truncateText";
import Pagination from "@/components/Pagination";

export default function Publicaciones() {
  return (
    <div>
      <HeadingPage
        title="Publicaciones"
        image={"/images/publicaciones.jpg"}
        textAlign="left"
      />

      {/* Filters */}
      <section className="bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 md:gap-8 py-6 text-text-primary justify-center">
            <CustomSelect
              options={[]}
              onChange={() => {}}
              name="tipo-publicacion"
              label="Tipo de publicación"
              selected=""
              labelIcon={IconOferta.src}
              placeholder="Seleccione un tipo"
            />
            <CustomSelect
              options={[]}
              onChange={() => {}}
              name="anio-publicacion"
              label="Año de publicación"
              selected=""
              labelIcon={IconCalendario.src}
              placeholder="Seleccione un año"
            />
          </div>
        </div>
      </section>

      <section className="bg-white py-6 lg:py-16">
        <div className="container mx-auto px-4">
          {/* Grid cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <CardInfoPortal
              image={CoverImage.src}
              title="Guía Legal de Zonas Francas de Iberoamérica 2024"
              description={truncateText("¿Está interesado en las normativas y regulaciones que rigen las zonas francas en Iberoamérica? La Guía Legal de las Zonas Francas de Iberoamérica es un recurso esencial que proporciona un panorama completo de los marcos jurídicos, beneficios y obligaciones en cada país de la región.", 160)}
              tags={["Estudio", "2025"]}
              author="Autor"
              arrowColor="text-details"
              button={{
                label: "Descargar",
                onClick: () => {} 
              }}
            />

            <CardInfoPortal
              image={CoverImage.src}
              title="Guía Legal de Zonas Francas de Iberoamérica 2024"
              description={truncateText("¿Está interesado en las normativas y regulaciones que rigen las zonas francas en Iberoamérica? La Guía Legal de las Zonas Francas de Iberoamérica es un recurso esencial que proporciona un panorama completo de los marcos jurídicos, beneficios y obligaciones en cada país de la región.", 160)}
              tags={["Estudio", "2025"]}
              author="Autor"
              arrowColor="text-details"
              button={{
                label: "Descargar",
                onClick: () => {} 
              }}
            />

            <CardInfoPortal
              image={CoverImage.src}
              title="Guía Legal de Zonas Francas de Iberoamérica 2024"
              description={truncateText("¿Está interesado en las normativas y regulaciones que rigen las zonas francas en Iberoamérica? La Guía Legal de las Zonas Francas de Iberoamérica es un recurso esencial que proporciona un panorama completo de los marcos jurídicos, beneficios y obligaciones en cada país de la región.", 160)}
              tags={["Estudio", "2025"]}
              author="Autor"
              arrowColor="text-details"
              button={{
                label: "Descargar",
                onClick: () => {} 
              }}
            />

            <CardInfoPortal
              image={CoverImage.src}
              title="Guía Legal de Zonas Francas de Iberoamérica 2024"
              description={truncateText("¿Está interesado en las normativas y regulaciones que rigen las zonas francas en Iberoamérica? La Guía Legal de las Zonas Francas de Iberoamérica es un recurso esencial que proporciona un panorama completo de los marcos jurídicos, beneficios y obligaciones en cada país de la región.", 160)}
              tags={["Estudio", "2025"]}
              author="Autor"
              arrowColor="text-details"
              button={{
                label: "Descargar",
                onClick: () => {} 
              }}
            />

            <CardInfoPortal
              image={CoverImage.src}
              title="Guía Legal de Zonas Francas de Iberoamérica 2024"
              description={truncateText("¿Está interesado en las normativas y regulaciones que rigen las zonas francas en Iberoamérica? La Guía Legal de las Zonas Francas de Iberoamérica es un recurso esencial que proporciona un panorama completo de los marcos jurídicos, beneficios y obligaciones en cada país de la región.", 160)}
              tags={["Estudio", "2025"]}
              author="Autor"
              arrowColor="text-details"
              button={{
                label: "Descargar",
                onClick: () => {} 
              }}
            />

            <CardInfoPortal
              image={CoverImage.src}
              title="Guía Legal de Zonas Francas de Iberoamérica 2024"
              description={truncateText("¿Está interesado en las normativas y regulaciones que rigen las zonas francas en Iberoamérica? La Guía Legal de las Zonas Francas de Iberoamérica es un recurso esencial que proporciona un panorama completo de los marcos jurídicos, beneficios y obligaciones en cada país de la región.", 160)}
              tags={["Estudio", "2025"]}
              author="Autor"
              arrowColor="text-details"
              button={{
                label: "Descargar",
                onClick: () => {} 
              }}
            />

            <CardInfoPortal
              image={CoverImage.src}
              title="Guía Legal de Zonas Francas de Iberoamérica 2024"
              description={truncateText("¿Está interesado en las normativas y regulaciones que rigen las zonas francas en Iberoamérica? La Guía Legal de las Zonas Francas de Iberoamérica es un recurso esencial que proporciona un panorama completo de los marcos jurídicos, beneficios y obligaciones en cada país de la región.", 160)}
              tags={["Estudio", "2025"]}
              author="Autor"
              arrowColor="text-details"
              button={{
                label: "Descargar",
                onClick: () => {} 
              }}
            />

            <CardInfoPortal
              image={CoverImage.src}
              title="Guía Legal de Zonas Francas de Iberoamérica 2024"
              description={truncateText("¿Está interesado en las normativas y regulaciones que rigen las zonas francas en Iberoamérica? La Guía Legal de las Zonas Francas de Iberoamérica es un recurso esencial que proporciona un panorama completo de los marcos jurídicos, beneficios y obligaciones en cada país de la región.", 160)}
              tags={["Estudio", "2025"]}
              author="Autor"
              arrowColor="text-details"
              button={{
                label: "Descargar",
                onClick: () => {} 
              }}
            />

            <CardInfoPortal
              image={CoverImage.src}
              title="Guía Legal de Zonas Francas de Iberoamérica 2024"
              description={truncateText("¿Está interesado en las normativas y regulaciones que rigen las zonas francas en Iberoamérica? La Guía Legal de las Zonas Francas de Iberoamérica es un recurso esencial que proporciona un panorama completo de los marcos jurídicos, beneficios y obligaciones en cada país de la región.", 160)}
              tags={["Estudio", "2025"]}
              author="Autor"
              arrowColor="text-details"
              button={{
                label: "Descargar",
                onClick: () => {} 
              }}
            />
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-16">
            <Pagination currentPage={1} totalPages={10} onPageChange={() => {}} />
          </div>
        </div>
      </section>

      
    </div>
  )
}
