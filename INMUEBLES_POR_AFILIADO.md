# Sistema de Gestión de Inmuebles por Afiliado

## Descripción General

Este documento describe la implementación del sistema que permite mostrar las propiedades inmobiliarias (real-state-offers) asociadas a la empresa afiliada del usuario actual, sin importar qué usuario las creó.

## Cambios Implementados

### 1. API de Autenticación (`src/app/api/auth/login/route.ts`)

**Cambio**: El endpoint de login ahora incluye la información del `affiliateCompany` del usuario.

**Detalles**:
- Se actualiza la petición a Strapi para popular el campo `affiliateCompany` con los campos necesarios:
  - `id`: Identificador de la empresa afiliada
  - `title`: Nombre de la empresa
  - `propertiesLimit`: Límite de propiedades que puede publicar la empresa

```typescript
// Ejemplo de respuesta del login
{
  token: "jwt_token",
  user: {
    id: 1,
    username: "usuario",
    email: "usuario@ejemplo.com",
    confirmed: true,
    blocked: false,
    affiliateCompany: {
      id: 5,
      title: "Empresa ABC",
      propertiesLimit: 10
    }
  }
}
```

### 2. Context de Autenticación (`src/context/AuthContext.tsx`)

**Cambio**: Se actualizó la interfaz `User` para incluir el campo `affiliateCompany`.

**Beneficio**: Ahora el contexto de autenticación mantiene la información de la empresa afiliada del usuario en toda la aplicación.

### 3. API de Propiedades (`src/app/api/getRealStateOffer/route.ts`)

**Cambio**: Se agregó soporte para filtrar propiedades por `affiliateCompanyId`.

**Detalles**:
- Se añadió manejo especial del parámetro `affiliateCompanyId` en la URL
- Cuando se proporciona, crea un filtro anidado en Strapi para buscar por la relación:
  ```typescript
  filters: {
    affiliateCompany: {
      id: {
        $eq: "5"
      }
    }
  }
  ```

**Uso**:
```
GET /api/getRealStateOffer?affiliateCompanyId=5&populate[imgGallery]=true
```

### 4. Hook Personalizado (`src/hooks/useAffiliateRealStateOffers.ts`)

**Nuevo archivo**: Hook personalizado para obtener las propiedades del afiliado.

**Funcionalidad**:
- Obtiene automáticamente el usuario del contexto de autenticación
- Filtra las propiedades por el `affiliateCompany.id` del usuario
- Calcula automáticamente:
  - Número de propiedades publicadas
  - Espacios disponibles (`propertiesLimit - propiedades actuales`)
  - Si hay espacios disponibles o no
- Maneja estados de carga y errores

**Retorno del hook**:
```typescript
{
  offers: InmuebleType[],          // Propiedades del afiliado
  loading: boolean,                 // Estado de carga
  error: string | null,             // Error si lo hay
  pagination: PaginationInfo,       // Info de paginación
  availableSlots: number,           // Espacios disponibles
  propertiesLimit: number,          // Límite total de propiedades
  hasAvailableSlots: boolean        // Si hay espacios disponibles
}
```

### 5. Vista de Mis Inmuebles (`src/views/MisInmueblesView.tsx`)

**Cambio**: Actualización completa de la vista para mostrar propiedades del afiliado.

**Características**:
1. **Panel de Estadísticas**: Muestra:
   - Inmuebles publicados (X de Y)
   - Espacios disponibles
   - Nombre de la empresa

2. **Lista de Propiedades**: 
   - Muestra todas las propiedades del afiliado
   - Incluye botón "Editar" para cada propiedad existente

3. **Espacios Disponibles**:
   - Muestra tarjetas "Sin asignar" para espacios disponibles
   - Botón "Agregar inmueble" en cada espacio disponible

4. **Alertas**:
   - Muestra advertencia cuando se alcanza el límite de propiedades
   - Indica cómo solicitar más espacios

5. **Estados de Error**:
   - Mensaje si el usuario no tiene empresa afiliada
   - Spinner de carga mientras obtiene datos

## Flujo de Datos

1. **Login del Usuario**:
   ```
   Usuario → Login API → Strapi Auth → Retorna user + affiliateCompany
   ```

2. **Carga de Propiedades**:
   ```
   Vista → useAffiliateRealStateOffers → getRealStateOffer API → Strapi
       ↑                                                            ↓
       ←────────────────── Propiedades filtradas ──────────────────
   ```

3. **Filtrado en Strapi**:
   ```
   Strapi Query:
   {
     filters: {
       affiliateCompany: {
         id: { $eq: "5" }  // ID de la empresa del usuario
       }
     }
   }
   ```

## Lógica de Negocio

### Reglas de Visualización
- ✅ Se muestran **todas** las propiedades de la empresa afiliada
- ✅ No importa qué usuario las creó
- ✅ Solo se muestran propiedades de la empresa del usuario actual
- ✅ Se respeta el límite de propiedades (`propertiesLimit`) del afiliado

