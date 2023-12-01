import { createBrowserRouter, createRoutesFromElements, Route, Routes } from 'react-router-dom';
import Layout from '../layout/Layout';
import UserProfile from '../UserProfle/UserProfile';
import Home from 'src/pages/Home/Home';
import { AppRoutes } from 'src/types/routes';
import SignIn from 'src/pages/Login/Login';
import ProtectedRoute from './protectedRoute';
import { RootState } from 'src/store/store';
import { useSelector } from 'react-redux';
import Page404 from 'src/pages/404/404Page';

const AppRouter = () => {
  const loginState = useSelector((state: RootState) => state.authentication);
  return createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route element={<Layout />}>
          <Route
            path={AppRoutes.HOME}
            element={
              <ProtectedRoute isAllowed={loginState}>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path={AppRoutes.USER_PROFILE}
            element={
              <ProtectedRoute isAllowed={loginState}>
                <UserProfile />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route path={AppRoutes.SIGN_IN} element={<SignIn />} />
        <Route path={AppRoutes.PAGE404} element={<Page404/>} />
      </Route>
    )
  );
};

export default AppRouter;
