import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import AuthProvider from './context/authProvider'
import UserProvider from './context/userProvider'
import TokenProvider from './context/tokenProvider'

import AppRouter from './appRouter'

const AppWithContext = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <TokenProvider>
          <UserProvider>
            <AppRouter />
          </UserProvider>
        </TokenProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default AppWithContext
