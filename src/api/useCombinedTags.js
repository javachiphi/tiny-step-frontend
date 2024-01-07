import { useState, useEffect, useMemo, useCallback } from 'react'
import { fetchData } from './apiService'
import { useAuthToken } from '../context/tokenProvider'
import { useUser } from '../context/userProvider'

export default function useCombinedTags() {
  const [combinedTags, setCombinedTags] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const jwtToken = useAuthToken()
  const { loading: userLoading } = useUser()


  useEffect(() => {
    if(userLoading) return
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
  }, [jwtToken, userLoading])

  const refreshCombinedTags = useCallback(() => {
    setLoading(true)
    fetchData('tags/combined', jwtToken)
      .then((data) => {
        setCombinedTags(data)
        setLoading(false)
      })
      .catch((error) => {
        setError(error)
        setLoading(false)
      })
  }, [jwtToken])

  return useMemo(
    () => ({ combinedTags, refreshCombinedTags, loading, error }),
    [combinedTags, refreshCombinedTags, loading, error],
  )
}
