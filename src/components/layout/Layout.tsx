import * as React from 'react';
import Container from '@mui/material/Container';
import { NavLink, Outlet } from 'react-router-dom';
import { JSX } from 'react/jsx-runtime';

import TopHeader from 'src/components/TopHeader';

const Layout = (): JSX.Element => {
  return (
    <>
      <TopHeader />
      <Container maxWidth="xl">
        {/* Used to make space under the header so the content doesn't go under it */}
        <div style={{ paddingTop: '120px' }} />
        <Outlet />
      </Container>
    </>
  );
};
export default Layout;
