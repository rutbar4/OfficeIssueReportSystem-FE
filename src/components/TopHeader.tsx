import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import NotificationsIcon from '@mui/icons-material/Notifications';

import 'src/scss/styles.scss';

import UserDropdownMenu from 'src/components/TopHeader/UserDropdownMenu';

function TopHeader() {
  // This file should be moved to TopHeader folder
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleNotifications = () => {};

  const toggleUserMenu = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Placeholder link for user icon, will change after handling backend
  const userIcon =
    'https://images.unsplash.com/photo-1585837146751-a44118595680?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2058&q=80';

  // Placeholder name for the user, will change after handling backend
  const fullName = 'Diana Pavardienė';

  // Placeholder job title for the user, will change after handling backend
  const jobTitle = 'Office Manager';

  // Function to close user's menu when clicked outside
  const menuRef = useRef(null);

  const useClickOutside = (ref) => {
    const handleClick = (e) => {
      if (isDropdownOpen && !ref.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };

    useEffect(() => {
      document.addEventListener('mousedown', handleClick);
      return () => {
        document.removeEventListener('mousedown', handleClick);
      };
    });
  };

  useClickOutside(menuRef);

  const iconSpacing = { marginRight: '12px' };
  const iconStyle = { fontSize: 24, color: 'var(--primary-color)' };

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: 'white',
        boxShadow: 'none',
        borderBottom: '1px solid #e5e5e5',
        height: '64px',
        marginBottom: '60px',
        zIndex: 1,
        display: 'inline-block',
      }}
    >
      <Container maxWidth={false}>
        <Toolbar disableGutters sx={{ paddingLeft: '130px', paddingRight: '70px' }}>
          <div style={{ flexGrow: 1 }} />
          <div style={iconSpacing}>
            <IconButton color="inherit" aria-label="Notifications" onClick={handleNotifications}>
              <NotificationsIcon sx={iconStyle} />
            </IconButton>
          </div>
          <div ref={menuRef}>
            <IconButton color="inherit" aria-label="User" onClick={toggleUserMenu}>
              <img src={userIcon} alt="MENU" style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
            </IconButton>
            <div>
              {isDropdownOpen && <UserDropdownMenu fullName={fullName} jobTitle={jobTitle} userIcon={userIcon} />}
            </div>
          </div>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default TopHeader;
