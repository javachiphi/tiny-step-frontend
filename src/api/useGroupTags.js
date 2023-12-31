import { useState, useEffect, useMemo, useCallback } from 'react'
import { fetchData } from './apiService'
import { useAuthToken } from '../context/tokenProvider'

export default function useGroupTags() {
  const [groupTags, setGroupTags] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const jwtToken = useAuthToken()

  useEffect(() => {
    if (jwtToken) {
      fetchData('entries/groupedEntriesByTag', jwtToken)
        .then((data) => {
          setGroupTags(data)
          console.log('grouping tag', data)
          setLoading(false)
        })
        .catch((error) => {
          setError(error)
          setLoading(false)
        })
    }
  }, [jwtToken])

  const refreshGroupTags = useCallback(() => {
    setLoading(true)
    fetchData('entries/groupedEntriesByTag', jwtToken)
      .then((data) => {
        setGroupTags(data)
        setLoading(false)
      })
      .catch((error) => {
        setError(error)
        setLoading(false)
      })
  }, [jwtToken])

  return useMemo(
    () => ({ groupTags, refreshGroupTags, loading, error }),
    [groupTags, refreshGroupTags, loading, error],
  )
}
