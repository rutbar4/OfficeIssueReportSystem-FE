import {Route, Routes} from 'react-router';
import React from 'react';
import UserProfile from '../UserProfle/UserProfile';
import SignIn from '../../pages/SignIn/SignIn';
import {AppRoutes} from '../../types/routes';
import Home from '../../pages/Home/Home';
import Login from '../form/Login';


const Content = () => {
  return (
    <>
      <Routes>
        <Route path={AppRoutes.SIGN_IN} element={<Login/>}></Route>
        <Route path={AppRoutes.HOME} element={<Home/>}/>
        <Route path={AppRoutes.USER_PROFILE} element={<UserProfile/>}></Route>
      </Routes>
    </>

  )

}

export default Content;
