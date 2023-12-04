import * as actions from './IssuesActionType';

import { AppDispatch } from 'src/store/store';
import Backend from 'src/api/BackendConfig/BackendConfig';
import HTTP from 'src/api';
import { Issue } from 'src/reducers/issues/IssuesReducer';
import { UUID } from 'crypto';
import { off } from 'process';

const ActionCreator = (type, payload, page, officeId, userId, sortParam) => {
  return {
    type,
    payload,
    page,
    officeId,
    userId,
    sortParam,
  };
};

const CreateIssueAction = (
  actionType: string,
  endPoint,
  page: number,
  officeId: UUID,
  userId: UUID,
  sortParam: string
) => {
  return (dispatch: AppDispatch) => {
    HTTP.get(endPoint, {
      params: {
        page: page,
        officeID: officeId ? officeId : null,
        employeeID: userId ? userId : null,
        sortParameter: sortParam ? sortParam : null,
      },
    })
      .then(async (result) => {
        const resultJson = await result.data;
        const action = ActionCreator(`${actionType}Success`, resultJson, page, officeId, userId, sortParam);
        dispatch(action);
      })
      .catch((error) => {
        console.log(error);
        const errorAction = ActionCreator(actionType, [], page, officeId, userId, sortParam);
        dispatch(errorAction);
      });
  };
};

export const getUserIssues = (userID, page, officeId, userId, sortParam) => {
  return CreateIssueAction(actions.GET_USER_ISSUES, `issue/reportedBy/${userID}`, page, officeId, userId, sortParam);
};

export const getClosedIssues = (page, officeId, userId, sortParam) => {
  return CreateIssueAction(actions.GET_CLOSED_ISSUES, 'issue/closed', page, officeId, userId, sortParam);
};

export const getResolvedIssues = (page, officeId, userId, sortParam) => {
  return CreateIssueAction(actions.GET_RESOLVED_ISSUES, 'issue/resolved', page, officeId, userId, sortParam);
};

export const getPlannedIssues = (page, officeId, userId, sortParam) => {
  return CreateIssueAction(actions.GET_PLANNED_ISSUES, 'issue/planned', page, officeId, userId, sortParam);
};

export const getOpenIssues = (page, officeId, userId, sortParam) => {
  return CreateIssueAction(actions.GET_OPEN_ISSUES, 'issue/open', page, officeId, userId, sortParam);
};

export const getIssues = (page, officeId, userId, sortParam) => {
  return CreateIssueAction(actions.GET_ISSUES, 'issue', page, officeId, userId, sortParam);
};

export const addCommentToIssue = (issueId: string, updatedIssue: Issue) => {
  return {
    type: actions.ADD_COMMENT_TO_ISSUE,
    payload: { issueId, updatedIssue },
  };
};
