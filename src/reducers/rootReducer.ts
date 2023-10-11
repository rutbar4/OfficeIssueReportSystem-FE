import { combineReducers } from 'redux';

import issuesReducer from './issues/IssuesReducer';


export default combineReducers({
  issues: issuesReducer,
});
