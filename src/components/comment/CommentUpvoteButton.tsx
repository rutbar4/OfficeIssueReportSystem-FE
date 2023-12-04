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
        borderRadius: '17px',
        outline: 'none',
        border: 'none',
        fontSize: '12px',
        width: '20px',
        overflow: 'hidden',
        fontWeight: 'bold',
        ':hover': { backgroundColor: isUpVoted === true ? COLORS.hoverLightBlue : COLORS.hoverUnvotedLightBlue }
      }}
    >
      <UpvoteChip count={votes} />
    </Button>
  );
};

export default CommentUpvoteButton;

