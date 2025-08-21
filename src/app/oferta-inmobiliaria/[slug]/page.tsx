"use client";

import HeadingPage from "@/components/HeadingPage";
import AdvancedSearchBar from "@/components/AdvancedSearchBar";
import { InmuebleType } from "@/types/inmuebleType";
import SliderGallery from "@/components/SliderGallery";
import LoadingSpinner from "@/components/LoadingSpinner";
// import icons
import IconArea from "@/assets/img/icon-area.svg";
import IconEstado from "@/assets/img/icon-nuevo-usado.svg";
import IconUso from "@/assets/img/icon-uso.svg";
import IconTipoInmueble from "@/assets/img/icon-inmueble.svg";
import IconTipoOferta from "@/assets/img/icon-oferta.svg";
import IconCertificado from "@/assets/img/icon-certificacion.svg";
import Button from "@/utils/Button";
import { useRouter } from "next/navigation";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { StrapiButtonType } from "@/types/componentsType";
import { getCountryCode, getCountryName } from "@/utils/countryMapping";

// Función para convertir bloques de Strapi a HTML
interface StrapiBlock {
  type: string;
  format?: string;
  level?: number;
  children?: StrapiBlock[];
  text?: string;
}

const renderStrapiBlocks = (blocks: StrapiBlock[]): string => {
  if (!Array.isArray(blocks)) return "";

  return blocks
    .map((block) => {
      switch (block.type) {
        case "list":
          const listType = block.format === "ordered" ? "ol" : "ul";
          const listItems =
            block.children
              ?.map((item: StrapiBlock) => {
                if (item.type === "list-item") {
                  const text =
                    item.children
                      ?.map((child: StrapiBlock) => child.text)
                      .join("") || "";
                  return `<li>${text}</li>`;
                }
                return "";
              })
              .join("") || "";
          return `<${listType}>${listItems}</${listType}>`;

        case "paragraph":
          const text =
            block.children?.map((child: StrapiBlock) => child.text).join("") ||
            "";
          return `<p>${text}</p>`;

        case "heading":
          const level = block.level || 1;
          const headingText =
            block.children?.map((child: StrapiBlock) => child.text).join("") ||
            "";
          return `<h${level}>${headingText}</h${level}>`;

        case "quote":
          const quoteText =
            block.children?.map((child: StrapiBlock) => child.text).join("") ||
            "";
          return `<blockquote>${quoteText}</blockquote>`;

        default:
          return "";
      }
    })
    .join("");
};

