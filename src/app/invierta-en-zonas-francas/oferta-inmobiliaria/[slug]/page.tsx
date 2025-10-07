"use client";

import HeadingPage from "@/components/HeadingPage";
import AdvancedSearchBar from "@/components/AdvancedSearchBar";
import { InmuebleType } from "@/types/inmuebleType";
import SliderGallery from "@/components/SliderGallery";
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
import ReactMarkdown from 'react-markdown';
import type { FilterValuesProps } from "@/components/AdvancedSearchBar";
import { extractFilterOptions, FilterOptions } from "@/utils/extractFilterOptions";

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

// Función para validar si las certificaciones tienen contenido real
const hasCertificationContent = (certifications: StrapiBlock[]): boolean => {
  if (!Array.isArray(certifications) || certifications.length === 0) {
    return false;
  }

  return certifications.some(block => {
    // Verificar si el bloque tiene children
    if (!block.children || block.children.length === 0) {
      return false;
    }

    // Verificar si algún child tiene texto no vacío
    return block.children.some(child => {
      if (child.type === "text" && child.text) {
        return child.text.trim().length > 0;
      }
      
      // Si tiene children anidados, verificar recursivamente
      if (child.children && child.children.length > 0) {
        return child.children.some(nestedChild => 
          nestedChild.type === "text" && nestedChild.text && nestedChild.text.trim().length > 0
        );
      }
      
      return false;
    });
  });
};

