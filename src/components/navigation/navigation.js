import React, { useState} from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import { AppBar, Button, Toolbar, Box, Typography, Menu, MenuItem, IconButton } from "@mui/material";
import { pages } from "../../constants";
import MobileMenuDropDown from "./mobileMenuDropDown";

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

  return <Button  sx={{ my: 2, color: 'white', display: 'block' }} onClick={() => loginWithRedirect()}>Log In</Button>;
};

const LogoutButton = () => {
    const { logout } = useAuth0();

    return(
        <Button sx={{ my: 2, color: 'white', display: 'block' }} onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
            Log Out 
        </Button>
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
        //   onClick={handleCloseNavMenu}
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
  