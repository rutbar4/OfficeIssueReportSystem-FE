import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { Add } from '@mui/icons-material';

import IssueForm from '../../components/form/IssueForm';

import StyledButton from 'src/components/StyledButton/StyledButton';
import { COLORS } from 'src/values/colors.js';

type Props = {
  name: string | 'user';
};

const WelcomeMessage: React.FC<Props> = ({ name }) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const openDialog = () => {
    setDialogOpen(true);
  };
  const closeDialog = () => {
    setDialogOpen(false);
  };

  return (
    <Box display="flex" alignItems="center" sx={{ paddingTop: 2, paddingBottom: 4 }}>
      <Box>
        <Typography variant="h3" gutterBottom sx={{ color: COLORS.blue }}>
          Welcome, {name.split(' ')[0]}
        </Typography>
        <Typography variant="h5" sx={{ color: COLORS.gray, marginBottom: '10px' }}>
          Discover, report and vote for office issue that requires our attention and fix
        </Typography>
      </Box>
      <Box ml="auto">
        <StyledButton
          onClick={openDialog}
          buttonType="primary"
          buttonSize="medium"
          type="button"
          startIcon={<Add sx={{ fontSize: '24px' }} />}
        >
          Report Issue
        </StyledButton>
        <IssueForm open={dialogOpen} close={closeDialog} />
      </Box>
    </Box>
  );
};

export default WelcomeMessage;
