import React, { useState, useEffect, useMemo } from 'react'
import { fetchData } from './apiService'
import { useAuthToken } from '../components/useAuthToken'

export default function useUserTags() {
  const [userTags, setUserTags] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const jwtToken = useAuthToken()

  useEffect(() => {
    if (jwtToken) {
      fetchData('tags/users/my', jwtToken)
        .then((data) => {
          setUserTags(data)
          setLoading(false)
        })
        .catch((error) => {
          setError(error)
          setLoading(false)
        })
    }
  }, [jwtToken])

  return useMemo(
    () => ({ userTags, loading, error }),
    [userTags, loading, error],
  )
}
