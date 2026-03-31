import api from '@/lib/api'
import { useEffect, useState } from 'react'

export interface Domain {
  id: string
  extension: string
  price: string
  description: string
  popular: boolean
}

export function useDomains() {
  const [domains, setDomains] = useState<Domain[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchDomains()
  }, [])

  const fetchDomains = async () => {
    try {
      setLoading(true)
      const response = await api.get('/domains')
      setDomains(response.data)
      setError(null)
    } catch (err) {
      setError('Failed to fetch domains')
      console.error('Error fetching domains:', err)
    } finally {
      setLoading(false)
    }
  }

  return { domains, loading, error, refetch: fetchDomains }
}