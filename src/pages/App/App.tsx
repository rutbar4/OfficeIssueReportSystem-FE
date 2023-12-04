import { Provider, useDispatch } from 'react-redux';
import { Navigate, RouterProvider } from 'react-router-dom';
import { useEffect, useState } from 'react';

import store from '../../store/store';

import AppRouter from 'src/components/AppRouter/AppRouter';
import Popup from 'src/components/Popup/Popup';
import RefreshTokenApi from 'src/api/RefreshTokenApi';
import { logOutUser } from 'src/store/slices/authenticationSlice';
import { removeUser } from 'src/store/slices/userSlice';
import { AppRoutes } from 'src/types/routes';


const App = () => {
  const dispatch = useDispatch();
  const [showPopup, setShowPopup] = useState<boolean>(false);


  const refreshAccessToken = () => {
    RefreshTokenApi(dispatch);
    setShowPopup(false);
  };

  useEffect(() => {
    const checkTokenExpiration = () => {
      const jwt = store.getState().user.jwt;
      if (jwt) {
        const tokenPayload = jwt.split('.')[1];
        const decodedTokenPayload = window.atob(tokenPayload);
        const parsedTokenClaims = JSON.parse(decodedTokenPayload);
        const currentTime = Math.floor(Date.now() / 1000);
        const timeUntilExpiration = parsedTokenClaims.exp - currentTime;

        if (timeUntilExpiration === 0) {
          setShowPopup(false);
          dispatch(removeUser());
          dispatch(logOutUser());
          <Navigate to={AppRoutes.SIGN_IN}/>;
        }
        if (timeUntilExpiration <= 30) {
          setShowPopup(true);
        } else {
          setShowPopup(false);
        }
      } else {
        setShowPopup(false);
        dispatch(removeUser());
        dispatch(logOutUser());
        <Navigate to={AppRoutes.SIGN_IN}/>;
      }
    };
    const intervalId = setInterval(checkTokenExpiration, 1000);
    return () => clearInterval(intervalId);
  }, [dispatch]);

  return (
    <Provider store={store}>
      {showPopup && <Popup onContinue={refreshAccessToken}/>}
      <RouterProvider router={AppRouter()} />
    </Provider>
  );
};

export default App;
