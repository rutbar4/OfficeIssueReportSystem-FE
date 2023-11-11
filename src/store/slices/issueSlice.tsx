import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { issuesReducer, openIssuesReducer, plannedIssuesReducer,
  resolvedIssuesReducer, closedIssuesReducer, userIssuesReducer } from 'src/reducers/issues/IssuesReducer';

export interface Issue {
  id: number;
  name: string;
  description: string;
  status: string;
  upvoteCount: number;
  commentCount: number;
  time: string;
}


const initialState: Issue[]  = [];

const issueSlice = createSlice(
  {
    name: 'issues',
    initialState,
    reducers:{
      getIssues(state, {payload:issues}){
        return issues;
      }
    }
  }
)

export default issueSlice.reducer;
export const {getIssues} = issueSlice.actions;
