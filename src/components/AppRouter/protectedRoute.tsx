import React, { useEffect } from 'react';
import { Navigate } from 'react-router';
import { useSelector } from 'react-redux';

import { AppRoutes } from 'src/types/routes';
import store, { RootState } from 'src/store/store';


type Props = {
    isAllowed: boolean;
    children: JSX.Element;
};

const ProtectedRoute: React.FC<Props> = ( {isAllowed, children}) => {
    if(!isAllowed) {
        return <Navigate to={AppRoutes.SIGN_IN} />;
    }
    return children;
};

export default ProtectedRoute;
