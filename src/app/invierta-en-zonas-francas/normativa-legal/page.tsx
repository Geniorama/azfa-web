"use client";

import HeadingPage from "@/components/HeadingPage";
import Cover from "@/assets/img/cover-normativa-legal.webp";
import SearchInput from "@/utils/SearchInput";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useState, useEffect } from "react";
import { GoArrowDown } from "react-icons/go";
import { IoClose } from "react-icons/io5";
import MapOne from "@/utils/MapOne/MapOne";
import Link from "@/utils/Link";
import type { ContentType } from "@/types/contentType";
import type { DownloadType } from "@/types/componentsType";
import type { CountryResponse } from "@/types/responseTypes";
import type { OptionType } from "@/types/componentsType";
import MapResponsive from "@/assets/img/azfa-mapa-marco-legal-responsive.jpg";
import { getCountryCode, getCountryName } from "@/utils/countryMapping";

// Función para renderizar content blocks como JSX con bullets diferenciados
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const renderContentBlocksJSX = (contentBlocks: any[]) => {
  if (!contentBlocks || contentBlocks.length === 0) return <span>Sin contenido</span>;
  
  console.log("Content Blocks recibidos:", JSON.stringify(contentBlocks, null, 2));
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const processBlocks = (blocks: any[], level: number = 0) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return blocks.map((block: any, index: number) => {
      if (typeof block === 'string') return <span key={index}>{block}</span>;
      if (!block || typeof block !== 'object') return <span key={index}></span>;
      
      console.log(`Procesando block tipo: ${block.type}`, block);
      
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      switch (block.type) {
        case 'paragraph':
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const processedParagraphChildren = block.children?.map((child: any, childIndex: number) => {
            if (child.type === 'text') {
              return child.text || '';
            } else if (child.type === 'link') {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              const linkText = child.children?.map((textChild: any) => textChild?.text || '').join('') || '';
              const href = child.url || '#';
              return (
                <a 
                  key={`para-link-${index}-${childIndex}`}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 underline"
                >
                  {linkText}
                </a>
              );
            }
            return '';
          });
          
          return <p key={index} className="mb-2">{processedParagraphChildren}</p>;
          
        case 'list':
          console.log(`Lista encontrada con ${block.children?.length || 0} items`);
          const children = block.children || [];
          const processedChildren: React.ReactElement[] = [];
          
          // Procesar los children secuencialmente
          for (let i = 0; i < children.length; i++) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const child: any = children[i];
            
            if (child.type === 'list-item') {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              const processedItemChildren = child.children?.map((child: any, childIndex: number) => {
                if (child.type === 'text') {
                  return child.text || '';
                } else if (child.type === 'link') {
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  const linkText = child.children?.map((textChild: any) => textChild?.text || '').join('') || '';
                  const href = child.url || '#';
                  return (
                    <a 
                      key={`main-link-${i}-${childIndex}`}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 underline"
                    >
                      {linkText}
                    </a>
                  );
                }
                return '';
              });
              
              processedChildren.push(
                <li key={`main-${i}`} className="mb-1">
                  {processedItemChildren}
                </li>
              );
            } else if (child.type === 'list' && child.indentLevel === 1) {
              // Esta es una sublista, agregar al último list-item
              if (processedChildren.length > 0) {
                const lastIndex = processedChildren.length - 1;
                const lastProcessed = processedChildren[lastIndex];
                
                // Crear elementos de sub-lista
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const subItemElements = child.children?.map((subItem: any, subIndex: number) => {
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  const processedChildren = subItem.children?.map((child: any, childIndex: number) => {
                    if (child.type === 'text') {
                      return child.text || '';
                    } else if (child.type === 'link') {
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      const linkText = child.children?.map((textChild: any) => textChild?.text || '').join('') || '';
                      const href = child.url || '#';
                      return (
                        <a 
                          key={`sub-link-${i}-${subIndex}-${childIndex}`}
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-text-primary hover:text-blue-800 underline"
                        >
                          {linkText}
                        </a>
                      );
                    }
                    return '';
                  });
                  
                  return (
                    <li key={`sub-${i}-${subIndex}`} className="flex items-start mb-1">
                      <span className="text-gray-700 mr-2 mt-1 shrink-0">-</span>
                      <span className="flex-1">{processedChildren}</span>
                    </li>
                  );
                });
                
                // Actualizar el último elemento para incluir la sublista
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const originalContent = (lastProcessed as any).props?.children;
                processedChildren[lastIndex] = (
                  <li key={`main-${lastIndex}`} className="mb-1">
                    {originalContent}
                    <ul className="list-none ml-0 mt-1">
                      {subItemElements}
                    </ul>
                  </li>
                );
              }
            }
          }
          
          return (
            <ul key={index} className="list-disc ml-4 space-y-2">
              {processedChildren}
            </ul>
          );
          
        case 'listItem':
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const itemText = block.children?.map((child: any) => child?.text || '').join('') || '';
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const nestedList = block.children?.find((child: any) => child.type === 'list');
          
          if (nestedList) {
            return (
              <div key={index}>
                <div className="flex items-start mb-1">
                  <span className="text-gray-700 mr-2 mt-1 shrink-0">-</span>
                  <span className="flex-1">{itemText}</span>
                </div>
                {processBlocks(nestedList.children || [], level + 1)}
              </div>
            );
          }
          
          return (
            <div key={index} className="flex items-start mb-1">
              <span className="text-gray-700 mr-2 mt-1 shrink-0">-</span>
              <span className="flex-1">{itemText}</span>
            </div>
          );
          
        default:
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const text = block.children?.map((child: any) => child?.text || '').join('') || block.text || '';
          return <span key={index}>{text}</span>;
      }
    });
  };
  
  try {
    const jsxContent = processBlocks(contentBlocks);
    console.log("JSX Content generado:", jsxContent);
    return <div>{jsxContent}</div>;
  } catch (error) {
    console.log("Error procesando content blocks:", error, contentBlocks);
    return <span>Error en contenido</span>;
  }
};

