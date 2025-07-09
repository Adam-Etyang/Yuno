import React, { useState } from 'react';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Box,
  Avatar,
  Chip
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard,
  Event,
  CalendarToday,
  Analytics,
  Person,
  ExitToApp
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { currentUser, logout, isAdmin, isFaculty } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [anchorEl, setAnchorEl] = useState(null);
  
  const isLandingPage = location.pathname === '/';

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
    handleClose();
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'admin': return 'error';
      case 'faculty': return 'warning';
      case 'student': return 'info';
      default: return 'default';
    }
  };

  const getRoleLabel = (role) => {
    switch (role) {
      case 'admin': return 'Admin';
      case 'faculty': return 'Faculty';
      case 'student': return 'Student';
      default: return 'User';
    }
  };

  if (!currentUser) {
    return (
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component={RouterLink} to="/" sx={{ 
            flexGrow: 1, 
            textDecoration: 'none', 
            color: 'inherit',
            fontSize: '1.5rem',
            fontWeight: 'bold',
            textShadow: '0 0 10px rgba(0, 255, 136, 0.6)',
          }}>
            Yuno
          </Typography>
          
          {isLandingPage && (
            <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2, mr: 2 }}>
              <Button color="inherit" component={RouterLink} to="#about">
                About
              </Button>
              <Button color="inherit" component={RouterLink} to="#events">
                Events
              </Button>
              <Button color="inherit" component={RouterLink} to="#schedule">
                Schedule
              </Button>
              <Button color="inherit" component={RouterLink} to="#explore">
                Explore
              </Button>
            </Box>
          )}
          
          <Button color="inherit" component={RouterLink} to="/login">
            Login
          </Button>
          <Button color="inherit" component={RouterLink} to="/signup">
            Sign Up
          </Button>
        </Toolbar>
      </AppBar>
    );
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component={RouterLink} to="/dashboard" sx={{ 
          flexGrow: 1, 
          textDecoration: 'none', 
          color: 'inherit' 
        }}>
          Yuno
        </Typography>

        {/* Desktop Navigation */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 2 }}>
          <Button 
            color="inherit" 
            component={RouterLink} 
            to="/dashboard"
            startIcon={<Dashboard />}
          >
            Dashboard
          </Button>
          <Button 
            color="inherit" 
            component={RouterLink} 
            to="/events"
            startIcon={<Event />}
          >
            Events
          </Button>
          <Button 
            color="inherit" 
            component={RouterLink} 
            to="/calendar"
            startIcon={<CalendarToday />}
          >
            Calendar
          </Button>
          {(isFaculty() || isAdmin()) && (
            <Button 
              color="inherit" 
              component={RouterLink} 
              to="/create-event"
              startIcon={<Event />}
            >
              Create Event
            </Button>
          )}
          {isAdmin() && (
            <Button 
              color="inherit" 
              component={RouterLink} 
              to="/analytics"
              startIcon={<Analytics />}
            >
              Analytics
            </Button>
          )}
        </Box>

        {/* User Menu */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, ml: 2 }}>
          <Chip 
            label={getRoleLabel(currentUser.role)}
            color={getRoleColor(currentUser.role)}
            size="small"
          />
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <Avatar sx={{ width: 32, height: 32 }}>
              {currentUser.name?.charAt(0) || 'U'}
            </Avatar>
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={() => { navigate('/profile'); handleClose(); }}>
              <Person sx={{ mr: 1 }} />
              Profile
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              <ExitToApp sx={{ mr: 1 }} />
              Logout
            </MenuItem>
          </Menu>
        </Box>

        {/* Mobile Menu */}
        <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
          <IconButton
            size="large"
            aria-label="menu"
            aria-controls="mobile-menu"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="mobile-menu"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={() => { navigate('/dashboard'); handleClose(); }}>
              <Dashboard sx={{ mr: 1 }} />
              Dashboard
            </MenuItem>
            <MenuItem onClick={() => { navigate('/events'); handleClose(); }}>
              <Event sx={{ mr: 1 }} />
              Events
            </MenuItem>
            <MenuItem onClick={() => { navigate('/calendar'); handleClose(); }}>
              <CalendarToday sx={{ mr: 1 }} />
              Calendar
            </MenuItem>
            {(isFaculty() || isAdmin()) && (
              <MenuItem onClick={() => { navigate('/create-event'); handleClose(); }}>
                <Event sx={{ mr: 1 }} />
                Create Event
              </MenuItem>
            )}
            {isAdmin() && (
              <MenuItem onClick={() => { navigate('/analytics'); handleClose(); }}>
                <Analytics sx={{ mr: 1 }} />
                Analytics
              </MenuItem>
            )}
            <MenuItem onClick={() => { navigate('/profile'); handleClose(); }}>
              <Person sx={{ mr: 1 }} />
              Profile
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              <ExitToApp sx={{ mr: 1 }} />
              Logout
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar; 