# 🎨 Iconos de Marcadores Personalizados - Guía Completa

## 📋 Resumen

Se han implementado iconos de marcadores personalizados para diferenciar visualmente entre incentivos (países) y afiliados, con colores específicos para cada tipo de afiliado.

## 🎯 Tipos de Marcadores

### **1. Marcadores de Incentivos (Países)**
- **Icono**: Letra "I" en fondo azul
- **Color**: `#3B82F6` (Azul primary)
- **Uso**: Pestaña "Incentivos" - muestra información de países

### **2. Marcadores de Afiliados**
- **Icono**: Letra "A" en fondo coloreado según tipo
- **Colores por tipo**:
  - 🟣 **Organización**: `#8B5CF6` (Violeta)
  - 🔵 **Empresa**: `#3B82F6` (Azul)
  - 🟡 **Zona Franca**: `#F59E0B` (Amarillo)

## 🔧 Implementación Técnica

### **Archivos Creados/Modificados**

1. **`src/utils/markerIcons.ts`** - Lógica de iconos
2. **`src/components/AffiliateMarkerIcon.tsx`** - Componente React (opcional)
3. **`src/components/MapLegend.tsx`** - Leyenda del mapa
4. **`src/components/MapGoogle.tsx`** - Componente del mapa actualizado
5. **`src/app/nuestros-afiliados/page.tsx`** - Interfaz Marker actualizada

### **Funciones Principales**

```typescript
// Obtener icono según tipo de marcador
getMarkerIcon(markerType: 'affiliate' | 'incentive', affiliateType?: string): string

// Obtener color según tipo de afiliado
getAffiliateTypeColor(type: string): string

// Crear iconos específicos
getAffiliateMarkerIcon(color: string, size: number): string
getIncentiveMarkerIcon(color: string, size: number): string
```

## 🎨 Diseño de los Iconos

### **Estructura Visual**
- **Forma**: Pin clásico de mapa con esquina redondeada
- **Tamaño**: 32x32px por defecto
- **Sombra**: Sombra sutil para profundidad
- **Borde**: Borde blanco de 2px
- **Efecto hover**: Escala 1.1x al pasar el mouse

### **Colores Implementados**

| Tipo | Color | Código Hex | Descripción |
|------|-------|------------|-------------|
| Incentivos | Azul | `#3B82F6` | Información de países |
| Organización | Violeta | `#8B5CF6` | Organizaciones afiliadas |
| Empresa | Azul | `#3B82F6` | Empresas afiliadas |
| Zona Franca | Amarillo | `#F59E0B` | Zonas francas afiliadas |

## 🗺️ Leyenda del Mapa

### **Componente MapLegend**
- **Ubicación**: Esquina superior derecha del mapa
- **Contenido dinámico**: Cambia según la pestaña activa
- **Responsive**: Se adapta al contenido

### **Estados de la Leyenda**

1. **Pestaña "Incentivos"**:
   ```
   🔵 Incentivos por país
   ```

2. **Pestaña "Afiliados"**:
   ```
   🟣 Organización
   🔵 Empresa  
   🟡 Zona Franca
   💡 Haz clic en un marcador para ver más información
   ```

## 🚀 Funcionalidades

### ✅ **Características Implementadas**
- **Iconos SVG personalizados** con colores específicos
- **Leyenda interactiva** que cambia según la pestaña
- **Efectos hover** en los marcadores
- **Diferenciación visual** clara entre tipos
- **Responsive design** para diferentes pantallas
- **Integración completa** con el sistema existente

### 🎯 **Comportamiento del Mapa**

1. **Cambio de pestañas**: Los iconos cambian automáticamente
2. **Hover effects**: Los marcadores se agrandan al pasar el mouse
3. **Información contextual**: Cada marcador muestra información relevante
4. **Leyenda dinámica**: Se actualiza según el tipo de datos mostrados

## 🔧 Personalización

### **Agregar Nuevos Colores**

```typescript
// En markerIcons.ts
export const getAffiliateTypeColor = (type: string): string => {
  switch (type) {
    case 'nuevoTipo':
      return '#EF4444'; // Rojo
    // ... otros casos
  }
};
```

### **Cambiar Tamaño de Iconos**

```typescript
// En MapGoogle.tsx - función createMarkerContent
const createMarkerContent = (iconUrl: string, title: string): HTMLElement => {
  const content = document.createElement('div');
  content.innerHTML = `
    <div style="width: 40px; height: 40px;"> // Cambiar tamaño aquí
      <img src="${iconUrl}" style="width: 100%; height: 100%;" />
    </div>
  `;
  return content;
};
```

### **Agregar Nuevos Tipos de Marcadores**

1. **Actualizar la interfaz Marker**:
```typescript
markerType?: 'affiliate' | 'incentive' | 'nuevoTipo';
```

2. **Agregar función de color**:
```typescript
case 'nuevoTipo':
  return '#COLOR_HEX';
```

3. **Actualizar la leyenda**:
```typescript
<div className="flex items-center gap-2">
  <img src={getMarkerIcon('affiliate', 'nuevoTipo')} />
  <span>Nuevo Tipo</span>
</div>
```

## 🎨 Mejoras Futuras

### **Posibles Extensiones**
- **Clustering**: Agrupar marcadores cercanos
- **Animaciones**: Transiciones suaves entre estados
- **Temas**: Modo oscuro/claro para los iconos
- **Personalización**: Permitir que usuarios cambien colores
- **Iconos personalizados**: Permitir subir iconos propios por afiliado

## 🔍 Verificación

### **Cómo Probar**
1. Ve a `/nuestros-afiliados`
2. Cambia entre pestañas "Incentivos" y "Afiliados"
3. Verifica que los iconos cambien de color y forma
4. Comprueba que la leyenda se actualice correctamente
5. Haz hover sobre los marcadores para ver el efecto

### **Checklist de Funcionalidad**
- [ ] Iconos de incentivos (azul con "I")
- [ ] Iconos de afiliados (SVG personalizado)
- [ ] Leyenda cambia según pestaña
- [ ] Efectos hover funcionan
- [ ] Información se muestra al hacer clic
- [ ] Responsive en diferentes pantallas

## 📝 Notas Técnicas

- **Formato SVG**: Los iconos se generan como SVG inline para mejor rendimiento
- **Google Maps**: Usa AdvancedMarkerElement para mejor control
- **Performance**: Los iconos se generan dinámicamente pero se cachean
- **Accesibilidad**: Incluye alt text y títulos para screen readers
- **Compatibilidad**: Funciona en todos los navegadores modernos

¡Los iconos personalizados están listos y funcionando! 🎉
