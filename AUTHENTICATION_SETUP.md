# 🔐 Configuración de Autenticación con Strapi

## ✅ Implementación Completada

He implementado un sistema completo de autenticación que se integra con tu backend de Strapi. Aquí está todo lo que se ha configurado:

## 📁 Archivos Creados/Modificados

### Nuevos Archivos:
- `src/context/AuthContext.tsx` - Contexto de autenticación
- `src/hooks/useAuth.ts` - Hook personalizado para autenticación
- `src/app/api/auth/login/route.ts` - API route para login
- `src/components/ProtectedRoute.tsx` - Componente para proteger rutas
- `src/app/dashboard/page.tsx` - Página de ejemplo protegida

### Archivos Modificados:
- `src/app/layout.tsx` - Agregado AuthProvider
- `src/app/auth/login/page.tsx` - Formulario funcional de login
- `src/components/Header.tsx` - Botones de login/logout y menú de usuario

## 🚀 Cómo Funciona

### 1. **Contexto de Autenticación**
- Maneja el estado global del usuario autenticado
- Persiste la sesión en localStorage
- Proporciona funciones de login/logout

### 2. **API de Login**
- Endpoint: `POST /api/auth/login`
- Se conecta con Strapi usando el cliente oficial
- Valida credenciales y maneja errores

### 3. **Formulario de Login**
- Validación de campos requeridos
- Estados de carga y error
- Redirección automática después del login

### 4. **Protección de Rutas**
- Componente `ProtectedRoute` para páginas privadas
- Redirección automática a login si no está autenticado
- Loading state mientras verifica autenticación

### 5. **Header Inteligente**
- Muestra botón "Portal afiliados" si no está autenticado
- Muestra menú de usuario si está autenticado
- Opción de cerrar sesión

## 🔧 Configuración Requerida

### 1. **Variables de Entorno**
Asegúrate de tener en tu archivo `.env.local`:

```bash
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
# o tu URL de producción de Strapi
```

### 2. **Configuración de Strapi**
En tu backend de Strapi, asegúrate de que:

- Los usuarios pueden registrarse y confirmar su cuenta
- La autenticación está habilitada
- Los permisos están configurados correctamente

## 📖 Cómo Usar

### **Para Usuarios:**
1. Ve a `/auth/login`
2. Ingresa tu email y contraseña
3. Serás redirigido automáticamente al dashboard

### **Para Desarrolladores:**

#### Proteger una Página:
```tsx
import ProtectedRoute from '@/components/ProtectedRoute'

export default function MiPaginaPrivada() {
  return (
    <ProtectedRoute>
      <div>Contenido solo para usuarios autenticados</div>
    </ProtectedRoute>
  )
}
```

#### Usar el Hook de Autenticación:
```tsx
import { useAuth } from '@/hooks/useAuth'

export default function MiComponente() {
  const { user, isAuthenticated, logout } = useAuth()
  
  if (!isAuthenticated) {
    return <div>No estás autenticado</div>
  }
  
  return (
    <div>
      Hola {user?.username}!
      <button onClick={logout}>Cerrar sesión</button>
    </div>
  )
}
```

## 🎯 Páginas de Ejemplo

- `/auth/login` - Formulario de login
- `/dashboard` - Página protegida de ejemplo

## 🔒 Características de Seguridad

- ✅ Tokens JWT seguros
- ✅ Validación de usuarios bloqueados
- ✅ Verificación de cuentas confirmadas
- ✅ Persistencia segura en localStorage
- ✅ Redirección automática
- ✅ Manejo de errores robusto

## 🐛 Solución de Problemas

### Error: "NEXT_PUBLIC_STRAPI_URL is not set"
- Verifica que tienes la variable de entorno configurada

### Error: "Credenciales inválidas"
- Verifica que el usuario existe en Strapi
- Confirma que la cuenta está activada
- Verifica que la contraseña es correcta

### El login no funciona
- Verifica que Strapi esté ejecutándose
- Revisa la consola del navegador para errores
- Verifica la configuración de CORS en Strapi

## 🚀 Próximos Pasos

1. **Crear más páginas protegidas** usando `ProtectedRoute`
2. **Implementar registro de usuarios** si es necesario
3. **Agregar recuperación de contraseña**
4. **Personalizar el dashboard** según tus necesidades
5. **Implementar roles y permisos** más granulares

¡Tu sistema de autenticación está listo para usar! 🎉
