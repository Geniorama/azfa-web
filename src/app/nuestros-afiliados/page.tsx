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
import { useIncentives } from "@/hooks/useIncentives";
import LoadingSpinner from "@/components/LoadingSpinner";
import MapLegend from "@/components/MapLegend";
import type { MapGoogleRef } from "@/components/MapGoogle";
import type { Incentive, IncentiveMarker } from "@/types/incentiveType";
import type { ContentType } from "@/types/contentType";
import { getCountryName } from "@/utils/countryMapping";

  // Función para transformar incentivos de Strapi al formato del mapa
const transformIncentivesToMarkers = (incentives: Incentive[]): IncentiveMarker[] => {
  // Coordenadas de fallback para países (solo si no hay ubicación en Strapi)
  const fallbackCoordinates: Record<string, { lat: number; lng: number; flag?: string }> = {
    'CO': { lat: 4.570868, lng: -74.297332, flag: colombiaFlag.src },
    'AR': { lat: -34.603722, lng: -58.381559 },
    'BR': { lat: -15.793889, lng: -47.882777, flag: brasilFlag.src },
    'MX': { lat: 19.432608, lng: -99.133208 },
    'PE': { lat: -12.046374, lng: -77.042793 },
    'CL': { lat: -33.448890, lng: -70.669265 },
    'EC': { lat: -0.180653, lng: -78.467838 },
    'UY': { lat: -34.901113, lng: -56.164531 },
    'PY': { lat: -25.263740, lng: -57.575926 },
    'BO': { lat: -16.290154, lng: -63.588653 },
    'VE': { lat: 10.480594, lng: -66.903606 },
  };

  return incentives.map(incentive => {
    const fallbackCoords = fallbackCoordinates[incentive.country];
    const countryName = getCountryName(incentive.country);
    
    // Usar las coordenadas de Google Maps desde Strapi si están disponibles, sino usar las de fallback
    const lat = incentive.googleMapsLocation?.latitude || fallbackCoords?.lat || 0;
    const lng = incentive.googleMapsLocation?.longitude || fallbackCoords?.lng || 0;
    
    // Usar la imagen de la bandera de Strapi si está disponible, sino usar la hardcodeada
    const flagImage = incentive.flag?.url || fallbackCoords?.flag;
    
    return {
      id: incentive.country,
      lat: lat,
      lng: lng,
      title: countryName,
      imgFlag: flagImage,
      numberZones: incentive.freeZones,
      numberCompanies: incentive.companies,
      directJobs: incentive.directJobs,
      markerType: 'incentive',
      list: incentive.incentivesListItem.map(item => ({
        label: item.label,
        value: item.value
      }))
    };
  });
};

