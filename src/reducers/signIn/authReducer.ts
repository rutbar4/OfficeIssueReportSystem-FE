import { SignInActionTypes } from 'src/actions/signIn/authentication';

const user = JSON.parse(localStorage.getItem("user") || "null");

const initialState = user ? { isLoggedIn: true, user } : { isLoggedIn: false, user: null };

const authReducer = (state, action) => {
    state = initialState;
    const {type, payload} = action;

    switch(type){
        case SignInActionTypes.SIGN_IN_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                user: payload.user,
            };
        case SignInActionTypes.SIGN_IN_FAIL:
            return {
                ...state,
                isLoggedIn: false,
                user: null,
            };
        default:
            return state;
    }
}
export default authReducer;