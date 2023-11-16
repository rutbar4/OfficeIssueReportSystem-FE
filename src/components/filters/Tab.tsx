import * as React from 'react';
import IssueCard from 'src/components/Issue';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { getIssues, getOpenIssues, getPlannedIssues, getResolvedIssues, getClosedIssues, getUserIssues } from 'src/actions/issues/IssuesAction';
import { RootState } from 'src/store/store';
import { useEffect } from 'react';
import { Pagination } from '@mui/material';
import { fetchPageCount } from 'src/api/PageCount';

interface IssueListProps {
    type: string;
    userID: string;
}

const IssueList = ({ type, userID } : IssueListProps) => {
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
    const findPage = (state: RootState, type: string) => {
      switch(type) {
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
        switch(type) {
            case 'open':
                dispatch(getOpenIssues(page));
                break;
            case 'closed':
                dispatch(getClosedIssues(page));
                break;
            case 'planned':
                dispatch(getPlannedIssues(page));
                break;
            case 'resolved':
                dispatch(getResolvedIssues(page));
                break;
            case 'user':
                dispatch(getUserIssues(userID, page));
                break;
            default:
                dispatch(getIssues(page));
        }
    }, [ type, page]);

    
    const [pageCount, setPageCount] = React.useState(1);
  
    React.useEffect(() => {
      fetchPageCount(type, userID).then((count) => {
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
