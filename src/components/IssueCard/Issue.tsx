/* eslint-disable react/self-closing-comp */
import React, { useCallback, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { colors, styled } from '@mui/material';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import UpvoteCount from './IssueCardComponents/UpvoteCount';
import IssueDrawer from '../IssueDrawer/IssueDrawer';
import { COLORS } from '../../values/colors';
import VoteToggleButton from './IssueCardComponents/VoteToggleButton';
import { GetVoteCount } from '../../api/VoteApi';
import { IsVoted } from '../../api/VoteApi';
import StatusChip from 'src/components/Chip/StatusChip';

const toggleDrawer = (open, setState, event) => {
  if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
    return;
  }
  setState(open);
};

const BoxContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: left;
  align-items: left;
  height: 100%;
  padding: 20px;
  padding-left: 25px;
  padding-right: 25px;
  border: 1px solid #dddddd;
  border-radius: 10px;
  margin-bottom: 10px;
  background-color: #ffffff;
`;

type CustomBoxProps = {
  issueId: string;
  issueName: string;
  issueDescription: string;
  issueStatus: string;
  upvoteCount: number;
  commentCount: number;
  date: string;
};

const CustomBox: React.FC<CustomBoxProps> = ({
  issueId,
  issueName,
  issueDescription,
  issueStatus,
  upvoteCount,
  commentCount,
  date,
}) => {
  const [issueDetailsOpen, setIssueDetailsOpen] = React.useState(false);

  const wrapperSetDaitailsOpen = useCallback(
    (val) => {
      setIssueDetailsOpen(val);
    },
    [setIssueDetailsOpen]
  );

  async function handleVoteCount(counter) {
    let result = upvoteCount + counter;
    setVoteCount(result);
  }
  const [voteCount, setVoteCount] = useState(0);

  useEffect(() => {
    IsVoted(issueId)
      .then((data) => {
        setInitialVoteState(data);
      })
      .catch((data) => {
        setError(true);
      })
      .finally();
  }, []);
  useEffect(() => {
    handleVoteCount(0);
  }, []);
  const [wasVoted, setInitialVoteState] = useState(false);
  const [isError, setError] = useState(false);
  const [isVoted, setVoted] = useState(wasVoted);

  const issueDate = new Date(date);
  const day = issueDate.getUTCDate();
  const month = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(issueDate);
  const year = issueDate.getUTCFullYear();
  const hour = issueDate.getUTCHours();
  const minute = issueDate.getUTCMinutes();

  const formattedDate = `${day} ${month} ${year}, ${hour.toString().padStart(2, '0')}:${minute
    .toString()
    .padStart(2, '0')}`;

  return (
    <>
      <BoxContainer
        onClick={(e) => {
          toggleDrawer(true, setIssueDetailsOpen, e);
        }}
        sx={{
          '&:hover': {
            backgroundColor: '#F4F4F4',
            cursor: 'pointer',
          },
        }}
      >
        <Grid container alignItems="center">
          <Grid item xs={12} sm={7}>
            <Grid item>
              <Box>
                <Typography
                  variant="h4"
                  sx={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: '1',
                    WebkitBoxOrient: 'vertical',
                    color: COLORS.blue,
                    marginBottom: '7px',
                    fontWeight: 500,
                  }}
                >
                  {issueName.charAt(0).toUpperCase() + issueName.slice(1)}
                </Typography>
              </Box>
            </Grid>
            <Grid item alignItems="start">
              <Typography
                sx={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  display: '-webkit-box',
                  WebkitLineClamp: '2',
                  WebkitBoxOrient: 'vertical',
                  fontSize: '14px',
                  width: '90%',
                  color: COLORS.gray,
                }}
              >
                <span dangerouslySetInnerHTML={{ __html: issueDescription }} />
              </Typography>
            </Grid>
            <Grid item>
              <Typography
                sx={{
                  fontSize: '15px',
                  color: '#999999',
                  marginTop: '15px',
                  bottom: 0,
                }}
              >
                {formattedDate}
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={5} display="flex" flexDirection="column" justifyContent="flex-end" alignItems="center">
            <Grid container alignItems="center" justifyContent="space-between">
              <Grid item xs={3}>
                <StatusChip issueStatus={issueStatus} />
              </Grid>
              <Grid item xs={2}>
                <UpvoteCount voteCount={voteCount} key={issueId} />
              </Grid>
              <Grid item xs={2}>
                <Grid container flexDirection="row" alignItems="center" flexWrap="nowrap">
                  <Grid item>
                    <ModeCommentOutlinedIcon
                      sx={{ fontSize: 20, marginRight: '5px', color: '#999999', marginTop: '2px' }}
                    />
                  </Grid>
                  <Grid item>
                    <Typography
                      sx={{
                        fontSize: '15px',
                        color: COLORS.gray,
                      }}
                    >
                      {commentCount}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={2}>
                {/* needs id from session */}
                {issueStatus !== 'Closed' && (
                  <div style={{ float: 'right' }}>
                    <VoteToggleButton
                      issueId={issueId}
                      key={issueId}
                      handleVoteCount={handleVoteCount}
                      put={'Vote'}
                      wasVoted={wasVoted}
                      isError={isError}
                      setError={setError}
                      isVoted={isVoted}
                      setVoted={setVoted}
                    />
                  </div>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </BoxContainer>
      <IssueDrawer
        wrapperSetDaitailsOpen={wrapperSetDaitailsOpen}
        issueDetailsOpen={issueDetailsOpen}
        issueId={issueId}
        handleVoteCount={handleVoteCount}
        voteCount={voteCount}
        wasVoted={wasVoted}
        isError={isError}
        setError={setError}
        isVoted={isVoted}
        setVoted={setVoted}
      ></IssueDrawer>
    </>
  );
};

export default CustomBox;
