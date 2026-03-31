import api from '@/lib/api'
import { useEffect, useState } from 'react'

export interface HostingPlan {
  id: string
  name: string
  price: string
  href?: string
  features: string[]
  popular: boolean
}

export function useHostingPlans() {
  const [plans, setPlans] = useState<HostingPlan[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchPlans()
  }, [])

  const fetchPlans = async () => {
    try {
      setLoading(true)
      const response = await api.get('/hosting')
      setPlans(response.data)
      setError(null)
    } catch (err) {
      setError('Failed to fetch hosting plans')
      console.error('Error fetching hosting plans:', err)
    } finally {
      setLoading(false)
    }
  }

  return { plans, loading, error, refetch: fetchPlans }
}