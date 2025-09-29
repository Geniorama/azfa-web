import React from 'react';

interface AffiliateMarkerIconProps {
  size?: number;
  color?: string;
  backgroundColor?: string;
}

const AffiliateMarkerIcon: React.FC<AffiliateMarkerIconProps> = ({ 
  size = 32, 
  color = '#ffffff', 
  backgroundColor = '#3B82F6' 
}) => {
  return (
    <div 
      style={{ 
        width: size, 
        height: size,
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      {/* Sombra del marcador */}
      <div
        style={{
          position: 'absolute',
          bottom: -2,
          left: '50%',
          transform: 'translateX(-50%)',
          width: size * 0.6,
          height: size * 0.3,
          background: 'rgba(0, 0, 0, 0.2)',
          borderRadius: '50%',
          filter: 'blur(2px)'
        }}
      />
      
      {/* Cuerpo principal del marcador */}
      <div
        style={{
          width: size * 0.8,
          height: size * 0.8,
          backgroundColor: backgroundColor,
          borderRadius: '50% 50% 50% 0',
          transform: 'rotate(-45deg)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
          border: '2px solid #ffffff'
        }}
      >
        {/* Icono dentro del marcador */}
        <div
          style={{
            transform: 'rotate(45deg)',
            color: color,
            fontSize: size * 0.4,
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          A
        </div>
      </div>
      
      {/* Punto central */}
      <div
        style={{
          position: 'absolute',
          width: size * 0.2,
          height: size * 0.2,
          backgroundColor: color,
          borderRadius: '50%',
          bottom: size * 0.1
        }}
      />
    </div>
  );
};

export default AffiliateMarkerIcon;
