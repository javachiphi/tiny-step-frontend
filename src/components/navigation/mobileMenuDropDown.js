import React from "react";
import { Link } from "react-router-dom";
import { Box, Typography, Menu, MenuItem, IconButton } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { pages } from "../../constants";

export default function MobileMenuDropDown({
    handleOpenNavMenu, 
    handleCloseNavMenu, 
    anchorElNav
}){
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

