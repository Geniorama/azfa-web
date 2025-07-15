"use client";

import HeadingPage from "@/components/HeadingPage";
import Cover from "@/assets/img/cover-normativa-legal.webp";
import SearchInput from "@/utils/SearchInput";
import { useState, useEffect } from "react";
import { FaHome } from "react-icons/fa";
import { GoArrowDown } from "react-icons/go";
import { IoClose } from "react-icons/io5";
import MapOne from "@/utils/MapOne/MapOne";

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
  { id: "puerto-rico", label: "Puerto Rico", value: "puerto-rico" },
  { id: "haiti", label: "Haití", value: "haiti" },
  { id: "canada", label: "Canadá", value: "canada" },
  { id: "estados-unidos", label: "Estados Unidos", value: "estados-unidos" },
  { id: "suriname", label: "Suriname", value: "suriname" },
  { id: "guyana-francesa", label: "Guyana Francesa", value: "guyana-francesa" },
  { id: "españa", label: "España", value: "españa" },
  { id: "portugal", label: "Portugal", value: "portugal" },
  { id: "francia", label: "Francia", value: "francia" },
  { id: "alemania", label: "Alemania", value: "alemania" },
  { id: "italia", label: "Italia", value: "italia" },
  { id: "reino-unido", label: "Reino Unido", value: "reino-unido" },
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
  {
    id: "puerto-rico",
    label: "Puerto Rico",
    value: "puerto-rico",
    linkDownload: "https://www.puerto-rico.gov.co/normatividad/normativa-legal",
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
    id: "haiti",
    label: "Haití",
    value: "haiti",
    linkDownload: "https://www.haiti.gov.co/normatividad/normativa-legal",
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
    id: "canada",
    label: "Canadá",
    value: "canada",
    linkDownload: "https://www.canada.gov.co/normatividad/normativa-legal",
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
    id: "estados-unidos",
    label: "Estados Unidos",
    value: "estados-unidos",
    linkDownload: "https://www.estados-unidos.gov.co/normatividad/normativa-legal",
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
    id: "españa",
    label: "España",
    value: "españa",
    linkDownload: "https://www.españa.gov.co/normatividad/normativa-legal",
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
];

