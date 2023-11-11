import { combineReducers } from 'redux';
import { issuesReducer, openIssuesReducer, plannedIssuesReducer,
   resolvedIssuesReducer, closedIssuesReducer, userIssuesReducer } from './issues/IssuesReducer';


export default combineReducers({
  issues: issuesReducer,
  openIssues: openIssuesReducer,
  plannedIssues: plannedIssuesReducer,
  resolvedIssues: resolvedIssuesReducer,
  closedIssues: closedIssuesReducer,
  userIssues: userIssuesReducer,
});