// Función para transformar afiliados de Strapi al formato del mapa
const transformAffiliatesToMarkers = (affiliates: Afiliado[]): Marker[] => {
  // Coordenadas de fallback para países (solo si no hay ubicación en Strapi)
  const fallbackCoordinates: Record<string, { lat: number; lng: number }> = {
    'CO': { lat: 4.570868, lng: -74.297332 },
    'AR': { lat: -34.603722, lng: -58.381559 },
    'BR': { lat: -15.793889, lng: -47.882777 },
    'MX': { lat: 19.432608, lng: -99.133208 },
    'PE': { lat: -12.046374, lng: -77.042793 },
    'CL': { lat: -33.448890, lng: -70.669265 },
    'EC': { lat: -0.180653, lng: -78.467838 },
    'UY': { lat: -34.901113, lng: -56.164531 },
    'PY': { lat: -25.263740, lng: -57.575926 },
    'BO': { lat: -16.290154, lng: -63.588653 },
    'VE': { lat: 10.480594, lng: -66.903606 },
  };

  const markers: Marker[] = [];

  affiliates.forEach(affiliate => {
    const fallbackCoords = fallbackCoordinates[affiliate.country.code];
    console.log(`Procesando afiliado ${affiliate.title}, mapLocation:`, affiliate.mapLocation);
    console.log(`País del afiliado: ${affiliate.country.code}, fallbackCoords:`, fallbackCoords);
    
    if (affiliate.mapLocation && affiliate.mapLocation.length > 0) {
      // Si hay múltiples ubicaciones, crear un marcador para cada una
      affiliate.mapLocation.forEach((location, index) => {
        console.log(`Creando marcador para ubicación ${index}: lat=${location.latitude}, lng=${location.longitude}`);
        
        // Validar que las coordenadas sean números válidos (no null, undefined, o NaN)
        if (location.latitude !== null && location.longitude !== null && 
            typeof location.latitude === 'number' && typeof location.longitude === 'number' && 
            !isNaN(location.latitude) && !isNaN(location.longitude)) {
          markers.push({
            id: `affiliate-${affiliate.id}-${index}`,
            lat: location.latitude,
            lng: location.longitude,
            title: `${affiliate.title}${location.label ? ` - ${location.label}` : ''}`,
            imgFlag: affiliate.logo,
            numberZones: 0,
            numberCompanies: 0,
            directJobs: 0,
            markerType: 'affiliate',
            affiliateType: affiliate.type,
            list: [
              { label: 'País', value: affiliate.country.name },
              { label: 'Ciudad', value: affiliate.city },
              { label: 'Tipo', value: affiliate.type },
              ...(location.label ? [{ label: 'Ubicación', value: location.label }] : []),
              ...(affiliate.contactInfo?.email ? [{ label: 'Email', value: affiliate.contactInfo.email }] : []),
              ...(affiliate.contactInfo?.website ? [{ label: 'Sitio web', value: affiliate.contactInfo.website }] : [])
            ]
          });
          console.log(`Marcador creado exitosamente para ${affiliate.title} ubicación ${index}`);
        } else {
          console.warn(`Coordenadas inválidas para afiliado ${affiliate.title} ubicación ${index}: lat=${location.latitude}, lng=${location.longitude}`);
        }
      });
    } else {
      // Si no hay ubicaciones específicas y hay coordenadas de fallback, crear marcador
      if (fallbackCoords) {
        console.log(`Usando coordenadas de fallback para ${affiliate.title}: lat=${fallbackCoords.lat}, lng=${fallbackCoords.lng}`);
        markers.push({
          id: `affiliate-${affiliate.id}`,
          lat: fallbackCoords.lat,
          lng: fallbackCoords.lng,
          title: affiliate.title,
          imgFlag: affiliate.logo,
          numberZones: 0,
          numberCompanies: 0,
          directJobs: 0,
          markerType: 'affiliate',
          affiliateType: affiliate.type,
          list: [
            { label: 'País', value: affiliate.country.name },
            { label: 'Ciudad', value: affiliate.city },
            { label: 'Tipo', value: affiliate.type },
            ...(affiliate.contactInfo?.email ? [{ label: 'Email', value: affiliate.contactInfo.email }] : []),
            ...(affiliate.contactInfo?.website ? [{ label: 'Sitio web', value: affiliate.contactInfo.website }] : [])
          ]
        });
        console.log(`Marcador de fallback creado exitosamente para ${affiliate.title}`);
      } else {
        console.warn(`No hay coordenadas válidas para afiliado ${affiliate.title} (país: ${affiliate.country.code})`);
      }
    }
  });

  return markers;
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
  markerType?: 'affiliate' | 'incentive';
  affiliateType?: 'organizacion' | 'empresa' | 'zonaFranca';
  list?: {
    label: string; // Cambiado de 'name' a 'label' para coincidir con Strapi
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
  mapLocation?: {
    latitude: number;
    longitude: number;
    label?: string;
  }[];
  contactInfo?: {
    id: number;
    name?: string;
    fullName?: string;
    position?: string;
    email?: string;
    website?: string;
  };
  createdAt: string;
  updatedAt: string;
  fullName?: string;
}

// Los afiliados se cargan dinámicamente desde Strapi
const afiliadosExample: Afiliado[] = [

];

// Los marcadores se cargan dinámicamente desde Strapi
const markers: Marker[] = [];

function NuestrosAfiliadosContent() {
  const [selectedTab, setSelectedTab] = useState("incentivos");
  const [selectedCountry, setSelectedCountry] = useState<Marker | null>(null);
  const [incentivos, setIncentivos] = useState<Marker[]>(markers);
  const [pageContent, setPageContent] = useState<ContentType | null>(null); 
  const params = useSearchParams();
  const mapRef = useRef<MapGoogleRef>(null);
   
  // Usar la API real de afiliados
  const { affiliates: apiAffiliates, loading, error } = useAffiliates();
  const [afiliados, setAfiliados] = useState<Afiliado[]>([]);
  const [allAffiliates, setAllAffiliates] = useState<Afiliado[]>([]); // Datos completos sin filtrar

  // Usar la API real de incentivos
  const { incentives: apiIncentives, loading: incentivesLoading, error: incentivesError } = useIncentives();
  const [allIncentives, setAllIncentives] = useState<Marker[]>([]); // Datos completos sin filtrar
  const [allAffiliateMarkers, setAllAffiliateMarkers] = useState<Marker[]>([]); // Marcadores de afiliados
  const [currentMarkers, setCurrentMarkers] = useState<Marker[]>([]); // Marcadores actuales del mapa

  const countryParam = params.get("country");
  const tabParam = params.get("tab");

  // Crear opciones de países para el campo de búsqueda usando los incentivos
  const countryOptions = allIncentives.map(marker => ({
    id: marker.id,
    label: marker.title,
    value: marker.id
  }));

  const getContentBySlug = async (slug: string) => {
    try {
      const response = await fetch(`/api/getContentBySlug?slug=${slug}&populate[0]=heading.backgroundImg`);
      const data = await response.json();
      console.log("data", data);
      if (data.success && data.data?.data?.[0]) {
        console.log("data", data);
        const content = data.data.data[0];
        const transformedData: ContentType = {
          ...content,
          heading: {
            ...content.heading,
            imageUrl: content.heading?.backgroundImg?.url || ''
          }
        }

        console.log("transformedData", transformedData);
        setPageContent(transformedData);
      } else {
        console.error("Error al obtener el contenido:", data.error || "No se encontró contenido");
        setPageContent(null);
      }
    } catch (error) {
      console.error("Error al obtener el contenido:", error);
      setPageContent(null);
    }
  };

  useEffect(() => {
    getContentBySlug("nuestros-afiliados");
  }, []);

  useEffect(() => {
    if (pageContent) {
      console.log("pageContent", pageContent);
    }
  }, [pageContent]);

  // Función para manejar la selección de país desde el campo de búsqueda
  const handleCountrySelect = useCallback((option: { id: string; label: string; value: string } | null) => {
    console.log("handleCountrySelect llamado con:", option);
    if (option) {
      const selectedMarker = allIncentives.find(marker => marker.id === option.id);
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
  }, [allIncentives]);

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
          mapLocation: affiliate.mapLocation,
          contactInfo: {
            id: affiliate.contactInfo?.id || 0,
            name: affiliate.contactInfo?.fullName || "",
            position: affiliate.contactInfo?.position || "",
            email: affiliate.contactInfo?.email || "",
            website: affiliate.contactInfo?.website || "",
            fullName: affiliate.contactInfo?.fullName || ""
          },
          createdAt: affiliate.createdAt,
          updatedAt: affiliate.updatedAt
        };
      });
      
      setAllAffiliates(transformedAffiliates); // Guardar todos los datos
      setAfiliados(transformedAffiliates); // Mostrar todos los datos inicialmente
      
      // Generar marcadores de afiliados para el mapa
      const affiliateMarkers = transformAffiliatesToMarkers(transformedAffiliates);
      console.log("Marcadores de afiliados generados:", affiliateMarkers);
      setAllAffiliateMarkers(affiliateMarkers);
    } else {
      // Si no hay datos de la API, usar los datos de ejemplo
      setAllAffiliates(afiliadosExample);
      setAfiliados(afiliadosExample);
    }
  }, [apiAffiliates]);

  // Sincronizar datos de incentivos de la API con el estado local
  useEffect(() => {
    if (apiIncentives && apiIncentives.length > 0) {
      // Transformar los datos de incentivos de la API al formato esperado
      const transformedIncentives = transformIncentivesToMarkers(apiIncentives);
      setAllIncentives(transformedIncentives); // Guardar todos los datos
      setIncentivos(transformedIncentives); // Mostrar todos los datos inicialmente
      setCurrentMarkers(transformedIncentives); // Establecer incentivos como marcadores por defecto
    } else {
      // Si no hay datos de la API, usar los datos de ejemplo
      setAllIncentives(markers);
      setIncentivos(markers);
      setCurrentMarkers(markers);
    }
  }, [apiIncentives]);

  useEffect(() => {
    if (selectedCountry) {
      const countryId = selectedCountry.id;
      if (countryId) {
        // Filtrar los afiliados por país seleccionado usando allAffiliates
        const filteredAffiliates = allAffiliates.filter((afiliado) => afiliado.country.code === countryId);
        setAfiliados(filteredAffiliates);
        
        const filteredIncentivos = allIncentives.filter((marker) => marker.id === countryId);
        setIncentivos(filteredIncentivos);
      }
    } else {
      // Si no hay país seleccionado, restaurar todos los datos
      setAfiliados(allAffiliates);
      setIncentivos(allIncentives);
    }
  }, [selectedCountry, allAffiliates, allIncentives]);

  useEffect(() => {
    if (tabParam) {
      setSelectedTab(tabParam);

      if (countryParam) {
        const countryId = countryParam;
        // Usar allAffiliates y allIncentives para el filtrado
        const filteredAffiliates = allAffiliates.filter((afiliado) => afiliado.country.code === countryId);
        setAfiliados(filteredAffiliates);
        const filteredIncentivos = allIncentives.filter((marker) => marker.id === countryId);
        setIncentivos(filteredIncentivos);
      }
    }
  }, [tabParam, countryParam, allAffiliates, allIncentives]);

  const handleGetCountry = useCallback((dataCountry: Marker): void => {
    if (!dataCountry) return;
    console.log("handleGetCountry llamado con:", dataCountry);
    setSelectedCountry(dataCountry);
    // Hacer zoom al país seleccionado desde el mapa
    console.log("Llamando a zoomToCountry desde handleGetCountry...");
    mapRef.current?.zoomToCountry(dataCountry.lat, dataCountry.lng);
  }, []);

  const handleGetTab = useCallback((dataTab: string): void => {
    console.log("handleGetTab llamado con:", dataTab);
    setSelectedTab(dataTab);
    
    // Cambiar los marcadores del mapa según la pestaña seleccionada
    if (dataTab === "afiliados") {
      console.log("Cambiando a marcadores de afiliados:", allAffiliateMarkers);
      setCurrentMarkers(allAffiliateMarkers);
      setIncentivos(allAffiliateMarkers); // Actualizar también el estado de incentivos para el mapa
    } else {
      console.log("Cambiando a marcadores de incentivos:", allIncentives);
      setCurrentMarkers(allIncentives);
      setIncentivos(allIncentives);
    }
    
    // Resetear el país seleccionado al cambiar de pestaña
    setSelectedCountry(null);
    
    // Resetear el zoom del mapa
    mapRef.current?.resetZoom();
  }, [allIncentives, allAffiliateMarkers]);

  // Función para manejar el clic en el logo de un afiliado
  const handleAffiliateLogoClick = useCallback((lat: number, lng: number, title: string) => {
    console.log("Logo de afiliado clickeado:", title, "Coordenadas:", lat, lng);
    
    // Cambiar a la pestaña de afiliados si no está ya activa
    if (selectedTab !== "afiliados") {
      setSelectedTab("afiliados");
      setCurrentMarkers(allAffiliateMarkers);
      setIncentivos(allAffiliateMarkers);
    }
    
    // Hacer zoom al afiliado en el mapa
    mapRef.current?.zoomToCountry(lat, lng);
    
    // NO seleccionar el marcador para mantener la vista de la lista de afiliados
    // Solo hacer zoom sin cambiar la selección actual
  }, [selectedTab, allAffiliateMarkers]);

  if (!pageContent){
    return (
      <div>
        <LoadingSpinner />
      </div>
    )
  }

  return (
    <div>
      <HeadingPage
        title={pageContent.heading?.title}
        smallTitle={pageContent.heading?.smallTitle}
        className="min-h-[45vh] md:min-h-auto items-center"
        image={pageContent?.heading?.imageUrl || CoverDefault.src}
      />

      <section>
        <div className="flex flex-row">
          <div className="hidden lg:block w-full lg:w-2/3 bg-primary relative">
                         {/* Map Google for countries*/}
             <MapGoogle 
               ref={mapRef}
               markers={currentMarkers} 
               onMarkerClick={handleGetCountry} 
             />
             {/* Leyenda del mapa */}
             <MapLegend showAffiliates={selectedTab === "afiliados"} />
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

              {selectedTab === "incentivos" && (
                <>
                  {incentivesLoading ? (
                    <div className="flex justify-center items-center p-8">
                      <LoadingSpinner />
                    </div>
                  ) : incentivesError ? (
                    <div className="text-center p-8">
                      <p className="text-red-600 mb-4">Error al cargar los incentivos: {incentivesError}</p>
                      <p className="text-gray-600">Mostrando datos de ejemplo...</p>
                    </div>
                  ) : (
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
                    ))
                  )}
                </>
              )}

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
                          name={afiliado.contactInfo?.fullName || ""}
                          position={afiliado.contactInfo?.position || ""}
                          city={afiliado.city}
                          country={afiliado.country.name}
                          email={afiliado.contactInfo?.email}
                          website={afiliado.contactInfo?.website}
                          onLogoClick={handleAffiliateLogoClick}
                          coordinates={afiliado.mapLocation && afiliado.mapLocation.length > 0 ? {
                            lat: afiliado.mapLocation[0].latitude,
                            lng: afiliado.mapLocation[0].longitude
                          } : undefined}
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
