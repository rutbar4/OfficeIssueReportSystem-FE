import * as actions from './IssuesActionType';

import { AppDispatch } from 'src/store/store';
import Backend from 'src/api/BackendConfig/BackendConfig';
import HTTP from 'src/api';
import { Issue } from 'src/reducers/issues/IssuesReducer';
import { UUID } from 'crypto';

const ActionCreator = (type, payload, page, officeId) => {
  return {
    type,
    payload,
    page,
    officeId,
  };
};

const CreateIssueAction = (actionType: string, endPoint, page: number, officeId: UUID) => {
  return (dispatch: AppDispatch) => {
    HTTP.get(endPoint, { params: { page: page, officeID:officeId } })
      .then(async (result) => {
        const resultJson = await result.data;
        const action = ActionCreator(`${actionType}Success`, resultJson, page, officeId);
        dispatch(action);
      })
      .catch((error) => {
        console.log(error);
        const errorAction = ActionCreator(actionType, [], page, officeId);
        dispatch(errorAction);
      });
  };
};

export const getUserIssues = (userID, page, officeId) => {
  return CreateIssueAction(actions.GET_USER_ISSUES, `issue/reportedBy/${userID}`, page, officeId);
};

export const getClosedIssues = (page, officeId) => {
  return CreateIssueAction(actions.GET_CLOSED_ISSUES, 'issue/closed', page, officeId);
};

export const getResolvedIssues = (page, officeId) => {
  return CreateIssueAction(actions.GET_RESOLVED_ISSUES, 'issue/resolved', page, officeId);
};

export const getPlannedIssues = (page, officeId) => {
  return CreateIssueAction(actions.GET_PLANNED_ISSUES, 'issue/planned', page, officeId);
};

export const getOpenIssues = (page, officeId) => {
  return CreateIssueAction(actions.GET_OPEN_ISSUES, 'issue/open', page, officeId);
};

export const getIssues = (page, officeId) => {
  return CreateIssueAction(actions.GET_ISSUES, 'issue', page, officeId);
};

export const addCommentToIssue = (issueId: string, updatedIssue: Issue) => {
  return {
    type: actions.ADD_COMMENT_TO_ISSUE,
    payload: { issueId, updatedIssue },
  };
};
