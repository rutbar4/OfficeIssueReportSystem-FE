import React from 'react';
import Chip from '@mui/material/Chip';
import { BiSolidUpArrowAlt } from 'react-icons/bi';

const UpvoteChip = ({ count }: { count: number }) => {
  return (
    <Chip
      label={count}
      avatar={<BiSolidUpArrowAlt color="#0E166E" />}
      sx={{ borderRadius: '17px', fontSize: '17px', padding: '3px' }}
    />
  );
};

export default UpvoteChip;