export default function NormativaLegal() {
  const [selectedPais, setSelectedPais] = useState<Pais | null>(null);
  const [expandedPais, setExpandedPais] = useState<string | null>(null);
  const [scrollToPais, setScrollToPais] = useState<string | null>(null);

  useEffect(() => {
    if (scrollToPais) {
      setTimeout(() => {
        const paisElement = document.getElementById(`pais-${scrollToPais}`);
        const container = document.querySelector('.overflow-y-auto') as HTMLElement;
        if (paisElement && container) {
          const containerRect = container.getBoundingClientRect();
          const elementRect = paisElement.getBoundingClientRect();
          const offset = 100;
          container.scrollTo({
            top: container.scrollTop + elementRect.top - containerRect.top - offset,
            behavior: 'smooth'
          });
        }
        setScrollToPais(null); // Limpiar para futuros scrolls
      }, 100);
    }
  }, [scrollToPais]);

  const handlePaisSelect = (pais: Pais | null) => {
    if (!pais) {
      setSelectedPais(null);
      setExpandedPais(null);
      setScrollToPais(null);
      // Habilitar el scroll por si estaba bloqueado
      const container = document.querySelector('.overflow-y-auto') as HTMLElement;
      if (container) {
        container.style.overflow = 'auto';
      }
      return;
    }
    setSelectedPais(pais);
    setScrollToPais(pais.id); // Marcar que queremos hacer scroll a este país
    // Bloquear el scroll cuando se selecciona desde el buscador
    const container = document.querySelector('.overflow-y-auto') as HTMLElement;
    if (container) {
      container.style.overflow = 'hidden';
    }
    console.log("País seleccionado:", pais);
  };

  const handlePaisExpand = (paisId: string) => {
    const newExpandedPais = expandedPais === paisId ? null : paisId;
    setExpandedPais(newExpandedPais);

    // Actualizar el país seleccionado para sincronizar mapa y buscador
    if (newExpandedPais) {
      const pais = paises.find(p => p.id === paisId);
      if (pais) setSelectedPais(pais);
    }
    
    // Obtener el contenedor de scroll
    const container = document.querySelector('.overflow-y-auto') as HTMLElement;
    
    if (newExpandedPais) {
      // Si se está expandiendo, bloquear el scroll
      if (container) {
        container.style.overflow = 'hidden';
      }
      // Hacer scroll hasta la parte superior
      setTimeout(() => {
        const paisElement = document.getElementById(`pais-${paisId}`);
        if (paisElement && container) {
          const containerRect = container.getBoundingClientRect();
          const elementRect = paisElement.getBoundingClientRect();
          const offset = 100; // Offset de 100px desde la parte superior
          container.scrollTo({
            top: container.scrollTop + elementRect.top - containerRect.top - offset,
            behavior: 'smooth'
          });
        }
      }, 100);
    } else {
      // Si se está contrayendo, habilitar el scroll
      if (container) {
        container.style.overflow = 'auto';
      }
    }
  };

  const handleMapCountrySelect = (countryId: string) => {
    // Mapeo de IDs del mapa a IDs de la lista de países
    const mapToPaisId: { [key: string]: string } = {
      'espana': 'españa',
      'republicadominicana': 'republica-dominicana',
      'costarica': 'costa-rica',
      'elsalvador': 'el-salvador',
      'estadosunidos': 'estados-unidos',
      'puertorico': 'puerto-rico',
      'surinam': 'suriname',
      'guyana': 'guyana-francesa',
      'reino-unido': 'reino-unido',
      'francia': 'francia',
      'alemania': 'alemania',
      'italia': 'italia',
      'portugal': 'portugal',
      'canada': 'canada',
      'haiti': 'haiti'
    };

    // Usar el mapeo si existe, sino usar el ID original
    const paisId = mapToPaisId[countryId] || countryId;
    
    // Buscar el país en la lista de países
    const paisEncontrado = paises.find(pais => pais.id === paisId);
    if (paisEncontrado) {
      setSelectedPais(paisEncontrado);
      // No expandir automáticamente, solo seleccionar
      setExpandedPais(null);
      console.log("País seleccionado desde el mapa:", paisEncontrado);
      
      // Hacer scroll hasta el país seleccionado después de un pequeño delay
      setTimeout(() => {
        const paisElement = document.getElementById(`pais-${paisEncontrado.id}`);
        if (paisElement) {
          const container = paisElement.closest('.overflow-y-auto');
          if (container) {
            const containerRect = container.getBoundingClientRect();
            const elementRect = paisElement.getBoundingClientRect();
            const offset = 100; // Offset de 20px desde la parte superior
            
            container.scrollTo({
              top: container.scrollTop + elementRect.top - containerRect.top - offset,
              behavior: 'smooth'
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
      <HeadingPage
        title="Normativa Legal"
        description="Consulte la normativa legal de cada país"
        image={Cover.src}
      />
      <div className="flex h-screen min-h-full">
        <div className="w-5/8 bg-[#73DAEB] flex justify-center items-start h-full overflow-hidden">
          <MapOne
            onCountrySelect={handleMapCountrySelect}
            selectedCountryId={selectedPais?.id}
          />
        </div>
        <div className="w-3/8 h-full">
          <div className="relative">
            <div className="absolute top-0 left-0 w-full z-10">
              <SearchInput
                placeholder="Escriba el nombre del país..."
                options={paises.filter(p => infoPaises.some(ip => ip.id === p.id))}
                onSelect={handlePaisSelect}
                selected={selectedPais}
                label="Buscar por país"
              />
            </div>

            <div className="flex flex-col text-text-primary overflow-y-auto h-screen pt-26 custom-scrollbar">
              {infoPaises.map((pais, index) => {
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
                    } ${isSelected && !isExpanded ? "ring-2 ring-blue-500 ring-opacity-50" : ""}`}
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
                                
                                // Habilitar el scroll cuando se cierra
                                const container = document.querySelector('.overflow-y-auto') as HTMLElement;
                                if (container) {
                                  container.style.overflow = 'auto';
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
          </div>
        </div>
      </div>
    </div>
  );
}
