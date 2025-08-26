import { useAuth as useAuthContext } from '@/context/AuthContext'

export function useAuth() {
  return useAuthContext()
}

// Hook adicional para verificar si el usuario está autenticado
export function useRequireAuth() {
  const { isAuthenticated, isLoading } = useAuth()
  
  return {
    isAuthenticated,
    isLoading,
    shouldRedirect: !isLoading && !isAuthenticated
  }
}
