import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import NotificationsIcon from '@mui/icons-material/Notifications';

import 'src/scss/styles.scss';

import UserDropdownMenu from 'src/components/TopHeader/UserDropdownMenu';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store/store';

function TopHeader() {
  // This file should be moved to TopHeader folder
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleNotifications = () => {};

  const toggleUserMenu = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const userAvatar = useSelector((state: RootState) => state.user.user?.avatar);
  const fullName = useSelector((state: RootState) => state.user.user?.fullName) || 'null';
  const jobTitle = useSelector((state: RootState) => state.user.user?.position) || 'null';

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
        <Toolbar disableGutters sx={{ paddingLeft: '130px', paddingRight: '70px', float: 'right' }}>
          {/* <div style={{ flexGrow: 1 }} /> */}
          <div style={iconSpacing}>
            <IconButton color="inherit" aria-label="Notifications" onClick={handleNotifications}>
              <NotificationsIcon sx={iconStyle} />
            </IconButton>
          </div>
          <div ref={menuRef}>
            <IconButton color="inherit" aria-label="User" onClick={toggleUserMenu}>
              <img src={userAvatar} alt="MENU" style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
            </IconButton>
            <div>
              {isDropdownOpen && (
                <UserDropdownMenu fullName={fullName} jobTitle={jobTitle} userAvatar={userAvatar ? userAvatar : ''} setIsDropdownOpen={setIsDropdownOpen} />
              )}
            </div>
          </div>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default TopHeader;
