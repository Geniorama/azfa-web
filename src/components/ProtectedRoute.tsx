'use client'

import { useRequireAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

interface ProtectedRouteProps {
  children: React.ReactNode
  redirectTo?: string
}

export default function ProtectedRoute({ 
  children, 
  redirectTo = '/auth/login' 
}: ProtectedRouteProps) {
  const { isAuthenticated, isLoading, shouldRedirect } = useRequireAuth()
  const router = useRouter()

  useEffect(() => {
    if (shouldRedirect) {
      router.push(redirectTo)
    }
  }, [shouldRedirect, router, redirectTo])

  // Mostrar loading mientras se verifica la autenticación
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  // No mostrar nada si no está autenticado (se redirigirá)
  if (!isAuthenticated) {
    return null
  }

  return <>{children}</>
}
