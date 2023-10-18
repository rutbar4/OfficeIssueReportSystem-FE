import React, { useCallback } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { styled } from '@mui/material';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import IssueDrawer from './IssueDrawer/IssueDrawer';
import { BiSolidUpArrowAlt } from 'react-icons/bi';

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
  width: 150x;
  height: 100%;
  padding: 20px;
  padding-right: 50px;
  border: 1px solid #ccc;
  border-radius: 8px;
  margin-bottom: 10px;
`;

type CustomBoxProps = {
  issueName: string;
  issueDescription: string;
  issueStatus: string;
  upvoteCount: number;
  commentCount: number;
  date: string;
};

const CustomBox: React.FC<CustomBoxProps> = ({
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
          <Typography variant="h4" sx={{ color: '#0E166E', marginTop: 2, marginBottom: 2, fontWeight: 500 }}>
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
                  color: '#6B706D',
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
                    <BiSolidUpArrowAlt fontSize={25} color="grey"></BiSolidUpArrowAlt>
                  </Grid>
                  <Grid item>
                    <Typography
                      sx={{
                        fontSize: '15px',
                        color: '#6B706D',
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
                        color: '#6B706D',
                      }}
                    >
                      {commentCount}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={3}>
                <Button
                  variant="outlined"
                  sx={{
                    borderRadius: '17px',
                    borderColor: 'lightgray',
                    fontSize: '15px',
                    color: '#0E166E',
                    fontWeight: 'bold',
                  }}
                  startIcon={<BiSolidUpArrowAlt color="#0E166E" />}
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  Vote
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid container alignItems="flex-end">
          <Grid item>
            <Typography
              sx={{
                fontSize: '15px',
                color: '#6B706D',
                marginTop: 1,
              }}
            >
              {date}
            </Typography>
          </Grid>
        </Grid>
      </BoxContainer>
      <IssueDrawer wrapperSetDaitailsOpen={wrapperSetDaitailsOpen} issueDetailsOpen={issueDetailsOpen}></IssueDrawer>
    </>
  );
};

export default CustomBox;
