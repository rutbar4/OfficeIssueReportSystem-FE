import { SignInActionTypes } from 'src/actions/signIn/authentication';

const user = JSON.parse(localStorage.getItem('user') || 'null');

const initialState = user ? { isLoggedIn: true, user } : { isLoggedIn: false, user: null };

const authReducer = (state = initialState, action) => {

    const {type, payload} = action;

    switch(type){
        case SignInActionTypes.SIGN_IN_SUCCESS:
            return {
                ...initialState,
                isLoggedIn: true,
                user: payload.user,
            };
        case SignInActionTypes.SIGN_IN_FAIL:
        case SignInActionTypes.SIGN_OUT:
            return {
                ...initialState,
                isLoggedIn: false,
                user: null,
            };
        default:
            return state;
    }
};
export default authReducer;
