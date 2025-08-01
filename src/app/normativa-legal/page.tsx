"use client";

import HeadingPage from "@/components/HeadingPage";
import Cover from "@/assets/img/cover-normativa-legal.webp";
import SearchInput from "@/utils/SearchInput";
import { useState, useEffect } from "react";
import { GoArrowDown } from "react-icons/go";
import { IoClose } from "react-icons/io5";
import MapOne from "@/utils/MapOne/MapOne";
import Link from "@/utils/Link";
import type { ContentType } from "@/types/contentType";
import type { DownloadType } from "@/types/componentsType";
import type { CountryResponse } from "@/types/responseTypes";
import type { OptionType } from "@/types/componentsType";

interface Item {
  id: string;
  icon?: React.ReactNode | string;
  title: string;
  link?: string;
  subitems?: Item[];
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
  const [countriesOptions, setCountriesOptions] = useState<{id: string, label: string, value: string}[]>([]);
  const [countriesInfo, setCountriesInfo] = useState<InfoCountry[]>([]);
  const [countryImageSelected, setCountryImageSelected] = useState<string | null>(null);

  const getContent = async (id: string) => {
    const response = await fetch(
      `/api/getContent?id=${id}&populate[0]=heading.backgroundImg&populate[1]=sections.document&populate[2]=sections.cover`
    );
    const data = await response.json();
    setPageContent(data.data as ContentType);

    if (data.data.sections && data.data.sections.length > 0) {
      const sectionDownload = data.data.sections.find(
        (section: unknown) =>
          (section as { __component?: string }).__component ===
          "sections.download"
      );

      const downloadData: DownloadType = {
        id: sectionDownload.id,
        title: sectionDownload.title,
        buttonText: sectionDownload.textButton,
        documentUrl: sectionDownload.document.url,
        cover: {
          url: sectionDownload.cover.url,
          alternativeText: sectionDownload.cover.alternativeText,
        },
        target: sectionDownload.target,
      };

      setDownloadSection(downloadData);
    }
  };

  const getCountries = async () => {
    const response = await fetch(
      "/api/getMapCountries?populate[0]=document.document&populate[1]=items.headingList.icon&populate[2]=items.items&populate[3]=countryImage"
    );
    const data = await response.json();

    console.log("data", data);

    const countries: InfoCountry[] = data.data.map(
      (country: CountryResponse) => {
        return {
          id: country.id,
          label:
            country.country.charAt(0).toUpperCase() + country.country.slice(1),
          value: country.country,
          linkDownload: country.document.document.url,
          countryImage: country.countryImage?.url || '',
          items: country.items?.map((item, index) => ({
            id: `item-${index}`,
            icon: item.headingList?.icon?.url || '',
            title: item.headingList?.title || '',
            subitems: item.items?.map((subitem: { id: string; text: string; link: string }) => ({
              id: subitem.id,
              title: subitem.text,
              link: subitem.link,
            })) || [],
          })) || []
        };
      }
    );

    console.log("countries", countries)

    setCountriesInfo(countries);
    setCountriesOptions(countries.map((country) => ({
      id: country.id,
      label: country.label,
      value: country.value,
    })));
  };

  useEffect(() => {
    getContent("ojn04v7g3reqt0jf06mkt0co");
    getCountries();
  }, []);

