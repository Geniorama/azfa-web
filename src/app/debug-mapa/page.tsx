"use client";

import React from 'react';
import MapGoogleDebug from '@/components/MapGoogleDebug';

export default function DebugMapaPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            🔍 Debug del Mapa Interactivo
          </h1>
          <p className="text-lg text-gray-600">
            Esta página te ayudará a diagnosticar problemas con la carga del mapa
          </p>
        </div>

        <MapGoogleDebug />

        <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">📋 Pasos de Diagnóstico</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-700 mb-2">1. Verificar Variables de Entorno</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Archivo <code className="bg-gray-100 px-1 rounded">.env.local</code> existe</li>
                <li>• Variable <code className="bg-gray-100 px-1 rounded">NEXT_PUBLIC_GOOGLE_MAPS_API_KEY</code> configurada</li>
                <li>• Servidor reiniciado después de cambios</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-700 mb-2">2. Verificar API Key</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• API key válida en Google Cloud Console</li>
                <li>• Maps JavaScript API habilitada</li>
                <li>• Sin restricciones de dominio muy estrictas</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-700 mb-2">3. Verificar Consola del Navegador</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Abrir F12 → Console</li>
                <li>• Buscar errores en rojo</li>
                <li>• Verificar mensajes de debug</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-700 mb-2">4. Verificar Red</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Conexión a internet estable</li>
                <li>• Sin bloqueadores de scripts</li>
                <li>• Sin restricciones de firewall</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-blue-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-800 mb-3">💡 Información Útil</h3>
          <div className="text-sm text-blue-700 space-y-2">
            <p><strong>API Key actual:</strong> {process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ? 'Configurada' : 'No configurada'}</p>
            <p><strong>NODE_ENV:</strong> {process.env.NODE_ENV}</p>
            <p><strong>Servidor corriendo:</strong> Puerto 3000</p>
          </div>
        </div>
      </div>
    </div>
  );
}

