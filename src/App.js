import './App.css'
import Navigation from './components/navigation/navigation'
import { Outlet } from 'react-router-dom'
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles'
import { CssVarsProvider as JoyThemeProvider } from '@mui/joy/styles'
import { muiTheme } from './styles/muiTheme'
import { joyTheme } from './styles/joyTheme'
import { useAuth0 } from '@auth0/auth0-react'
import LandingPage from './pages/landingPage'
import { LinearProgress } from '@mui/joy'

function App() {
  const { isAuthenticated, isLoading } = useAuth0()

  return (
    <div className='App'>
      <header>
        <MuiThemeProvider theme={muiTheme}>
          <Navigation />
        </MuiThemeProvider>
        {isLoading && <LinearProgress color='success' />}
      </header>
      <JoyThemeProvider theme={joyTheme}>
        <div className='App-center'>
          {!isLoading && !isAuthenticated ? <LandingPage /> : <Outlet />}
        </div>
      </JoyThemeProvider>
    </div>
  )
}

export default App
