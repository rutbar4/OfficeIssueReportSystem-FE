import React, { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { BiSolidUpArrowAlt } from 'react-icons/bi';
import { COLORS } from '../../../values/colors';
import { IsVoted, DeleteVote, PostVote } from '../../../api/VoteApi';

export default function VoteToggleButton({ issueId, userId }) {
  useEffect(() => {
    IsVoted(issueId, userId).then((data) => setVoted(data));
  }, []);

  const [isVoted, setVoted] = useState(false);

  const handleclick = (event) => {
    if(isVoted)
    {
      DeleteVote(issueId, userId);
    }
    else {
      PostVote(issueId, userId);
    }
    setVoted(!isVoted);
  };

  return (
    <>
      <Button
        variant="outlined"
        id={'unique-id'}
        sx={{
          borderRadius: '17px',
          borderColor: 'lightgray',
          fontSize: '15px',
          color: COLORS.blue,
          fontWeight: 'bold',
          backgroundColor: isVoted === true ? 'lightblue' : 'transparent',
          ':hover': { backgroundColor: isVoted === true ? 'lightblue' : undefined },
        }}
        startIcon={<BiSolidUpArrowAlt color="#0E166E" />}
        onClick={(e) => {
          e.stopPropagation();
          console.log(e);
          handleclick(e);
        }}
      >
        Vote
      </Button>
    </>
  );
}
