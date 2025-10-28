'use client'

import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

interface ProtectedPropertiesEditorProps {
  children: React.ReactNode
}

export default function ProtectedPropertiesEditor({ 
  children 
}: ProtectedPropertiesEditorProps) {
  const { isPropertiesEditor, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !isPropertiesEditor) {
      // Redirigir al portal de afiliados si no tiene el permiso
      router.push('/portal-afiliados')
    }
  }, [isLoading, isPropertiesEditor, router])

  // Mostrar loading mientras se verifica el permiso
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  // No mostrar nada si no tiene el permiso (se redirigirá)
  if (!isPropertiesEditor) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-h4 text-text-primary mb-4">Acceso restringido</h1>
          <p className="text-body text-text-primary mb-4">
            No tienes permisos para acceder a esta sección.
          </p>
          <button
            onClick={() => router.push('/portal-afiliados')}
            className="px-6 py-2 bg-primary text-white rounded hover:bg-primary/90"
          >
            Volver al portal
          </button>
        </div>
      </div>
    )
  }

  return <>{children}</>
}

