"use client";

import React, { useState } from 'react';
import MapGoogle from '@/components/MapGoogle';

interface CountryInfo {
  id: string;
  name: string;
  description: string;
  population?: string;
  capital?: string;
  area?: string;
  currency?: string;
}

export default function MapaDemoPage() {
  const [selectedCountry, setSelectedCountry] = useState<CountryInfo | null>(null);
  const [countryHistory, setCountryHistory] = useState<CountryInfo[]>([]);

  const handleCountryClick = (country: CountryInfo) => {
    setSelectedCountry(country);
    
    // Agregar al historial si no está ya incluido
    if (!countryHistory.find(c => c.id === country.id)) {
      setCountryHistory(prev => [country, ...prev.slice(0, 4)]); // Mantener solo los últimos 5
    }
  };

  const clearHistory = () => {
    setCountryHistory([]);
    setSelectedCountry(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Mapa Interactivo de Países
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explora el mapa haciendo clic en los países o marcadores para ver información detallada.
            Cada país muestra datos como capital, población, área y moneda.
          </p>
        </div>

        {/* Mapa principal */}
        <div className="mb-8">
          <MapGoogle onCountryClick={handleCountryClick} />
        </div>

        {/* Información del país seleccionado */}
        {selectedCountry && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-800">
                País Seleccionado: {selectedCountry.name}
              </h2>
              <span className="text-sm text-gray-500">
                ID: {selectedCountry.id}
              </span>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-3">Descripción</h3>
                <p className="text-gray-600">{selectedCountry.description}</p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-3">Información General</h3>
                <div className="space-y-2">
                  {selectedCountry.capital && (
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-600">Capital:</span>
                      <span className="text-gray-800">{selectedCountry.capital}</span>
                    </div>
                  )}
                  {selectedCountry.population && (
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-600">Población:</span>
                      <span className="text-gray-800">{selectedCountry.population}</span>
                    </div>
                  )}
                  {selectedCountry.area && (
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-600">Área:</span>
                      <span className="text-gray-800">{selectedCountry.area}</span>
                    </div>
                  )}
                  {selectedCountry.currency && (
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-600">Moneda:</span>
                      <span className="text-gray-800">{selectedCountry.currency}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Historial de países visitados */}
        {countryHistory.length > 0 && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-800">
                Países Visitados
              </h2>
              <button
                onClick={clearHistory}
                className="text-sm text-red-600 hover:text-red-800 transition-colors"
              >
                Limpiar historial
              </button>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {countryHistory.map((country, index) => (
                <div
                  key={country.id}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => setSelectedCountry(country)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-800">{country.name}</h3>
                    <span className="text-xs text-gray-500">#{index + 1}</span>
                  </div>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {country.description}
                  </p>
                  {country.capital && (
                    <p className="text-xs text-gray-500 mt-2">
                      Capital: {country.capital}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Instrucciones de uso */}
        <div className="bg-blue-50 rounded-lg p-6 mt-8">
          <h3 className="text-lg font-semibold text-blue-800 mb-3">
            💡 Cómo usar el mapa
          </h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-blue-700">
            <div>
              <h4 className="font-medium mb-2">Interacción básica:</h4>
              <ul className="space-y-1">
                <li>• Haz clic en cualquier país del mapa</li>
                <li>• Haz clic en los marcadores azules</li>
                <li>• Usa el zoom y arrastra para navegar</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Funcionalidades:</h4>
              <ul className="space-y-1">
                <li>• Información detallada de cada país</li>
                <li>• Historial de países visitados</li>
                <li>• Datos de capital, población y más</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

