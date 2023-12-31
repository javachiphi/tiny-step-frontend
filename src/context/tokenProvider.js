import React, { createContext, useContext, useState, useEffect } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
const TokenContext = createContext(null)

const TokenProvider = ({ children }) => {
  const [token, setToken] = useState(null)
  const { isAuthenticated } = useAuth0()

  const { getAccessTokenSilently } = useAuth0()

  useEffect(() => {
    if (!isAuthenticated) return
    const fetchToken = async () => {
      try {
        const accessToken = await getAccessTokenSilently({
          audience: `https://diary/api`,
          scope: 'read:current_user',
        })
        console.log('token provider:fetching token')
        setToken(accessToken)
      } catch (error) {
        console.error('Error fetching access token', error)
      }
    }

    fetchToken()
  }, [getAccessTokenSilently, isAuthenticated])

  const TokenContextValue = { token }

  return (
    <TokenContext.Provider value={TokenContextValue}>
      {children}
    </TokenContext.Provider>
  )
}

export const useAuthToken = () => {
  const context = useContext(TokenContext)
  if (!context) {
    throw new Error('useAuthToken must be used within an TokenProvider')
  }
  return context.token
}

export default TokenProvider
