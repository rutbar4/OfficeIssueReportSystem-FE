import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import thunk from 'redux-thunk';
import user, {getUserFromLocalStorage} from './slices/userSlice'
import issues from './slices/issueSlice'

  const store =  configureStore({
    reducer: {
      issues,
      user
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),

    preloadedState:{
      user: getUserFromLocalStorage()
    }
  });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = () =>
  useDispatch<AppDispatch>();

export default store;



