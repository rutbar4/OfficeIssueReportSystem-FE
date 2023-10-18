import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';

import Layout from '../layout/Layout';

import Home from 'src/pages/Home/Home';
import { AppRoutes } from 'src/types/routes';

const TemporaryUserFrofilecomponent = () => {
  return (
    <div>
      This is the User Profile. <br />
      Change the PROFILE route to the profile page in AppRouter/AppRouter.tsx
    </div>
  );
};

// eslint-disable-next-line react/no-multi-comp
const TemporarySignInComponent = () => {
  return <div>This is the Sign In</div>;
};

const AppRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Layout />}>
      <Route path={AppRoutes.HOME} element={<Home />} />
      {/* After creating a profile page, change this to the profile page component */}
      <Route path={AppRoutes.PROFILE} element={<TemporaryUserFrofilecomponent />} />
      <Route path={AppRoutes.SIGN_IN} element={<TemporarySignInComponent />} />
    </Route>
  )
);

export default AppRouter;
