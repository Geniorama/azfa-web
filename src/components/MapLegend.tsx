import React from 'react';
import { getMarkerIcon } from '@/utils/markerIcons';
import MarkerIconAfiliadosDefault from '@/assets/img/icon-mapa-afiliados-default (2).svg';

interface MapLegendProps {
  showAffiliates?: boolean;
}

const MapLegend: React.FC<MapLegendProps> = ({ showAffiliates = false }) => {
  if (!showAffiliates) {
    // Leyenda para incentivos (países)
    return (
      <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg p-4 z-10">
        <h3 className="text-sm font-semibold text-gray-800 mb-2">Leyenda</h3>
        <div className="flex items-center gap-2 mb-2">
          <img 
            src={getMarkerIcon('incentive')} 
            alt="Incentivo" 
            className="w-6 h-6" 
          />
          <span className="text-sm text-gray-700">Incentivos por país</span>
        </div>
      </div>
    );
  }

  // Leyenda para afiliados
  return (
    <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg p-4 z-10 max-w-xs">
      <h3 className="text-sm font-semibold text-gray-800 mb-3">Tipos de Afiliados</h3>
      
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <img 
            src={MarkerIconAfiliadosDefault.src} 
            alt="Afiliados" 
            className="w-6 h-6" 
          />
          <span className="text-sm text-gray-700">Afiliados</span>
        </div>
        
        <div className="mt-2 text-xs text-gray-500 space-y-1">
          <div>• Organizaciones</div>
          <div>• Empresas</div>
          <div>• Zonas francas</div>
        </div>
      </div>
      
      <div className="mt-3 pt-2 border-t border-gray-200">
        <p className="text-xs text-gray-500">
          Haz clic en un marcador para ver más información
        </p>
      </div>
    </div>
  );
};

export default MapLegend;
