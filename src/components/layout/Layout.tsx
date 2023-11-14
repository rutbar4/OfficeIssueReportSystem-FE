import * as React from 'react';
import Container from '@mui/material/Container';
import { NavLink, Outlet } from 'react-router-dom';
import { JSX } from 'react/jsx-runtime';
import BackgroundLogo from 'public/CognizantBackground.svg';
import { Box } from '@mui/material';

import Content from '../Content/Content';

import Sidebar from 'src/components/sidebar/Sidebar';
import TopHeader from 'src/components/TopHeader';
import BottomBar from 'src/components/BottomBar/BottomBar';

import 'src/scss/LayoutStyles.scss';

const Layout = (): JSX.Element => {
  return (
    <>
      <Box className="main-box">
        <Sidebar />
        <TopHeader />
        <Container maxWidth="xl" style={{ paddingLeft: '100px', paddingTop: '120px', paddingBottom: '30px' }}>
          <Outlet />
        </Container>
        <BackgroundLogo className="background-logo" />
      </Box>
      <BottomBar />
    </>
  );
};
export default Layout;
