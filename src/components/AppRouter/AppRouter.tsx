import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';

import Layout from '../layout/Layout';
import UserProfile from '../UserProfle/UserProfile';

import Home from 'src/pages/Home/Home';
import { AppRoutes } from 'src/types/routes';

import SignIn from 'src/pages/SignIn/SignIn'


// eslint-disable-next-line react/no-multi-comp
const TemporarySignInComponent = () => {
  return <div>This is the Sign In</div>;
};

const AppRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Layout />}>
      <Route path={AppRoutes.HOME} element={<Home />} />
      <Route path={AppRoutes.USER_PROFILE} element={<UserProfile />} />
      <Route path={AppRoutes.SIGN_IN} element={<SignIn />} />
    </Route>
  )
);

export default AppRouter;
