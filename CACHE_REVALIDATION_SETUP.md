# 🔄 Configuración de Revalidación de Caché con Webhooks

Este documento explica cómo configurar webhooks en Strapi para limpiar automáticamente el caché de Next.js cuando se publique o actualice contenido.

## 📋 Requisitos Previos

- Strapi configurado y funcionando
- Next.js configurado con esta aplicación
- Acceso al panel de administración de Strapi

## 🔑 Paso 1: Configurar Variable de Entorno

En tu archivo `.env.prod` o `.env.local`, agrega:

```bash
REVALIDATION_SECRET=tu-token-secreto-muy-seguro-aqui-12345
```

**⚠️ IMPORTANTE**: Genera un token único y seguro. Puedes usar:
```bash
openssl rand -base64 32
```

O en Node.js:
```javascript
require('crypto').randomBytes(32).toString('base64')
```

## 🪝 Paso 2: Configurar Webhooks en Strapi

### 2.1 Acceder a Webhooks

1. Inicia sesión en el panel de Strapi: `https://azfacms.geniorama.co/admin`
2. Ve a **Settings** → **Webhooks**
3. Haz clic en **"Create new webhook"**

### 2.2 Configurar Webhook para Real State Offers

**Nombre**: `Revalidate Real State Offers`

**URL**: `https://tu-dominio.com/api/revalidate`
- **Producción**: `https://azfa-web.com/api/revalidate`
- **Desarrollo**: `http://localhost:3000/api/revalidate`

**Headers**:
```
Authorization: Bearer tu-token-secreto-muy-seguro-aqui-12345
```

**Events to trigger** (seleccionar):
- ✅ Entry create
- ✅ Entry update
- ✅ Entry delete
- ✅ Entry publish
- ✅ Entry unpublish

**Seleccionar Content-Type**: `Real State Offer`

**Guardar**

### 2.3 Configurar Webhooks Adicionales

Repite el proceso para otros content types:

#### Webhook para Affiliates
- **Nombre**: `Revalidate Affiliates`
- **URL**: `https://tu-dominio.com/api/revalidate`
- **Headers**: `Authorization: Bearer tu-token-...`
- **Content-Type**: `Affiliate`
- **Events**: Todos (create, update, delete, publish, unpublish)

#### Webhook para Content (Noticias/Publicaciones)
- **Nombre**: `Revalidate Content`
- **URL**: `https://tu-dominio.com/api/revalidate`
- **Headers**: `Authorization: Bearer tu-token-...`
- **Content-Type**: `Content`
- **Events**: Todos

#### Webhook para Events
- **Nombre**: `Revalidate Events`
- **URL**: `https://tu-dominio.com/api/revalidate`
- **Headers**: `Authorization: Bearer tu-token-...`
- **Content-Type**: `Event`
- **Events**: Todos

#### Webhook para Global Settings
- **Nombre**: `Revalidate Global Settings`
- **URL**: `https://tu-dominio.com/api/revalidate`
- **Headers**: `Authorization: Bearer tu-token-...`
- **Content-Type**: `Global Setting`
- **Events**: Todos

## 📝 Paso 3: Payload del Webhook

Strapi enviará automáticamente un payload como este:

```json
{
  "event": "entry.publish",
  "createdAt": "2025-10-07T00:00:00.000Z",
  "model": "real-state-offer",
  "entry": {
    "id": 123,
    "documentId": "abc123xyz",
    "title": "Mi Inmueble",
    "slug": "mi-inmueble",
    ...
  }
}
```

El endpoint `/api/revalidate` procesará esto automáticamente.

## 🎯 Rutas que se Revalidan Automáticamente

### Real State Offer
- `/invierta-en-zonas-francas/oferta-inmobiliaria` (listado)
- `/invierta-en-zonas-francas/oferta-inmobiliaria/[slug]` (detalle)

### Affiliate
- `/nuestros-afiliados`

### Content
- `/sala-de-prensa`
- `/sala-de-prensa/noticias`
- `/sala-de-prensa/publicaciones`
- `/sala-de-prensa/podcast`

### Event
- `/eventos`

### Global Setting
- Todo el sitio (layout, header, footer)

### Incentive
- `/invierta-en-zonas-francas/incentivos`

## 🧪 Probar los Webhooks

### 1. Probar en Desarrollo

En el panel de Strapi, después de crear un webhook:
1. Haz clic en el botón **"Trigger"** (icono de play) del webhook
2. Revisa los **logs del servidor de Next.js** (terminal)
3. Deberías ver: `🔄 Webhook recibido:` y `✅ Cache revalidado:`

### 2. Probar con Contenido Real

1. Edita un inmueble en Strapi
2. Haz clic en **"Publish"**
3. Espera unos segundos
4. Recarga la página `/invierta-en-zonas-francas/oferta-inmobiliaria` en tu navegador
5. Los cambios deberían aparecer inmediatamente

### 3. Ver Logs de Webhooks en Strapi

