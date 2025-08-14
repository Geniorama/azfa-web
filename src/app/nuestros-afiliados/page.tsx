"use client";

import HeadingPage from "@/components/HeadingPage";
import MapGoogle from "@/components/MapGoogle";
import { useEffect, useState } from "react";
import SearchInput from "@/utils/SearchInput";
import IncentivosCardCountry from "@/components/IncentivosCardCountry";
import colombiaFlag from "@/assets/img/flags/colombia.svg";
import brasilFlag from "@/assets/img/flags/brazil.svg";
import AfiliadosCard from "@/components/AfiliadosCard";
import LogoCodevi from "@/assets/img/CODEVI 2.png";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import CoverDefault from "../../../public/Frame_56.jpg";

export interface Marker {
  id: string;
  lat: number;
  lng: number;
  title: string;
  imgFlag?: string;
  numberZones?: number;
  numberCompanies?: number;
  directJobs?: number;
  list?: {
    name: string;
    value: string;
  }[];
}

export interface Afiliado {
  id: string;
  title: string;
  name: string;
  position: string;
  city: {
    value: string;
    label: string;
  };
  country: {
    value: string;
    label: string;
  };
  email?: string;
  website?: string;
}

const afiliadosExample: Afiliado[] = [
  {
    id: "1",
    title: "Villanueva Industrial Park",
    name: "Fernando J. Jaar",
    position: "Presidente - CEO",
    city: {
      value: "bogota",
      label: "Bogotá",
    },
    country: {
      value: "colombia",
      label: "Colombia",
    },
    email: "fernando.jaar@codevi.com",
    website: "www.codevi.com",
  },
  {
    id: "2",
    title: "Villanueva Industrial Park",
    name: "Fernando J. Jaar",
    position: "Presidente - CEO",
    city: {
      value: "sao-paulo",
      label: "São Paulo",
    },
    country: {
      value: "brazil",
      label: "Brasil",
    },
    email: "fernando.jaar@codevi.com",
    website: "www.codevi.com",
  },
  {
    id: "3",
    title: "Villanueva Industrial Park",
    name: "Fernando J. Jaar",
    position: "Presidente - CEO", 
    city: {
      value: "buenos-aires",
      label: "Buenos Aires",
    },
    country: {
      value: "argentina",
      label: "Argentina",
    },  
    email: "fernando.jaar@codevi.com",
    website: "www.codevi.com",
  },

  {
    id: "4",
    title: "Villanueva Industrial Park",
    name: "Fernando J. Jaar",
    position: "Presidente - CEO",
    city: {
      value: "bogota",
      label: "Bogotá",
    },
    country: {
      value: "colombia",
      label: "Colombia",
    },
  },
  {
    id: "5",
    title: "Villanueva Industrial Park",
    name: "Fernando J. Jaar",
    position: "Presidente - CEO",
    city: {
      value: "bogota",
      label: "Bogotá",
    },
    country: {
      value: "colombia",
      label: "Colombia",
    },
  },
  {
    id: "6",
    title: "Villanueva Industrial Park",
    name: "Fernando J. Jaar",
    position: "Presidente - CEO",
    city: {
      value: "bogota",
      label: "Bogotá",
    },
    country: {
      value: "colombia",
      label: "Colombia",
    },
  },
  {
    id: "7",
    title: "Villanueva Industrial Park",
    name: "Fernando J. Jaar",
    position: "Presidente - CEO",
    city: {
      value: "bogota",
      label: "Bogotá",
    },
    country: {
      value: "colombia",
      label: "Colombia",
    },
  },
  {
    id: "8",
    title: "Villanueva Industrial Park",
    name: "Fernando J. Jaar",
    position: "Presidente - CEO",
    city: {
      value: "bogota",
      label: "Bogotá",
    },
    country: {
      value: "colombia",
      label: "Colombia",
    },
  },
  {
    id: "9",
    title: "Villanueva Industrial Park",
    name: "Fernando J. Jaar",
    position: "Presidente - CEO",
    city: {
      value: "bogota",
      label: "Bogotá",
    },
    country: {
      value: "colombia",
      label: "Colombia",
    },
  },
];

const markers: Marker[] = [
  // Colombia
  {
    id: "colombia",
    lat: 4.570868,
    lng: -74.297332,
    title: "Colombia",
    imgFlag: colombiaFlag.src,
    numberZones: 10,
    numberCompanies: 10,
    directJobs: 10,
    list: [
      {
        name: "IVA ZF",
        value: "0%",
      },
      {
        name: "IVA ZF",
        value: "0%",
      },
    ],
  },

  // Argentina
  {
    id: "argentina",
    lat: -34.603722,
    lng: -58.381559,
    title: "Argentina",
    numberZones: 10,
    numberCompanies: 10,
    directJobs: 10,
    list: [
      {
        name: "IVA ZF",
        value: "0%",
      },
      {
        name: "Procesamientos Parciales",
        value:
          "Posibilidad de realizar procesamientos parciales fuera de la ZF hasta por 9 meses",
      },
    ],
  },

  // Brasil
  {
    id: "brazil",
    lat: -15.793889,
    lng: -47.882777,
    title: "Brasil",
    imgFlag: brasilFlag.src,
    numberZones: 10,
    numberCompanies: 10,
    directJobs: 10,
    list: [
      {
        name: "IVA ZF",
        value: "0%",
      },
    ],
  },
];

