import React from 'react';
import Button from '@mui/material/Button';

import UpvoteChip from '../Chip/UpvoteChip';

type CommentUpvoteButtonProps = {
  isUpVoted: boolean;
  votes: number;
  onClick: () => void;
};

const CommentUpvoteButton: React.FC<CommentUpvoteButtonProps> = ({ isUpVoted, votes, onClick }) => {
  const color = isUpVoted ? '#0E166E' : '#000048';
  const backgroundColor = isUpVoted ? 'red' : 'green';

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
        color: color,
        backgroundColor: backgroundColor,
      }}
    >
      {votes === 0 ? 'Upvote' : <UpvoteChip count={votes} />}
    </Button>
  );
};

export default CommentUpvoteButton;