### Límites de Propiedades
- Cada afiliado tiene un `propertiesLimit` configurable
- El sistema calcula automáticamente los espacios disponibles
- Cuando se alcanza el límite, se muestra un mensaje para solicitar más espacios

## Estructura de Relaciones en Strapi

```
User (plugin::users-permissions.user)
  └── affiliateCompany (manyToOne) → Affiliate
  └── realStateOffers (oneToMany) → RealStateOffer

Affiliate (api::affiliate.affiliate)
  └── users (oneToMany) → User
  └── realStateOffers (oneToMany) → RealStateOffer
  └── propertiesLimit (integer)

RealStateOffer (api::real-state-offer.real-state-offer)
  └── users (manyToOne) → User
  └── affiliateCompany (manyToOne) → Affiliate
```

## Casos de Uso

### Caso 1: Usuario Individual en Empresa
- El usuario pertenece a una empresa (affiliateCompany)
- Puede ver todas las propiedades de su empresa
- Puede agregar propiedades hasta el límite establecido

### Caso 2: Múltiples Usuarios en la Misma Empresa
- Varios usuarios pertenecen a la misma empresa
- Usuario A crea una propiedad
- Usuario B puede ver y editar la propiedad de Usuario A
- Ambos comparten el mismo límite de propiedades

### Caso 3: Usuario sin Empresa Afiliada
- El usuario no tiene `affiliateCompany` asignado
- La vista muestra un mensaje informativo
- Se indica que debe contactar al administrador

## Ventajas de la Implementación

1. **Colaboración**: Múltiples usuarios pueden gestionar propiedades de la misma empresa
2. **Control Centralizado**: Todas las propiedades están asociadas a la empresa, no solo al usuario
3. **Límites Flexibles**: Cada empresa puede tener su propio límite de propiedades
4. **Escalabilidad**: Fácil de mantener y extender
5. **Seguridad**: Los usuarios solo ven propiedades de su empresa

## Validación de Límites de Propiedades ✅ IMPLEMENTADO

### API de Creación (`src/app/api/createRealStateOffer/route.ts`)

El sistema ahora valida automáticamente el límite de propiedades:

1. **Obtiene el `affiliateCompany` del usuario** con su `propertiesLimit`
2. **Cuenta las propiedades existentes** de esa empresa
3. **Valida que no se exceda el límite** antes de crear
4. **Asigna automáticamente** la propiedad al `affiliateCompany` y `users`

**Flujo de validación:**
```
Usuario crea propiedad 
  → API obtiene user.affiliateCompany
  → Cuenta propiedades actuales de la empresa
  → Si count >= propertiesLimit: Error 403
  → Si count < propertiesLimit: Crear propiedad
  → Asignar automáticamente affiliateCompany y users
```

**Respuesta de error cuando se alcanza el límite:**
```json
{
  "error": "Ha alcanzado el límite de 5 propiedades para su empresa...",
  "success": false,
  "currentCount": 5,
  "limit": 5
}
```

### Vista de Agregar Inmueble (`src/views/AgregarInmuebleView.tsx`)

- Muestra mensaje específico cuando se alcanza el límite
- Redirige automáticamente a "Mis Inmuebles" después de crear o al alcanzar límite
- Manejo mejorado de errores con mensajes informativos

## Consideraciones Importantes de Strapi v5

### DocumentId vs ID

En **Strapi v5** cada entrada tiene dos identificadores:

- **`id`**: Cambia entre drafts y versiones publicadas
  - Draft: `id: 115`
  - Published: `id: 120`
  
- **`documentId`**: Permanente y único para el documento
  - Siempre: `documentId: "lop322lm3eq8chsdtlmwxgxz"`

**⚠️ IMPORTANTE**: Para filtrar por relaciones, SIEMPRE usar `documentId`, no `id`.

**Ejemplo correcto:**
```typescript
filters: {
  affiliateCompany: {
    documentId: {
      $eq: "tuundnzqimm38ppb0c05gt29"
    }
  }
}
```

**Ejemplo INCORRECTO (no funciona):**
```typescript
filters: {
  affiliateCompany: {
    id: {
      $eq: 69  // Este ID cambia entre drafts/published
    }
  }
}
```

## Próximos Pasos Sugeridos

1. ✅ ~~**Validación en Creación**: Asegurar que al crear una propiedad se valide el límite~~ **COMPLETADO**
2. **Permisos de Edición**: Implementar niveles de permisos si es necesario
3. **Auditoría**: Registrar qué usuario creó/modificó cada propiedad
4. **Notificaciones**: Alertar a administradores cuando una empresa alcanza su límite
5. **Dashboard de Administrador**: Vista para administradores para gestionar límites de empresas

## Notas Técnicas

- El hook `useAffiliateRealStateOffers` usa un `pageSize` de 100 por defecto para obtener todas las propiedades
- El filtrado se realiza en el servidor (Strapi), no en el cliente
- La ordenación prioriza propiedades platinum y luego por fecha de actualización
- Los datos se actualizan automáticamente cuando cambia el usuario o la paginación

