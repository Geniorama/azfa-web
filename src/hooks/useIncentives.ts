import { useState, useEffect } from 'react'
import { Incentive, IncentiveResponse } from '@/types/incentiveType'

interface UseIncentivesOptions {
  country?: string
  page?: number
  pageSize?: number
}

interface UseIncentivesReturn {
  incentives: Incentive[]
  loading: boolean
  error: string | null
  refetch: () => void
}

export function useIncentives(options: UseIncentivesOptions = {}): UseIncentivesReturn {
  const [incentives, setIncentives] = useState<Incentive[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const { country, page = 1, pageSize = 100 } = options

  const fetchIncentives = async () => {
    try {
      setLoading(true)
      setError(null)

      // Construir parámetros de consulta
      const params = new URLSearchParams({
        page: page.toString(),
        pageSize: pageSize.toString(),
      })

      if (country) {
        params.append('country', country)
      }

      const response = await fetch(`/api/getIncentives?${params.toString()}`)
      
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`)
      }

      const data: IncentiveResponse = await response.json()
      setIncentives(data.data)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido'
      setError(errorMessage)
      console.error('Error al cargar incentivos:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchIncentives()
  }, [country, page, pageSize, fetchIncentives])

  const refetch = () => {
    fetchIncentives()
  }

  return {
    incentives,
    loading,
    error,
    refetch,
  }
}
