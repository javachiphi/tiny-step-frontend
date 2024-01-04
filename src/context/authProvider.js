import { Auth0Provider } from '@auth0/auth0-react'
import { useNavigate } from 'react-router-dom'

const AuthProvider = ({ children }) => {
  const navigate = useNavigate()

  const onRedirectCallback = (appState) => {
    navigate(appState?.state?.returnTo || '/checklist')
  }

  return (
    <Auth0Provider
      domain={process.env.REACT_APP_AUTH0_DOMAIN}
      clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
      onRedirectCallback={onRedirectCallback}
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: 'https://diary/api',
        scope: 'read:current_user update:current_user_metadata',
      }}
    >
      {children}
    </Auth0Provider>
  )
}

export default AuthProvider
