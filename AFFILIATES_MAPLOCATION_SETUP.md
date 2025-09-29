# 🗺️ Configuración de Coordenadas para Afiliados - Guía de Setup

## 📋 Resumen

Se ha agregado la funcionalidad para que cada afiliado tenga coordenadas específicas en el mapa. Esto permite mostrar marcadores individuales para cada afiliado en lugar de agruparlos por país.

## 🔧 Configuración en Strapi

### **Paso 1: Agregar el Campo mapLocation**

1. Ve a **Content-Type Builder** en Strapi
2. Selecciona **"Affiliates"** (o el nombre de tu collection type de afiliados)
3. Haz clic en **"Add another field"**
4. Selecciona **"Component"**
5. Configura el componente:
   - **Name**: `mapLocation`
   - **Component**: Crea un nuevo componente o usa uno existente
6. Dentro del componente, agrega estos campos:
   - `latitude` (Number, Float)
   - `longitude` (Number, Float)  
   - `label` (Text, Optional)

### **Paso 2: Configurar Permisos**

1. Ve a **Settings** → **Users & Permissions Plugin** → **Roles**
2. Haz clic en el rol **"Public"**
3. Busca la sección **"Affiliate"**
4. Marca las siguientes casillas:
   - ✅ **find** (para obtener la lista de afiliados)
   - ✅ **findOne** (para obtener un afiliado específico)
5. Haz clic en **"Save"**

### **Paso 3: Actualizar API Query**

La API ya está configurada para incluir el campo `mapLocation`. El endpoint `/api/getAffiliate` ahora incluye:

```typescript
populate: {
    logo: true,
    mapLocation: true,
    contactInfo: true
}
```

## 📊 Estructura de Datos Esperada

### **Collection Type: Affiliate**
```json
{
  "id": 1,
  "title": "Empresa Ejemplo",
  "country": "CO",
  "city": "Bogotá",
  "type": "empresa",
  "mapLocation": {
    "latitude": 4.6097100,
    "longitude": -74.0817500,
    "label": "Oficina Principal"
  },
  "logo": {
    "url": "https://example.com/logo.png"
  },
  "contactInfo": {
    "fullName": "Juan Pérez",
    "email": "juan@empresa.com",
    "website": "www.empresa.com"
  }
}
```

## 🎯 Funcionalidades Implementadas

### ✅ **Nuevas Características**
- **Marcadores individuales** para cada afiliado
- **Coordenadas específicas** por afiliado
- **Fallback automático** a coordenadas del país si no hay mapLocation
- **Información detallada** del afiliado en el marcador
- **Cambio dinámico** entre vista de incentivos y afiliados

### 🗺️ **Comportamiento del Mapa**

1. **Pestaña "Incentivos"**: Muestra marcadores de países con información de incentivos
2. **Pestaña "Afiliados"**: Muestra marcadores individuales de cada afiliado
3. **Coordenadas específicas**: Si el afiliado tiene `mapLocation`, usa esas coordenadas
4. **Fallback**: Si no tiene `mapLocation`, usa las coordenadas del país

### 📍 **Información del Marcador de Afiliado**

Cuando se hace clic en un marcador de afiliado, se muestra:
- **Nombre del afiliado**
- **País y ciudad**
- **Tipo** (organización, empresa, zona franca)
- **Email** (si está disponible)
- **Sitio web** (si está disponible)

## 🔍 Verificación

### **Probar el Endpoint:**
```bash
GET http://localhost:3000/api/getAffiliate
```

**Respuesta esperada:**
```json
{
  "data": [
    {
      "id": 1,
      "title": "Empresa Ejemplo",
      "mapLocation": {
        "latitude": 4.6097100,
        "longitude": -74.0817500
      }
    }
  ],
  "success": true
}
```

### **Verificar en el Frontend:**
1. Ve a `/nuestros-afiliados`
2. Haz clic en la pestaña **"Afiliados"**
3. Verifica que aparezcan marcadores individuales en el mapa
4. Haz clic en un marcador para ver la información del afiliado

## 🛠️ Solución de Problemas

### **No aparecen marcadores de afiliados**
- Verifica que el campo `mapLocation` esté configurado en Strapi
- Asegúrate de que los permisos estén configurados correctamente
- Revisa la consola del navegador para errores

### **Marcadores aparecen en coordenadas incorrectas**
- Verifica que las coordenadas en `mapLocation` sean correctas
- Asegúrate de que `latitude` y `longitude` sean números válidos
- El formato debe ser: `latitude: 4.6097100, longitude: -74.0817500`

### **Fallback a coordenadas del país**
- Si no se configuró `mapLocation`, el sistema usará automáticamente las coordenadas del país
- Esto es normal y funciona correctamente

## 📝 Notas Importantes

- **Coordenadas**: Usa el formato decimal estándar (ej: 4.6097100, -74.0817500)
- **Fallback**: El sistema tiene coordenadas de fallback para todos los países
- **Performance**: Los marcadores se cargan dinámicamente al cambiar de pestaña
- **Responsive**: La funcionalidad funciona en desktop y mobile

## 🚀 Próximos Pasos

1. **Configurar mapLocation** para afiliados existentes
2. **Probar la funcionalidad** en diferentes dispositivos
3. **Optimizar coordenadas** según la ubicación real de cada afiliado
4. **Considerar clustering** si hay muchos afiliados en la misma zona
