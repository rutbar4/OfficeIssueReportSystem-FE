import { combineReducers } from 'redux';
import {logOutUser} from 'src/store/slices/authenticationSlice';
import { issuesReducer, openIssuesReducer, plannedIssuesReducer,
   resolvedIssuesReducer, closedIssuesReducer, userIssuesReducer } from './issues/IssuesReducer';

const appReducer = combineReducers({
  issues: issuesReducer,
  openIssues: openIssuesReducer,
  plannedIssues: plannedIssuesReducer,
  resolvedIssues: resolvedIssuesReducer,
  closedIssues: closedIssuesReducer,
  userIssues: userIssuesReducer,
});

const rootReducer = (state, action) => {
  if (action.type === logOutUser.type) {
    state = undefined;
  }
  
  return appReducer(state, action);
};

export default rootReducer;