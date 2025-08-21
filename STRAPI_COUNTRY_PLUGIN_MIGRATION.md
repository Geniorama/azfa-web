# Migración al Plugin Strapi Country Select

## Resumen de Cambios

Se ha migrado la aplicación para usar el plugin `strapi-plugin-country-select` que utiliza códigos ISO 3166-1 alpha-2 para los países en lugar de nombres en minúsculas.

## Cambios Realizados

### 1. Archivo de Utilidades de Países (`src/utils/countryMapping.ts`)

Se creó un nuevo archivo que contiene:
- Mapeo completo de países latinoamericanos con códigos ISO
- Funciones de utilidad para convertir entre formatos
- Validación de códigos de país

**Países incluidos:**
- Argentina (AR)
- Brasil (BR)
- Chile (CL)
- Colombia (CO)
- México (MX)
- Perú (PE)
- Uruguay (UY)
- Paraguay (PY)
- Ecuador (EC)
- Bolivia (BO)
- Venezuela (VE)
- Guyana (GY)
- Surinam (SR)
- Guayana Francesa (GF)

### 2. Página de Normativa Legal (`src/app/normativa-legal/page.tsx`)

**Cambios realizados:**
- Importación de funciones de utilidad de países
- Modificación de la función `getCountries()` para usar códigos ISO
- Actualización de `handlePaisSelect()` para trabajar con códigos ISO
- Actualización de `handleMapCountrySelect()` para sincronizar con el nuevo formato

**Antes:**
```typescript
value: country.country, // "argentina", "colombia", etc.
label: country.country.charAt(0).toUpperCase() + country.country.slice(1)
```

**Después:**
```typescript
value: getCountryCode(country.country), // "AR", "CO", etc.
label: getCountryName(countryCode) // "Argentina", "Colombia", etc.
```

### 3. Página de Nuestros Afiliados (`src/app/nuestros-afiliados/page.tsx`)

**Cambios realizados:**
- Importación de funciones de utilidad de países
- Actualización de todos los valores de país en `afiliadosExample` de nombres a códigos ISO
- Actualización de IDs de marcadores en el mapa

**Antes:**
```typescript
country: {
  value: "colombia",
  label: "Colombia",
}
```

**Después:**
```typescript
country: {
  value: "CO",
  label: "Colombia",
}
```

### 4. Oferta Inmobiliaria (`src/app/oferta-inmobiliaria/`)

**Cambios realizados:**
- **AdvancedSearchBar**: Actualización de opciones de país para usar códigos ISO
- **Página individual**: Modificación de `handleGetCountry` para trabajar con códigos ISO
- **CardInmueble**: Visualización de nombres de países en lugar de códigos ISO
- **Hook useRealStateOffers**: Transformación de datos para convertir países a códigos ISO

**Antes:**
```typescript
// AdvancedSearchBar
const optionsPais: Option[] = [
  { label: 'Costa Rica', value: 'costa-rica' }
];

// Visualización
{city} / {country} // Mostraba códigos ISO o nombres sin formato

// Navegación
router.push(`/nuestros-afiliados?country=${normalizedCountry}`);
```

**Después:**
```typescript
// AdvancedSearchBar
const optionsPais: Option[] = [
  { label: 'Costa Rica', value: 'CR' },
  { label: 'Colombia', value: 'CO' },
  { label: 'Brasil', value: 'BR' }
];

// Visualización
{city} / {getCountryName(country || '')} // Muestra nombres en español

// Navegación
router.push(`/nuestros-afiliados?country=${countryCode}`);
```

## Funciones de Utilidad Disponibles

### `getCountryCode(countryName: string): string`
Convierte un nombre de país a su código ISO correspondiente.

### `getCountryName(countryCode: string): string`
Convierte un código ISO al nombre del país en español.

### `getCountryNameEn(countryCode: string): string`
Convierte un código ISO al nombre del país en inglés.

### `isValidCountryCode(countryCode: string): boolean`
Verifica si un código de país es válido.

## Beneficios de la Migración

1. **Estandarización**: Uso de códigos ISO estándar reconocidos internacionalmente
2. **Compatibilidad**: Integración perfecta con el plugin de Strapi
3. **Mantenibilidad**: Código más limpio y fácil de mantener
4. **Escalabilidad**: Fácil agregar nuevos países siguiendo el estándar ISO
5. **Consistencia**: Formato uniforme en toda la aplicación
6. **Experiencia de Usuario**: Los usuarios ven nombres de países en español mientras el sistema maneja códigos ISO internamente
7. **Integración**: Navegación fluida entre ofertas inmobiliarias y páginas de afiliados usando códigos ISO consistentes

## Uso en Strapi

Con el plugin `strapi-plugin-country-select`, los países ahora se almacenan como códigos ISO en la base de datos de Strapi, lo que permite:

- Selección de países desde un dropdown estándar
- Validación automática de códigos de país
- Filtrado y búsqueda más eficiente
- Integración con APIs internacionales que usan códigos ISO

## Notas de Implementación

- Los cambios son retrocompatibles: si un país no está en el mapeo, se usa el valor original
- Las etiquetas (labels) se mantienen en español para la interfaz de usuario
- Los valores (values) ahora son códigos ISO para la lógica de negocio
- El mapeo se puede extender fácilmente agregando nuevos países al objeto `countryMapping`

## Próximos Pasos Recomendados

1. **Actualizar Strapi**: Asegurarse de que el plugin esté correctamente instalado y configurado
2. **Migrar Base de Datos**: Actualizar registros existentes para usar códigos ISO
3. **Pruebas**: Verificar que todas las funcionalidades relacionadas con países funcionen correctamente
4. **Documentación**: Actualizar documentación de API y componentes
5. **Monitoreo**: Verificar que no haya regresiones en la funcionalidad existente
