"use client";

import HeadingPage from "@/components/HeadingPage";
import Cover from "@/assets/img/cover-normativa-legal.webp";
import Mapa from "@/assets/img/azfa-mapa-normativa-legal.svg";
import SearchInput from "@/utils/SearchInput";
import { useState } from "react";
import { FaHome } from "react-icons/fa";

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
  { id: "republica-dominicana", label: "República Dominicana", value: "republica-dominicana" },
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
    items:[
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
          }   
        ]
      },
      {
        icon: <FaHome className="text-[14px]" />,
        title: "Normativa Legal",
        subitems: [
          {
            title: "Normativa Legal",
          }
        ]
      },
      {
        icon: <FaHome className="text-[14px]" />,
        title: "Normativa Legal",
        subitems: [
          {
            title: "Normativa Legal",
          }
        ]
      }
    ]
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
          }
        ]
      }
    ]
  }
]

export default function NormativaLegal() {
  const [selectedPais, setSelectedPais] = useState<Pais | null>(null);

  const handlePaisSelect = (pais: Pais) => {
    setSelectedPais(pais);
    console.log("País seleccionado:", pais);
    // Aquí puedes agregar la lógica para cargar la normativa del país seleccionado
  };

  return (
    <div>
      <HeadingPage title="Normativa Legal" description="Consulte la normativa legal de cada país" image={Cover.src} />
      <div className="flex">
        <div className="w-5/8 bg-[#73DAEB] flex justify-center items-center">
          <img src={Mapa.src} alt="Mapa Normativa Legal" className="max-w-[60%]" />
        </div>
        <div className="w-3/8">
          <div className="relative">
            <SearchInput
              placeholder="Escriba el nombre del país..."
              options={paises}
              onSelect={handlePaisSelect}
              label="Buscar por país"
            />

            {/* Container all countries */}
            <div className="flex flex-col text-text-primary">
              {infoPaises.map((pais, index) => (
                <div className={`grid grid-cols-2 ${index % 2 === 0 ? "bg-background-2" : "bg-primary text-white"}`} key={pais.id}>
                  <div className="flex flex-col gap-4 px-4 py-8">
                    <h3 className="text-h4">{pais.label}</h3>
                  </div>
                  <div className="flex flex-col gap-4 text-text-primary bg-[#FBFBFB] p-6 h-full border-b border-text-primary">
                    {pais.items && pais.items.map((item, index) => (
                      <div className={`${index === (pais.items?.length ?? 0) - 1 ? "" : "border-b border-text-primary pb-4"}`} key={index}>
                        <h4 className="text-button font-medium flex items-center gap-2">
                          {item.icon && typeof item.icon === "string" ? <img src={item.icon} alt={item.title} className="w-5 h-5" /> : item.icon}
                          {item.title}
                        </h4>
                        {item.subitems && (
                          <ul className="list-disc pl-7 mt-2 font-light">
                            {item.subitems.map((subitem, index) => (
                              <li key={index}>
                                <p className="text-button">{subitem.title}</p>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            
            {/* Mostrar información del país seleccionado */}
            {selectedPais && (
              <div className="mt-4 p-4 bg-white rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-text-primary mb-2">
                  Normativa Legal - {selectedPais.label}
                </h3>
                <p className="text-sm text-gray-600">
                  Aquí se mostraría la información de la normativa legal para {selectedPais.label}.
                </p>
                <div className="mt-3">
                  <button className="bg-details text-white px-4 py-2 rounded-md text-sm hover:bg-details-hover transition-colors">
                    Ver normativa completa
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
