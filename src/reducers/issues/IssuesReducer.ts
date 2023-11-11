
import * as actions from '../../actions/issues/IssuesActionType';


interface Issue {
  id: string;
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
  loading: false,
  issues: [],
};

const issuesReducer = (state = initialState, action: { type: string, payload: Issue[] }) => {
  switch (action.type) {
    case actions.GET_ISSUES:
      return {
        ...state,
        loading: true,
      };
    case actions.GET_ISSUES_SUCCESS:
      return {
        ...state,
        loading: false,
        issues: action.payload,
      };
    default:
      return state;
  }
};

export default issuesReducer;
