"use client";

import { Loader } from "@googlemaps/js-api-loader";
import { useEffect, useRef, useImperativeHandle, forwardRef } from "react";
import type { Marker } from "@/app/nuestros-afiliados/page";
import { getMarkerIcon } from "@/utils/markerIcons";

interface GoogleMapsProps {
  markers: Marker[];
  onMarkerClick?: (marker: Marker) => void;
}

export interface MapGoogleRef {
  resetZoom: () => void;
  zoomToCountry: (lat: number, lng: number) => void;
  selectMarkerByCoords: (lat: number, lng: number) => void;
}

// Función para crear el contenido HTML del marcador
const createMarkerContent = (iconUrl: string, title: string): HTMLElement => {
  const content = document.createElement('div');
  content.innerHTML = `
    <div style="
      width: 32px; 
      height: 32px; 
      cursor: pointer;
      transition: transform 0.2s ease;
    " 
    onmouseover="this.style.transform='scale(1.1)'" 
    onmouseout="this.style.transform='scale(1)'">
      <img src="${iconUrl}" 
           alt="${title}" 
           style="width: 100%; height: 100%; object-fit: contain;" />
    </div>
  `;
  return content;
};

const MapGoogle = forwardRef<MapGoogleRef, GoogleMapsProps>(({ markers, onMarkerClick }, ref) => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.marker.AdvancedMarkerElement[]>([]);
  const markerDataMapRef = useRef<Map<google.maps.marker.AdvancedMarkerElement, Marker>>(new Map());
  const selectedMarkerRef = useRef<{ marker: google.maps.marker.AdvancedMarkerElement; data: Marker } | null>(null);

  // Exponer funciones al componente padre
  useImperativeHandle(ref, () => ({
    resetZoom: () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.setCenter({ lat: 4.570868, lng: -74.297332 });
        mapInstanceRef.current.setZoom(2);
      }
      
      // Limpiar selección de marcador
      if (selectedMarkerRef.current) {
        const previousIconUrl = getMarkerIcon(
          selectedMarkerRef.current.data.markerType || 'incentive',
          false
        );
        selectedMarkerRef.current.marker.content = createMarkerContent(
          previousIconUrl,
          selectedMarkerRef.current.data.title
        );
        selectedMarkerRef.current = null;
      }
    },
    zoomToCountry: (lat: number, lng: number) => {
      console.log("zoomToCountry llamado con:", lat, lng);
      
      // Validar que las coordenadas sean números válidos
      if (typeof lat !== 'number' || typeof lng !== 'number' || isNaN(lat) || isNaN(lng)) {
        console.warn("Coordenadas inválidas para zoom:", { lat, lng });
        return;
      }
      
      if (mapInstanceRef.current) {
        // Detectar si es móvil
        const isMobile = window.innerWidth < 1024;
        const zoomLevel = isMobile ? 5 : 6; // Zoom más alejado en móviles para mejor contexto
        
        // Usar setTimeout para asegurar que el mapa esté completamente renderizado
        setTimeout(() => {
          if (mapInstanceRef.current) {
            console.log("Aplicando zoom al mapa (nivel:", zoomLevel, ")");
            mapInstanceRef.current.setCenter({ lat, lng });
            mapInstanceRef.current.setZoom(zoomLevel);
          }
        }, 100);
      } else {
        console.log("mapInstanceRef.current no está disponible");
      }
    },
    selectMarkerByCoords: (lat: number, lng: number) => {
      console.log("=== selectMarkerByCoords llamado ===");
      console.log("Coordenadas buscadas:", { lat, lng });
      console.log("Total de marcadores en mapa:", markerDataMapRef.current.size);
      
      // Log de todos los marcadores disponibles
      console.log("Marcadores disponibles:");
      Array.from(markerDataMapRef.current.entries()).forEach(([, data], idx) => {
        console.log(`  ${idx}: ${data.title} - lat: ${data.lat}, lng: ${data.lng}`);
      });
      
      // Buscar el marcador con estas coordenadas
      const markerEntry = Array.from(markerDataMapRef.current.entries()).find(([, data]) => {
        // Comparar con un pequeño margen de error debido a precisión de punto flotante
        const latMatch = Math.abs(data.lat - lat) < 0.0001;
        const lngMatch = Math.abs(data.lng - lng) < 0.0001;
        console.log(`Comparando con ${data.title}: latMatch=${latMatch}, lngMatch=${lngMatch}`);
        return latMatch && lngMatch;
      });
      
      if (markerEntry) {
        const [marker, markerData] = markerEntry;
        console.log("✅ Marcador encontrado:", markerData.title);
        
        // Si hay un marcador previamente seleccionado, restaurarlo al estado inactivo
        if (selectedMarkerRef.current && selectedMarkerRef.current.marker !== marker) {
          const previousIconUrl = getMarkerIcon(
            selectedMarkerRef.current.data.markerType || 'incentive',
            false
          );
          
          // Actualizar directamente el src del img en el DOM
          if (selectedMarkerRef.current.marker.content && selectedMarkerRef.current.marker.content instanceof HTMLElement) {
            const imgElement = selectedMarkerRef.current.marker.content.querySelector('img');
            const containerDiv = selectedMarkerRef.current.marker.content.querySelector('div') as HTMLElement;
            
            if (imgElement) {
              imgElement.src = previousIconUrl;
              console.log("⬇️ Marcador anterior restaurado a inactivo (DOM actualizado)");
            }
            
            // Restaurar tamaño normal del marcador anterior
            if (containerDiv) {
              containerDiv.style.transform = 'scale(1)';
              containerDiv.style.zIndex = 'auto';
              console.log("⬇️ Marcador anterior restaurado a tamaño normal");
            }
          }
        }
        
        // Actualizar el marcador actual al estado activo
        const activeIconUrl = getMarkerIcon(
          markerData.markerType || 'incentive',
          true
        );
        console.log("🔄 Actualizando marcador a activo con icono:", activeIconUrl);
        
        // Actualizar directamente el src del img en el contenido existente
        if (marker.content && marker.content instanceof HTMLElement) {
          const imgElement = marker.content.querySelector('img');
          const containerDiv = marker.content.querySelector('div') as HTMLElement;
          
          if (imgElement) {
            imgElement.src = activeIconUrl;
            console.log("✅ Icono actualizado a activo");
          } else {
            console.warn("⚠️ No se encontró elemento img en el marcador");
          }
          
          // Hacer el marcador más grande cuando está activo
          if (containerDiv) {
            containerDiv.style.transform = 'scale(1.3)';
            containerDiv.style.zIndex = '1000';
            console.log("✅ Marcador escalado a 1.3x (más grande)");
          }
        } else {
          // Si no hay contenido existente, crear uno nuevo
          console.log("Creando nuevo contenido para el marcador");
          marker.content = createMarkerContent(activeIconUrl, markerData.title);
        }
        
        // Guardar referencia del marcador seleccionado
        selectedMarkerRef.current = { marker, data: markerData };
        
        console.log("Marcador seleccionado programáticamente, NO se llama al callback");
        // NO llamar al callback onMarkerClick aquí porque ya se maneja en handleAffiliateLogoClick
      } else {
        console.warn("❌ No se encontró marcador con coordenadas:", { lat, lng });
        console.warn("Marcadores disponibles:", markerDataMapRef.current.size);
      }
    }
  }));

  useEffect(() => {
    const initMap = async () => {
      const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
        version: "quarterly",
        libraries: ["places"],
      })

      const { Map } = await loader.importLibrary("maps");

      // Location of Colombia
      const location = { lat: 4.570868, lng: -74.297332 };

      const options: google.maps.MapOptions = {
        center: location,
        zoom: 2,
        mapId: "map",
      }

      const map = new Map(mapRef.current!, options);
      mapInstanceRef.current = map;
      
      //   Marker
      const { AdvancedMarkerElement } = await loader.importLibrary("marker") as google.maps.MarkerLibrary;

      // Guardar referencia del marcador seleccionado antes de limpiar
      const previouslySelectedData = selectedMarkerRef.current?.data;
      console.log("🔄 Re-renderizando marcadores del mapa");
      console.log("📌 Marcador previamente seleccionado:", previouslySelectedData?.title || "ninguno");

      // Limpiar marcadores anteriores
      markersRef.current.forEach(marker => marker.map = null);
      markersRef.current = [];
      
      // Limpiar mapa de datos de marcadores
      markerDataMapRef.current.clear();
      
      // Limpiar referencia del marcador seleccionado (lo restauraremos después)
      selectedMarkerRef.current = null;

      console.log("Renderizando marcadores:", markers);
      
      markers.forEach((markerData) => {
        console.log("Procesando marcador:", markerData);
        
        // Validar que las coordenadas sean números válidos antes de crear el marcador (no null, undefined, o NaN)
        if (markerData.lat === null || markerData.lng === null || 
            typeof markerData.lat !== 'number' || typeof markerData.lng !== 'number' || 
            isNaN(markerData.lat) || isNaN(markerData.lng)) {
          console.warn(`Marcador omitido por coordenadas inválidas:`, {
            id: markerData.id,
            title: markerData.title,
            lat: markerData.lat,
            lng: markerData.lng
          });
          return; // Saltar este marcador
        }
        
        // Verificar si este marcador es el que estaba seleccionado previamente
        const wasPreviouslySelected = previouslySelectedData && 
          Math.abs(markerData.lat - previouslySelectedData.lat) < 0.0001 &&
          Math.abs(markerData.lng - previouslySelectedData.lng) < 0.0001;
        
        // Obtener el icono personalizado según si estaba seleccionado
        const iconUrl = getMarkerIcon(
          markerData.markerType || 'incentive',
          wasPreviouslySelected || false
        );
        console.log("Icono generado para marcador:", iconUrl, wasPreviouslySelected ? "(ACTIVO - PRESERVADO)" : "(inactivo)");
        
        try {
          const marker = new AdvancedMarkerElement({
            position: { lat: markerData.lat, lng: markerData.lng },
            map: map,
            title: markerData.title,
            content: createMarkerContent(iconUrl, markerData.title),
          });

          // Agregar evento de clic al marcador
          marker.addListener("click", () => {
            console.log("Marcador clickeado:", markerData);
            
            // Si hay un marcador previamente seleccionado, restaurarlo al estado inactivo
            if (selectedMarkerRef.current && selectedMarkerRef.current.marker !== marker) {
              const previousIconUrl = getMarkerIcon(
                selectedMarkerRef.current.data.markerType || 'incentive',
                false // Inactivo
              );
              
              // Actualizar directamente el src del img
              if (selectedMarkerRef.current.marker.content && selectedMarkerRef.current.marker.content instanceof HTMLElement) {
                const imgElement = selectedMarkerRef.current.marker.content.querySelector('img');
                const containerDiv = selectedMarkerRef.current.marker.content.querySelector('div') as HTMLElement;
                
                if (imgElement) {
                  imgElement.src = previousIconUrl;
                }
                
                // Restaurar tamaño normal del marcador anterior
                if (containerDiv) {
                  containerDiv.style.transform = 'scale(1)';
                  containerDiv.style.zIndex = 'auto';
                }
              }
            }
            
            // Actualizar el marcador actual al estado activo
            const activeIconUrl = getMarkerIcon(
              markerData.markerType || 'incentive',
              true // Activo
            );
            
            // Actualizar directamente el src del img en el contenido existente
            if (marker.content && marker.content instanceof HTMLElement) {
              const imgElement = marker.content.querySelector('img');
              const containerDiv = marker.content.querySelector('div') as HTMLElement;
              
              if (imgElement) {
                imgElement.src = activeIconUrl;
              }
              
              // Hacer el marcador más grande cuando está activo
              if (containerDiv) {
                containerDiv.style.transform = 'scale(1.3)';
                containerDiv.style.zIndex = '1000';
              }
            } else {
              // Si no hay contenido existente, crear uno nuevo
              marker.content = createMarkerContent(activeIconUrl, markerData.title);
            }
            
            // Guardar referencia del marcador seleccionado
            selectedMarkerRef.current = { marker, data: markerData };
            
            // Llamar a la función callback si existe
            if (onMarkerClick) {
              onMarkerClick(markerData);
            }
          });

          // Agregar el marcador a la referencia
          markersRef.current.push(marker);
          
          // Guardar la relación marcador-datos
          markerDataMapRef.current.set(marker, markerData);
          
          // Si este era el marcador previamente seleccionado, restaurar la referencia
          if (wasPreviouslySelected) {
            selectedMarkerRef.current = { marker, data: markerData };
            console.log(`✅ Marcador seleccionado restaurado: ${markerData.title}`);
          }
          
          console.log(`Marcador creado exitosamente para: ${markerData.title}`);
        } catch (error) {
          console.error(`Error al crear marcador para ${markerData.title}:`, error);
        }
      });

    };

    initMap();
    
  }, [markers, onMarkerClick]);
  
  return (
    <div className="relative">
      <div ref={mapRef} className="w-full h-[50vh] lg:h-screen" />
    </div>
  )
});

MapGoogle.displayName = 'MapGoogle';

export default MapGoogle;
 