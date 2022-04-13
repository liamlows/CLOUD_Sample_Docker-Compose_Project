import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import './NavBar.css';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { UserContext } from '../userContext';

const pages = [
  { display: "Dashboard", path: "/dashboard" },
  { display: "Feed", path: "/feed" },
  { display: "My Farm", path: "/myfarm" },
];

const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

export const NavBar = () => {

  const userContext = React.useContext(UserContext);
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);


  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const logout = () => {
    userContext.setUserData({});
    navigate("/");
  }
  console.log(userContext.userData)
  return (
    <nav className="navbar">
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
            >
              <NavLink to="/"> Farm Finders </NavLink>
            </Typography>

            {/* Hamburger menu */}
            {
              userContext.userData?.userId &&  <>
                <IconButton sx={{display: { xs: 'flex', md: 'none' }}}
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>

                {/* Mobile menu pages */}
                <Box sx={{ flexGrow: { xs: 0, md: 1 }, display: { xs: 'flex', md: 'none' }, background: "black" }}>
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
                    {/* Mobile pages */}
                    {pages.map((page, index) => (
                      <MenuItem key={index} onClick={handleCloseNavMenu}>
                        <Typography textAlign="center" color={"black"}> <Link to={page.path} style={{ color: "black" }}>{page.display}</Link></Typography>
                      </MenuItem>
                    ))}
                  </Menu>
                </Box>
              </>
            }
            {/* Mobile icon center piece */}
            <Typography
              variant="h6"
              noWrap
              component="span"
              sx={{ flexGrow: 1, mr: 2, display: { xs: 'flex', md: 'none' } }}
            >
              <NavLink to="/"> Farm Finders </NavLink>
            </Typography>

            {/* desktop page links */}
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              { userContext.userData?.userId && pages.map((page, index) => (
                <NavLink key={index} to={page.path} >
                  <Button

                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: 'inherit', display: 'block' }}
                  >
                    {page.display}
                  </Button>
                </NavLink>
              ))}
            </Box>

            {/* Profile icon menu */}
            {
              userContext.userData?.userId ?
                <Box sx={{ flexGrow: 0 }}>
                  <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar alt={userContext.userData?.userName} src="/static/images/avatar/2.jpg" />
                    </IconButton>
                  </Tooltip>
                  <Menu
                    sx={{ mt: '45px' }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    {/* {settings.map((setting) => (
                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                  ))} */}
                    <MenuItem onClick={() => { handleCloseUserMenu(); logout(); }}>
                      <Typography textAlign="center">logout</Typography>
                    </MenuItem>
                  </Menu>
                </Box>
                :
                <Link to={'/login'}>
                  <Button variant="contained" color="success" >
                    <Typography textAlign="center">login</Typography>
                  </Button>
                </Link>
            }
          </Toolbar>
        </Container>
      </AppBar>
    </nav>
  );
};

