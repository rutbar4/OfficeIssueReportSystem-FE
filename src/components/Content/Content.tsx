import {Route, Routes} from 'react-router';
import React from 'react';
import UserProfile from '../UserProfle/UserProfile';
import {AppRoutes} from '../../types/routes';
import Home from '../../pages/Home/Home';
import Login from '../form/Login';
import ProtectedRoute from '../AppRouter/protectedRoute';
import {useSelector} from 'react-redux';
import {RootState} from '../../store/store';


const Content = () => {

  const loginState = useSelector((state:RootState)=> state.authentication);

  return (
    <>
      <Routes>
        <Route path={AppRoutes.SIGN_IN} element={<Login/>}/>
        <Route path={AppRoutes.HOME}
               element={<ProtectedRoute isAllowed={loginState}>
                 <Home/>
        </ProtectedRoute>}/>
        <Route path={AppRoutes.USER_PROFILE}
               element={<ProtectedRoute isAllowed={loginState}>
                 <UserProfile/>
               </ProtectedRoute>}/>
      </Routes>
    </>

  )
}

export default Content;
