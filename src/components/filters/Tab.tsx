import * as React from 'react';
import IssueCard from 'src/components/Issue';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { getIssues, getOpenIssues, getPlannedIssues, getResolvedIssues, getClosedIssues, getUserIssues } from 'src/actions/issues/IssuesAction';
import { RootState } from 'src/store/store';
import { useEffect } from 'react';
import { Pagination } from '@mui/material';
import { fetchPaginationCount } from 'src/api/PaginationCount';

interface IssueListProps {
    type: string;
    userID: string;
}

const IssueList = ({ type, userID } : IssueListProps) => {
    const [page, setPage] = React.useState(1);
    const dispatch: ThunkDispatch<RootState, void, any> = useDispatch();

    const selectFilteredIssues = (state: RootState, type: string) => {
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
    };

    const issues = useSelector((state: RootState) => selectFilteredIssues(state, type));

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
                dispatch(getIssues(page));
        }
    }, [dispatch, type, page]);

    
    const [pageCount, setPageCount] = React.useState(1);
  
    React.useEffect(() => {
      fetchPaginationCount().then((count) => {
        setPageCount(count);
      });
    }, []);
  
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
      <Pagination sx={{'& .MuiPaginationItem-root': {fontSize: '14px'}}} count={pageCount} page={page} onChange={handleChange} color={'primary'}/>
    </div>
    
  );
}
export default IssueList;