function NuestrosAfiliadosContent() {
  const [selectedTab, setSelectedTab] = useState("incentivos");
  const [selectedCountry, setSelectedCountry] = useState<Marker | null>(null);
  const [afiliados, setAfiliados] = useState<Afiliado[]>(afiliadosExample);
  const [incentivos, setIncentivos] = useState<Marker[]>(markers);
  const params = useSearchParams();

  const countryParam = params.get("country");
  const tabParam = params.get("tab");

  // Crear opciones de países para el campo de búsqueda
  const countryOptions = markers.map(marker => ({
    id: marker.id,
    label: marker.title,
    value: marker.id
  }));

  // Función para manejar la selección de país desde el campo de búsqueda
  const handleCountrySelect = (option: { id: string; label: string; value: string } | null) => {
    if (option) {
      const selectedMarker = markers.find(marker => marker.id === option.id);
      if (selectedMarker) {
        setSelectedCountry(selectedMarker);
      }
    } else {
      setSelectedCountry(null);
    }
  };

  // Función para obtener la opción seleccionada actualmente
  const getSelectedCountryOption = () => {
    if (selectedCountry) {
      return countryOptions.find(option => option.id === selectedCountry.id) || null;
    }
    return null;
  };

  useEffect(() => {
    if (selectedCountry) {
      const countryId = selectedCountry.id;
      if (countryId) {
        const filteredAfiliados = afiliadosExample.filter((afiliado) => afiliado.country.value === countryId);
        setAfiliados(filteredAfiliados);
        const filteredIncentivos = markers.filter((marker) => marker.id === countryId);
        setIncentivos(filteredIncentivos);
      }
    } else {
      setAfiliados(afiliadosExample);
      setIncentivos(markers);
    }
  }, [selectedCountry]);

  useEffect(() => {
    if (tabParam) {
      setSelectedTab(tabParam);

      if (countryParam) {
        const countryId = countryParam;
        const filteredAfiliados = afiliadosExample.filter((afiliado) => afiliado.country.value === countryId);
        setAfiliados(filteredAfiliados);
        const filteredIncentivos = markers.filter((marker) => marker.id === countryId);
        setIncentivos(filteredIncentivos);
      }
    }
  }, [tabParam, countryParam]);

  const handleGetCountry = (dataCountry: Marker): void => {
    if (!dataCountry) return;
    setSelectedCountry(dataCountry);
  };

  const handleGetTab = (dataTab: string): void => {
    setSelectedCountry(null);
    setSelectedTab(dataTab);
  };

  return (
    <div>
      <HeadingPage
        title="Nuestros Afiliados"
        smallTitle="Conozca aquí nuestros Afiliados y haga parte de AZFA"
        className="min-h-[45vh] md:min-h-auto items-center"
        image={CoverDefault.src}
      />

      <section>
        <div className="flex flex-row">
          <div className="hidden lg:block w-full lg:w-2/3 bg-primary">
            {/* Map Google for countries*/}
            <MapGoogle markers={markers} onMarkerClick={handleGetCountry} />
          </div>
          <div className="w-full lg:w-1/3 bg-white">
            <div className="h-screen overflow-y-scroll">
              <div className="sticky top-0 z-1">
                <div className="flex flex-row">
                  <div className="w-1/2">
                    <button
                      className={`bg-[#F5F8FC] text-body1 font-medium cursor-pointer w-full p-5 text-text-primary border border-gray-600 ${
                        selectedTab === "incentivos"
                          ? "bg-primary text-white"
                          : ""
                      }`}
                      onClick={() => handleGetTab("incentivos")}
                    >
                      Incentivos
                    </button>
                  </div>
                  <div className="w-1/2">
                    <button
                      className={`bg-[#F5F8FC] text-body1 font-medium cursor-pointer w-full p-5 text-text-primary border border-gray-600 border-l-0 ${
                        selectedTab === "afiliados"
                          ? "bg-details-hover text-white"
                          : ""
                      }`}
                      onClick={() => handleGetTab("afiliados")}
                    >
                      Afiliados
                    </button>
                  </div>
                </div>
                <SearchInput
                  className="border border-r-gray-600 border-l-gray-600"
                  options={countryOptions}
                  onSelect={handleCountrySelect}
                  selected={getSelectedCountryOption()}
                  placeholder="Seleccione un país..."
                  label="País"
                />
              </div>

              {selectedTab === "incentivos" &&
                incentivos.map((marker, index) => (
                  <IncentivosCardCountry
                    index={index}
                    country={marker.title}
                    numberZones={marker.numberZones || 0}
                    numberCompanies={marker.numberCompanies || 0}
                    directJobs={marker.directJobs || 0}
                    list={marker.list || []}
                    imgFlag={marker.imgFlag}
                    key={marker.title}
                  />
                ))}

              {selectedTab === "afiliados" && (
                <>
                  {afiliados.map((afiliado, index) => (
                    <AfiliadosCard
                      index={index}
                      logo={LogoCodevi.src}
                      title={afiliado.title}
                      name={afiliado.name}
                      position={afiliado.position}
                      city={afiliado.city.label}
                      country={afiliado.country.label}
                      email={afiliado.email}
                      website={afiliado.website}
                      key={afiliado.id}
                    />
                  ))}
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function NuestrosAfiliados() {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <NuestrosAfiliadosContent />
    </Suspense>
  );
}
