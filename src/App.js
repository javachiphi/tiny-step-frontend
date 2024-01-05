import React from 'react'
import './App.css'
import Navigation from './components/navigation/navigation'
import { Outlet } from 'react-router-dom'
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles'
import { CssVarsProvider as JoyThemeProvider } from '@mui/joy/styles'
import { muiTheme } from './styles/muiTheme'
import { joyTheme } from './styles/joyTheme'

function App() {
  return (
    <div className='App'>
      <header>
        <MuiThemeProvider theme={muiTheme}>
          <Navigation />
        </MuiThemeProvider>
      </header>
      <JoyThemeProvider theme={joyTheme}>
        <div className='App-center'>
          <Outlet />
        </div>
      </JoyThemeProvider>
    </div>
  )
}

export default App
