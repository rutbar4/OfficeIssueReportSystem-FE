import * as React from 'react';
import IssueCard from 'src/components/IssueCard/Issue';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import {
  getIssues,
  getOpenIssues,
  getPlannedIssues,
  getResolvedIssues,
  getClosedIssues,
  getUserIssues,
} from 'src/actions/issues/IssuesAction';
import { RootState } from 'src/store/store';
import { useEffect } from 'react';

interface IssueListProps {
  type: string;
  userID: string;
}

const IssueList = ({ type, userID } : IssueListProps) => {
  const dispatch: ThunkDispatch<RootState, void, any> = useDispatch();
  const issues = useSelector((state: RootState) => {
    switch(type) {
      case 'open':
        return state.rootReducer.openIssues;
      case 'closed':
        return state.rootReducer.closedIssues;
      case 'planned':
        return state.rootReducer.plannedIssues;
      case 'resolved':
        return state.rootReducer.resolvedIssues;
      case 'user':
        return state.rootReducer.userIssues;
      default:
        return state.rootReducer.issues;
    }
  });

  useEffect(() => {
    switch(type) {
      case 'open':
        dispatch(getOpenIssues());
        break;
      case 'closed':
        dispatch(getClosedIssues());
        break;
      case 'planned':
        dispatch(getPlannedIssues());
        break;
      case 'resolved':
        dispatch(getResolvedIssues());
        break;
      case 'user':
        dispatch(getUserIssues(userID));
        break;
      default:
        dispatch(getIssues());
    }
  }, [dispatch, type]);

  return (
    <div>
      {issues.loading ? (
        <p>Loading...</p>
      ) : issues.issues.length === 0 ? (
        <p>EMPTY</p>
      ) : (
        issues.issues.map((issue) => (
          <IssueCard
            key={issue.id}
            issueId={issue.id}
            issueName={issue.name}
            issueDescription={issue.description}
            issueStatus={issue.status}
            upvoteCount={issue.upvoteCount}
            commentCount={issue.commentCount}
            date={issue.time}
          />
        ))
      )}
    </div>
  );
}
export default IssueList;
