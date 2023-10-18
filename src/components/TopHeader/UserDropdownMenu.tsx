import React from 'react';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuItem from '@mui/material/MenuItem';
import { Box, Divider, MenuList, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import 'src/scss/DropdownMenuStyles.scss';

import { AppRoutes } from 'src/types/routes';

type Props = {
  fullName: string;
  jobTitle: string;
  userIcon: string;
};

const UserDropdownMenu: React.FC<Props> = ({ fullName, jobTitle, userIcon }) => {
  const navigate = useNavigate();

  const useLogout = () => {};

  return (
    <Box className="userDropdownMenu">
      <MenuList>
        <div style={{ textAlign: 'center', paddingTop: '15px' }}>
          <img src={userIcon} style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
        </div>
        <Typography
          variant="h5"
          style={{ textAlign: 'center', paddingTop: '10px', color: 'var(--primary-color)', fontWeight: 'bold' }}
        >
          {fullName}
        </Typography>
        <Typography variant="h6" style={{ textAlign: 'center', paddingBottom: '10px', color: 'grey' }}>
          {jobTitle}
        </Typography>
        <MenuItem
          style={{
            padding: '10px',
            margin: '5px',
            borderRadius: '10px',
            fontSize: '12px',
            color: 'var(--primary-color)',
          }}
          onClick={() => {
            navigate(AppRoutes.PROFILE);
          }}
        >
          <PersonIcon
            style={{
              marginRight: '10px',
              fontSize: '25px',
              color: 'var(--primary-color)',
            }}
          />
          My Profile
        </MenuItem>
        <Divider sx={{ mr: '12px', ml: '12px' }} />
        <MenuItem
          style={{
            padding: '10px',
            margin: '5px',
            borderRadius: '10px',
            fontSize: '12px',
            color: 'var(--primary-color)',
          }}
        >
          <LogoutIcon
            style={{
              marginRight: '10px',
              fontSize: '25px',
              color: 'var(--primary-color)',
            }}
            onClick={() => useLogout}
          />
          Logout
        </MenuItem>
      </MenuList>
    </Box>
  );
};

export default UserDropdownMenu;
