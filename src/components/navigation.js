import React, { useState} from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import { AppBar, Button, Toolbar, Box, Typography, Menu, MenuItem, IconButton } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';

// create a list of pages so that i can map through it and create a nav bar
const pages = [
    { 
        title: "Situation",
        href: "/situation",
    },
    {
        title: "Mindfulness",
        href: "/mindfulness",
    },
    {
      title: "Reflect",
      href: "/reflect", 
    },
    { 
        title: "+ Write",
        href: "/create",    
    },
]


// error handle when no internet & cannot get jwt 
export default function Navigation() {
    const {  isAuthenticated } = useAuth0();
    const [anchorElNav, setAnchorElNav] = useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
      };
    
      const handleCloseNavMenu = () => {
        setAnchorElNav(null);
      };

    return(
        <AppBar position="static">
            <Toolbar>
            <Typography variant="h6" component="div" sx={{ fontWeight: 700 }}>
            ✅ CHECKLIST
            </Typography>
        {
            isAuthenticated ? (
            <>
            <MobileMenuDropDown 
              anchorElNav={anchorElNav} 
              handleCloseNavMenu={handleCloseNavMenu} 
              handleOpenNavMenu={handleOpenNavMenu} 
            />
             <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                <DesktopMenu items={pages.slice(0,2)}/>
             </Box>
            <Box sx={{ flexGrow: 0 , display: { xs: 'none', md: 'flex' } }}>
              <DesktopMenu items={pages.slice(-2)}/>
              {/* <Profile /> */}
            </Box>
            <Box sx={{ flexGrow: 0}}>
              <LogoutButton />
            </Box>

        </>
            ): (
                <Box sx={{flexGrow: 0}}>
                <LoginButton />
                </Box>
            )
        }
            </Toolbar>
        </AppBar>
    )
}

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return <button onClick={() => loginWithRedirect()}>Log In</button>;
};

const LogoutButton = () => {
    const { logout } = useAuth0();

    return(
        <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
            Log Out 
        </button>
    )

}

const Profile = () => {
    const { user, isLoading } = useAuth0();
    // const userProfile = useUserProfile();
  
    if (isLoading) {
        return <div>Loading ...</div>;
      }
      console.log('user', user)
    return (
        <div>
           hello
        </div>
    );
  };
  

function DesktopMenu({items, handleCloseNavMenu}){
  return(
    <>
    {items.map((page) => (
      <Button
        key={page.title}
        // onClick={handleCloseNavMenu}
        component={Link}
        to={page.href}
        sx={{ my: 2, color: 'white', display: 'block' }}
      >
        {page.title}
      </Button>
    ))}
    </>
  )
}


  function MobileMenuDropDown({handleOpenNavMenu, handleCloseNavMenu, anchorElNav}){
    return(
      <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleOpenNavMenu}
          color="inherit"
        >
          <MenuIcon />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorElNav}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          open={Boolean(anchorElNav)}
          onClose={handleCloseNavMenu}
          sx={{
            display: { xs: 'block', md: 'none' },
          }}
        >
        {
            pages.map((page) => (
                <MenuItem key={page.title} component={Link} to={page.href} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">
                        {page.title}
                    </Typography>
                </MenuItem>
            ))
        }
        </Menu>
    </Box>  
    )
  }

