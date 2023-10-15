import * as React from 'react';
import Container from '@mui/material/Container';
import { NavLink, Outlet } from 'react-router-dom';
import { JSX } from 'react/jsx-runtime';

import Sidebar from '../sidebar/Sidebar';

import TopHeader from 'src/components/TopHeader';


const Layout = (): JSX.Element => {
  return (
    <>
      <TopHeader />
      <Container maxWidth="xl">
        <Sidebar/>
        <Outlet />
      </Container>
    </>
  );
};
export default Layout;
