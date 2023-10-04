import React from 'react';
import { Box, Typography } from '@mui/material';
import { Add } from '@mui/icons-material';

import StyledButton from 'src/components/StyledButton/StyledButton';

type Props =  {
  name: string;
}

const WelcomeMessage: React.FC<Props> = ({ name }) => {
  return (
    <Box display="flex" alignItems="center" p={2}>
      <Box>
        <Typography variant="h2" gutterBottom>
          Welcome, {name}
        </Typography>
        <Typography variant="h5">
          Discover, report and vote for office issuethat requires our attention and fix
          </Typography>
      </Box>
      <Box ml="auto">
        <StyledButton
          startIcon={<Add />}
          width='150px'
          height='50px'
          backgroundColor='darkblue'
          borderRadius='5px'
          color='white'
          border='none'
          cursor='pointer'
          onClick={() => console.log('Click!')}
        >
          Report Issue
        </StyledButton>
      </Box>



    </Box>
  );
};

export default WelcomeMessage;