  useEffect(() => {
    if (scrollToPais && countriesInfo.length > 0) {
      setTimeout(() => {
        const paisElement = document.getElementById(`pais-${scrollToPais}`);
        const container = document.querySelector(
          ".overflow-y-auto"
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
      // Habilitar el scroll por si estaba bloqueado
      const container = document.querySelector(
        ".overflow-y-auto"
      ) as HTMLElement;
      if (container) {
        container.style.overflow = "auto";
      }
      return;
    }
    setSelectedPais(pais);
    setExpandedPais(pais.id); // Expandir automáticamente el país seleccionado
    setScrollToPais(pais.id); // Marcar que queremos hacer scroll a este país
    // Bloquear el scroll cuando se selecciona desde el buscador
    const container = document.querySelector(".overflow-y-auto") as HTMLElement;
    if (container) {
      container.style.overflow = "hidden";
    }
    console.log("País seleccionado:", pais);
  };

  const handlePaisExpand = (paisId: string) => {
    const newExpandedPais = expandedPais === paisId ? null : paisId;
    setExpandedPais(newExpandedPais);
    setCountryImageSelected(countriesInfo.find((p) => p.id === paisId)?.countryImage || null);

    // Actualizar el país seleccionado para sincronizar mapa y buscador
    if (newExpandedPais) {
      const pais = countriesOptions.find((p) => p.id === paisId);
      if (pais) setSelectedPais(pais);
    }

    // Obtener el contenedor de scroll
    const container = document.querySelector(".overflow-y-auto") as HTMLElement;

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
    const country = countriesInfo.find((p) => p.value === countryId);

    setSelectedPais(country || null);
    setCountryImageSelected(country?.countryImage || null)
    setExpandedPais(country?.id || null);
    setScrollToPais(country?.id || null);
  };

  useEffect(() => {
    console.log("countryImageSelected", countryImageSelected);
  }, [countryImageSelected]);

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
      <div className="flex flex-col-reverse md:flex-row h-screen min-h-full">
        <div className={`w-full md:w-5/8 bg-[#73DAEB] flex justify-center ${countryImageSelected ? 'items-center' : 'items-start'} h-full overflow-hidden`}>
          {countryImageSelected ? (
            <img src={countryImageSelected} alt="countryImageSelected" className="w-full max-w-lg border-2 border-white rounded-full" />
          ) : (
            <MapOne
              onCountrySelect={handleMapCountrySelect}
            />
          )}
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

            <div className="flex flex-col text-text-primary overflow-y-auto h-screen md:pt-26 xl:pt-19 custom-scrollbar">
              {expandedPais ? (
                // Si hay un país expandido, mostrar solo ese país
                countriesInfo
                  .filter((pais) => pais.id === expandedPais)
                  .map((pais, index) => {

                    return (
                                             <div
                         id={`pais-${pais.id}`}
                         className="grid grid-cols-2 h-full transition bg-primary text-white border-b border-gray-300"
                         key={index}
                         onClick={() => handlePaisExpand(pais.id)}
                         style={{ cursor: "pointer" }}
                       >
                                         {/* Left column */}
                     <div
                       className="flex flex-col gap-4 px-4 py-8 transition justify-start h-full"
                     >
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

                               // Habilitar el scroll cuando se cierra
                               const container = document.querySelector(
                                 ".overflow-y-auto"
                               ) as HTMLElement;
                               if (container) {
                                 container.style.overflow = "auto";
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
                    <div className="flex flex-col gap-4 text-text-primary bg-[#FBFBFB] p-6 h-full overflow-y-auto">
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
                              <ul className="list-disc pl-7 mt-2 font-light">
                                {item.subitems.map((subitem, index) => (
                                  <li key={index}>
                                    <p className="text-button">
                                      {subitem.title}
                                    </p>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        ))}
                    </div>
                  </div>
                );
              })
            ) : (
              // Si no hay país expandido, mostrar todos los países
              countriesInfo.map((pais, index) => {
                console.log("pais map", pais);

                return (
                  <div
                    id={`pais-${pais.id}`}
                    className="grid grid-cols-2 transition hover:bg-primary hover:text-white border-b border-gray-300"
                    key={index}
                    onClick={() => handlePaisExpand(pais.id)}
                    style={{ cursor: "pointer" }}
                  >
                    {/* Left column */}
                    <div className="flex flex-col gap-4 px-4 py-8 transition">
                      <div className="flex justify-between items-start">
                        <h3 className="text-h4 transition">
                          {pais.label}
                        </h3>
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
                    <div className="flex flex-col gap-4 text-text-primary bg-[#FBFBFB] p-6 h-full">
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
                              <ul className="list-disc pl-7 mt-2 font-light">
                                {item.subitems.map((subitem, index) => (
                                  <li key={index}>
                                    <p className="text-button">
                                      {subitem.title}
                                    </p>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        ))}
                    </div>
                  </div>
                );
              })
            )}
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
