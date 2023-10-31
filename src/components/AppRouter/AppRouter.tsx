import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import Layout from '../layout/Layout';
import UserProfile from '../UserProfle/UserProfile';
import Home from 'src/pages/Home/Home';
import { AppRoutes } from 'src/types/routes';
import SignIn from 'src/pages/SignIn/SignIn'
import ProtectedRoute from './protectedRoute';
import { RootState } from 'src/store/store';
import { useSelector } from 'react-redux';

const AppRouter = () =>{  
  const state = useSelector((state : RootState) => state.authentication);
  return createBrowserRouter(
  createRoutesFromElements(
    
    <Route element={<Layout />}>
        <Route path={AppRoutes.HOME} element={
          <ProtectedRoute isAllowed={state.isLoggedIn}>
            <Home />
         </ProtectedRoute>
        } />
        <Route path={AppRoutes.USER_PROFILE} element={
          <ProtectedRoute isAllowed={state.isLoggedIn}>
            <UserProfile />
         </ProtectedRoute>
        } />
      <Route path={AppRoutes.SIGN_IN} element={<SignIn />} />
    </Route>
  )
);
      } 

export default AppRouter;
