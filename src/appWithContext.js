import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import AuthProvider from './context/authProvider'
import UserProvider from './context/userProvider'
import TokenProvider from './context/tokenProvider'
import SnackbarProvider from './context/snackbarProvider'

import AppRouter from './appRouter'

const AppWithContext = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <TokenProvider>
          <UserProvider>
            <SnackbarProvider>
              <AppRouter />
            </SnackbarProvider>
          </UserProvider>
        </TokenProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default AppWithContext
