import { useState, useEffect, useMemo } from 'react'
import { fetchData } from './apiService'
import { useAuthToken } from '../context/tokenProvider'

export default function useFilteredEntries({ tagId }) {
  const [filteredEntries, setFilteredEntries] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const jwtToken = useAuthToken()

  useEffect(() => {
    if (!jwtToken || !tagId) return

    if (jwtToken && tagId) {
      fetchData(`entries/tagFilter?tagId=${tagId}`, jwtToken)
        .then((data) => {
          setFilteredEntries(data)
          setLoading(false)
          console.log('filteredEntries: send data', data)
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
