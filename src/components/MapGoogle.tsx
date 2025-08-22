"use client";

import { Loader } from "@googlemaps/js-api-loader";
import { useEffect, useRef, useImperativeHandle, forwardRef } from "react";
import type { Marker } from "@/app/nuestros-afiliados/page";

interface GoogleMapsProps {
  markers: Marker[];
  onMarkerClick?: (marker: Marker) => void;
}

export interface MapGoogleRef {
  resetZoom: () => void;
  zoomToCountry: (lat: number, lng: number) => void;
}

const MapGoogle = forwardRef<MapGoogleRef, GoogleMapsProps>(({ markers, onMarkerClick }, ref) => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.marker.AdvancedMarkerElement[]>([]);

  // Exponer funciones al componente padre
  useImperativeHandle(ref, () => ({
    resetZoom: () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.setCenter({ lat: 4.570868, lng: -74.297332 });
        mapInstanceRef.current.setZoom(3);
      }
    },
    zoomToCountry: (lat: number, lng: number) => {
      console.log("zoomToCountry llamado con:", lat, lng);
      if (mapInstanceRef.current) {
        // Usar setTimeout para asegurar que el mapa esté completamente renderizado
        setTimeout(() => {
          if (mapInstanceRef.current) {
            console.log("Aplicando zoom al mapa");
            mapInstanceRef.current.setCenter({ lat, lng });
            mapInstanceRef.current.setZoom(6);
          }
        }, 100);
      } else {
        console.log("mapInstanceRef.current no está disponible");
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
        zoom: 3,
        mapId: "map",
      }

      const map = new Map(mapRef.current!, options);
      mapInstanceRef.current = map;
      
      //   Marker
      const { AdvancedMarkerElement } = await loader.importLibrary("marker") as google.maps.MarkerLibrary;

      // Limpiar marcadores anteriores
      markersRef.current.forEach(marker => marker.map = null);
      markersRef.current = [];

      markers.forEach((markerData) => {
        const marker = new AdvancedMarkerElement({
          position: { lat: markerData.lat, lng: markerData.lng },
          map: map,
          title: markerData.title,
        });

        // Agregar evento de clic al marcador
        marker.addListener("click", () => {
          console.log("Marcador clickeado:", markerData);
          
          // Llamar a la función callback si existe
          if (onMarkerClick) {
            onMarkerClick(markerData);
          }
        });

        // Agregar el marcador a la referencia
        markersRef.current.push(marker);
      });

    };

    initMap();
    
  }, [markers, onMarkerClick]);
  
  return (
    <div className="relative">
      <div ref={mapRef} className="w-full h-screen" />
    </div>
  )
});

MapGoogle.displayName = 'MapGoogle';

export default MapGoogle;
 