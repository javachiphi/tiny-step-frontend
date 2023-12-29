import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import EntryForm from './components/entryForm'
import { Auth0Provider } from '@auth0/auth0-react'
import SituationPage from './pages/situationPage'
import ReflectPage from './pages/reflectPage'
import MindFulnessPage from './pages/mindfulPage'
import { Navigate } from 'react-router-dom'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <Auth0Provider
    domain={process.env.REACT_APP_AUTH0_DOMAIN}
    clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
    authorizationParams={{
      redirect_uri: window.location.origin,
      audience: 'https://diary/api',
      scope: 'read:current_user update:current_user_metadata',
    }}
  >
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate replace to='/reflect' />} />
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
    </BrowserRouter>
  </Auth0Provider>,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
