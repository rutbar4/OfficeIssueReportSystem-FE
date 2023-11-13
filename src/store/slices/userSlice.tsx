import {createSlice} from '@reduxjs/toolkit';

import {addToLocalStorage, getFromLocalStorage, removeFromLocalStorage} from '../../Storage/LocalStorage';

interface role {
  value:string  | null;
}

interface countryData {
  id:string;
  name:string
}

interface officeData {
  id:string;
  name:string;
}

interface addressData {
  street:string;
  city:string;
  state:string;
  postcode: string;
}

interface userData {
  id:string;
  fullName:string;
  email:string;
  position:string;
  roles: role[];
  address:addressData;
  country:countryData;
  office:officeData;
  }

export interface User {
  user: userData | null;
  jwtToken : string | null;
}

const initialState : User ={
  user:null ,
  jwtToken:null,
};

const userSlice = createSlice(
  {
    name: 'user',
    initialState,
    reducers: {
      addUser(state, {payload: user}) {
        addToLocalStorage('user', user);
        return user;
      },
      removeUser(state, action) {
        removeFromLocalStorage('user');
        return initialState;
      }
    }
  }
);

const getUserFromLocalStorage =()=> getFromLocalStorage('user') || initialState;



export default userSlice.reducer;
export const {addUser, removeUser} = userSlice.actions;
export {getUserFromLocalStorage};
