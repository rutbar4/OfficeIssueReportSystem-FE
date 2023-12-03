import * as React from 'react';
import IssueCard from 'src/components/IssueCard/Issue';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { useEffect } from 'react';
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
import { Pagination } from '@mui/material';
import { fetchPageCount } from 'src/api/PageCount';

interface IssueListProps {
  type: string | null;
  userID: string;
  officeId: any | null;
  userId: any | null;
}

const Tab = ({ type, userID, officeId, userId }: IssueListProps) => {
  const dispatch: ThunkDispatch<RootState, void, any> = useDispatch();

  const selectFilteredIssues = (state: RootState, type: string | null) => {
    switch (type) {
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
  };
  const findPage = (state: RootState, type: string | null) => {
    switch (type) {
      case 'open':
        return state.rootReducer.openIssues.page;
      case 'closed':
        return state.rootReducer.closedIssues.page;
      case 'planned':
        return state.rootReducer.plannedIssues.page;
      case 'resolved':
        return state.rootReducer.resolvedIssues.page;
      case 'user':
        return state.rootReducer.userIssues.page;
      default:
        return state.rootReducer.issues.page;
    }
  };

  const issues = useSelector((state: RootState) => selectFilteredIssues(state, type));
  const currentPage = useSelector((state: RootState) => findPage(state, type));
  const [page, setPage] = React.useState(currentPage);

  useEffect(() => {
    switch (type) {
      case 'open':
        dispatch(getOpenIssues(page, officeId, userId));
        break;
      case 'closed':
        dispatch(getClosedIssues(page, officeId, userId));
        break;
      case 'planned':
        dispatch(getPlannedIssues(page, officeId, userId));
        break;
      case 'resolved':
        dispatch(getResolvedIssues(page, officeId, userId));
        break;
      case 'user':
        dispatch(getUserIssues(userID, page, officeId, userId));
        break;
      default:
        dispatch(getIssues(page, officeId, userId));
    }
  }, [type, page, officeId, userId]);

  const [pageCount, setPageCount] = React.useState(1);

  React.useEffect(() => {
    fetchPageCount(type, userID, officeId, userId).then((count) => {
      setPageCount(count);
    });
  }, [officeId, userId]);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

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
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Pagination
          sx={{ '& .MuiPaginationItem-root': { fontSize: '14px' } }}
          count={pageCount}
          page={page}
          onChange={handleChange}
          color={'primary'}
        />
      </div>
    </div>
  );
};
export default Tab;
