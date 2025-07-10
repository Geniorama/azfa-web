"use client";

import HeadingPage from "@/components/HeadingPage";
import Cover from "@/assets/img/cover-normativa-legal.webp";
import Mapa from "@/assets/img/azfa-mapa-normativa-legal.svg";
import SearchInput from "@/utils/SearchInput";
import { useState } from "react";
import { FaHome } from "react-icons/fa";
import { GoArrowDown } from "react-icons/go";
import { IoClose } from "react-icons/io5";

// Tipo para los países
interface Pais {
  id: string;
  label: string;
  value: string;
}

// Lista de países de ejemplo
const paises: Pais[] = [
  { id: "colombia", label: "Colombia", value: "colombia" },
  { id: "argentina", label: "Argentina", value: "argentina" },
  { id: "brasil", label: "Brasil", value: "brasil" },
  { id: "chile", label: "Chile", value: "chile" },
  { id: "peru", label: "Perú", value: "peru" },
  { id: "ecuador", label: "Ecuador", value: "ecuador" },
  { id: "venezuela", label: "Venezuela", value: "venezuela" },
  { id: "bolivia", label: "Bolivia", value: "bolivia" },
  { id: "paraguay", label: "Paraguay", value: "paraguay" },
  { id: "uruguay", label: "Uruguay", value: "uruguay" },
  { id: "mexico", label: "México", value: "mexico" },
  { id: "costa-rica", label: "Costa Rica", value: "costa-rica" },
  { id: "panama", label: "Panamá", value: "panama" },
  { id: "nicaragua", label: "Nicaragua", value: "nicaragua" },
  { id: "honduras", label: "Honduras", value: "honduras" },
  { id: "el-salvador", label: "El Salvador", value: "el-salvador" },
  { id: "guatemala", label: "Guatemala", value: "guatemala" },
  { id: "belice", label: "Belice", value: "belice" },
  {
    id: "republica-dominicana",
    label: "República Dominicana",
    value: "republica-dominicana",
  },
  { id: "cuba", label: "Cuba", value: "cuba" },
];

interface Item {
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
  items?: Item[];
}

const infoPaises: InfoCountry[] = [
  {
    id: "colombia",
    label: "Colombia",
    value: "colombia",
    linkDownload: "https://www.colombia.gov.co/normatividad/normativa-legal",
    items: [
      {
        icon: <FaHome className="text-[14px]" />,
        title: "Normativa Legal",
        subitems: [
          {
            title: "Normativa Legal",
          },
          {
            title: "Normativa Legal",
          },
          {
            title: "Normativa Legal",
          },
        ],
      },
      {
        icon: <FaHome className="text-[14px]" />,
        title: "Normativa Legal",
        subitems: [
          {
            title: "Normativa Legal",
          },
        ],
      },
      {
        icon: <FaHome className="text-[14px]" />,
        title: "Normativa Legal",
        subitems: [
          {
            title: "Normativa Legal",
          },
        ],
      },
    ],
  },
  {
    id: "argentina",
    label: "Argentina",
    value: "argentina",
    linkDownload: "https://www.argentina.gov.co/normatividad/normativa-legal",
    items: [
      {
        icon: <FaHome className="text-[14px]" />,
        title: "Normativa Legal",
        subitems: [
          {
            title: "Normativa Legal",
          },
        ],
      },
    ],
  },
  {
    id: "brasil",
    label: "Brasil",
    value: "brasil",
    linkDownload: "https://www.brasil.gov.co/normatividad/normativa-legal",
    items: [
      {
        icon: <FaHome className="text-[14px]" />,
        title: "Normativa Legal",
        subitems: [
          {
            title: "Normativa Legal",
          },
          {
            title: "Normativa Legal",
          },
          {
            title: "Normativa Legal",
          },
        ],
      },
    ],
  },
  {
    id: "chile",
    label: "Chile",
    value: "chile",
    linkDownload: "https://www.chile.gov.co/normatividad/normativa-legal",
    items: [
      {
        icon: <FaHome className="text-[14px]" />,
        title: "Normativa Legal",
        subitems: [
          {
            title: "Normativa Legal",
          },
        ],
      },
    ],
  },
  {
    id: "peru",
    label: "Perú",
    value: "peru",
    linkDownload: "https://www.peru.gov.co/normatividad/normativa-legal",
    items: [
      {
        icon: <FaHome className="text-[14px]" />,
        title: "Normativa Legal",
        subitems: [
          {
            title: "Normativa Legal",
          },
        ],
      },
    ],
  },
  {
    id: "ecuador",
    label: "Ecuador",
    value: "ecuador",
    linkDownload: "https://www.ecuador.gov.co/normatividad/normativa-legal",
    items: [
      {
        icon: <FaHome className="text-[14px]" />,
        title: "Normativa Legal",
        subitems: [
          {
            title: "Normativa Legal",
          },
        ],
      },
    ],
  },
  {
    id: "venezuela",
    label: "Venezuela",
    value: "venezuela",
    linkDownload: "https://www.venezuela.gov.co/normatividad/normativa-legal",
    items: [
      {
        icon: <FaHome className="text-[14px]" />,
        title: "Normativa Legal",
        subitems: [
          {
            title: "Normativa Legal",
          },
          {
            title: "Normativa Legal",
          },
          {
            title: "Normativa Legal",
          },
        ],
      },
    ],
  },
];

