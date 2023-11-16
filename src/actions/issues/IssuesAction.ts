
import axios, { AxiosResponse } from 'axios';
import * as actions from './IssuesActionType';
import { AppDispatch } from 'src/store/store';

import Backend from 'src/api/BackendConfig/BackendConfig'
const backendURL = Backend.backendURL;

const ActionCreator = (type, payload) => {
  return {
    type,
    payload,
  };
}

const CreateIssueAction = (actionType: string, endPoint, page: number) => {
  return (dispatch: AppDispatch) => {
   axios.get(backendURL+ endPoint, {params:{ page: page} }).then(async (result) => {
     const resultJson = await result.data;
     const action = ActionCreator(`${actionType}Success`, resultJson);
     dispatch(action);
   }).catch((error) => {
     console.log(error);
     const errorAction = ActionCreator(actionType, [])
     dispatch(errorAction);
   });
 };
};

export const getUserIssues = (userID) => {
  return CreateIssueAction(actions.GET_USER_ISSUES, `issue/reportedBy/${userID}`,1);
}

export const getClosedIssues = () => {
  return CreateIssueAction(actions.GET_CLOSED_ISSUES, `issue/closed`,1);
}

export const getResolvedIssues = () => {
  return CreateIssueAction(actions.GET_RESOLVED_ISSUES, `issue/resolved`,1);
}

export const getPlannedIssues = () => {
  return CreateIssueAction(actions.GET_PLANNED_ISSUES, `issue/planned`,1);
}

export const getOpenIssues = () => {
  return CreateIssueAction(actions.GET_OPEN_ISSUES, `issue/open`,1);
}

export const getIssues = (page) => {
  return CreateIssueAction(actions.GET_ISSUES, `issue`, page);
}
