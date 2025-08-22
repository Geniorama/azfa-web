# API de Afiliados - AZFA Web

## Descripción
Esta API permite obtener todos los afiliados registrados en el sistema Strapi de AZFA, integrada con la página existente de "Nuestros Afiliados".

## Endpoints

### Principal
```
GET /api/getAffiliate
```

### Prueba de conexión
```
GET /api/test-affiliate
```

## Estado actual
⚠️ **Nota**: La API principal está temporalmente simplificada para resolver problemas de compatibilidad con Strapi. Se está trabajando en restaurar toda la funcionalidad.

### Funcionalidad actual
- ✅ Conexión básica con Strapi
- ✅ Obtención de afiliados con populate completo
- ❌ Paginación (temporalmente deshabilitada)
- ❌ Ordenamiento personalizado (temporalmente deshabilitado)
- ❌ Parámetros de consulta personalizados (temporalmente deshabilitados)

## Parámetros de consulta

### Paginación (temporalmente deshabilitada)
- `page` (opcional): Número de página (por defecto: 1)
- `pageSize` (opcional): Tamaño de página (por defecto: 25)

### Ejemplos de uso
```bash
# Obtener todos los afiliados (configuración actual)
GET /api/getAffiliate

# Probar conexión con Strapi
GET /api/test-affiliate
```

## Respuesta

### Estructura de respuesta exitosa
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "attributes": {
        "title": "Nombre de la empresa",
        "logo": {
          "data": {
            "id": 1,
            "attributes": {
              "url": "https://ejemplo.com/logo.jpg",
              "alternativeText": "Texto alternativo del logo"
            }
          }
        },
        "country": {
          "code": "CO",
          "name": "Colombia"
        },
        "city": "Bogotá",
        "type": "zonaFranca",
        "contactInfo": {
          "id": 1,
          "name": "Nombre del contacto",
          "position": "Cargo del contacto",
          "email": "email@ejemplo.com",
          "website": "www.ejemplo.com"
        },
        "createdAt": "2024-01-01T00:00:00.000Z",
        "updatedAt": "2024-01-01T00:00:00.000Z",
        "publishedAt": "2024-01-01T00:00:00.000Z"
      }
    }
  ],
  "meta": {
    "pagination": {
      "page": 1,
      "pageSize": 25,
      "pageCount": 1,
      "total": 1
    }
  }
}
```

### Estructura de respuesta de error
```json
{
  "success": false,
  "error": "Mensaje de error descriptivo"
}
```

## Códigos de estado HTTP
- `200`: Solicitud exitosa
- `400`: Parámetros inválidos
- `500`: Error interno del servidor

## Uso en componentes React

### Hook personalizado
```typescript
import { useAffiliates } from "@/hooks/useAffiliates";

function MiComponente() {
  const { affiliates, loading, error, pagination } = useAffiliates(1, 12);
  
  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return (
    <div>
      {affiliates.map(affiliate => (
        <div key={affiliate.id}>{affiliate.title}</div>
      ))}
    </div>
  );
}
```

### Llamada directa a la API
```typescript
async function obtenerAfiliados() {
  try {
    const response = await fetch('/api/getAffiliate');
    const data = await response.json();
    
    if (data.success) {
      console.log('Afiliados:', data.data);
      console.log('Meta:', data.meta);
    }
  } catch (error) {
    console.error('Error:', error);
  }
}
```

## Integración con la página existente

La API está integrada con la página `/nuestros-afiliados` y reemplaza los datos de ejemplo cuando está disponible:

- **Loading**: Muestra un spinner mientras se cargan los datos
- **Error**: Muestra un mensaje de error y fallback a datos de ejemplo
- **Éxito**: Muestra los afiliados reales de Strapi
- **Filtrado**: Mantiene la funcionalidad de filtrado por país existente

## Configuración en Strapi

Para que esta API funcione correctamente, asegúrate de tener configurado en Strapi:

1. **Collection Type**: `affiliates`
2. **Campos requeridos**:
   - `title` (Text)
   - `city` (Text)
   - `country` (Custom Field - Country Select Plugin)
   - `type` (Enumeration: organizacion, empresa, zonaFranca)
3. **Campos opcionales**:
   - `logo` (Media - Single media)
   - `contactInfo` (Component - sections.contact)

### Estructura del componente contactInfo
```json
{
  "name": "Nombre del contacto",
  "position": "Cargo del contacto", 
  "email": "email@ejemplo.com",
  "website": "www.ejemplo.com"
}
```

## Solución de problemas

### Error 400 (Bad Request)
Si recibes un error 400, puede ser debido a:
- Parámetros de consulta incompatibles con la versión de Strapi
- Sintaxis incorrecta en los parámetros populate
- Campos que no existen en el schema

### Solución temporal
La API está configurada para usar `populate: '*'` que debería funcionar con todas las versiones de Strapi.

## Notas importantes
- La API está temporalmente simplificada para resolver problemas de compatibilidad
- Se usa `populate: '*'` para obtener todos los campos relacionados
- La respuesta mantiene la estructura estándar de Strapi
- Se mantiene compatibilidad con la funcionalidad existente de filtrado por país
- Fallback automático a datos de ejemplo si la API falla
- Se está trabajando en restaurar paginación y ordenamiento personalizado
