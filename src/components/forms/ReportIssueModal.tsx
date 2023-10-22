import * as React from 'react';
import Button from '@mui/material/Button';
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
import * as Yup from 'yup';
import {Formik} from 'formik';

// const issueValidationSchema = Yup.object().shape(
//
// )

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const ReportIssueModal =  ({dialogueState , close}, ) => {

  return (
    <>
      <BootstrapDialog
        onClose={close}
        aria-labelledby="customized-dialog-title"
        open={dialogueState}
      >
    <DialogTitle sx={{ m: 3, p: 2 }} id="customized-dialog-title">
      <Typography variant="h4" gutterBottom sx={{ color: '#0E166E' }}>
        Report issue
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
    <DialogContent>


    </DialogContent>
    <Divider/>
    <DialogActions>
      <StyledButton  buttonSize={"medium"} buttonType={"secondary"} type={"button"} onClick={close}>
        Cancel
      </StyledButton>
      <StyledButton   buttonSize={"medium"} buttonType={"primary"} type={"submit"}>
        Report issue
      </StyledButton>
    </DialogActions>
    </BootstrapDialog>
</>
);
}

export default ReportIssueModal;

