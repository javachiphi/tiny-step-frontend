import { useEffect } from 'react'
import { createData } from '../api/apiService'
import { useAuth0 } from '@auth0/auth0-react'
import { useAuthToken } from '../components/useAuthToken'

export const useVerifyUser = () => {
  const { isAuthenticated } = useAuth0()
  const jwtToken = useAuthToken()

  useEffect(() => {
    if (!jwtToken) return
    // if authenticated, then use the token to check if a user is in the database and create a user if not
    if (isAuthenticated) {
      console.log('calling?')
      createData('user', null, jwtToken)
        .then((response) => {
          console.log('response', response)
        })
        .catch((error) => {
          console.log('error', error)
        })
    }
  }, [jwtToken, isAuthenticated])
}
