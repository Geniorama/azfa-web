# 🔐 Configuración de Deslogueo Automático al Bloquear Usuarios

## ✅ Sistema Implementado

Se ha implementado un sistema completo que **desloguea automáticamente a un usuario cuando es bloqueado en Strapi**, impidiendo que pueda volver a iniciar sesión.

## 🎯 Características

- ✅ **Verificación periódica cada 30 segundos** del estado del usuario
- ✅ **Deslogueo inmediato** cuando se detecta que el usuario fue bloqueado
- ✅ **Webhook de Strapi** para notificaciones en tiempo real (opcional pero recomendado)
- ✅ **Mensaje informativo** en la página de login explicando el bloqueo
- ✅ **Prevención de login** para usuarios bloqueados
- ✅ **Validación en el servidor** para mayor seguridad

## 📁 Archivos Creados

### 1. Endpoint de Webhook (`src/app/api/auth/webhook-user-blocked/route.ts`)
Recibe notificaciones de Strapi cuando un usuario es bloqueado.

### 2. Endpoint de Verificación (`src/app/api/auth/verify-user/route.ts`)
Verifica el estado actual de un usuario en Strapi.

### 3. AuthContext Actualizado (`src/context/AuthContext.tsx`)
Incluye verificación periódica del estado del usuario cada 30 segundos.

### 4. Página de Login Actualizada (`src/app/auth/login/page.tsx`)
Muestra mensaje informativo cuando un usuario fue bloqueado.

## 🚀 Cómo Funciona

### Flujo cuando se bloquea un usuario:

1. **Admin bloquea usuario en Strapi** (marca `blocked: true`)
2. **Webhook notifica al sistema** (opcional, para registro/logs)
3. **Frontend verifica periódicamente** el estado del usuario cada 30 segundos
4. **Al detectar bloqueo**, el sistema:
   - Limpia el localStorage
   - Cierra la sesión
   - Redirige a `/auth/login?blocked=true`
   - Muestra mensaje explicativo

### Flujo al intentar hacer login:

1. Usuario ingresa credenciales
2. **API valida en Strapi** si el usuario está bloqueado
3. Si está bloqueado, **rechaza el login** con mensaje:
   - "Su cuenta ha sido bloqueada. Contacte al administrador."

## 🔧 Configuración en Strapi (Webhook Opcional)

### Paso 1: Agregar Variable de Entorno

En tu archivo `.env.local` (y en producción), agrega:

```bash
# Secret para validar webhooks de Strapi (genera un token aleatorio seguro)
STRAPI_WEBHOOK_SECRET=tu_secret_super_seguro_aqui_12345
```

**Generar un secret seguro:**
```bash
# En Node.js:
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# O usa cualquier generador de tokens aleatorios
```

### Paso 2: Configurar Webhook en Strapi Admin

1. **Inicia sesión en Strapi Admin Panel**
   - Ve a: `http://localhost:1337/admin` (o tu URL de Strapi)

2. **Navega a Settings → Webhooks**
   - Menú lateral: `Settings` → `Global Settings` → `Webhooks`

3. **Crear Nuevo Webhook**
   - Click en "Create new webhook"

4. **Configurar el Webhook**

   **Name:** `User Blocked Notification`
   
   **URL:** 
   ```
   https://tu-dominio.com/api/auth/webhook-user-blocked
   # En desarrollo local:
   http://localhost:3000/api/auth/webhook-user-blocked
   ```
   
   **Headers:**
   - **Name:** `Authorization`
   - **Value:** `Bearer tu_secret_super_seguro_aqui_12345`
   
   **Events:** Selecciona:
   - ✅ `entry.update` bajo **User (users-permissions)**

5. **Guardar el Webhook**
   - Click en "Save"

### Paso 3: Verificar la Configuración

#### Probar el Webhook:

1. **En Strapi Admin**, edita cualquier usuario
2. Cambia el campo `blocked` a `TRUE`
3. Guarda los cambios
4. **Verifica en los logs de tu aplicación Next.js:**
   ```
   📨 Webhook recibido: { event: 'entry.update', model: 'user' }
   🚫 Usuario bloqueado detectado: 123
   ```

## 🎛️ Personalización

### Cambiar Intervalo de Verificación

En `src/context/AuthContext.tsx`, línea ~102:

```typescript
const interval = setInterval(() => {
  verifyUserStatus()
}, 30000) // 30 segundos - Puedes cambiar este valor
```

