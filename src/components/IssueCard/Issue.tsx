import React, { useCallback } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import { BiSolidUpArrowAlt } from 'react-icons/bi';

import IssueDrawer from './IssueDrawer/IssueDrawer';
import { COLORS } from '../../values/colors';
import VoteToggleButton from './VoteToggleButton';

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
  padding-right: 50px;
  border: 1px solid #ccc;
  border-radius: 8px;
  margin-bottom: 10px;
`;

type CustomBoxProps = {
  issueId: number;
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
  return (
    <>
      <BoxContainer
        onClick={(e) => {
          toggleDrawer(true, setIssueDetailsOpen, e);
        }}
      >
        <Box>
          <Typography variant="h4" sx={{ color: COLORS.blue, marginTop: 2, marginBottom: 2, fontWeight: 500 }}>
            {issueName}
          </Typography>
        </Box>
        <Grid container>
          <Grid item xs={7}>
            <div style={{ display: 'flex', flexDirection: 'row', gap: '120px' }}>
              <Typography
                sx={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  display: '-webkit-box',
                  WebkitLineClamp: '2',
                  WebkitBoxOrient: 'vertical',
                  height: '39px',
                  fontSize: '14px',
                  color: COLORS.gray,
                }}
              >
                {issueDescription}
              </Typography>
            </div>
          </Grid>
          <Grid item xs={5} display="flex" flexDirection="row" justifyContent="space-between" alignItems="center">
            <Grid container alignItems="center">
              <Grid item xs={3}>
                  <Chip
                    label={issueStatus}
                    sx={{ borderRadius: '17px', fontSize: '15px' }}
                    color={issueStatus === 'Open' ? 'success' : issueStatus === 'In progress' ? 'primary' : 'default'}
                  />
              </Grid>
              <Grid item xs={3}>
                <Grid container flexDirection="row" alignItems="center" flexWrap="nowrap" justifyContent="left">
                  <Grid item>
                    <BiSolidUpArrowAlt fontSize={25} color="grey" />
                  </Grid>
                  <Grid item>
                    <Typography
                      sx={{
                        fontSize: '15px',
                        color: COLORS.gray,
                      }}
                    >
                      {upvoteCount}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={3}>
                <Grid container flexDirection="row" alignItems="center" flexWrap="nowrap" justifyContent="left">
                  <Grid item>
                    <ModeCommentOutlinedIcon sx={{ fontSize: 20, marginRight: '5px', color: 'grey' }} />
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
              <Grid item xs={3}>
                {/* needs id from sesion */}
                <VoteToggleButton issueId={issueId} userId={"d06cb831-9427-41ee-adcc-271f7b02d627"} /> 
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid container alignItems="flex-end">
          <Grid item>
            <Typography
              sx={{
                fontSize: '15px',
                color: COLORS.gray,
                marginTop: 1,
              }}
            >
              {date}
            </Typography>
          </Grid>
        </Grid>
      </BoxContainer>
      <IssueDrawer
        wrapperSetDaitailsOpen={wrapperSetDaitailsOpen}
        issueDetailsOpen={issueDetailsOpen}
        issueID={issueId}
      ></IssueDrawer>
    </>
  );
};

export default CustomBox;
