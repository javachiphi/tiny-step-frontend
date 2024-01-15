import React, { createContext, useState, useContext } from 'react'

const SnackbarContext = createContext()

const SnackbarProvider = ({ children }) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false)

  const showSnackbar = () => {
    setSnackbarOpen(true)
  }

  const hideSnackbar = () => {
    setSnackbarOpen(false)
  }

  const contextValue = {
    snackbarOpen,
    showSnackbar,
    hideSnackbar,
  }

  return (
    <SnackbarContext.Provider value={contextValue}>
      {children}
    </SnackbarContext.Provider>
  )
}

export const useSnackbar = () => useContext(SnackbarContext)

export default SnackbarProvider
