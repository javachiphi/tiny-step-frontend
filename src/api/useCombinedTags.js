import { useState, useEffect, useMemo } from 'react'
import { fetchData } from './apiService'
import { useAuthToken } from '../context/tokenProvider'

export default function useCombinedTags() {
  const [combinedTags, setCombinedTags] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const jwtToken = useAuthToken()

  useEffect(() => {
    if (jwtToken) {
      fetchData('tags/combined', jwtToken)
        .then((data) => {
          setCombinedTags(data)
          setLoading(false)
        })
        .catch((error) => {
          setError(error)
          setLoading(false)
        })
    }
  }, [jwtToken])

  return useMemo(
    () => ({ combinedTags, loading, error }),
    [combinedTags, loading, error],
  )
}
