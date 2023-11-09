import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { Add } from '@mui/icons-material';

import StyledButton from 'src/components/StyledButton/StyledButton';
import IssueForm from '../../components/form/IssueForm';
import {useSelector} from 'react-redux';
import {RootState} from '../../store/store';
import {string} from 'yup';



type Props = {
  name: string;
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
    <Box display="flex" alignItems="center" p={2}>
      <Box>
        <Typography variant="h3" gutterBottom sx={{ color: '#0E166E' }}>
          Welcome, {name}
        </Typography>
        <Typography variant="h5" sx={{ color: '#6B706D', marginBottom: '10px' }}>
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
