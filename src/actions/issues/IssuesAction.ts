
import * as actions from './IssuesActionType';

import  { AppDispatch } from 'src/store/store';
import Backend from 'src/api/BackendConfig/BackendConfig';
import HTTP from 'src/api';
import { Issue } from 'src/reducers/issues/IssuesReducer';


const backendURL = Backend.backendURL;

const ActionCreator = (type, payload, page) => {
  return {
    type,
    payload,
    page,
  };
};

const CreateIssueAction = (actionType: string, endPoint, page: number) => {
  return (dispatch: AppDispatch) => {
   HTTP.get( endPoint, {params:{ page: page} }).then(async (result) => {
     const resultJson = await result.data;
     const action = ActionCreator(`${actionType}Success`, resultJson, page);
     dispatch(action);
   }).catch((error) => {
     console.log(error);
     const errorAction = ActionCreator(actionType, [], page);
     dispatch(errorAction);
   });
 };
};


export const getUserIssues = (userID, page) => {
  return CreateIssueAction(actions.GET_USER_ISSUES, `issue/reportedBy/${userID}`, page);
};

export const getClosedIssues = (page) => {
  return CreateIssueAction(actions.GET_CLOSED_ISSUES, 'issue/closed', page);
};

export const getResolvedIssues = (page) => {
  return CreateIssueAction(actions.GET_RESOLVED_ISSUES, 'issue/resolved', page);
};

export const getPlannedIssues = (page) => {
  return CreateIssueAction(actions.GET_PLANNED_ISSUES, 'issue/planned', page);
};

export const getOpenIssues = (page) => {
  return CreateIssueAction(actions.GET_OPEN_ISSUES, 'issue/open', page);
};

export const getIssues = (page) => {
  return CreateIssueAction(actions.GET_ISSUES, 'issue', page);
};

export const addCommentToIssue = (issueId: string, updatedIssue: Issue) => {
  return {
    type: actions.ADD_COMMENT_TO_ISSUE,
    payload: {issueId, updatedIssue}
  };
};

