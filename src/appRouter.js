import React from 'react'
import { CircularProgress } from '@mui/joy'
import { Routes, Route } from 'react-router-dom'
import App from './App'
import ProtectedRoute from './components/protectedRoute'
const EntryForm = React.lazy(() => import('./components/entryForm'))
const ChecklistPage = React.lazy(() => import('./pages/checklistPage'))
const ReflectPage = React.lazy(() => import('./pages/reflectPage'))

const AppRouter = () => {
  return (
    <Routes>
      <Route path='/' element={<App />}>
        <Route index element={<ProtectedRoute />} />
        <Route
          path='remind'
          element={
            <ProtectedRoute>
              <React.Suspense
                fallback={
                  <CircularProgress
                    sx={{ marginTop: '30px' }}
                    color='success'
                  />
                }
              >
                <ChecklistPage />
              </React.Suspense>
            </ProtectedRoute>
          }
        />
        <Route
          path='reflect'
          element={
            <ProtectedRoute>
              <React.Suspense
                fallback={
                  <CircularProgress
                    sx={{ marginTop: '30px' }}
                    color='success'
                  />
                }
              >
                <ReflectPage />
              </React.Suspense>
            </ProtectedRoute>
          }
        />
        <Route
          path='create'
          element={
            <ProtectedRoute>
              <React.Suspense
                fallback={
                  <CircularProgress
                    sx={{ marginTop: '30px' }}
                    color='success'
                  />
                }
              >
                <EntryForm mode='create' setDataChanged={null} />
              </React.Suspense>
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  )
}

export default AppRouter
