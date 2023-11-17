import React from 'react';
import Button from '@mui/material/Button';

import UpvoteChip from '../Chip/UpvoteChip';
import { COLORS } from '../../values/colors';


type CommentUpvoteButtonProps = {
  isUpVoted: boolean;
  votes: number;
  onClick: () => void;
};

const CommentUpvoteButton: React.FC<CommentUpvoteButtonProps> = ({ isUpVoted, votes, onClick }) => {
  const backgroundColor = isUpVoted ? COLORS.lightBlue : COLORS.white;

  return (
    <Button
    variant="text"
    onClick={onClick}
    sx={{
      marginTop: 2,
      marginLeft: '-12px',
      cursor: 'pointer',
      textTransform: 'capitalize',
      fontSize: '12px',
      padding: '0px 0px',
      minWidth: 'unset',
      borderRadius: '16px',
      color: COLORS.blue,
      backgroundColor: backgroundColor,
    }}
    >
    {votes === 0 ? 'Upvote' : <UpvoteChip count={votes} />}
  </Button>
  );
};

export default CommentUpvoteButton;

