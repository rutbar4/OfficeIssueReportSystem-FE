import React, { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { BiSolidUpArrowAlt } from 'react-icons/bi';
import { COLORS } from '../../../values/colors';
import { IsVoted, DeleteVote, PostVote } from '../../../api/VoteApi';

export default function VoteToggleButton({ issueId, handleVoteCount }) {
  useEffect(() => {
    IsVoted(issueId).then((data) => {
      setVoted(data);
      setInitialVoteState(data);
    });
  }, []);

  const [wasVoted, setInitialVoteState] = useState();
  const [isVoted, setVoted] = useState(false);
  async function handleclick(event) {
    if (isVoted) {
      await DeleteVote(issueId);
      wasVoted ? handleVoteCount(-1) : handleVoteCount(0);
    } else {
      await PostVote(issueId);
      wasVoted ? handleVoteCount(0) : handleVoteCount(1);
    }
    setVoted(!isVoted);
  }

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
          backgroundColor: isVoted === true ? '#78ECE8' : 'transparent',
          ':hover': { backgroundColor: isVoted === true ? 'lightblue' : undefined },
        }}
        startIcon={<BiSolidUpArrowAlt color="#0E166E" />}
        onClick={(e) => {
          e.stopPropagation();
          handleclick(e);
        }}
      >
        Vote
      </Button>
    </>
  );
}
