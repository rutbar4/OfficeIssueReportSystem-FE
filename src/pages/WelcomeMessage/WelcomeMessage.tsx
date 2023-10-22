import React from 'react';
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

type Props =  {
  name: string;
}

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const WelcomeMessage: React.FC<Props> = ({ name }) => {

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
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
        <StyledButton onClick={handleClickOpen} buttonType='primary' buttonSize='medium' type='button'
          startIcon={<Add sx={{ fontSize: '24px' }} />}
        >
          Report Issue
        </StyledButton>
      </Box>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 3, p: 2 }} id="customized-dialog-title">
          <Typography variant="h4" gutterBottom sx={{ color: '#0E166E' }}>
            Report issue
          </Typography>
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: 'black',
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent sx = {{width: '550px'}}>
          <IssueForm></IssueForm>

        </DialogContent>
        <Divider/>
        <DialogActions>
          <StyledButton  buttonSize={"medium"} buttonType={"secondary"} type={"button"} onClick={handleClose}>
            Cancel
          </StyledButton>
          <StyledButton   buttonSize={"medium"} buttonType={"primary"} type={"submit"}>
            Report issue
          </StyledButton>
        </DialogActions>
      </BootstrapDialog>
    </Box>
  );
};

export default WelcomeMessage;


