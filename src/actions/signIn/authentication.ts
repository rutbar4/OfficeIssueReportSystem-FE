import login from '../../services/authService';

import { AppDispatch } from 'src/store/store';


export enum SignInActionTypes {
    SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS',
    SIGN_IN_FAIL = 'SIGN_IN_FAIL',
    SIGN_OUT = 'SIGN_OUT',
}


const getSignInAction = () => ({
    type: SignInActionTypes.SIGN_IN_FAIL,
});

const getSignInActionSuccess = (user) => ({
    type: SignInActionTypes.SIGN_IN_SUCCESS,
    payload: { user },
});

const getSignOutAction = () => ({
    type: SignInActionTypes.SIGN_OUT,
});



export const getSignIn = () => {
    return(dispatch : AppDispatch) => {
        dispatch(getSignInAction());

        login.signIn('sarunas@devbridge.com', 'password').then(async (response) => {
                const resultJson = await response;
                dispatch(getSignInActionSuccess(resultJson));
        }).catch((error) => {
            console.log(error);
            dispatch(getSignInAction());
        });
    };
};

export const getSignOut = () => {
    return(dispatch : AppDispatch) => {
        dispatch(getSignOutAction());
        try{
            localStorage.removeItem('user');
        }
        catch(error){
            console.log(error);
        }
    };
};