export default function OfertaInmobiliariaSingle() {
  const [inmueble, setInmueble] = useState<InmuebleType | null>(null);
  const [filterOptions, setFilterOptions] = useState<FilterOptions | null>(null);
  const [searchFilters, setSearchFilters] = useState<FilterValuesProps>({
    offerType: "",
    propertyType: "",
    propertyUse: "",
    city: "",
    country: "",
    propertyStatus: "",
  });
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

  // Función para manejar la búsqueda desde la barra de filtros
  const handleSearch = (filters: FilterValuesProps) => {
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

    // Actualizar estado local
    setSearchFilters(activeFilters);

    // Crear query parameters con los filtros
    const queryParams = new URLSearchParams();
    
    Object.entries(activeFilters).forEach(([key, value]) => {
      if (value && value.trim() !== '') {
        queryParams.append(key, value);
      }
    });
    
    // Redirigir a la página principal de oferta inmobiliaria con los filtros
    const queryString = queryParams.toString();
    const url = queryString 
      ? `/invierta-en-zonas-francas/oferta-inmobiliaria?${queryString}`
      : '/invierta-en-zonas-francas/oferta-inmobiliaria';
    
    router.push(url);
  };

  useEffect(() => {
    const fetchInmueble = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}/real-state-offers?filters[slug][$eq]=${slug}&populate[imgGallery]=true`
        );
        const data = await response.json();

        if (data.data && data.data[0]) {
          const dataWithGallery = {
            ...data.data[0],
            imgGallery: data.data[0].imgGallery?.map((img: { url: string; alternativeText?: string }) => {
              return {
                url: img.url,
                alternativeText: img.alternativeText,
              };
            }) || [],
          };


          console.log("dataWithGallery", dataWithGallery);
          setInmueble(dataWithGallery);
        } else {
          console.error("Error al obtener el inmueble:", "No se encontró el inmueble");
          setInmueble(null);
        }
      } catch (error) {
        console.error("Error al obtener el inmueble:", error);
        setInmueble(null);
      }
    };
    fetchInmueble();
  }, [slug]);

  // Cargar opciones de filtro desde la API
  useEffect(() => {
    const fetchFilterOptions = async () => {
      try {
        console.log('Cargando opciones de filtro en single...');
        const response = await fetch('/api/getRealStateOffer?pagination[pageSize]=1000');
        const data = await response.json();
        
        console.log('Respuesta de la API para opciones:', data);
        
        if (data.data && Array.isArray(data.data)) {
          console.log('Datos recibidos:', data.data.length, 'elementos');
          
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
          console.log('Opciones de filtro extraídas:', options);
          setFilterOptions(options);
        } else {
          console.log('No se cumplió la condición para cargar opciones:', {
            hasData: !!data.data,
            isArray: Array.isArray(data.data),
            dataType: typeof data.data
          });
        }
      } catch (error) {
        console.error("Error al obtener opciones de filtro:", error);
      }
    };
    
    fetchFilterOptions();
  }, []);

  if (!inmueble) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 text-lg">Error al cargar el inmueble</p>
          <p className="text-gray-600 mt-2">No se pudo cargar la información del inmueble solicitado</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <HeadingPage
        title="Oferta Inmobiliaria"
        smallTitle="Encuentre aquí el inmueble que necesita"
        className="relative pb-32"
      />

      <div className="container mx-auto px-4 -mt-16 z-10 relative">
        <AdvancedSearchBar 
          onSearch={handleSearch} 
          options={filterOptions || {
            offerType: [{ label: 'Todos', value: 'todos' }],
            propertyType: [{ label: 'Todos', value: 'todos' }],
            propertyUse: [{ label: 'Todos', value: 'todos' }],
            city: [{ label: 'Todos', value: 'todos' }],
            country: [{ label: 'Todos', value: 'todos' }],
            propertyStatus: [{ label: 'Todos', value: 'todos' }]
          }}
          currentFilters={searchFilters}
        />

        <article className="py-16">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Left side */}
              <div className="w-full md:w-1/2 pt-16 -mr-18">
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
                  {inmueble.offerType && inmueble.offerType.length > 0 && (
                    <div className="flex items-center gap-2 w-full md:w-1/2 border-b border-background-1 pb-3">
                      <img
                        src={IconTipoOferta.src}
                        alt="Tipo de oferta"
                        className="w-[20px] h-[20px]"
                      />
                      <span className="text-body2">{inmueble.offerType.map(type => type.charAt(0).toUpperCase() + type.slice(1)).join(', ')}</span>
                    </div>
                  )}
                  {inmueble.propertyType && inmueble.propertyType.length > 0 && (
                    <div className="flex items-center gap-2 w-full md:w-1/2 border-b border-background-1 pb-3">
                      <img
                        src={IconTipoInmueble.src}
                        alt="Tipo de inmueble"
                        className="w-[20px] h-[20px]"
                      />
                      <span className="text-body2">{inmueble.propertyType.map(type => type.charAt(0).toUpperCase() + type.slice(1)).join(', ')}</span>
                    </div>
                  )}
                  {inmueble.propertyUse && inmueble.propertyUse.length > 0 && (
                    <div className="flex items-center gap-2 w-full md:w-1/2 border-b border-background-1 pb-3">
                      <img
                        src={IconUso.src}
                        alt="Uso de inmueble"
                        className="w-[20px] h-[20px]"
                      />
                      <span className="text-body2">{inmueble.propertyUse.map(use => use.charAt(0).toUpperCase() + use.slice(1)).join(', ')}</span>
                    </div>
                  )}
                  {inmueble.area && (
                    <div className="flex items-center gap-2 w-full md:w-1/2 border-b border-background-1 pb-3">
                      <img
                      src={IconArea.src}
                      alt="Área de inmueble"
                      className="w-[20px] h-[20px]"
                    />
                    <span className="text-body2">{inmueble.area}</span>
                    </div>
                  )}
                  {inmueble.propertyStatus && (
                    <div className="flex items-center gap-2 w-full md:w-1/2 border-b border-background-1 pb-3">
                      <img
                      src={IconEstado.src}
                      alt="Estado de inmueble"
                      className="w-[20px] h-[20px]"
                    />
                    <span className="text-body2">
                      {inmueble.propertyStatus}
                    </span>
                    </div>
                  )}
                </div>
                {inmueble.description && (
                  <div className="text-body font-light mt-4">
                    <ReactMarkdown>{String(inmueble.description)}</ReactMarkdown>
                  </div>
                )}

                {/* Certifications */}
                {Array.isArray(inmueble.certifications) && hasCertificationContent(inmueble.certifications as StrapiBlock[]) && (
                  <div className="mt-10">
                    <div className="flex items-center gap-2">
                      <img
                        src={IconCertificado.src}
                        alt="Certificado"
                        className="w-[20px] h-[20px]"
                      />
                      <h3 className="text-body font-medium">Certificaciones</h3>
                    </div>
                    <div
                      className="mt-4 [&>ul]:list-disc [&>ul]:list-inside [&>ul]:text-body [&>ul]:font-light [&>ul]:space-y-1 [&>ul]:pl-5 [&>p]:text-body [&>p]:font-light [&>h1]:text-h4 [&>h2]:text-h5 [&>h3]:text-h6 [&>strong]:font-semibold [&>em]:italic"
                      dangerouslySetInnerHTML={{
                        __html: renderStrapiBlocks(inmueble.certifications as StrapiBlock[]),
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
