import { useState, useEffect, useMemo } from 'react'
import { fetchData } from './apiService'
import { useAuthToken } from '../context/tokenProvider'

export default function useFilteredEntries({ tagId }) {
  const [filteredEntries, setFilteredEntries] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const jwtToken = useAuthToken()

  useEffect(() => {
    if (!jwtToken || !tagId) {
      setLoading(false)
      return
    }

    setLoading(true)

    if (jwtToken && tagId) {
      fetchData(`entries/tagFilter?tagIds=${tagId}`, jwtToken)
        .then((data) => {
          setFilteredEntries(data)

          setLoading(false)
        })
        .catch((error) => {
          setError(error)
          setLoading(false)
        })
    }
  }, [jwtToken, tagId])

  return useMemo(
    () => ({ filteredEntries, loading, error }),
    [filteredEntries, loading, error],
  )
}
