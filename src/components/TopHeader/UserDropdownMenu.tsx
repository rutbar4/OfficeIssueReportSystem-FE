import React from 'react';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuItem from '@mui/material/MenuItem';
import { Box, Divider, MenuList, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import 'src/scss/DropdownMenuStyles.scss';
import { useDispatch } from 'react-redux';

import { AppRoutes } from 'src/types/routes';
import { AppDispatch } from 'src/store/store';
import { removeUser } from '../../store/slices/userSlice';
import { logOutUser } from '../../store/slices/authenticationSlice';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

type Props = {
  fullName: string;
  jobTitle: string;
  userIcon: string;
};

const UserDropdownMenu: React.FC<Props> = ({ fullName, jobTitle }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const userAvatar = useSelector((state: RootState) => state.user.user?.avatar);

  const useLogout = (e) => {
    e.preventDefault();
    dispatch(removeUser());
    dispatch(logOutUser());
    navigate(AppRoutes.SIGN_IN);
  };

  return (
    <Box className="userDropdownMenu">
      <MenuList>
        <div style={{ textAlign: 'center', paddingTop: '15px' }}>
          <img src={userAvatar} style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
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
            navigate(AppRoutes.USER_PROFILE);
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
          onClick={(e) => useLogout(e)}
        >
          <LogoutIcon
            style={{
              marginRight: '10px',
              fontSize: '25px',
              color: 'var(--primary-color)',
            }}
          />
          Logout
        </MenuItem>
      </MenuList>
    </Box>
  );
};

export default UserDropdownMenu;
