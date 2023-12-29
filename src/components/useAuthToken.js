import { useState, useEffect } from 'react'
import { useAuth0 } from '@auth0/auth0-react'

export const useAuthToken = () => {
  const [token, setToken] = useState('')
  const { getAccessTokenSilently } = useAuth0()

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const accessToken = await getAccessTokenSilently({
          audience: `https://diary/api`,
          scope: 'read:current_user',
        })
        setToken(accessToken)
      } catch (error) {
        console.error('Error fetching access token', error)
      }
    }

    fetchToken()
  }, [getAccessTokenSilently])

  return token
}
