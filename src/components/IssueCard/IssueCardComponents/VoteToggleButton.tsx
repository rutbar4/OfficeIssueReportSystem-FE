import React, { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { BiSolidUpArrowAlt } from 'react-icons/bi';
import { COLORS } from '../../../values/colors';
import { IsVoted, DeleteVote, PostVote } from '../../../api/VoteApi';

export default function VoteToggleButton({ issueId, handleVoteCount, put }) {
  useEffect(() => {
    IsVoted(issueId)
      .then((data) => {
        setVoted(data);
        setInitialVoteState(data);
      })
      .catch((data) => {
        console.log('data error');
        console.log(data);
        setError(true);
        console.log('Failed to fetch issue details');
      })
      .finally();
  });

  const [isVoted, setVoted] = useState(false);
  const [wasVoted, setInitialVoteState] = useState(false);
  const [isError, setError] = useState(false);
  async function handleclick(event) {
    console.log('isError');
    console.log(isError);
    if (!isError) {
      if (isVoted) {
        await DeleteVote(issueId).catch(() => {
          setError(true);
          console.log('isError');
          console.log(isError);
        });
        wasVoted ? handleVoteCount(-1) : handleVoteCount(0);
      } else {
        await PostVote(issueId).catch(() => {
          setError(true);
          console.log('isError');
          console.log(isError);
        });
        wasVoted ? handleVoteCount(0) : handleVoteCount(1);
      }
      setVoted(!isVoted);
    }
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
          fontWeight: 'bold',
          color: COLORS.blue,
          backgroundColor: isVoted === true ? '#78ECE8' : 'transparent',
          ':hover': { backgroundColor: isVoted === true ? 'lightblue' : undefined },
        }}
        startIcon={<BiSolidUpArrowAlt color="#0E166E" />}
        onClick={(e) => {
          e.stopPropagation();
          handleclick(e);
        }}
      >
        {put}
      </Button>
    </>
  );
}
