'use client'

import ProtectedRoute from '@/components/ProtectedRoute'

interface PortalAfiliadosLayoutProps {
  children: React.ReactNode
}

export default function PortalAfiliadosLayout({ children }: PortalAfiliadosLayoutProps) {
  return (
    <ProtectedRoute redirectTo="/auth/login">
      {children}
    </ProtectedRoute>
  )
}
