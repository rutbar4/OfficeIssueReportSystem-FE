import { combineReducers } from 'redux';
import { CLEAR_ISSUES } from 'src/actions/issues/IssuesActionType';

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
  if (action.type === CLEAR_ISSUES) {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;