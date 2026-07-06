import { useState, useEffect, useCallback } from 'react'
import { matchService } from '../services/matchService'

export function useMatches(filters = {}) {
  const [matches, setMatches] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const key = JSON.stringify(filters)

  const fetch = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const res = await matchService.getAll(JSON.parse(key))
      setMatches(res.data || [])
    } catch (err) {
      setError(err.message || 'Error al cargar partidos')
    } finally {
      setLoading(false)
    }
  }, [key])

  useEffect(() => {
    fetch()
  }, [fetch])
  return { matches, loading, error, refetch: fetch }
}

export function useMatch(id) {
  const [match, setMatch] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!id) return
    matchService
      .getById(id)
      .then((res) => setMatch(res.data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [id])

  return { match, loading, error }
}
