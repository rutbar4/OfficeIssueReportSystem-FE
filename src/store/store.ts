import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import thunk from 'redux-thunk';
import user, {getUserFromLocalStorage} from './slices/userSlice';
import issues from './slices/issueSlice';
import rootReducer from 'src/reducers/rootReducer';
import { issuesReducer, openIssuesReducer, plannedIssuesReducer,
  resolvedIssuesReducer, closedIssuesReducer, userIssuesReducer } from 'src/reducers/issues/IssuesReducer';
import authentication, {getAuthenticationFromLocalStorage} from './slices/authenticationSlice';

  const store =  configureStore({
    reducer: {
      rootReducer,
      authentication,
      issues,
      user,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),

    preloadedState:{
      user: getUserFromLocalStorage(),
      authentication : getAuthenticationFromLocalStorage(),
    }
  });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = () =>
  useDispatch<AppDispatch>();

export default store;



