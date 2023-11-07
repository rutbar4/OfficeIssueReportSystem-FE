
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
  loading: boolean,
  issues: Issue[],
};

const initialState: IssuesState = {
  loading: true,
  issues: [],
};

const ClosedIssuesReducer = (state = initialState, action: { type: string, payload: Issue[] }) => {
  switch (action.type) {
    case actions.GET_CLOSED_ISSUES:
      return {
        ...state,
        loading: true,
      };
    case actions.GET_CLOSED_ISSUES_SUCCESS:
      return {
        ...state,
        loading: false,
        issues: action.payload,
      };
    default:
      return state;
  }
};

export default ClosedIssuesReducer;
