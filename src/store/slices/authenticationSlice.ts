import { createSlice } from '@reduxjs/toolkit';

import {
  addToLocalStorage,
  getAuthFromLocalStorage,
  getFromLocalStorage,
  removeFromLocalStorage,
} from '../../Storage/LocalStorage';

interface initialState {
  value: boolean | null;
}

const initialState = false;

const authenticationSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    logInUser(state, { payload: loginStatus }) {
      addToLocalStorage('loginStatus', loginStatus);
      return loginStatus;
    },
    logOutUser(state) {
      removeFromLocalStorage('loginStatus');
      return initialState;
    },
  },
});

const getAuthenticationFromLocalStorage = () => getAuthFromLocalStorage('loginStatus') || initialState;

export default authenticationSlice.reducer;
export const { logInUser, logOutUser } = authenticationSlice.actions;
export { getAuthenticationFromLocalStorage };
