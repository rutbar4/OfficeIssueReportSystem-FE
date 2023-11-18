import React, { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { BiSolidUpArrowAlt } from 'react-icons/bi';
import { COLORS } from '../../../values/colors';
import { IsVoted, DeleteVote, PostVote } from '../../../api/VoteApi';

export default function VoteToggleButton({ issueId, handleVoteCount, put, wasVoted, isError, setError, isVoted, setVoted }) {
  useEffect(() => {
    IsVoted(issueId)
      .then((data) => {
        setVoted(data);
      })
      .catch((data) => {
        setError(true);
      })
      .finally();
  },[]);
  useEffect(() => {
    setVoted(wasVoted);
  }, [wasVoted]);

  async function handleclick(event) {
    if (!isError) {
      if (isVoted) {
        await DeleteVote(issueId).catch(() => {
          setError(true);
        });
        wasVoted ? handleVoteCount(-1) : handleVoteCount(0);
      } else {
        await PostVote(issueId).catch(() => {
          setError(true);
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
