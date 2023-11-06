import { combineReducers } from 'redux';

import issuesReducer from './issues/IssuesReducer';
import authReducer from './signIn/authReducer';


export default combineReducers({
  issues: issuesReducer,
  authentication: authReducer,
});
