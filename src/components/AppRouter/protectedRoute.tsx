import React, { useEffect } from 'react';
import { Navigate } from 'react-router';
import { AppRoutes } from 'src/types/routes';
import store, { RootState } from 'src/store/store';
import { useSelector } from 'react-redux';

type Props = {
    isAllowed: boolean;
    children: JSX.Element;
};

const ProtectedRoute: React.FC<Props> = ( {isAllowed, children}) => {
    if(!isAllowed) {
        return <Navigate to={AppRoutes.SIGN_IN} />;
    }
    return children;
}

export default ProtectedRoute;