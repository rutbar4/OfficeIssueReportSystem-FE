import React from 'react';
import 'src/scss/SideBarStyles.scss';
import Logo from 'public/Logo.png';
import HomeImage from 'public/HomeJ.png';
import HomeImageActive from 'public/HomePageActive.png';
import MyProfileActive from 'public/HomePageActive.png';
import ProfileImage from 'public/Profile.png';
import Typography from '@mui/material/Typography';
import { useLocation, useNavigate } from 'react-router-dom';

const Sidebar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="sidebar">
      <div className="sidebar-content-wrapper">
        {/* Logo */}
        <img src={Logo} alt="Logo" className="sidebar-logo-1" />

        {/* Home Button */}
        <button className="Home button" onClick={() => {navigate('/'); }}>

          {
          location.pathname === '/' ?
          <div className="border-styles-active">
            <img src={HomeImageActive} alt="Home" className="home-image" />
          </div>
           :
          <div className="border-styles-inactive">
            <img src={HomeImage} alt="Home" className="home-image" />
          </div>
          }

          <div className="home-text-wrapper-styles">
            <Typography className='text-styles'>Home</Typography>
          </div>

        </button>

        {/* My Profile Button */}
        <button className="Profile button" onClick={() => {navigate('/profile'); }}>

          {
          location.pathname === '/profile' ?
          <div className="border-styles-active">
            <img src={MyProfileActive} alt="Profile" className="profile-image" />
          </div>
           :
          <div className="border-styles-inactive">
            <img src={ProfileImage} alt="Profile" className="profile-image" />
          </div>
          }

          <div className="profile-text-wrapper-styles">
            <Typography className='text-styles'>My Profile</Typography>
          </div>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