export default function NormativaLegal() {
  const [selectedPais, setSelectedPais] = useState<Pais | null>(null);
  const [expandedPais, setExpandedPais] = useState<string | null>(null);

  const handlePaisSelect = (pais: Pais) => {
    setSelectedPais(pais);
    setExpandedPais(pais.id);
    console.log("País seleccionado:", pais);
  };

  const handlePaisExpand = (paisId: string) => {
    setExpandedPais(expandedPais === paisId ? null : paisId);
  };

  return (
    <div>
      <HeadingPage
        title="Normativa Legal"
        description="Consulte la normativa legal de cada país"
        image={Cover.src}
      />
      <div className="flex h-screen min-h-full">
        <div className="w-5/8 bg-[#73DAEB] flex justify-center items-start h-full">
          <img
            src={Mapa.src}
            alt="Mapa Normativa Legal"
            className="max-w-[60%] mapa-item"
          />
        </div>
        <div className="w-3/8 h-full">
          <div className="relative">
            <div className="absolute top-0 left-0 w-full z-10">
              <SearchInput
                placeholder="Escriba el nombre del país..."
                options={paises}
                onSelect={handlePaisSelect}
                label="Buscar por país"
              />
            </div>

            {selectedPais && !expandedPais ? (
              <div>
                {/* Mostrar el país seleccionado desde el buscador */}
                {infoPaises.map((pais) => {
                  if (pais.id === selectedPais.id) {
                    return (
                      <div
                        className="grid grid-cols-2 col-span-2 h-screen transition-all duration-500 ease-in-out bg-background-2"
                        key={pais.id}
                      >
                        <div className="flex flex-col gap-4 px-4 py-8 justify-start">
                          <div className="flex justify-between items-start">
                            <h3 className="text-h4 text-3xl transition-all duration-500">{pais.label}</h3>
                            <button
                              onClick={() => {
                                setExpandedPais(null);
                                setSelectedPais(null);
                              }}
                              className="p-2 hover:bg-gray-200 rounded-full transition-colors"
                            >
                              <IoClose className="text-2xl" />
                            </button>
                          </div>
                          <a 
                            href={pais.linkDownload} 
                            target="_blank" 
                            className="inline-flex items-center gap-2 cursor-pointer hover:text-details mt-6 transition w-fit"
                          >
                            <span className="underline underline-offset-6">Descargar</span>
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
                  }
                  return null;
                })}
              </div>
            ) : (
              <div className="flex flex-col text-text-primary overflow-y-auto h-screen pt-26 custom-scrollbar">
                {infoPaises.map((pais, index) => {
                  const isExpanded = expandedPais === pais.id;
                  const isVisible = !expandedPais || isExpanded;
                  
                  return (
                    <div
                      className={`grid grid-cols-2 transition-all duration-500 ease-in-out ${
                        index % 2 === 0
                          ? "bg-background-2"
                          : "bg-primary text-white"
                      } ${
                        isExpanded 
                          ? "col-span-2 h-screen" 
                          : isVisible 
                            ? "opacity-100 max-h-full" 
                            : "opacity-0 max-h-0 overflow-hidden"
                      }`}
                      key={pais.id}
                      onClick={() => handlePaisExpand(pais.id)}
                      style={{ cursor: 'pointer' }}
                    >
                      <div className={`flex flex-col gap-4 px-4 py-8 transition-all duration-500 ${
                        isExpanded ? "justify-start" : ""
                      }`}>
                        <div className="flex justify-between items-start">
                          <h3 className={`text-h4 transition-all duration-500 ${
                            isExpanded ? "text-3xl" : ""
                          }`}>{pais.label}</h3>
                          {isExpanded && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setExpandedPais(null);
                                setSelectedPais(null);
                              }}
                              className="p-2 hover:bg-gray-200 rounded-full transition-colors"
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
                          <span className="underline underline-offset-6">Descargar</span>
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
