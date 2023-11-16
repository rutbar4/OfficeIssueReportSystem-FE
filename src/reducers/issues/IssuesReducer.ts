import { AnyAction } from 'redux';
import * as actions from '../../actions/issues/IssuesActionType';

interface Issue {
  id: number;
  name: string;
  description: string;
  status: string;
  upvoteCount: number;
  commentCount: number;
  time: string;
}

interface IssuesState {
  loading: boolean;
  issues: Issue[];
  page: number;
}

const initialState: IssuesState = {
  loading: true,
  issues: [],
  page: 1,
};

const createIssuesReducer = (actionType: string) => (
  state = initialState,
  action: { type: string; payload: Issue[], page: number} | AnyAction
  
) => {
    switch (action.type) {
        case `${actionType}Success`:
            return {
            ...state,
            loading: false,
            issues: action.payload,
            page: action.page,
            };
        case actionType:
            return {
            ...state,
            loading: true,
            page: action.page,
            };
        default:
            return state;
    };
};

export const issuesReducer = createIssuesReducer(actions.GET_ISSUES);
export const openIssuesReducer = createIssuesReducer(actions.GET_OPEN_ISSUES);
export const plannedIssuesReducer = createIssuesReducer(actions.GET_PLANNED_ISSUES);
export const resolvedIssuesReducer = createIssuesReducer(actions.GET_RESOLVED_ISSUES);
export const closedIssuesReducer = createIssuesReducer(actions.GET_CLOSED_ISSUES);
export const userIssuesReducer = createIssuesReducer(actions.GET_USER_ISSUES);
