import './App.css'
import Navigation from './components/navigation/navigation'
import { Outlet } from 'react-router-dom'
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles'
import { CssVarsProvider as JoyThemeProvider } from '@mui/joy/styles'
import { muiTheme } from './styles/muiTheme'
import { joyTheme } from './styles/joyTheme'
import { useAuth0 } from '@auth0/auth0-react'
import LandingPage from './pages/landingPage'

function App() {
  const { isAuthenticated, isLoading } = useAuth0()

  if (isLoading) return <div>Loading...</div>

  return (
    <div className='App'>
      <header>
        <MuiThemeProvider theme={muiTheme}>
          <Navigation />
        </MuiThemeProvider>
      </header>
      <JoyThemeProvider theme={joyTheme}>
        <div className='App-center'>
          {isAuthenticated ? <Outlet /> : <LandingPage />}
        </div>
      </JoyThemeProvider>
    </div>
  )
}

export default App
