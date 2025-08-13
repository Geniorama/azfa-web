"use client";

import { Loader } from "@googlemaps/js-api-loader";
import { useEffect, useRef, useState } from "react";
import type { Marker } from "@/app/nuestros-afiliados/page";

interface GoogleMapsProps {
  markers: Marker[];
  onMarkerClick?: (marker: Marker) => void;
}

export default function MapGoogle({ markers, onMarkerClick }: GoogleMapsProps) {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const [selectedMarker, setSelectedMarker] = useState<Marker | null>(null);
  const markersRef = useRef<google.maps.marker.AdvancedMarkerElement[]>([]);

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
          setSelectedMarker(markerData);
          
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
      
      {/* Panel de información del marcador seleccionado */}
      {selectedMarker && (
        <div className="absolute top-4 right-4 bg-white p-4 rounded-lg shadow-lg max-w-xs">
          <h3 className="font-bold text-lg mb-2">{selectedMarker.title}</h3>
          <p className="text-gray-600 mb-2">
            Lat: {selectedMarker.lat.toFixed(6)}, Lng: {selectedMarker.lng.toFixed(6)}
          </p>
          <button 
            onClick={() => setSelectedMarker(null)}
            className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600"
          >
            Cerrar
          </button>
        </div>
      )}
    </div>
  )
}
 