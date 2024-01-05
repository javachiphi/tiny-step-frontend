import React, { Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import App from './App'
import ProtectedRoute from './components/protectedRoute'
const EntryForm = React.lazy(() => import('./components/entryForm'))
const ChecklistPage = React.lazy(() => import('./pages/checklistPage'))

const AppRouter = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
    <Routes>
      <Route path='/' element={<App />}>
        <Route index element={<ProtectedRoute />} />
        <Route
          path='checklist'
          element={
            <ProtectedRoute>
              <React.Suspense fallback={<div>Loading...</div>} >
              <ChecklistPage />
              </React.Suspense>
            </ProtectedRoute>
          }
        />
        <Route
          path='create'
          element={
            <ProtectedRoute>
              <React.Suspense fallback={<div>Loading...</div>} >
              <EntryForm mode='create' setDataChanged={null} />
              </React.Suspense>
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
    </Suspense>
  )
}

export default AppRouter
