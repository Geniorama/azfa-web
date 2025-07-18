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
      "/api/getMapCountries?populate[0]=document.document&populate[1]=items.headingList.icon&populate[2]=items.items"
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
          items: country.items.items?.map((item) => ({
            id: item.id,
            icon: country.items.headingList.icon.url,
            title: country.items.headingList.title,
            subitems: country.items.items?.map((subitem) => ({
              id: subitem.id,
              title: subitem.text,
              link: subitem.link,
            })),
          })),
        };
      }
    );

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
    // Mapeo de IDs del mapa a IDs de la lista de países
    const mapToPaisId: { [key: string]: string } = {
      espana: "españa",
      republicadominicana: "republica-dominicana",
      costarica: "costa-rica",
      elsalvador: "el-salvador",
      estadosunidos: "estados-unidos",
      puertorico: "puerto-rico",
      surinam: "suriname",
      guyana: "guyana-francesa",
      "reino-unido": "reino-unido",
      francia: "francia",
      alemania: "alemania",
      italia: "italia",
      portugal: "portugal",
      canada: "canada",
      haiti: "haiti",
    };

    // Usar el mapeo si existe, sino usar el ID original
    const paisId = mapToPaisId[countryId] || countryId;

    // Buscar el país en la lista de países
    const paisEncontrado = countriesOptions.find((pais) => pais.id === paisId);
    if (paisEncontrado) {
      setSelectedPais(paisEncontrado);
      // No expandir automáticamente, solo seleccionar
      setExpandedPais(null);
      console.log("País seleccionado desde el mapa:", paisEncontrado);

      // Hacer scroll hasta el país seleccionado después de un pequeño delay
      setTimeout(() => {
        const paisElement = document.getElementById(
          `pais-${paisEncontrado.id}`
        );
        if (paisElement) {
          const container = paisElement.closest(".overflow-y-auto");
          if (container) {
            const containerRect = container.getBoundingClientRect();
            const elementRect = paisElement.getBoundingClientRect();
            const offset = 100; // Offset de 20px desde la parte superior

            container.scrollTo({
              top:
                container.scrollTop +
                elementRect.top -
                containerRect.top -
                offset,
              behavior: "smooth",
            });
          }
        }
      }, 100);
    } else {
      console.log("País no encontrado en la lista:", countryId, "->", paisId);
    }
  };

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
        <div className="w-full md:w-5/8 bg-[#73DAEB] flex justify-center items-start h-full overflow-hidden">
          <MapOne
            onCountrySelect={handleMapCountrySelect}
            selectedCountryId={selectedPais?.id}
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

            <div className="flex flex-col text-text-primary overflow-y-auto h-screen pt-26 custom-scrollbar">
              {countriesInfo.map((pais, index) => {
                const isExpanded = expandedPais === pais.id;
                const isSelected = selectedPais?.id === pais.id;

                return (
                  <div
                    id={`pais-${pais.id}`}
                    className={`grid grid-cols-2 transition-all duration-500 ease-in-out ${
                      index % 2 === 0
                        ? "bg-background-2"
                        : "bg-primary text-white"
                    } ${
                      isExpanded
                        ? "col-span-2 h-screen min-h-full"
                        : "opacity-100 max-h-full min-h-auto"
                    } ${
                      isSelected && !isExpanded
                        ? "ring-2 ring-blue-500 ring-opacity-50"
                        : ""
                    }`}
                    key={pais.id}
                    onClick={() => handlePaisExpand(pais.id)}
                    style={{ cursor: "pointer" }}
                  >
                    <div
                      className={`flex flex-col gap-4 px-4 py-8 transition-all duration-500 ${
                        isExpanded ? "justify-start" : ""
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <h3
                          className={`text-h4 transition-all duration-500 ${
                            isExpanded ? "text-3xl" : ""
                          }`}
                        >
                          {pais.label}
                        </h3>
                        {isExpanded && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setExpandedPais(null);
                              setSelectedPais(null);

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
                        )}
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
                    <div className="flex flex-col gap-4 text-text-primary bg-[#FBFBFB] p-6 h-full border-b border-text-primary">
                      {pais.items &&
                        pais.items.map((item, index) => (
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
