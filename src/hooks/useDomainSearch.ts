// hooks/useDomainSearch.ts
'use client'
import { useCallback, useState } from 'react'

export type SearchStatus = 'idle' | 'loading' | 'available' | 'taken' | 'error'

export interface SearchResult {
  domain: string
  available: boolean
  raw?: unknown
}

export function useDomainSearch() {
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState<SearchStatus>('idle')
  const [result, setResult] = useState<SearchResult | null>(null)
  const [errorMsg, setErrorMsg] = useState('')

  const search = useCallback(async (domainQuery?: string) => {
    const trimmed = (domainQuery ?? query).trim().toLowerCase()
    if (!trimmed) return

    setStatus('loading')
    setResult(null)
    setErrorMsg('')

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_EXTERNAL_API_URL}/search/domain?domain=${encodeURIComponent(trimmed)}`
      )
      if (!res.ok) throw new Error(`Server error: ${res.status}`)
      const data = await res.json()

      const available = Boolean(
        data.available ?? data.is_available ?? data.status === 'available'
      )

      setResult({ domain: trimmed, available, raw: data })
      setStatus(available ? 'available' : 'taken')
    } catch (err) {
      setStatus('error')
      setErrorMsg(err instanceof Error ? err.message : 'Unknown error')
    }
  }, [query])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') search()
    },
    [search]
  )

  return { query, setQuery, status, result, errorMsg, search, handleKeyDown }
}