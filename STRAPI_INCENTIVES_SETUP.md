# 🔧 Configuración de Incentivos en Strapi

## ✅ Implementación Completada

He implementado la carga de incentivos desde Strapi, pero necesitas configurar los permisos en tu panel de administración.

## 🚨 Error Actual: 404 Not Found

El endpoint `/api/incentives` no existe en Strapi. Necesitas crear el collection type "Incentive".

## 🔧 Solución: Crear el Collection Type "Incentive"

### **Paso 1: Crear el Collection Type**
1. Ve a tu panel de administración de Strapi
2. Navega a **Content-Type Builder**
3. Haz clic en **"Create new collection type"**
4. Nombre: **"Incentive"** (singular) / **"Incentives"** (plural)
5. Haz clic en **"Continue"**

### **Paso 2: Agregar Campos**
Agrega los siguientes campos en este orden:

1. **Country** (Text - Short text)
   - Name: `country`
   - Required: ✅

2. **Free Zones** (Number - Integer)
   - Name: `freeZones`
   - Required: ✅

3. **Companies** (Number - Integer)
   - Name: `companies`
   - Required: ✅

4. **Direct Jobs** (Number - Integer)
   - Name: `directJobs`
   - Required: ✅

5. **Flag** (Media - Single)
   - Name: `flag`
   - Allowed types: Images only

6. **Google Maps Location** (Component - Single)
   - Name: `googleMapsLocation`
   - Component: Crear nuevo componente "GM Location" con campos:
     - `latitude` (Number - Decimal)
     - `longitude` (Number - Decimal)
     - `label` (Text - Short text)

7. **Incentives List Item** (Component - Repeatable)
   - Name: `incentivesListItem`
   - Component: Crear nuevo componente "Table List" con campos:
     - `label` (Text - Short text)
     - `value` (Text - Long text)

### **Paso 3: Configurar Permisos**
1. Ve a **Settings** → **Users & Permissions Plugin** → **Roles**
2. Haz clic en el rol **"Public"**
3. Busca la sección **"Incentive"**
4. Marca las siguientes casillas:
   - ✅ **find** (para obtener la lista de incentivos)
   - ✅ **findOne** (para obtener un incentivo específico)
5. Haz clic en **"Save"**

### **Paso 4: Crear Contenido**
1. Ve a **Content Manager**
2. Selecciona **"Incentives"**
3. Haz clic en **"Create new entry"**
4. Completa los campos con datos de ejemplo
5. Haz clic en **"Save"** y luego **"Publish"**

## 📊 Estructura de Datos Esperada

### **Collection Type: Incentive**
```json
{
  "country": "CO", // Código del país (string)
  "freeZones": 10, // Número de zonas francas (integer)
  "companies": 25, // Número de empresas (integer)
  "directJobs": 1500, // Empleos directos (integer)
  "flag": { // Media - Imagen de la bandera
    "id": 14,
    "url": "https://example.com/colombia.svg"
  },
  "googleMapsLocation": { // Componente - Ubicación en Google Maps
    "latitude": 5.557945065625671,
    "longitude": -74.55270202910859,
    "label": "Colombia"
  },
  "incentivesListItem": [ // Componente repetible
    {
      "label": "IVA ZF",
      "value": "0%"
    },
    {
      "label": "Procesamientos Parciales",
      "value": "Posibilidad de realizar procesamientos parciales fuera de la ZF hasta por 9 meses"
    }
  ]
}
```

## 🎯 Endpoints Disponibles

Una vez configurados los permisos, estos endpoints estarán disponibles:

- `GET /api/getIncentives` - Todos los incentivos
- `GET /api/getIncentives?country=CO` - Incentivos de Colombia
- `GET /api/getIncentives?page=1&pageSize=50` - Con paginación

## 🔍 Verificación

### **Probar el Endpoint Directamente:**
```bash
# En tu navegador o con curl
GET http://localhost:1337/api/incentives
```

**Respuesta esperada:**
```json
{
  "data": [
    {
      "id": 1,
      "attributes": {
        "country": "CO",
        "freeZones": 10,
        "companies": 25,
        "directJobs": 1500,
        "incentivesListItem": [
          {
            "id": 1,
            "name": "IVA ZF",
            "value": "0%"
          }
        ],
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

## 🐛 Solución de Problemas

### **Error 404: Not Found**
- ✅ **Solución:** Crear el collection type "Incentive" en Strapi (ver Pasos 1-4)
- ✅ **Verificar:** Que el collection type se llama exactamente "Incentive"
- ✅ **Verificar:** Que hay al menos un registro publicado

### **Error 403: Forbidden**
- ✅ **Solución:** Configurar permisos públicos en Strapi (ver Paso 3)

### **Error 500: Internal Server Error**
- ✅ **Verificar:** Que la variable `NEXT_PUBLIC_STRAPI_URL` está configurada
- ✅ **Verificar:** Que Strapi está ejecutándose

## 🚀 Próximos Pasos

1. **Crear el collection type** "Incentive" en Strapi (Pasos 1-2)
2. **Configurar permisos** públicos (Paso 3)
3. **Crear algunos registros** de incentivos (Paso 4)
4. **Probar la aplicación** - los incentivos se cargarán automáticamente
5. **Personalizar** los incentivos según tus necesidades

## 📝 Notas Importantes

- Los incentivos se cargan automáticamente al abrir la página
- Si hay error, se muestran los datos de ejemplo como fallback
- El filtrado por país funciona dinámicamente
- Los datos se sincronizan con el mapa y las tarjetas de incentivos

¡Una vez configurados los permisos, tu sistema de incentivos estará completamente funcional! 🎉
