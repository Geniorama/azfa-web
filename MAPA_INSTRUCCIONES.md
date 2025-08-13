# 🗺️ Mapa Interactivo de Países - Instrucciones de Configuración

## 📋 Requisitos Previos

1. **Google Maps API Key**: Necesitas una clave de API de Google Maps
2. **APIs habilitadas**: Maps JavaScript API (obligatoria), Geocoding API (opcional)

## 🔑 Configuración de la API Key

### 1. Obtener API Key
1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Crea un nuevo proyecto o selecciona uno existente
3. Habilita las siguientes APIs:
   - **Maps JavaScript API** (obligatoria)
   - **Geocoding API** (opcional, para mejor detección de países)
4. Ve a "Credenciales" y crea una nueva clave de API
5. Restringe la clave a tu dominio por seguridad

### 2. Configurar en el proyecto
Crea un archivo `.env.local` en la raíz del proyecto con:

```bash
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=tu_api_key_aqui
```

## 🚀 Uso del Componente

### Componente Básico
```tsx
import MapGoogle from '@/components/MapGoogle';

export default function MiPagina() {
  const handleCountryClick = (country) => {
    console.log('País seleccionado:', country);
  };

  return (
    <MapGoogle onCountryClick={handleCountryClick} />
  );
}
```

### Con Información Personalizada
```tsx
<MapGoogle 
  onCountryClick={(country) => {
    // Manejar la selección del país
    setSelectedCountry(country);
  }}
/>
```

## 🎯 Funcionalidades

### ✅ Implementadas
- **Mapa interactivo** con Google Maps
- **Marcadores** para países específicos
- **Información detallada** al hacer clic
- **Detección de países** por coordenadas
- **Interfaz responsive** con Tailwind CSS
- **Estados de carga** y manejo de errores

### 📍 Países Disponibles
- 🇪🇸 España
- 🇫🇷 Francia  
- 🇩🇪 Alemania
- 🇮🇹 Italia
- 🇵🇹 Portugal

### 🔧 Personalización
- **Estilos del mapa** personalizables
- **Marcadores personalizados** con SVG
- **Colores y temas** configurables
- **Datos de países** editables

## 🛠️ Personalización Avanzada

### Agregar Nuevos Países
Edita el array `countriesData` en `MapGoogle.tsx`:

```tsx
const countriesData: CountryInfo[] = [
  // ... países existentes
  {
    id: 'UK',
    name: 'Reino Unido',
    description: 'País insular en Europa Occidental',
    population: '67.2 millones',
    capital: 'Londres',
    area: '242,495 km²',
    currency: 'Libra esterlina (£)'
  }
];
```

### Cambiar Estilos del Mapa
Modifica el array `styles` en la configuración del mapa:

```tsx
styles: [
  {
    featureType: 'administrative.country',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#ff0000' }, { weight: 2 }] // Borde rojo más grueso
  }
]
```

### Personalizar Marcadores
Cambia el SVG del marcador en `addCountryMarkers`:

```tsx
icon: {
  url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <rect x="2" y="2" width="20" height="20" fill="#ff6b6b" rx="4"/>
    </svg>
  `),
  scaledSize: new googleMaps.maps.Size(24, 24)
}
```

## 🐛 Solución de Problemas

### Error: "Error al cargar el mapa"
- Verifica que tu API key sea válida
- Asegúrate de que Maps JavaScript API esté habilitada
- Revisa la consola del navegador para errores específicos

### Mapa no se muestra
- Verifica que el contenedor tenga dimensiones definidas
- Asegúrate de que la API key esté configurada correctamente
- Revisa que no haya bloqueadores de scripts

### Marcadores no aparecen
- Verifica las coordenadas en `countryCoordinates`
- Asegúrate de que los IDs coincidan con `countriesData`

## 📱 Responsive Design

El componente está optimizado para:
- **Desktop**: Mapa completo con información lateral
- **Tablet**: Mapa adaptativo con información superpuesta
- **Mobile**: Mapa a pantalla completa con información modal

## 🔒 Seguridad

- **Restringe tu API key** a tu dominio
- **No expongas la API key** en código público
- **Usa variables de entorno** para configurar la clave
- **Monitorea el uso** de tu API key

## 📚 Recursos Adicionales

- [Google Maps JavaScript API Documentation](https://developers.google.com/maps/documentation/javascript)
- [Google Maps Styling Wizard](https://mapstyle.withgoogle.com/)
- [Google Cloud Console](https://console.cloud.google.com/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## 🤝 Contribuciones

Para mejorar el componente:
1. Fork del proyecto
2. Crea una rama para tu feature
3. Implementa las mejoras
4. Envía un pull request

---

**Nota**: Este componente requiere una API key válida de Google Maps para funcionar correctamente.

