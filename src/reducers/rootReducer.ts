import { combineReducers } from 'redux';
import authReducer from './signIn/authReducer';
import { issuesReducer, openIssuesReducer, plannedIssuesReducer,
   resolvedIssuesReducer, closedIssuesReducer, userIssuesReducer } from './issues/IssuesReducer';


export default combineReducers({
  issues: issuesReducer,
  authentication: authReducer,
  openIssues: openIssuesReducer,
  plannedIssues: plannedIssuesReducer,
  resolvedIssues: resolvedIssuesReducer,
  closedIssues: closedIssuesReducer,
  userIssues: userIssuesReducer,
});
