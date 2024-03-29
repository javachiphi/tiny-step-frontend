import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useRef,
} from 'react'
import { createData } from '../api/apiService'
import { useAuth0 } from '@auth0/auth0-react'
import { useAuthToken } from './tokenProvider'
import throttle from 'lodash/throttle'

const UserContext = createContext(null)

const UserProvider = ({ children }) => {
  const { isAuthenticated } = useAuth0()
  const jwtToken = useAuthToken()
  const [isUserVerified, setIsUserVerified] = useState(false)
  const [isNewUser, setIsNewUser] = useState(false)
  const [loading, setLoading] = useState(true)
  const [retryCount, setRetryCount] = useState(0)
  const [error, setError] = useState(null)
  const maxRetries = 3
  const initialDelay = 2000

  const verifyUserRef = useRef()

  const verifyUser = async () => {
    if (!jwtToken || !isAuthenticated || isUserVerified) return
    setLoading(true)
    setError(null)
    try {
      const data = await createData('user', null, jwtToken)
      setIsNewUser(data && data.isNewUser)
      setIsUserVerified(true)
    } catch (error) {
      setError(error)
      if (retryCount < maxRetries) {
        setTimeout(
          () => setRetryCount(retryCount + 1),
          initialDelay * Math.pow(2, retryCount),
        )
      }
    } finally {
      setLoading(false)
    }
  }

  const resetUserState = () => {
    console.log('resetting')
    setIsUserVerified(false)
    setLoading(false)
    // Any other state resets you need
  }

  useEffect(() => {
    const throttledVerifyUser = throttle(verifyUser, 10000)
    verifyUserRef.current = throttledVerifyUser

    return () => throttledVerifyUser.cancel()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jwtToken, isAuthenticated, isUserVerified, retryCount])

  useEffect(() => {
    // Call the throttled function
    if (verifyUserRef.current) {
      verifyUserRef.current()
    }
  }, [jwtToken, isAuthenticated, isUserVerified, retryCount])

  const contextValue = {
    isUserVerified,
    error,
    retryCount,
    isNewUser,
    loading,
    resetUserState,
  }

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  )
}

export const useUser = () => useContext(UserContext)

export default UserProvider
