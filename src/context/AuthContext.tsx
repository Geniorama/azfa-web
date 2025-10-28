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
  token: string | null
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
  const [token, setToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Verificar si hay token guardado al cargar la aplicación
  useEffect(() => {
    const savedToken = localStorage.getItem('strapi_token')
    const savedUser = localStorage.getItem('strapi_user')
    
    if (savedToken && savedUser) {
      setToken(savedToken)
      setUser(JSON.parse(savedUser))
    }
    
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true)
      
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        return { success: false, error: data.error || 'Error al iniciar sesión' }
      }

      // Guardar token y usuario
      setToken(data.token)
      setUser(data.user)
      
      // Persistir en localStorage
      localStorage.setItem('strapi_token', data.token)
      localStorage.setItem('strapi_user', JSON.stringify(data.user))

      return { success: true }
    } catch (error) {
      console.error('Error en login:', error)
      return { success: false, error: 'Error de conexión' }
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem('strapi_token')
    localStorage.removeItem('strapi_user')
  }

  // Verificar si el usuario es editor
  const isEditor = user?.isEditor === true

  // Verificar si el usuario es editor de propiedades
  const isPropertiesEditor = user?.isPropertiesEditor === true

  // Verificar si el usuario es administrador (role.name === 'Administrator' o 'Super Admin')
  const isAdmin = user?.role?.name === 'Administrator' || user?.role?.name === 'Super Admin'

  const value = {
    user,
    token,
    login,
    logout,
    isLoading,
    isAuthenticated: !!user && !!token,
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
