'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface User {
  id: number
  username: string
  email: string
  confirmed: boolean
  blocked: boolean
  isEditor?: boolean
  isPropertiesEditor?: boolean
  role?: {
    id: number
    name: string
    description?: string
  }
  affiliateCompany?: {
    id: number
    documentId?: string
    title: string
    propertiesLimit: number
  }
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  logout: () => void
  isLoading: boolean
  isAuthenticated: boolean
  isEditor: boolean
  isPropertiesEditor: boolean
  isAdmin: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const logout = async () => {
    try {
      // Elimina la cookie httpOnly del JWT en el servidor
      await fetch('/api/auth/logout', { method: 'POST', credentials: 'same-origin' })
    } catch (error) {
      console.error('Error al cerrar sesión:', error)
    }
    setUser(null)
    if (typeof window !== 'undefined') {
      localStorage.removeItem('strapi_user')
    }
  }

  // Restaurar/validar la sesión a partir de la cookie httpOnly
  useEffect(() => {
    // Render optimista con el usuario cacheado (evita parpadeo)
    const cached = localStorage.getItem('strapi_user')
    if (cached) {
      try {
        setUser(JSON.parse(cached))
      } catch {
        localStorage.removeItem('strapi_user')
      }
    }

    // Fuente de verdad: la cookie. Validar contra el servidor.
    const init = async () => {
      try {
        const res = await fetch('/api/auth/me', { credentials: 'same-origin' })
        if (res.ok) {
          const data = await res.json()
          setUser(data.user)
          localStorage.setItem('strapi_user', JSON.stringify(data.user))
        } else if (res.status === 401 || res.status === 403) {
          // Sesión inválida o expirada
          setUser(null)
          localStorage.removeItem('strapi_user')
        }
        // Otros errores (red/5xx): mantener el estado cacheado
      } catch {
        // Error de red: no desloguear de forma agresiva
      } finally {
        setIsLoading(false)
      }
    }

    init()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Verificar periódicamente el estado del usuario (bloqueo / expiración)
  useEffect(() => {
    if (!user) return

    const verifyUserStatus = async () => {
      try {
        const res = await fetch('/api/auth/me', { credentials: 'same-origin' })

        if (res.status === 401 || res.status === 403) {
          // Bloqueado o token inválido -> cerrar sesión
          await logout()
          if (typeof window !== 'undefined') {
            localStorage.setItem('logout_reason', 'blocked')
            window.location.href = '/auth/login?blocked=true'
          }
        } else if (res.ok) {
          const data = await res.json()
          setUser(data.user)
          localStorage.setItem('strapi_user', JSON.stringify(data.user))
        }
      } catch (error) {
        console.error('Error verificando estado del usuario:', error)
      }
    }

    const interval = setInterval(verifyUserStatus, 30000) // cada 30 segundos
    return () => clearInterval(interval)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true)

      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'same-origin',
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        return { success: false, error: data.error || 'Error al iniciar sesión' }
      }

      // El JWT queda en la cookie httpOnly; en el cliente solo guardamos el perfil
      setUser(data.user)
      localStorage.setItem('strapi_user', JSON.stringify(data.user))

      return { success: true }
    } catch (error) {
      console.error('Error en login:', error)
      return { success: false, error: 'Error de conexión' }
    } finally {
      setIsLoading(false)
    }
  }

  // Verificar si el usuario es editor
  const isEditor = user?.isEditor === true

  // Verificar si el usuario es editor de propiedades
  const isPropertiesEditor = user?.isPropertiesEditor === true

  // Verificar si el usuario es administrador
  const isAdmin = user?.role?.name === 'Administrator' || user?.role?.name === 'Super Admin'

  const value = {
    user,
    login,
    logout,
    isLoading,
    isAuthenticated: !!user,
    isEditor,
    isPropertiesEditor,
    isAdmin,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider')
  }
  return context
}
