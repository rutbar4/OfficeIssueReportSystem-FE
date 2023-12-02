import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import LocalPoliceIcon from '@mui/icons-material/LocalPolice';
import 'src/scss/styles.scss';
import { useSelector } from 'react-redux';

import UserDropdownMenu from 'src/components/TopHeader/UserDropdownMenu';
import { RootState } from 'src/store/store';
import { COLORS } from 'src/values/colors.js';

function TopHeader() {
  // This file should be moved to TopHeader folder

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleUserMenu = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const userAvatar = useSelector((state: RootState) => state.user.user?.avatar);
  const fullName = useSelector((state: RootState) => state.user.user?.fullName) || 'null';
  const jobTitle = useSelector((state: RootState) => state.user.user?.position) || 'null';
  const userRole = useSelector((state: RootState) => state.user.user?.roles[0]);

  const today = new Date();
  const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const currentDay = weekdays[today.getDay()];

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
          <div style={{ marginRight: '18px' }}>
            <div style={{ color: COLORS.lighterGray, fontSize: '12px', textAlign: 'center' }}>
              <span style={{ fontWeight: 'bold' }}>{currentDay}</span>
              <br />
              {today.toLocaleDateString('lt-LT')}
            </div>
          </div>
          {String(userRole) === 'ADMIN' && (
            <div style={{ marginRight: '8px' }}>
              <div
                style={{
                  display: 'flex',
                  color: COLORS.blue,
                  border: '1px solid ' + COLORS.blue,
                  borderRadius: '20px',
                  padding: '5px',
                  fontSize: '11px',
                  alignItems: 'center',
                }}
              >
                <LocalPoliceIcon style={{ paddingRight: '4px' }} />
                Coordinator
              </div>
            </div>
          )}

          <div ref={menuRef}>
            <IconButton color="inherit" aria-label="User" onClick={toggleUserMenu}>
              <img
                src={userAvatar}
                alt="MENU"
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                }}
              />
            </IconButton>
            <div>
              {isDropdownOpen && (
                <UserDropdownMenu
                  fullName={fullName}
                  jobTitle={jobTitle}
                  userAvatar={userAvatar ? userAvatar : ''}
                  setIsDropdownOpen={setIsDropdownOpen}
                />
              )}
            </div>
          </div>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default TopHeader;
