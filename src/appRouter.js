import React from 'react'
import { Routes, Route } from 'react-router-dom'
import App from './App'
import ProtectedRoute from './components/protectedRoute'
import EntryForm from './components/entryForm'
import ChecklistPage from './pages/checklistPage'

const AppRouter = () => {
  return (
    <Routes>
      <Route path='/' element={<App />}>
        <Route index element={<ProtectedRoute />} />
        <Route
          path='checklist'
          element={
            <ProtectedRoute>
              <ChecklistPage />
            </ProtectedRoute>
          }
        />
        <Route
          path='create'
          element={
            <ProtectedRoute>
              <EntryForm mode='create' setDataChanged={null} />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  )
}

export default AppRouter
