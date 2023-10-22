import React, {useState} from 'react';
import { Box, Typography } from '@mui/material';
import { Add } from '@mui/icons-material';
import Button from '@mui/material/Button';
import StyledButton from 'src/components/StyledButton/StyledButton';
import {styled} from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import DialogContent from '@mui/material/DialogContent';
import Divider from '@mui/material/Divider';
import DialogActions from '@mui/material/DialogActions';
import IssueForm from '../../components/forms/IssueForm';
import ReportIssueModal from '../../components/forms/ReportIssueModal';

type Props =  {
  name: string;
}
const WelcomeMessage: React.FC<Props> = ({ name }) => {

  const [dialogOpen, setDialogOpen] = useState(false)

  const openDialog = () => {
    setDialogOpen(true);
  };
  const closeDialog = () => {
    setDialogOpen(false);
  };

  // @ts-ignore
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
        <StyledButton onClick={openDialog} buttonType='primary' buttonSize='medium' type='button'
          startIcon={<Add sx={{ fontSize: '24px' }} />}
        >
          Report Issue
        </StyledButton>
        <ReportIssueModal dialogueState = {dialogOpen} close = {closeDialog}/>
      </Box>

    </Box>
  );
};

export default WelcomeMessage;


