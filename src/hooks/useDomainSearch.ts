// hooks/useDomainSearch.ts
'use client'
import { useCallback, useState } from 'react'

export type SearchStatus = 'idle' | 'loading' | 'available' | 'taken' | 'error'

export interface DomainSuggestion {
  domain: string
  available: boolean
  extension: string
  price: number
  match: number
}

export interface SearchResult {
  domain: string
  available: boolean
  price: number
  suggestions: DomainSuggestion[]
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

      const resultObj = data?.result
      const dataArr: any[] = resultObj?.data ?? []

      const suggestions: DomainSuggestion[] = dataArr.map((item: any) => ({
        domain: item.domain,
        available: Boolean(item.available),
        extension: item.setup?.extension ?? '',
        price: Number(item.setup?.pricing?.firstPrice?.price ?? 0),
        match: item.match ?? 0,
      }))

      // Exact match has match === 999
      const exactMatch = suggestions.find((s) => s.match === 999)
      // Fallback: find by domain string
      const domainMatch = suggestions.find((s) => s.domain === trimmed)
      // Final fallback: use first suggestion
      const primary = exactMatch ?? domainMatch ?? suggestions[0]

      const primaryDomain = primary?.domain ?? trimmed
      const primaryAvailable = primary?.available ?? false
      const primaryPrice = primary?.price ?? 0

      setResult({
        domain: primaryDomain,
        available: primaryAvailable,
        price: primaryPrice,
        suggestions,
        raw: data,
      })
      setStatus(primaryAvailable ? 'available' : 'taken')
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