En el panel de Strapi:
1. Ve a **Settings** → **Webhooks**
2. Haz clic en el webhook que quieras revisar
3. Ve a la pestaña **"Logs"** para ver el historial de ejecuciones

## 🔒 Seguridad

### Configuración del Token

- ✅ Usa un token fuerte y único
- ✅ Guárdalo en variables de entorno (nunca en el código)
- ✅ Usa HTTPS en producción
- ✅ Rota el token periódicamente

### Validación en Next.js

El endpoint `/api/revalidate`:
- ✅ Valida el token en cada petición
- ✅ Retorna 401 si el token es inválido
- ✅ Solo revalida rutas específicas (no todo el sitio por defecto)

## ⚡ Optimizaciones

### Revalidación Selectiva

El sistema revalida **solo las rutas afectadas** por cada modelo:
- Más eficiente que revalidar todo el sitio
- Reduce carga en el servidor
- Mejora velocidad de respuesta

### Revalidación Completa (Opción Nuclear)

Si necesitas revalidar todo el sitio, envía en el payload:
```json
{
  "revalidateAll": true
}
```

## 🐛 Troubleshooting

### Problema: Webhook no se ejecuta

**Solución**:
1. Verifica que el webhook esté **enabled** en Strapi
2. Verifica la URL (debe ser accesible desde internet en producción)
3. Revisa los logs del webhook en Strapi

### Problema: Error 401 Unauthorized

**Solución**:
1. Verifica que `REVALIDATION_SECRET` esté configurado en `.env`
2. Verifica que el header `Authorization` en el webhook sea correcto
3. Formato correcto: `Bearer tu-token-secreto`

### Problema: Cambios no aparecen

**Solución**:
1. Espera 5-10 segundos después de publicar
2. Haz hard refresh en el navegador: `Ctrl + Shift + R` (Windows) o `Cmd + Shift + R` (Mac)
3. Verifica los logs del servidor de Next.js
4. Verifica que el webhook se ejecutó (logs en Strapi)

### Problema: Next.js no recibe el webhook en desarrollo local

**Solución**:
Para desarrollo local, necesitas usar un túnel como **ngrok**:

```bash
# Instalar ngrok
npm install -g ngrok

# Crear túnel
ngrok http 3000
```

Usa la URL de ngrok en la configuración del webhook.

## 📊 Monitoreo

### Logs en Next.js

En la consola del servidor verás:
```
🔄 Webhook recibido: { model: 'real-state-offer', event: 'entry.publish', entry: 123 }
✅ Cache revalidado: Oferta Inmobiliaria
```

### Logs en Strapi

En **Settings** → **Webhooks** → (selecciona webhook) → **Logs**:
- ✅ Status 200: Revalidación exitosa
- ❌ Status 401: Error de autenticación
- ❌ Status 500: Error del servidor

## 🚀 Configuración de Producción

### Variables de Entorno

En tu servidor de producción (.env.production):

```bash
# Next.js
REVALIDATION_SECRET=token-super-secreto-de-produccion
NEXT_PUBLIC_STRAPI_URL=https://azfacms.geniorama.co/api
```

### URL del Webhook en Producción

Usa la URL pública de tu sitio:
```
https://www.azfa.com/api/revalidate
```

## 📖 Alternativas

### 1. Time-based Revalidation (Ya implementado)

En `src/lib/api.ts`:
```typescript
fetch(url, {
  next: { revalidate: 3600 }, // Revalida cada hora
});
```

**Ventajas**: Simple, no requiere configuración adicional
**Desventajas**: Puede mostrar contenido desactualizado hasta 1 hora

### 2. Revalidación Manual

Crear un botón en el dashboard para admin:
```typescript
fetch('/api/revalidate', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ model: 'real-state-offer' })
})
```

### 3. Sin Caché (No recomendado)

```typescript
fetch(url, {
  cache: 'no-store' // Siempre datos frescos pero más lento
});
```

## ✅ Checklist de Implementación

- [ ] Generar `REVALIDATION_SECRET` seguro
- [ ] Agregar variable a `.env.prod`
- [ ] Reiniciar servidor de Next.js
- [ ] Crear webhooks en Strapi para cada content-type
- [ ] Configurar headers de autorización en cada webhook
- [ ] Probar con el botón "Trigger" en Strapi
- [ ] Verificar logs en Next.js
- [ ] Probar publicando contenido real
- [ ] Verificar cambios en el navegador

## 🎓 Recursos Adicionales

- [Next.js On-Demand Revalidation](https://nextjs.org/docs/app/building-your-application/data-fetching/incremental-static-regeneration#on-demand-revalidation)
- [Strapi Webhooks](https://docs.strapi.io/dev-docs/configurations/webhooks)
- [Next.js revalidatePath](https://nextjs.org/docs/app/api-reference/functions/revalidatePath)
- [Next.js revalidateTag](https://nextjs.org/docs/app/api-reference/functions/revalidateTag)

