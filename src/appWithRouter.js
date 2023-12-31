import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import EntryForm from './components/entryForm'
import SituationPage from './pages/situationPage'
import ReflectPage from './pages/reflectPage'
import MindFulnessPage from './pages/mindfulPage'
import App from './App'
import AuthProvider from './context/authProvider'
import UserProvider from './context/userProvider'

const AppWithRouter = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <UserProvider>
          <Routes>
            <Route path='/' element={<App />}>
              <Route path='reflect' index element={<ReflectPage />} />
              <Route path='mindfulness' element={<MindFulnessPage />} />
              <Route path='situation' element={<SituationPage />} />
              {/* <Route path="onboarding" element={<TagVault />} /> */}
              <Route
                path='create'
                element={<EntryForm mode='create' setDataChanged={null} />}
              />
              <Route path='*' element={'Nothing here!'} />
            </Route>
          </Routes>
        </UserProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default AppWithRouter
