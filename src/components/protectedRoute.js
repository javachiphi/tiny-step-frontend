import React from 'react'
import { LinearProgress } from '@mui/joy'
import { useAuth0 } from '@auth0/auth0-react'
import LandingPage from '../pages/landingPage'
import { useNavigate } from 'react-router-dom'

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth0()
  const navigate = useNavigate()


  if (isLoading) {
    return <LinearProgress color='success' />
  }

  if (!isAuthenticated) {
    return <LandingPage />
  } 

  return children
}

export default ProtectedRoute
