import * as React from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import StyledButton from '../StyledButton/StyledButton';
import { Stack } from '@mui/material';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const IssueForm = ({ open, close }) => (
  <BootstrapDialog onClose={close} aria-labelledby="customized-dialog-title" open={open}>
    <DialogTitle sx={{ m: 3, p: 2 }} id="customized-dialog-title">
      <Typography variant="h4" gutterBottom sx={{ color: '#0E166E' }}>
        Report issue:
      </Typography>
    </DialogTitle>
    <IconButton
      aria-label="close"
      onClick={close}
      sx={{
        position: 'absolute',
        right: 8,
        top: 8,
        color: (theme) => theme.palette.grey[500],
      }}
    >
      <CloseIcon />
    </IconButton>
    <DialogContent sx={{ width: '550px', height: '850px' }}>
      <Stack spacing={2} direction="column">
        <Divider variant="middle" sx={{ m: 10 }} />
      </Stack>
    </DialogContent>
    <Divider />
    <DialogActions>
      <StyledButton buttonSize={'medium'} buttonType={'secondary'} type={'button'} onClick={close}>
        Cancel
      </StyledButton>
      <StyledButton buttonSize={'medium'} buttonType={'primary'} type={'submit'}>
        Report issue
      </StyledButton>
    </DialogActions>
  </BootstrapDialog>
);

export default IssueForm;
