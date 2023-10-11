
import axios from 'axios';

import * as actions from './IssuesActionType';

import { AppDispatch } from 'src/store/store';

const getIssuesAction = () => ({
  type: actions.GET_ISSUES,
});

const getIssuesSuccessAction = (issues) => ({
  type: actions.GET_ISSUES_SUCCESS,
  payload: issues,
});

export const getIssues = () => {
  return (dispatch: AppDispatch) => {
     dispatch(getIssuesAction());
    axios.get('http://localhost:8080/issue').then(async (result) => {
      const resultJson = await result.data;
      dispatch(getIssuesSuccessAction(resultJson));
    });
  };
};

