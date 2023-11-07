import { combineReducers } from 'redux';

import issuesReducer from './issues/IssuesReducer';
import authReducer from './signIn/authReducer';
import openIssues from './issues/OpenIssuesReducer';
import plannedIssues from './issues/PlannedIssuesReducer';
import resolvedIssues from './issues/ResolvedIssuesReducer';
import closedIssues from './issues/ClosedIssuesReducer';
import userIssues from './issues/UserIssuesReducer';


export default combineReducers({
  issues: issuesReducer,
  authentication: authReducer,
  openIssues: openIssues,
  plannedIssues: plannedIssues,
  resolvedIssues: resolvedIssues,
  closedIssues: closedIssues,
  userIssues: userIssues,
});
