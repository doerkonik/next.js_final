import api from '@/lib/api'
import { useEffect, useState } from 'react'

export interface VPSPlan {
  id: string
  name: string
  price: string
  cpu: string
  ram: string
  href?: string
  storage: string
  bandwidth: string
  port: string
  popular: boolean
}

export function useVPSPlans() {
  const [plans, setPlans] = useState<VPSPlan[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchPlans()
  }, [])

  const fetchPlans = async () => {
    try {
      setLoading(true)
      const response = await api.get('/vps')
      setPlans(response.data)
      setError(null)
    } catch (err) {
      setError('Failed to fetch VPS plans')
      console.error('Error fetching VPS plans:', err)
    } finally {
      setLoading(false)
    }
  }

  return { plans, loading, error, refetch: fetchPlans }
}