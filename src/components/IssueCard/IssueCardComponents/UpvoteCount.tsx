import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import { BiSolidUpArrowAlt } from 'react-icons/bi';
import Typography from '@mui/material/Typography';
import { COLORS } from '../../../values/colors';
import { GetVoteCount } from '../../../api/VoteApi';

export default function UpvoteCount({ voteCount}) {

return (
    <Grid container flexDirection="row" alignItems="center" flexWrap="nowrap" justifyContent="left">
      <Grid item>
        <BiSolidUpArrowAlt fontSize={25} color="grey" />
      </Grid>
      <Grid item>
        <Typography
          sx={{
            fontSize: '15px',
            color: COLORS.gray,
          }}
        >
          {voteCount}
        </Typography>
      </Grid>
    </Grid>
  );
}
