import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { BiSolidUpArrowAlt } from 'react-icons/bi';
import { COLORS } from '../../values/colors';
import { IsVoted } from '../../api/VoteApi';

// reikia is issue korteles gauti voted/notVoted variebles, tada displayint atitinkama mygutuka ir jei paspaudzia isiusti (i DB) statuso pakeitima ir atnaujinti mygtuko busen

export default function VoteToggleButton({ issueId, userId }) {
  useEffect(() => {
    IsVoted(issueId, userId).then((data) => setVoted(data));
  }, []);

  const [isVoted, setVoted] = useState(false);

  const handleclick = (event) => {
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
