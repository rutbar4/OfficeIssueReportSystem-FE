import React, { useCallback } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { styled } from '@mui/material';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';

import UpButton from 'src/icons/UpvoteButtonIcon.png';
import CommentIcon from 'src/icons/CommentIcon.png';
import UpvoteIcon from 'src/icons/UpvoteIcon.png';
import IssueDrawer from './IssueDrawer/IssueDrawer';

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
  width: 1500px;
  height: 180px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
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
  const [state, setState] = React.useState(false);
  const wrapperSetState = useCallback(
    (val) => {
      setState(val);
    },
    [setState]
  );
  return (
    <>
      <BoxContainer
        onClick={(e) => {
          toggleDrawer(true, setState, e);
        }}
      >
        <h2>{issueName}</h2>
        <div style={{ display: 'flex', flexDirection: 'row', gap: '120px' }}>
          <Typography
            sx={{
              width: '700px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: '2',
              WebkitBoxOrient: 'vertical',
              height: '39px',
              fontSize: '14px',
            }}
          >
            {issueDescription}
          </Typography>
          <Chip
            label={issueStatus}
            sx={{ borderRadius: '17px', fontSize: '15px' }}
            color={issueStatus === 'Open' ? 'success' : issueStatus === 'In progress' ? 'primary' : 'default'}
          />
          <p>
            <img src={UpvoteIcon} style={{ height: '20px', marginRight: '5px' }} />
            {upvoteCount}
          </p>
          <p>
            <img src={CommentIcon} style={{ height: '20px', marginRight: '5px' }} />
            {commentCount}
          </p>
          <Button
            variant="outlined"
            sx={{ borderRadius: '17px', fontSize: '15px' }}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <img src={UpButton} style={{ height: '30px', marginLeft: '0px' }} />
            Vote
          </Button>
        </div>
        <p>{date}</p>
      </BoxContainer>
      <IssueDrawer wrapperSetState={wrapperSetState} state={state}></IssueDrawer>
    </>
  );
};

export default CustomBox;
