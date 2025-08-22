"use client";

import HeadingPage from "@/components/HeadingPage";
import MapGoogle from "@/components/MapGoogle";
import { useEffect, useState, useRef, useCallback } from "react";
import SearchInput from "@/utils/SearchInput";
import IncentivosCardCountry from "@/components/IncentivosCardCountry";
import colombiaFlag from "@/assets/img/flags/colombia.svg";
import brasilFlag from "@/assets/img/flags/brazil.svg";
import AfiliadosCard from "@/components/AfiliadosCard";
import LogoCodevi from "@/assets/img/CODEVI 2.png";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import CoverDefault from "../../../public/Frame_56.jpg";
import { useAffiliates } from "@/hooks/useAffiliates";
import LoadingSpinner from "@/components/LoadingSpinner";
import type { MapGoogleRef } from "@/components/MapGoogle";


// Función para obtener el nombre del país a partir del código
const getCountryName = (countryCode: string): string => {
  const countryNames: Record<string, string> = {
    'AR': 'Argentina',
    'CO': 'Colombia',
    'BR': 'Brasil',
    'MX': 'México',
    'PE': 'Perú',
    'CL': 'Chile',
    'EC': 'Ecuador',
    'UY': 'Uruguay',
    'PY': 'Paraguay',
    'BO': 'Bolivia',
    'VE': 'Venezuela'
  };
  return countryNames[countryCode] || countryCode;
};

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
  id: number;
  title: string;
  logo?: string;
  logoAlt?: string;
  country: {
    code: string;
    name: string;
  };
  city: string;
  type: "organizacion" | "empresa" | "zonaFranca";
  contactInfo?: {
    id: number;
    name?: string;
    position?: string;
    email?: string;
    website?: string;
  };
  createdAt: string;
  updatedAt: string;
}

const afiliadosExample: Afiliado[] = [
  {
    id: 1,
    title: "Villanueva Industrial Park",
    city: "Bogotá",
    country: {
      code: "CO",
      name: "Colombia",
    },
    type: "zonaFranca",
    contactInfo: {
      id: 1,
      name: "Fernando J. Jaar",
      position: "Presidente - CEO",
      email: "fernando.jaar@codevi.com",
      website: "www.codevi.com",
    },
    createdAt: "2024-01-01T00:00:00.000Z",
    updatedAt: "2024-01-01T00:00:00.000Z",
  },
  {
    id: 2,
    title: "Villanueva Industrial Park",
    city: "São Paulo",
    country: {
      code: "BR",
      name: "Brasil",
    },
    type: "zonaFranca",
    contactInfo: {
      id: 2,
      name: "Fernando J. Jaar",
      position: "Presidente - CEO",
      email: "fernando.jaar@codevi.com",
      website: "www.codevi.com",
    },
    createdAt: "2024-01-01T00:00:00.000Z",
    updatedAt: "2024-01-01T00:00:00.000Z",
  },
  {
    id: 3,
    title: "Villanueva Industrial Park",
    city: "Buenos Aires",
    country: {
      code: "AR",
      name: "Argentina",
    },
    type: "zonaFranca",
    contactInfo: {
      id: 3,
      name: "Fernando J. Jaar",
      position: "Presidente - CEO",
      email: "fernando.jaar@codevi.com",
      website: "www.codevi.com",
    },
    createdAt: "2024-01-01T00:00:00.000Z",
    updatedAt: "2024-01-01T00:00:00.000Z",
  },
  {
    id: 4,
    title: "Villanueva Industrial Park",
    city: "Bogotá",
    country: {
      code: "CO",
      name: "Colombia",
    },
    type: "zonaFranca",
    contactInfo: {
      id: 4,
      name: "Fernando J. Jaar",
      position: "Presidente - CEO",
    },
    createdAt: "2024-01-01T00:00:00.000Z",
    updatedAt: "2024-01-01T00:00:00.000Z",
  },
  {
    id: 5,
    title: "Villanueva Industrial Park",
    city: "Bogotá",
    country: {
      code: "CO",
      name: "Colombia",
    },
    type: "zonaFranca",
    contactInfo: {
      id: 5,
      name: "Fernando J. Jaar",
      position: "Presidente - CEO",
    },
    createdAt: "2024-01-01T00:00:00.000Z",
    updatedAt: "2024-01-01T00:00:00.000Z",
  },
  {
    id: 6,
    title: "Villanueva Industrial Park",
    city: "Bogotá",
    country: {
      code: "CO",
      name: "Colombia",
    },
    type: "zonaFranca",
    contactInfo: {
      id: 6,
      name: "Fernando J. Jaar",
      position: "Presidente - CEO",
    },
    createdAt: "2024-01-01T00:00:00.000Z",
    updatedAt: "2024-01-01T00:00:00.000Z",
  },
  {
    id: 7,
    title: "Villanueva Industrial Park",
    city: "Bogotá",
    country: {
      code: "CO",
      name: "Colombia",
    },
    type: "zonaFranca",
    contactInfo: {
      id: 7,
      name: "Fernando J. Jaar",
      position: "Presidente - CEO",
    },
    createdAt: "2024-01-01T00:00:00.000Z",
    updatedAt: "2024-01-01T00:00:00.000Z",
  },
  {
    id: 8,
    title: "Villanueva Industrial Park",
    city: "Bogotá",
    country: {
      code: "CO",
      name: "Colombia",
    },
    type: "zonaFranca",
    contactInfo: {
      id: 8,
      name: "Fernando J. Jaar",
      position: "Presidente - CEO",
    },
    createdAt: "2024-01-01T00:00:00.000Z",
    updatedAt: "2024-01-01T00:00:00.000Z",
  },
  {
    id: 9,
    title: "Villanueva Industrial Park",
    city: "Bogotá",
    country: {
      code: "CO",
      name: "Colombia",
    },
    type: "zonaFranca",
    contactInfo: {
      id: 9,
      name: "Fernando J. Jaar",
      position: "Presidente - CEO",
    },
    createdAt: "2024-01-01T00:00:00.000Z",
    updatedAt: "2024-01-01T00:00:00.000Z",
  },
];

