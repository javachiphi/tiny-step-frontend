import React from 'react'
import { LinearProgress } from '@mui/joy'
import { useAuth0 } from '@auth0/auth0-react'
import LandingPage from '../pages/landingPage'

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth0()

  if (isLoading) {
    return <LinearProgress color='success' />
  }

  if (!isAuthenticated) {
    return <LandingPage />
  }

  return children
}

export default ProtectedRoute