**Opciones recomendadas:**
- `15000` = 15 segundos (más rápido, más peticiones)
- `30000` = 30 segundos (balanceado) ← **Actual**
- `60000` = 60 segundos (menos peticiones)

### Personalizar Mensaje de Bloqueo

En `src/app/auth/login/page.tsx`, línea ~30:

```typescript
setBlockedMessage('Su cuenta ha sido bloqueada. Por favor, contacte al administrador.')
```

Cambia el texto según tus necesidades.

### Agregar Acciones Adicionales al Bloquear

En `src/app/api/auth/webhook-user-blocked/route.ts`, línea ~35:

```typescript
if (entry?.blocked === true) {
  const userId = entry.id
  
  // AQUÍ PUEDES AGREGAR:
  // 1. Enviar email al usuario
  // 2. Registrar en base de datos
  // 3. Invalidar tokens en Redis
  // 4. Notificar a un sistema externo
  // 5. Registrar en logs de auditoría
  
  return NextResponse.json({ 
    success: true,
    message: `Usuario ${userId} bloqueado exitosamente`,
    userId 
  })
}
```

## 📊 Monitoreo y Debugging

### Ver logs en tiempo real:

```bash
# En tu terminal de Next.js
npm run dev

# Busca estos mensajes:
# ✅ Verificación exitosa
# 🚫 Usuario bloqueado detectado
# 📨 Webhook recibido
```

### Verificar en el navegador:

1. Abre **DevTools** (F12)
2. Ve a la pestaña **Console**
3. Filtra por: `Usuario bloqueado`

## 🔒 Seguridad

### Validaciones Implementadas:

1. ✅ **Validación en el servidor** al hacer login
2. ✅ **Verificación periódica** del token y estado del usuario
3. ✅ **Secret en webhook** para prevenir accesos no autorizados
4. ✅ **Token JWT verificado** en cada petición
5. ✅ **Limpieza de localStorage** al desloguear

### Recomendaciones Adicionales:

1. **En Producción:**
   - Usa HTTPS para todos los endpoints
   - Configura CORS correctamente en Strapi
   - Usa variables de entorno seguras
   - Implementa rate limiting en los endpoints

2. **Registro de Eventos:**
   - Considera agregar logging a un servicio como Sentry
   - Registra intentos de login fallidos
   - Audita cambios en el estado de usuarios

## 🐛 Solución de Problemas

### El usuario no se desloguea inmediatamente

**Causa:** El intervalo de verificación es cada 30 segundos.

**Solución:**
- Reduce el intervalo (ver Personalización)
- O implementa WebSockets/Server-Sent Events para notificaciones en tiempo real

### El webhook no funciona

**Verificar:**
1. ✅ URL del webhook es correcta y accesible
2. ✅ Header `Authorization` está configurado
3. ✅ Variable `STRAPI_WEBHOOK_SECRET` está definida
4. ✅ El evento `entry.update` está seleccionado para User

**Debug:**
```typescript
// En src/app/api/auth/webhook-user-blocked/route.ts
// Agrega logs al inicio:
console.log('Webhook headers:', Object.fromEntries(request.headers))
console.log('Webhook body:', payload)
```

### Error: "Token inválido o expirado"

**Causa:** El token JWT expiró.

**Solución:**
- El sistema automáticamente deslogueará al usuario
- Esto es comportamiento esperado

## 📈 Próximos Pasos (Opcional)

### 1. Implementar WebSockets para notificaciones en tiempo real
```typescript
// Sería más rápido que el polling de 30 segundos
```

### 2. Agregar sistema de notificaciones por email
```typescript
// Notificar al usuario cuando su cuenta es bloqueada
```

### 3. Implementar whitelist/blacklist de IPs
```typescript
// Control adicional de acceso
```

### 4. Agregar logs de auditoría
```typescript
// Registrar todos los intentos de acceso bloqueados
```

## 📞 Soporte

Si tienes problemas con la implementación:
1. Revisa los logs en la consola del navegador
2. Verifica los logs del servidor Next.js
3. Revisa la configuración del webhook en Strapi
4. Verifica las variables de entorno

---

**✅ Sistema completamente funcional y listo para usar**

El sistema está configurado para:
- ✅ Desloguear usuarios bloqueados en ~30 segundos
- ✅ Prevenir login de usuarios bloqueados
- ✅ Mostrar mensajes informativos
- ✅ Mantener la seguridad del sistema