const markers: Marker[] = [
  // Colombia
  {
    id: "CO",
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
    id: "AR",
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
    id: "BR",
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
  const [incentivos, setIncentivos] = useState<Marker[]>(markers);
  const params = useSearchParams();
  const mapRef = useRef<MapGoogleRef>(null);
   
  // Usar la API real de afiliados
  const { affiliates: apiAffiliates, loading, error } = useAffiliates(1, 50);
  const [afiliados, setAfiliados] = useState<Afiliado[]>([]);
  const [allAffiliates, setAllAffiliates] = useState<Afiliado[]>([]); // Datos completos sin filtrar

  const countryParam = params.get("country");
  const tabParam = params.get("tab");

  // Crear opciones de países para el campo de búsqueda
  const countryOptions = markers.map(marker => ({
    id: marker.id,
    label: marker.title,
    value: marker.id
  }));

  // Función para manejar la selección de país desde el campo de búsqueda
  const handleCountrySelect = useCallback((option: { id: string; label: string; value: string } | null) => {
    console.log("handleCountrySelect llamado con:", option);
    if (option) {
      const selectedMarker = markers.find(marker => marker.id === option.id);
      if (selectedMarker) {
        console.log("Marcador encontrado:", selectedMarker);
        setSelectedCountry(selectedMarker);
        // Hacer zoom al país seleccionado
        console.log("Llamando a zoomToCountry...");
        mapRef.current?.zoomToCountry(selectedMarker.lat, selectedMarker.lng);
      }
    } else {
      setSelectedCountry(null);
      // Restablecer zoom del mapa cuando se deselecciona un país
      mapRef.current?.resetZoom();
    }
  }, [markers]);

  // Función para obtener la opción seleccionada actualmente
  const getSelectedCountryOption = useCallback(() => {
    if (selectedCountry) {
      return countryOptions.find(option => option.id === selectedCountry.id) || null;
    }
    return null;
  }, [selectedCountry, countryOptions]);

  // Sincronizar datos de la API con el estado local
  useEffect(() => {
    if (apiAffiliates && apiAffiliates.length > 0) {
      // Transformar los datos de la API al formato esperado
      const transformedAffiliates: Afiliado[] = apiAffiliates.map(affiliate => {
        // Extraer la URL del logo - la estructura real es logo.url directamente
        let logoUrl = LogoCodevi.src; // Logo por defecto
        if (affiliate.logo && affiliate.logo.url) {
          logoUrl = affiliate.logo.url;
        }
        
        return {
          id: affiliate.id,
          title: affiliate.title,
          logo: logoUrl,
          logoAlt: affiliate.logo?.alternativeText || "",
          country: {
            code: affiliate.country,
            name: getCountryName(affiliate.country)
          },
          city: affiliate.city,
          type: affiliate.type,
          contactInfo: {
            id: affiliate.contactInfo?.id || 0,
            name: affiliate.contactInfo?.fullName || "",
            position: affiliate.contactInfo?.position || "",
            email: affiliate.contactInfo?.email || "",
            website: affiliate.contactInfo?.website || ""
          },
          createdAt: affiliate.createdAt,
          updatedAt: affiliate.updatedAt
        };
      });
      
      setAllAffiliates(transformedAffiliates); // Guardar todos los datos
      setAfiliados(transformedAffiliates); // Mostrar todos los datos inicialmente
    } else {
      // Si no hay datos de la API, usar los datos de ejemplo
      setAllAffiliates(afiliadosExample);
      setAfiliados(afiliadosExample);
    }
  }, [apiAffiliates]);

  useEffect(() => {
    if (selectedCountry) {
      const countryId = selectedCountry.id;
      if (countryId) {
        // Filtrar los afiliados por país seleccionado usando allAffiliates
        const filteredAffiliates = allAffiliates.filter((afiliado) => afiliado.country.code === countryId);
        setAfiliados(filteredAffiliates);
        
        const filteredIncentivos = markers.filter((marker) => marker.id === countryId);
        setIncentivos(filteredIncentivos);
      }
    } else {
      // Si no hay país seleccionado, restaurar todos los datos
      setAfiliados(allAffiliates);
      setIncentivos(markers);
    }
  }, [selectedCountry, allAffiliates]);

  useEffect(() => {
    if (tabParam) {
      setSelectedTab(tabParam);

      if (countryParam) {
        const countryId = countryParam;
        // Usar allAffiliates para el filtrado
        const filteredAffiliates = allAffiliates.filter((afiliado) => afiliado.country.code === countryId);
        setAfiliados(filteredAffiliates);
        const filteredIncentivos = markers.filter((marker) => marker.id === countryId);
        setIncentivos(filteredIncentivos);
      }
    }
  }, [tabParam, countryParam, allAffiliates]);

  const handleGetCountry = useCallback((dataCountry: Marker): void => {
    if (!dataCountry) return;
    console.log("handleGetCountry llamado con:", dataCountry);
    setSelectedCountry(dataCountry);
    // Hacer zoom al país seleccionado desde el mapa
    console.log("Llamando a zoomToCountry desde handleGetCountry...");
    mapRef.current?.zoomToCountry(dataCountry.lat, dataCountry.lng);
  }, []);

  const handleGetTab = useCallback((dataTab: string): void => {
    setSelectedTab(dataTab);
    // Ya no se resetea el país ni el zoom al cambiar de tab|
  }, []);

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
             <MapGoogle 
               ref={mapRef}
               markers={markers} 
               onMarkerClick={handleGetCountry} 
             />
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
                  {loading ? (
                    <div className="flex justify-center items-center p-8">
                      <LoadingSpinner />
                    </div>
                  ) : error ? (
                    <div className="text-center p-8">
                      <p className="text-red-600 mb-4">Error al cargar los afiliados: {error}</p>
                      <p className="text-gray-600">Mostrando datos de ejemplo...</p>
                    </div>
                  ) : (
                    <>

                      
                      {/* Lista de afiliados */}
                      {afiliados.map((afiliado, index) => (
                        <AfiliadosCard
                          index={index}
                          logo={afiliado.logo || LogoCodevi.src}
                          title={afiliado.title}
                          name={afiliado.contactInfo?.name || ""}
                          position={afiliado.contactInfo?.position || ""}
                          city={afiliado.city}
                          country={afiliado.country.name}
                          email={afiliado.contactInfo?.email}
                          website={afiliado.contactInfo?.website}
                          key={afiliado.id}
                        />
                      ))}
                    </>
                  )}
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
