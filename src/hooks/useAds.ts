"use client";

import { useState, useEffect } from 'react';

export interface AdImage {
  id: number;
  url: string;
  alternativeText?: string;
  caption?: string;
  width: number;
  height: number;
}

export interface AdManager {
  id: number;
  title: string;
  disclaimerText?: string;
  desktopImages: AdImage[];
  mobileImages: AdImage[];
  position: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

interface UseAdsResponse {
  ads: AdManager[];
  loading: boolean;
  error: string | null;
}

export const useAds = (position?: string): UseAdsResponse => {
  const [ads, setAds] = useState<AdManager[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        setLoading(true);
        setError(null);

        // Construir la URL sin filtros para evitar errores 500
        const url = `${process.env.NEXT_PUBLIC_STRAPI_URL}/ads-managers?populate[0]=desktopImages&populate[1]=mobileImages`;

        // Los filtros se aplicarán en el frontend después de obtener los datos

        console.log('Fetching ads from URL:', url);
        const response = await fetch(url);
        
        if (!response.ok) {
          console.error('Response not ok:', response.status, response.statusText);
          console.error('URL that failed:', url);
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Data:', data);
            if (data.data && Array.isArray(data.data)) {
              let filteredAds = data.data;
              
              // Aplicar filtros en el frontend
              // 1. Filtrar por isActive
              filteredAds = filteredAds.filter((ad: AdManager) => ad.isActive === true);
              
              // 2. Filtrar por posición si se especifica
              if (position) {
                filteredAds = filteredAds.filter((ad: AdManager) => 
                  ad.position && ad.position.includes(position)
                );
              }
              
              setAds(filteredAds);
            } else {
              setAds([]);
            }
      } catch (err) {
        console.error('Error fetching ads:', err);
        setError(err instanceof Error ? err.message : 'Error desconocido');
        setAds([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAds();
  }, [position]);

  return { ads, loading, error };
};