export default function OfertaInmobiliariaSingle() {
  const [inmueble, setInmueble] = useState<InmuebleType | null>(null);
  const { slug } = useParams();
  const router = useRouter();

  const handleGetCountry = (country?: string) => {
    if (!country) return;
    
    // Si el país ya es un código ISO, usarlo directamente
    // Si no, convertirlo usando la función de utilidad
    const countryCode = getCountryCode(country);
    
    router.push(`/nuestros-afiliados?country=${countryCode}`);
  };

  const handleGetCtaButton = (ctaButton?: StrapiButtonType) => {
    if (!ctaButton) return;
    if (ctaButton.link) {
      window.open(ctaButton.link, ctaButton.target || "_self");
    }
  };

  useEffect(() => {
    const fetchInmueble = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/real-state-offers?filters[slug][$eq]=${slug}&populate[imgGallery]=true`
      );
      const data = await response.json();

      if (!data.data[0]) return;

      const dataWithGallery = {
        ...data.data[0],
        imgGallery: data.data[0].imgGallery?.map((img: { url: string; alternativeText?: string }) => {
          return {
            url: img.url,
            alternativeText: img.alternativeText,
          };
        }) || [],
      };

      setInmueble(dataWithGallery);
    };
    fetchInmueble();
  }, [slug]);

  if (!inmueble) return <LoadingSpinner />;

  return (
    <div>
      <HeadingPage
        title="Oferta Inmobiliaria"
        smallTitle="Encuentre aquí el inmueble que necesita"
        className="relative pb-32"
      />

      <div className="container mx-auto px-4 -mt-16 z-10 relative">
        <AdvancedSearchBar />

        <article className="py-16">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Left side */}
              <div className="w-full md:w-1/2">
                {inmueble.imgGallery && inmueble.imgGallery.length > 0 && (
                  <SliderGallery images={inmueble.imgGallery} />
                )}
              </div>

              {/* Right side */}
              <div className="w-full md:w-1/2 bg-white p-4 md:py-16 md:px-22 text-text-primary">
                <h1 className="text-h3 font-light">{inmueble.title}</h1>
                <span className="h-0.5 w-10 bg-details block mb-4"></span>
                <h5 className="text-h6">
                  {inmueble.city} / {getCountryName(inmueble.country || '')}
                </h5>
                {/* Features */}
                <div className="flex flex-row space-y-3 mt-10 flex-wrap">
                  {inmueble.offerType && (
                    <div className="flex items-center gap-2 w-full md:w-1/2 border-b border-background-1 pb-3">
                      <img
                        src={IconTipoOferta.src}
                        alt="Tipo de oferta"
                        className="w-4 h-4"
                      />
                      <span className="text-body2">{inmueble.offerType}</span>
                    </div>
                  )}
                  {inmueble.propertyType && (
                    <div className="flex items-center gap-2 w-full md:w-1/2 border-b border-background-1 pb-3">
                      <img
                        src={IconTipoInmueble.src}
                      alt="Tipo de inmueble"
                      className="w-4 h-4"
                      />
                      <span className="text-body2">{inmueble.propertyType}</span>
                    </div>
                  )}
                  {inmueble.propertyUse && (
                    <div className="flex items-center gap-2 w-full md:w-1/2 border-b border-background-1 pb-3">
                      <img
                        src={IconUso.src}
                      alt="Uso de inmueble"
                      className="w-4 h-4"
                    />
                      <span className="text-body2">{inmueble.propertyUse}</span>
                    </div>
                  )}
                  {inmueble.area && (
                    <div className="flex items-center gap-2 w-full md:w-1/2 border-b border-background-1 pb-3">
                      <img
                      src={IconArea.src}
                      alt="Área de inmueble"
                      className="w-4 h-4"
                    />
                    <span className="text-body2">{inmueble.area}</span>
                    </div>
                  )}
                  {inmueble.propertyStatus && (
                    <div className="flex items-center gap-2 w-full md:w-1/2 border-b border-background-1 pb-3">
                      <img
                      src={IconEstado.src}
                      alt="Estado de inmueble"
                      className="w-4 h-4"
                    />
                    <span className="text-body2">
                      {inmueble.propertyStatus}
                    </span>
                    </div>
                  )}
                </div>
                <p className="text-body font-light mt-4">
                  {inmueble.description}
                </p>

                {/* Certifications */}
                {inmueble.certifications && (
                  <div className="mt-10">
                    <div className="flex items-center gap-2">
                      <img
                        src={IconCertificado.src}
                        alt="Certificado"
                        className="w-4 h-4"
                      />
                      <h3 className="text-body font-medium">Certificaciones</h3>
                    </div>
                    <div
                      className="mt-4 [&>ul]:list-disc [&>ul]:list-inside [&>ul]:text-body [&>ul]:font-light [&>ul]:space-y-1 [&>ul]:pl-5 [&>p]:text-body [&>p]:font-light [&>h1]:text-h4 [&>h2]:text-h5 [&>h3]:text-h6 [&>strong]:font-semibold [&>em]:italic"
                      dangerouslySetInnerHTML={{
                        __html: renderStrapiBlocks(inmueble.certifications),
                      }}
                    />
                  </div>
                )}

                {/* Contact */}
                <div className="mt-10 flex flex-col md:flex-row gap-4">
                  <Button
                    className="justify-between lg:justify-start"
                    onClick={() => handleGetCountry(inmueble.country)}
                    variant="outline-primary"
                    icon
                  >
                    Ver incentivos del país
                  </Button>
                  <Button
                    className="justify-between lg:justify-start"
                    onClick={() => handleGetCtaButton(inmueble.ctaButton)}
                    variant="primary"
                    icon
                  >
                    {inmueble.ctaButton?.text || "Solicitar información"}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
