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
import { Alert, AlertTitle, Box, CircularProgress, LinearProgress, Pagination, Typography } from '@mui/material';
import { fetchPageCount } from 'src/api/PageCount';
import { COLORS } from 'src/values/colors.js';
import SearchOffIcon from '@mui/icons-material/SearchOff';
import { fontWeight } from '@mui/system';

interface IssueListProps {
  type: string | null;
  userID: string;
  officeId: any | null;
  userId: any | null;
  sortParam: any | null;
  searchValue: any | null;
  setShowEmployeeFilter: any;
}

const Tab = ({ type, userID, officeId, userId, sortParam, searchValue, setShowEmployeeFilter }: IssueListProps) => {
  const dispatch: ThunkDispatch<RootState, void, any> = useDispatch();
  const refreshKey = useSelector((state: RootState) => state.refresh);

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
      case 'open': {
        setShowEmployeeFilter(true);
        dispatch(getOpenIssues(page, officeId, userId, sortParam, searchValue));
        break;
      }
      case 'closed': {
        setShowEmployeeFilter(true);
        dispatch(getClosedIssues(page, officeId, userId, sortParam, searchValue));
        break;
      }
      case 'planned': {
        setShowEmployeeFilter(true);
        dispatch(getPlannedIssues(page, officeId, userId, sortParam, searchValue));
        break;
      }
      case 'resolved':
        setShowEmployeeFilter(true);
        dispatch(getResolvedIssues(page, officeId, userId, sortParam, searchValue));
        break;
      case 'user': {
        setShowEmployeeFilter(false);
        dispatch(getUserIssues(userID, page, officeId, sortParam, searchValue));
        break;
      }
      default: {
        setShowEmployeeFilter(true);
        dispatch(getIssues(page, officeId, userId, sortParam, searchValue));
      }
    }
  }, [type, page, officeId, userId, sortParam, searchValue]);

  const [pageCount, setPageCount] = React.useState(1);

  React.useEffect(() => {
    fetchPageCount(type, userID, officeId, userId, searchValue).then((count) => {
      setPageCount(count);
    });
  }, [officeId, userId, searchValue]);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  useEffect(() => {
    setPage(1);
  }, [refreshKey, pageCount]);

  return (
    <div>
      {issues.loading ? (
        <Box sx={{ width: '100%', display: 'flex', marginTop: '25px', paddingLeft: '15px', alignItems: 'center' }}>
          <CircularProgress sx={{ fontSize: '45px', color: COLORS.blue, marginRight: '15px' }} />
          <Box>
            <Typography variant="h5" color={COLORS.blue}>
              Loading issues
            </Typography>
            <Typography variant="h6" color={COLORS.gray}>
              Please wait!
            </Typography>
          </Box>
        </Box>
      ) : issues.issues.length === 0 ? (
        <Box
          sx={{
            width: '100%',
            marginTop: '25px',
            paddingLeft: '15px',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <SearchOffIcon sx={{ fontSize: '45px', color: COLORS.blue, marginRight: '15px' }} />
          <Box>
            <Typography variant="h5" color={COLORS.blue}>
              No issues found
            </Typography>
            <Typography variant="h6" color={COLORS.gray}>
              Try changing status tabs or filters
            </Typography>
          </Box>
        </Box>
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
      {issues.issues.length !== 0 && (
        <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '30px' }}>
          <Pagination
            sx={{
              '& .MuiPaginationItem-root': {
                fontSize: '14px',
                color: COLORS.blue + ' !important',
                fontWeight: 'bold',
                backgroundColor: '#FFFFFF !important',
              },
              '& .Mui-selected': {
                backgroundColor: COLORS.cyan + ' !important',
                border: 'none !important',
              },
            }}
            count={pageCount}
            page={page}
            onChange={handleChange}
            color="primary"
            variant="outlined"
          />
        </div>
      )}
    </div>
  );
};
export default Tab;
