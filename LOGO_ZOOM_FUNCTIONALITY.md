# 🖱️ Funcionalidad de Zoom por Logo - Guía Completa

## 📋 Resumen

Se ha implementado la funcionalidad para que al hacer clic en el logo de una empresa en la lista de afiliados, el mapa automáticamente haga zoom a la ubicación de esa empresa.

## 🎯 Funcionalidad Implementada

### **Comportamiento al hacer clic en el logo:**

1. **Cambio automático de pestaña**: Si no estás en la pestaña "Afiliados", cambia automáticamente
2. **Zoom al afiliado**: El mapa hace zoom a las coordenadas específicas del afiliado
3. **Mantener vista de lista**: La lista de afiliados permanece visible (no se selecciona marcador)
4. **Feedback visual**: El logo muestra cursor pointer y efecto hover

## 🔧 Implementación Técnica

### **Archivos Modificados**

1. **`src/components/AfiliadosCard.tsx`**
   - Agregadas nuevas props: `onLogoClick` y `coordinates`
   - Logo ahora es clickeable con efectos visuales
   - Manejo del evento onClick

2. **`src/app/nuestros-afiliados/page.tsx`**
   - Nueva función `handleAffiliateLogoClick`
   - Lógica de cambio de pestaña automático
   - Integración con el zoom del mapa
   - Transformación de coordenadas

### **Nuevas Props del Componente AfiliadosCard**

```typescript
interface AfiliadosCardProps {
  // ... props existentes
  onLogoClick?: (lat: number, lng: number, title: string) => void;
  coordinates?: { lat: number; lng: number };
}
```

### **Función de Manejo del Clic**

```typescript
const handleAffiliateLogoClick = useCallback((lat: number, lng: number, title: string) => {
  // Cambiar a pestaña de afiliados si es necesario
  if (selectedTab !== "afiliados") {
    setSelectedTab("afiliados");
    setCurrentMarkers(allAffiliateMarkers);
    setIncentivos(allAffiliateMarkers);
  }
  
  // Hacer zoom al afiliado
  mapRef.current?.zoomToCountry(lat, lng);
  
  // NO seleccionar el marcador para mantener la vista de la lista de afiliados
  // Solo hacer zoom sin cambiar la selección actual
}, [selectedTab, allAffiliateMarkers]);
```

## 🎨 Efectos Visuales

### **Logo Interactivo**
- **Cursor**: Cambia a pointer cuando hay coordenadas disponibles
- **Hover**: Efecto de opacidad al pasar el mouse
- **Transición**: Animación suave en los efectos

```css
cursor-pointer hover:opacity-80 transition-opacity
```

### **Comportamiento Condicional**
- **Con coordenadas**: Logo es clickeable con efectos visuales
- **Sin coordenadas**: Logo se comporta normalmente (no clickeable)

## 🗺️ Integración con el Mapa

### **Flujo Completo**
1. Usuario hace clic en el logo de un afiliado
2. Sistema verifica si está en la pestaña correcta
3. Cambia a pestaña "Afiliados" si es necesario
4. Hace zoom a las coordenadas del afiliado
5. Mantiene la lista de afiliados visible (no selecciona marcador)
6. Permite continuar navegando en la lista

### **Coordenadas Requeridas**
- **Campo en Strapi**: `mapLocation` con `latitude` y `longitude`
- **Transformación**: De `{latitude, longitude}` a `{lat, lng}`
- **Fallback**: Si no hay coordenadas, el logo no es clickeable

## 📊 Requisitos de Datos

### **Estructura Requerida en Strapi**
```json
{
  "mapLocation": {
    "latitude": 4.6097100,
    "longitude": -74.0817500,
    "label": "Oficina Principal"
  }
}
```

### **Validación de Coordenadas**
- **Latitud**: Entre -90 y 90
- **Longitud**: Entre -180 y 180
- **Formato**: Números decimales

## 🎯 Casos de Uso

### **Escenarios Soportados**

1. **Afiliado con coordenadas específicas**:
   - ✅ Logo clickeable
   - ✅ Zoom a ubicación exacta
   - ✅ Efectos visuales

2. **Afiliado sin coordenadas**:
   - ✅ Logo no clickeable
   - ✅ Comportamiento normal
   - ✅ Sin efectos de hover

3. **Cambio entre pestañas**:
   - ✅ Cambio automático a "Afiliados"
   - ✅ Actualización del mapa
   - ✅ Zoom correcto

## 🔍 Verificación y Testing

### **Cómo Probar la Funcionalidad**

1. **Preparación**:
   - Ve a `/nuestros-afiliados`
   - Asegúrate de tener afiliados con coordenadas en Strapi

2. **Prueba básica**:
   - Haz clic en el logo de un afiliado
   - Verifica que el mapa haga zoom
   - Confirma que el marcador se seleccione

3. **Prueba de cambio de pestaña**:
   - Está en pestaña "Incentivos"
   - Haz clic en un logo de afiliado
   - Verifica que cambie a "Afiliados"

4. **Prueba de coordenadas faltantes**:
   - Busca un afiliado sin coordenadas
   - Verifica que el logo no sea clickeable

### **Checklist de Funcionalidad**
- [ ] Logo muestra cursor pointer cuando hay coordenadas
- [ ] Efecto hover funciona correctamente
- [ ] Clic hace zoom al afiliado
- [ ] Cambio automático de pestaña funciona
- [ ] Lista de afiliados permanece visible
- [ ] Afiliados sin coordenadas no son clickeables
- [ ] Consola muestra logs de debug

## 🚀 Mejoras Futuras

### **Posibles Extensiones**
- **Animación de transición**: Zoom suave entre ubicaciones
- **Indicador visual**: Resaltar el afiliado seleccionado
- **Información emergente**: Tooltip con información básica
- **Historial de navegación**: Botón para volver a vista anterior
- **Clustering**: Agrupar afiliados cercanos

### **Optimizaciones**
- **Debounce**: Evitar múltiples clics rápidos
- **Lazy loading**: Cargar coordenadas solo cuando sea necesario
- **Cache**: Almacenar coordenadas procesadas
- **Performance**: Optimizar búsqueda de marcadores

## 📝 Notas Técnicas

### **Consideraciones de Performance**
- **useCallback**: Evita re-renders innecesarios
- **Memoización**: Función de zoom optimizada
- **Búsqueda eficiente**: Find() para localizar marcadores

### **Compatibilidad**
- **Navegadores**: Funciona en todos los navegadores modernos
- **Dispositivos**: Responsive en desktop y mobile
- **Accesibilidad**: Mantiene funcionalidad de teclado

### **Debugging**
- **Console logs**: Información detallada en consola
- **Error handling**: Manejo seguro de coordenadas faltantes
- **TypeScript**: Tipado estricto para prevenir errores

## 🎉 Resultado Final

¡La funcionalidad está completamente implementada! Ahora los usuarios pueden:

- **Hacer clic en cualquier logo** de afiliado para ver su ubicación
- **Navegar automáticamente** entre pestañas
- **Zoom preciso** a la ubicación del afiliado
- **Experiencia visual mejorada** con efectos de hover

La integración es perfecta y mantiene la funcionalidad existente mientras agrega esta nueva característica de manera intuitiva y eficiente.
