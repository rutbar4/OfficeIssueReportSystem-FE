import React from 'react';
import 'src/scss/SideBarStyles.scss';
import LogoSvg from 'public/CognizantLogo.svg';
import HomeImage from '@mui/icons-material/Home';
import ProfileImage from '@mui/icons-material/Person';
import Typography from '@mui/material/Typography';
import { useLocation, useNavigate } from 'react-router-dom';

import { AppRoutes } from 'src/types/routes';

const Sidebar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Navigation icons are only shown in these pages
  const availablePages = [AppRoutes.HOME, AppRoutes.USER_PROFILE];

  return (
    <div className="sidebar">
      {/* Logo */}
      <div
        style={{
          width: '100%',
          marginBottom: '50px',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <LogoSvg style={{ width: '40px' }} />
      </div>
      {availablePages.includes(location.pathname as AppRoutes) && (
        <div className="sidebar-content-wrapper">
          {/* <div> */}
          {/* Home Button */}
          <button
            className="Home button"
            onClick={() => {
              navigate(AppRoutes.HOME);
            }}
          >
            {location.pathname === AppRoutes.HOME ? (
              <div className="border-styles-active">
                <HomeImage
                  sx={{
                    fill: 'url(#activeColor)',
                    fontSize: '24px',
                  }}
                />
              </div>
            ) : (
              <div className="border-styles-inactive">
                <HomeImage sx={{ fontSize: '24px' }} />
              </div>
            )}

            <div className="home-text-wrapper-styles">
              <Typography className="text-styles">Home</Typography>
            </div>
          </button>

          {/* My Profile Button */}
          <button className="Profile button" onClick={() => navigate(AppRoutes.USER_PROFILE)}>
            {location.pathname === AppRoutes.USER_PROFILE ? (
              <div className="border-styles-active">
                <ProfileImage sx={{ fill: 'url(#activeColor)', fontSize: '24px' }} />
              </div>
            ) : (
              <div className="border-styles-inactive">
                <ProfileImage sx={{ fontSize: '24px' }} />
              </div>
            )}

            <div className="profile-text-wrapper-styles">
              <Typography className="text-styles">My Profile</Typography>
            </div>
          </button>
        </div>
      )}
      {/* Empty svg used to overlay a gradient color on icons */}
      <svg width={0} height={0} visibility={'none'}>
        <linearGradient id="activeColor" x1={1} y1={0} x2={1} y2={1} gradientTransform="rotate(-90)">
          <stop offset={0} stopColor="rgba(61, 84, 206, 1)" />
          <stop offset={1} stopColor="rgba(53, 202, 207, 1)" />
        </linearGradient>
      </svg>
    </div>
  );
};

export default Sidebar;
