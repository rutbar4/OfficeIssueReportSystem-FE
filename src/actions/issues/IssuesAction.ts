
import * as actions from './IssuesActionType';

import  { AppDispatch } from 'src/store/store';
import Backend from 'src/api/BackendConfig/BackendConfig';
import HTTP from 'src/api';

const backendURL = Backend.backendURL;

const ActionCreator = (type, payload) => {
  return {
    type,
    payload,
  };
};

const CreateIssueAction = (actionType: string, endPoint) => {
  return (dispatch: AppDispatch) => {
   HTTP.get(backendURL + endPoint).then(async (result) => {
     const resultJson = await result.data;
     const action = ActionCreator(`${actionType}Success`, resultJson);
     dispatch(action);
   }).catch((error) => {
     console.log(error);
     const errorAction = ActionCreator(actionType, []);
     dispatch(errorAction);
   });
 };
};

export const getUserIssues = (userID) => {
  return CreateIssueAction(actions.GET_USER_ISSUES, `issue/reportedBy/${userID}`);
};

export const getClosedIssues = () => {
  return CreateIssueAction(actions.GET_CLOSED_ISSUES, 'issue/closed');
};

export const getResolvedIssues = () => {
  return CreateIssueAction(actions.GET_RESOLVED_ISSUES, 'issue/resolved');
};

export const getPlannedIssues = () => {
  return CreateIssueAction(actions.GET_PLANNED_ISSUES, 'issue/planned');
};

export const getOpenIssues = () => {
  return CreateIssueAction(actions.GET_OPEN_ISSUES, 'issue/open');
};

export const getIssues = () => {
  return CreateIssueAction(actions.GET_ISSUES, 'issue');
};
