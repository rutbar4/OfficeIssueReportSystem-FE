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
  const votedColor = isUpVoted ? COLORS.lightBlue : COLORS.white;

  return (
    <Button
      variant="text"
      onClick={onClick}
      sx={{
        marginLeft: '-18px',
        cursor: 'pointer',
        textTransform: 'capitalize',
        color: COLORS.blue,
        backgroundColor: votedColor,
        padding: 0,
        scale: '0.75',
        borderRadius: '16px',
        outline: 'none',
        border: 'none',
      }}
    >
      <UpvoteChip count={votes} />
    </Button>
  );
};

export default CommentUpvoteButton;
