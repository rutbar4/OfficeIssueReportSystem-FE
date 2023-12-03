import * as actions from './IssuesActionType';

import { AppDispatch } from 'src/store/store';
import Backend from 'src/api/BackendConfig/BackendConfig';
import HTTP from 'src/api';
import { Issue } from 'src/reducers/issues/IssuesReducer';
import { UUID } from 'crypto';
import { off } from 'process';

const ActionCreator = (type, payload, page, officeId, userId) => {
  return {
    type,
    payload,
    page,
    officeId,
    userId,
  };
};

const CreateIssueAction = (actionType: string, endPoint, page: number, officeId: UUID, userId: UUID) => {
  return (dispatch: AppDispatch) => {
    HTTP.get(endPoint, { params: { page: page, officeID: officeId ? officeId : null, employeeID: userId ? userId : null } })
      .then(async (result) => {
        const resultJson = await result.data;
        const action = ActionCreator(`${actionType}Success`, resultJson, page, officeId, userId);
        dispatch(action);
      })
      .catch((error) => {
        console.log(error);
        const errorAction = ActionCreator(actionType, [], page, officeId, userId);
        dispatch(errorAction);
      });
  };
};

export const getUserIssues = (userID, page, officeId, userId) => {
  return CreateIssueAction(actions.GET_USER_ISSUES, `issue/reportedBy/${userID}`, page, officeId, userId);
};

export const getClosedIssues = (page, officeId, userId) => {
  return CreateIssueAction(actions.GET_CLOSED_ISSUES, 'issue/closed', page, officeId, userId);
};

export const getResolvedIssues = (page, officeId, userId) => {
  return CreateIssueAction(actions.GET_RESOLVED_ISSUES, 'issue/resolved', page, officeId, userId);
};

export const getPlannedIssues = (page, officeId, userId) => {
  return CreateIssueAction(actions.GET_PLANNED_ISSUES, 'issue/planned', page, officeId, userId);
};

export const getOpenIssues = (page, officeId, userId) => {
  return CreateIssueAction(actions.GET_OPEN_ISSUES, 'issue/open', page, officeId, userId);
};

export const getIssues = (page, officeId, userId) => {
  return CreateIssueAction(actions.GET_ISSUES, 'issue', page, officeId, userId);
};

export const addCommentToIssue = (issueId: string, updatedIssue: Issue) => {
  return {
    type: actions.ADD_COMMENT_TO_ISSUE,
    payload: { issueId, updatedIssue },
  };
};
