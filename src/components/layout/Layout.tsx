import * as React from 'react';
import Container from '@mui/material/Container';
import { NavLink, Outlet } from 'react-router-dom';
import { JSX } from 'react/jsx-runtime';

import Sidebar from 'src/components/sidebar/Sidebar';
import TopHeader from 'src/components/TopHeader';


const Layout = (): JSX.Element => {
  return (
    <>
      <Sidebar/>
      <TopHeader />
      <Container maxWidth="xl">
        {/* Empty space under the top header so the content doesn't go under it instantly*/}
        <div style={{ paddingTop: '120px' }} />
        <Sidebar/>
        <Outlet />
      </Container>
    </>
  );
};
export default Layout;
