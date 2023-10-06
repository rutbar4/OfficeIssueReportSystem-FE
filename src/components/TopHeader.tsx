import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import NotificationsIcon from '@mui/icons-material/Notifications';
//import UserMenuIcon from '@mui/icons-material/AccountCircle';

import 'src/scss/Styles.scss';

function TopBar() {
  const handleUserMenu = () => {};
  const handleNotifications = () => {};

  // Placeholder link for user picture icon, will change after handling backend
  const userIcon =
    'https://images.unsplash.com/photo-1585837146751-a44118595680?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2058&q=80';

  const iconSpacing = { marginRight: '12px' };
  const iconStyle = { fontSize: 24, color: 'var(--primary-color)' };

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: 'white',
        boxShadow: 'none',
        borderBottom: '1px solid #e5e5e5',
        height: '64px',
        marginBottom: '60px',
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <div style={{ flexGrow: 1 }} />
          <div style={iconSpacing}>
            <IconButton color="inherit" aria-label="Notifications" onClick={handleNotifications}>
              <NotificationsIcon sx={iconStyle} />
            </IconButton>
          </div>
          <div>
            <IconButton color="inherit" aria-label="User" onClick={handleUserMenu}>
              <img src={userIcon} alt="MENU" style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
            </IconButton>
            {/* <IconButton color="inherit" aria-label="Account" onClick={handleUserMenu}>
              <UserMenuIcon sx={iconStyle} />
            </IconButton> */}
          </div>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default TopBar;
