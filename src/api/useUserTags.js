import { useState, useEffect, useMemo } from 'react'
import { fetchData } from './apiService'
import { useAuthToken } from '../context/tokenProvider'

export default function useUserTags({ tagType }) {
  const [userTags, setUserTags] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const jwtToken = useAuthToken()

  useEffect(() => {
    if (jwtToken && tagType) {
      fetchData(`tags?tagType=${tagType}`, jwtToken)
        .then((data) => {
          setUserTags(data)
          setLoading(false)
        })
        .catch((error) => {
          setError(error)
          setLoading(false)
        })
    }
  }, [jwtToken, tagType])

  return useMemo(
    () => ({ userTags, loading, error }),
    [userTags, loading, error],
  )
}
