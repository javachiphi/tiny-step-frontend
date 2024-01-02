import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import EntryForm from './components/entryForm'
import ChecklistPage from './pages/checklistPage'
import ReflectPage from './pages/reflectPage'
import App from './App'
import AuthProvider from './context/authProvider'
import UserProvider from './context/userProvider'
import TokenProvider from './context/tokenProvider'
import { Outlet } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import LandingPage from './pages/landingPage'

const AppWithRouter = () => {
  const ProtectedRoute = () => {
    const { isAuthenticated } = useAuth0()

    return isAuthenticated ? <Outlet /> : <LandingPage />
  }

  return (
    <BrowserRouter>
      <AuthProvider>
        <TokenProvider>
          <UserProvider>
            <Routes>
              <Route path='/' element={<App />}>
                <Route element={<ProtectedRoute />}>
                  <Route path='reflect' index element={<ReflectPage />} />
                  <Route path='checklist' element={<ChecklistPage />} />
                  {/* <Route path="onboarding" element={<TagVault />} /> */}
                  <Route
                    path='create'
                    element={<EntryForm mode='create' setDataChanged={null} />}
                  />
                  <Route path='*' element={'Nothing here!'} />
                </Route>
              </Route>
            </Routes>
          </UserProvider>
        </TokenProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default AppWithRouter
