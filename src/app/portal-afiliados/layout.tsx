import { redirect } from 'next/navigation'
import { getServerSession } from '@/lib/serverAuth'
import ProtectedRoute from '@/components/ProtectedRoute'

// El portal es por usuario: nunca debe prerenderizarse ni cachearse. Sin esto,
// el build generaba una copia estática de cada página —con sus datos dentro—
// que se servía igual a cualquier visitante.
export const dynamic = 'force-dynamic'

interface PortalAfiliadosLayoutProps {
  children: React.ReactNode
}

/**
 * Puerta del Portal de Afiliados.
 *
 * La comprobación que cuenta es esta, la del servidor: si no hay sesión válida
 * en la cookie httpOnly, se redirige ANTES de renderizar nada, así que el HTML
 * con los documentos nunca llega a salir.
 *
 * `ProtectedRoute` se mantiene por debajo, pero ya no como única defensa: cubre
 * lo que el servidor no puede ver, que es la sesión caducando o el usuario
 * siendo bloqueado mientras la pestaña sigue abierta.
 */
export default async function PortalAfiliadosLayout({
  children,
}: PortalAfiliadosLayoutProps) {
  const session = await getServerSession()

  if (!session) {
    redirect('/auth/login')
  }

  return (
    <ProtectedRoute redirectTo="/auth/login">
      {children}
    </ProtectedRoute>
  )
}
