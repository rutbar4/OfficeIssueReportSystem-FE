import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import thunk from 'redux-thunk';
import user, {getUserFromLocalStorage} from './slices/userSlice'
import rootReducer from 'src/reducers/rootReducer';
import issuesReducer from '../reducers/issues/IssuesReducer';


  const store =  configureStore({
    reducer: {
      rootReducer,
      issuesReducer,
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



