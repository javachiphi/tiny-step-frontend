import React, { useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { Link } from 'react-router-dom'
import { AppBar, Button, Toolbar, Box, Typography } from '@mui/material'
import MobileMenuDropDown from './mobileMenuDropDown'
import { pages } from '../../constants'
import { navBtn, navTitle } from './navigationStyles'
import { useLocation } from 'react-router-dom'
import { useUser } from '../../context/userProvider'

export default function Navigation() {
  const { isAuthenticated } = useAuth0()
  const [anchorElNav, setAnchorElNav] = useState(null)
  const { loading: userLoading } = useUser()

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  return (
    <AppBar position='static' color='primary'>
      <Toolbar>
        <Typography variant='h6' component='div' sx={navTitle}>
          TINY STEPS
        </Typography>
        {isAuthenticated ? (
          <>
            <MobileMenuDropDown
              anchorElNav={anchorElNav}
              handleCloseNavMenu={handleCloseNavMenu}
              handleOpenNavMenu={handleOpenNavMenu}
            />
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              <DesktopMenu items={pages.slice(0, 1)} />
            </Box>
            <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' } }}>
              <DesktopMenu items={pages.slice(-2)} />
              {/* <Profile /> */}
            </Box>
            <Box sx={{ flexGrow: 0 }}>
              <LogoutButton />
            </Box>
          </>
        ) : (
          <>
            <Box sx={{ flexGrow: 0 }}>
              <LoginButton />
            </Box>
            <Box sx={{ flexGrow: 0 }}>
              <SignUpButton />
            </Box>
          </>
        )}
      </Toolbar>
    </AppBar>
  )
}

const SignUpButton = () => {
  const { loginWithRedirect } = useAuth0()
  const location = useLocation()

  return (
    <Button
      sx={navBtn}
      onClick={() =>
        loginWithRedirect({
          authorizationParams: {
            screen_hint: 'signup',
          },
          state: { returnTo: location.pathname },
        })
      }
    >
      Sign Up
    </Button>
  )
}

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0()
  const location = useLocation()
  return (
    <Button
      sx={navBtn}
      onClick={() =>
        loginWithRedirect({
          state: { returnTo: location.pathname },
        })
      }
    >
      Log In
    </Button>
  )
}

const LogoutButton = () => {
  const { logout } = useAuth0()

  return (
    <Button
      sx={navBtn}
      onClick={() =>
        logout({ logoutParams: { returnTo: window.location.origin } })
      }
    >
      Log Out
    </Button>
  )
}

// const Profile = () => {
//   const { user, isLoading } = useAuth0()

//   if (isLoading) {
//     return <div>Loading ...</div>
//   }
//   console.log('user', user)
//   return <div>hello</div>
// }

function DesktopMenu({ items, handleCloseNavMenu }) {
  return (
    <>
      {items.map((page) => (
        <Button
          key={page.title}
          //   onClick={handleCloseNavMenu}
          component={Link}
          to={page.href}
          sx={navBtn}
        >
          {page.title}
        </Button>
      ))}
    </>
  )
}