interface Item {
  id: string;
  icon?: React.ReactNode | string;
  title: string;
  subitems?: {
    id: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    content: any[]; // Estructura de blocks de Strapi (campo content, no jsonBlocks)
  }[];
}

interface InfoCountry {
  id: string;
  label: string;
  value: string;
  linkDownload?: string;
  textButton?: string;
  items?: Item[];
  countryImage?: string;
}

export default function NormativaLegal() {
  const [selectedPais, setSelectedPais] = useState<OptionType | null>(null);
  const [expandedPais, setExpandedPais] = useState<string | null>(null);
  const [scrollToPais, setScrollToPais] = useState<string | null>(null);
  const [pageContent, setPageContent] = useState<ContentType | null>(null);
  const [downloadSection, setDownloadSection] = useState<DownloadType | null>(
    null
  );
  const [countriesOptions, setCountriesOptions] = useState<
    { id: string; label: string; value: string }[]
  >([]);
  const [countriesInfo, setCountriesInfo] = useState<InfoCountry[]>([]);
  const [countryImageSelected, setCountryImageSelected] = useState<
    string | null
  >(null);
  const [isLoading, setIsLoading] = useState(true);

  const getContent = async (id: string) => {
    try {
      const response = await fetch(
        `/api/getContent?id=${id}&populate[0]=heading.backgroundImg&populate[1]=sections.document&populate[2]=sections.cover`
      );
      const data = await response.json();

      if (data.data) {
        setPageContent(data.data as ContentType);

        if (data.data.sections && data.data.sections.length > 0) {
          const sectionDownload = data.data.sections.find(
            (section: unknown) =>
              (section as { __component?: string }).__component ===
              "sections.download"
          );

          if (sectionDownload) {
            const downloadData: DownloadType = {
              id: sectionDownload.id,
              title: sectionDownload.title,
              buttonText: sectionDownload.textButton,
              documentUrl: sectionDownload.document?.url || "",
              cover: {
                url: sectionDownload.cover?.url || "",
                alternativeText: sectionDownload.cover?.alternativeText || "",
              },
              target: sectionDownload.target,
            };

            setDownloadSection(downloadData);
          }
        }
      } else {
        console.error(
          "Error al obtener el contenido:",
          data.error || "No se encontró contenido"
        );
        setPageContent(null);
      }
    } catch (error) {
      console.error("Error al obtener el contenido:", error);
      setPageContent(null);
    } finally {
      setIsLoading(false);
    }
  };

  const getCountries = async () => {
    try {
      const response = await fetch(
        "/api/getMapCountries?populate[0]=document.document&populate[1]=items.headingList.icon&populate[2]=items.items&populate[3]=countryImage"
      );
      const data = await response.json();

      console.log("data", data);

      if (data.data && Array.isArray(data.data)) {
        const countries: InfoCountry[] = data.data.map(
          (country: CountryResponse) => {
            // Obtener el código ISO y nombre del país usando las funciones de utilidad
            const countryCode = getCountryCode(country.country);
            const countryName = getCountryName(countryCode);

            // Debug: Ver estructura de items del país
            console.log(`Items del país ${countryName}:`, country.items);

            return {
              id: country.id,
              label: countryName,
              value: countryCode, // Usar el código ISO del plugin
              linkDownload: country.document?.document?.url || "",
              countryImage: country.countryImage?.url || "",
              items:
                country.items?.map((item, index) => ({
                  id: `item-${index}`,
                  icon: item.headingList?.icon?.url || "",
                  title: item.headingList?.title || "",
                  subitems:
                    item.items?.map(
                      (subitem: {
                        id: string;
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        content: any[];
                      }) => {
                        // Debug: Ver estructura del subitem
                        console.log(`Subitem de ${item.headingList?.title}:`, subitem);
                        return {
                          id: subitem.id,
                          content: subitem.content,
                        };
                      }
                    ) || [],
                })) || [],
            };
          }
        );

        console.log("countries", countries);

        // Ordenar países alfabéticamente por nombre
        const sortedCountries = countries.sort((a, b) =>
          a.label.localeCompare(b.label, "es", { sensitivity: "base" })
        );

        setCountriesInfo(sortedCountries);
        setCountriesOptions(
          sortedCountries.map((country) => ({
            id: country.id,
            label: country.label,
            value: country.value,
          }))
        );
      } else {
        console.error(
          "Error al obtener países:",
          data.error || "No se encontraron países"
        );
        setCountriesInfo([]);
        setCountriesOptions([]);
      }
    } catch (error) {
      console.error("Error al obtener países:", error);
      setCountriesInfo([]);
      setCountriesOptions([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getContent("ojn04v7g3reqt0jf06mkt0co");
    getCountries();
  }, []);

  useEffect(() => {
    if (scrollToPais && countriesInfo.length > 0) {
      setTimeout(() => {
        const paisElement = document.getElementById(`pais-${scrollToPais}`);
        const container = document.getElementById(
          "countries-scroll-container"
        ) as HTMLElement;
        if (paisElement && container) {
          const containerRect = container.getBoundingClientRect();
          const elementRect = paisElement.getBoundingClientRect();
          const offset = 100;
          container.scrollTo({
            top:
              container.scrollTop +
              elementRect.top -
              containerRect.top -
              offset,
            behavior: "smooth",
          });
        }
        setScrollToPais(null); // Limpiar para futuros scrolls
      }, 100);
    }
  }, [scrollToPais, countriesInfo]);

  const handlePaisSelect = (pais: OptionType | null) => {
    if (!pais) {
      setSelectedPais(null);
      setExpandedPais(null);
      setScrollToPais(null);
      setCountryImageSelected(null); // Limpiar la imagen del país para mostrar el mapa
      // Habilitar el scroll por si estaba bloqueado - usar ID específico
      if (window.innerWidth >= 768) {
        const container = document.getElementById(
          "countries-scroll-container"
        ) as HTMLElement;
        if (container) {
          container.style.overflow = "auto";
        }
      }
      return;
    }

    // Buscar el país por el código ISO en countriesInfo
    const selectedCountryInfo = countriesInfo.find(
      (country) => country.value === pais.value
    );
    if (selectedCountryInfo) {
      setSelectedPais(pais);
      setScrollToPais(selectedCountryInfo.id); // Usar el ID del país encontrado
      setCountryImageSelected(selectedCountryInfo.countryImage || null); // Mostrar la imagen del país

      // Solo expandir automáticamente en pantallas grandes
      if (window.innerWidth >= 768) {
        setExpandedPais(selectedCountryInfo.id);
        // Bloquear el scroll cuando se selecciona desde el buscador - usar ID específico
        const container = document.getElementById(
          "countries-scroll-container"
        ) as HTMLElement;
        if (container) {
          container.style.overflow = "hidden";
        }
      }
      console.log("País seleccionado:", pais);
    }
  };

  const handlePaisExpand = (paisId: string) => {
    // Solo ejecutar en pantallas medianas y grandes
    if (window.innerWidth < 768) {
      return;
    }

    const newExpandedPais = expandedPais === paisId ? null : paisId;
    setExpandedPais(newExpandedPais);
    setCountryImageSelected(
      countriesInfo.find((p) => p.id === paisId)?.countryImage || null
    );

    // Actualizar el país seleccionado para sincronizar mapa y buscador
    if (newExpandedPais) {
      const pais = countriesOptions.find((p) => p.id === paisId);
      if (pais) setSelectedPais(pais);
    }

    // Obtener el contenedor de scroll usando ID específico
    const container = document.getElementById("countries-scroll-container") as HTMLElement;

    if (newExpandedPais) {
      // Si se está expandiendo, bloquear el scroll
      if (container) {
        container.style.overflow = "hidden";
      }
      // Hacer scroll hasta la parte superior
      setTimeout(() => {
        const paisElement = document.getElementById(`pais-${paisId}`);
        if (paisElement && container) {
          const containerRect = container.getBoundingClientRect();
          const elementRect = paisElement.getBoundingClientRect();
          const offset = 100; // Offset de 100px desde la parte superior
          container.scrollTo({
            top:
              container.scrollTop +
              elementRect.top -
              containerRect.top -
              offset,
            behavior: "smooth",
          });
        }
      }, 100);
    } else {
      // Si se está contrayendo, habilitar el scroll
      if (container) {
        container.style.overflow = "auto";
      }
    }
  };

  const handleMapCountrySelect = (countryId: string) => {
    console.log("Mapa seleccionó país:", countryId);
    
    // Convertir el ID del mapa (ej: "colombia") al código ISO (ej: "CO")
    const countryCode = getCountryCode(countryId);
    console.log("Código ISO convertido:", countryCode);
    
    // Buscar el país por el código ISO en countriesInfo
    const country = countriesInfo.find((p) => p.value === countryCode);
    console.log("País encontrado:", country);

    if (country) {
      // Solo actualizar el estado sin manipular el DOM para evitar interferir con el header
      const newExpandedPais = expandedPais === country.id ? null : country.id;
      setExpandedPais(newExpandedPais);
      setCountryImageSelected(
        countriesInfo.find((p) => p.id === country.id)?.countryImage || null
      );
      
      // Actualizar el país seleccionado para sincronizar con el buscador
      if (newExpandedPais) {
        const pais = countriesOptions.find((p) => p.id === countryCode);
        if (pais) setSelectedPais(pais);
      }
    } else {
      console.log("No se encontró país para el código:", countryCode);
    }
  };

  useEffect(() => {
    console.log("countryImageSelected", countryImageSelected);
  }, [countryImageSelected]);

  if (isLoading) {
    return <LoadingSpinner message="Cargando normativa legal..." />;
  }

  if (!pageContent) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 text-lg">Error al cargar el contenido</p>
          <p className="text-gray-600 mt-2">
            No se pudo cargar la información de normativa legal
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {pageContent?.heading && (
        <HeadingPage
          title={pageContent.heading.title}
          smallTitle={pageContent.heading.smallTitle}
          image={pageContent.heading.imageUrl || Cover.src}
          textAlign={pageContent.heading.alignment}
        />
      )}
      <div className="flex flex-col md:flex-row md:h-screen min-h-full">
        <div
          className={`hidden md:flex w-full md:w-5/8 bg-[#73DAEB] justify-center ${
            countryImageSelected ? "items-start pt-16" : "items-start"
          } h-full overflow-hidden`}
          data-map-container
        >
          {countryImageSelected ? (
            <img
              src={countryImageSelected}
              alt="countryImageSelected"
              className="w-full max-w-lg"
            />
          ) : (
            <MapOne onCountrySelect={handleMapCountrySelect} />
          )}
        </div>
        <div className="flex md:hidden w-full h-full">
          <img
            src={MapResponsive.src}
            alt="Mapa Responsive"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="w-full md:w-3/8 h-full">
          <div className="relative">
            <div className="absolute top-0 left-0 w-full">
              <SearchInput
                placeholder="Escriba el nombre del país..."
                options={countriesOptions}
                onSelect={handlePaisSelect}
                selected={selectedPais}
                label="Buscar por país"
              />
            </div>

            <div id="countries-scroll-container" className="flex flex-col text-text-primary overflow-y-auto h-screen pt-26 md:pt-26 xl:pt-19 custom-scrollbar">
              {expandedPais
                ? // Si hay un país expandido, mostrar solo ese país
                  countriesInfo
                    .filter((pais) => pais.id === expandedPais)
                    .map((pais, index) => {
                      return (
                        <div
                          id={`pais-${pais.id}`}
                          className="hidden lg:grid lg:grid-cols-3 h-full transition bg-primary text-white border-b border-gray-300"
                          key={index}
                        >
                          {/* Left column */}
                          <div className="flex lg:col-span-1 flex-col gap-4 px-4 py-8 transition justify-start h-full">
                            <div className="flex justify-between items-start">
                              <h3 className="text-h4 transition text-3xl">
                                {pais.label}
                              </h3>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setExpandedPais(null);
                                  setSelectedPais(null);
                                  setCountryImageSelected(null);
                                  setScrollToPais(null);

                                  // Habilitar el scroll cuando se cierra - usar ID específico para evitar afectar el header
                                  if (window.innerWidth >= 768) {
                                    const container = document.getElementById(
                                      "countries-scroll-container"
                                    ) as HTMLElement;
                                    if (container) {
                                      container.style.overflow = "auto";
                                    }
                                  }
                                }}
                                className="p-2 hover:bg-gray-200 hover:text-primary rounded-full transition-colors cursor-pointer"
                              >
                                <IoClose className="text-2xl" />
                              </button>
                            </div>

                            <a
                              href={pais.linkDownload}
                              target="_blank"
                              className="inline-flex items-center gap-2 cursor-pointer hover:text-details mt-6 transition w-fit"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <span className="underline underline-offset-6">
                                Descargar
                              </span>
                              <GoArrowDown className="text-2xl" />
                            </a>
                          </div>

                          {/* Right column */}
                          <div className="flex lg:col-span-2 flex-col gap-4 text-text-primary bg-[#FBFBFB] p-6 h-full overflow-y-auto">
                            {pais.items?.map((item, index) => (
                              <div
                                className={`${
                                  index === (pais.items?.length ?? 0) - 1
                                    ? ""
                                    : "border-b border-text-primary pb-4"
                                }`}
                                key={index}
                              >
                                <h4 className="text-button font-medium flex items-center gap-2">
                                  {item.icon &&
                                  typeof item.icon === "string" ? (
                                    <img
                                      src={item.icon}
                                      alt={item.title}
                                      className="w-5 h-5"
                                    />
                                  ) : (
                                    item.icon
                                  )}
                                  {item.title}
                                </h4>
                                {item.subitems && (
                                  <div className="pl-6 mt-2 font-light space-y-2">
                                    {item.subitems.map((subitem, index) => (
                                      <div key={index}>
                                        <div className="prose prose-sm max-w-none">
                                          {renderContentBlocksJSX(subitem.content)}
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })
                : // Si no hay país expandido, mostrar todos los países
                  countriesInfo.map((pais, index) => {
                    return (
                      <div
                        id={`pais-${pais.id}`}
                        className="lg:grid lg:grid-cols-3 transition hover:bg-primary border-b-2 md:border-b border-gray-300"
                        key={index}
                        onClick={() => handlePaisExpand(pais.id)}
                        style={{
                          cursor:
                            window.innerWidth >= 768 ? "pointer" : "default",
                        }}
                      >
                        {/* Left column */}
                        <div
                          className={`flex lg:col-span-1 flex-col md:gap-4 px-4 py-8 transition ${
                            selectedPais?.id === pais.id
                              ? "bg-primary text-white"
                              : "bg-[#EDEDED] hover:bg-primary hover:text-white"
                          }`}
                        >
                          <div className="flex justify-center md:justify-between items-start">
                            <h3 className="text-h4 transition">{pais.label}</h3>
                          </div>

                          <a
                            href={pais.linkDownload}
                            target="_blank"
                            className={`inline-flex w-full items-center gap-2 cursor-pointer mt-6 transition md:w-fit justify-center md:justify-start ${
                              selectedPais?.id === pais.id
                                ? "text-white hover:text-gray-200"
                                : "hover:text-details"
                            }`}
                            onClick={(e) => e.stopPropagation()}
                          >
                            <span className="underline underline-offset-6">
                              Descargar
                            </span>
                            <GoArrowDown className="text-2xl" />
                          </a>
                        </div>

                        {/* Right column */}
                        <div className="flex lg:col-span-2 flex-col gap-4 text-text-primary bg-[#FBFBFB] p-6 h-full">
                          {pais.items?.map((item, index) => (
                            <div
                              className={`${
                                index === (pais.items?.length ?? 0) - 1
                                  ? ""
                                  : "border-b border-text-primary pb-4"
                              }`}
                              key={index}
                            >
                              <h4 className="text-button font-medium flex items-center gap-2">
                                {item.icon && typeof item.icon === "string" ? (
                                  <img
                                    src={item.icon}
                                    alt={item.title}
                                    className="w-5 h-5"
                                  />
                                ) : (
                                  item.icon
                                )}
                                {item.title}
                              </h4>
                              {item.subitems && (
                                <div className="pl-6 mt-2 font-light space-y-2">
                                  {item.subitems.map((subitem, index) => (
                                    <div key={index}>
                                      <div className="prose prose-sm max-w-none">
                                        {renderContentBlocksJSX(subitem.content)}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
            </div>
          </div>
        </div>
      </div>

      {/* Section Download */}
      {downloadSection && (
        <section className="bg-white pt-16 text-text-primary">
          <div className="container mx-auto px-4">
            <div className="flex gap-4 items-center justify-center">
              <div>
                <img
                  src={downloadSection.cover?.url}
                  alt={downloadSection.cover?.alternativeText || ""}
                  className="w-full"
                />
              </div>
              <div className="flex flex-col gap-4">
                <p className="text-h6">{downloadSection.title}</p>
                <Link
                  icon={true}
                  href={downloadSection.documentUrl || ""}
                  download={true}
                  target={downloadSection.target || "_self"}
                >
                  {downloadSection.buttonText}
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
