import React from 'react';
import { useDispatch } from 'react-redux';
import { Navigate } from 'react-router';

import { logOutUser } from 'src/store/slices/authenticationSlice';
import { removeUser } from 'src/store/slices/userSlice';
import { AppDispatch } from 'src/store/store';
import { AppRoutes } from 'src/types/routes';

type Props = {
  isAllowed: boolean;
  children: JSX.Element;
};

const ProtectedRoute: React.FC<Props> = ({ isAllowed, children }) => {
  const dispatch = useDispatch<AppDispatch>();
  if (!isAllowed) {
    dispatch(removeUser());
    dispatch(logOutUser());
    return <Navigate to={AppRoutes.SIGN_IN} />;
  }
  return children;
};

export default ProtectedRoute;
