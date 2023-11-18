import {User} from '../store/slices/userSlice';

const addToLocalStorage =(key, value)=> localStorage.setItem(key, JSON.stringify(value));
const getFromLocalStorage =(key):User | null =>  {
  const local = localStorage.getItem(key);
  if (local!== null){
    return JSON.parse(local);
    }
  return null;
  };

const getAuthFromLocalStorage =(key):boolean | null =>  {
  const local = localStorage.getItem(key);
  if (local!== null){
    return JSON.parse(local);
  }
  return null;
};

const  removeFromLocalStorage =(key)=> localStorage.removeItem(key);

export{addToLocalStorage, getFromLocalStorage, removeFromLocalStorage, getAuthFromLocalStorage};
